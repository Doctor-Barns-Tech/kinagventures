import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendOrderConfirmation } from '@/lib/notifications';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Reconciliation safety-net for Moolre payments.
 *
 * Moolre delivers a server-to-server callback when a payment succeeds, but if
 * that webhook is ever missed (network blip, deploy, rate-limit, etc.) the
 * order can stay stuck on `pending` even though the customer paid.
 *
 * This endpoint re-checks every recent pending order that had a payment attempt
 * directly against Moolre's authoritative status API (/open/transact/status,
 * looked up by our unique externalref) and marks any genuinely-paid order as
 * paid — then sends the confirmation notifications.
 *
 * Intended to be hit on a schedule (e.g. Vercel Cron every 15 min). Protected
 * by a shared secret so it cannot be abused publicly.
 */

const MOOLRE_STATUS_URL = 'https://api.moolre.com/open/transact/status';

async function checkMoolreStatus(externalref: string): Promise<{ paid: boolean; txid: string | null; amount: number | null }> {
    try {
        const res = await fetch(MOOLRE_STATUS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-USER': process.env.MOOLRE_API_USER!,
                'X-API-PUBKEY': process.env.MOOLRE_API_PUBKEY!
            },
            body: JSON.stringify({
                type: 1,
                idtype: '1',
                id: externalref,
                accountnumber: process.env.MOOLRE_ACCOUNT_NUMBER
            })
        });
        const json = await res.json();
        const d = json?.data || {};
        const paid = (json.status === 1 || json.status === '1') && (d.txstatus === 1 || d.txstatus === '1');
        return {
            paid,
            txid: d.transactionid ? String(d.transactionid) : null,
            amount: d.amount ? parseFloat(d.amount) : null
        };
    } catch {
        return { paid: false, txid: null, amount: null };
    }
}

async function reconcile(lookbackDays: number) {
    if (!process.env.MOOLRE_API_USER || !process.env.MOOLRE_API_PUBKEY || !process.env.MOOLRE_ACCOUNT_NUMBER) {
        return { error: 'Moolre not configured' };
    }

    const since = new Date(Date.now() - lookbackDays * 24 * 60 * 60 * 1000).toISOString();

    const { data: orders, error } = await supabase
        .from('orders')
        .select('order_number, total, payment_status, metadata')
        .eq('payment_status', 'pending')
        .gte('created_at', since);

    if (error) return { error: error.message };

    const candidates = (orders || []).filter(o => (o.metadata as any)?.moolre_externalref);
    const recovered: any[] = [];
    const stillPending: string[] = [];

    for (const order of candidates) {
        const ref = (order.metadata as any).moolre_externalref as string;
        const status = await checkMoolreStatus(ref);

        // Only recover when Moolre confirms success and the amount matches.
        if (status.paid && status.amount !== null && Math.abs(status.amount - Number(order.total)) <= 0.01) {
            const { data: orderJson, error: rpcError } = await supabase.rpc('mark_order_paid', {
                order_ref: order.order_number,
                moolre_ref: status.txid || 'reconcile'
            });

            if (rpcError || !orderJson) {
                stillPending.push(order.order_number);
                continue;
            }

            // Fire-and-forget notifications + customer stats
            try {
                if (orderJson.email) {
                    await supabase.rpc('update_customer_stats', {
                        p_customer_email: orderJson.email,
                        p_order_total: orderJson.total
                    });
                }
            } catch { /* non-fatal */ }

            try {
                await sendOrderConfirmation(orderJson);
            } catch { /* non-fatal */ }

            recovered.push({ order_number: order.order_number, total: order.total, moolre_txid: status.txid });
        } else {
            stillPending.push(order.order_number);
        }
    }

    return {
        checked: candidates.length,
        recovered_count: recovered.length,
        recovered,
        still_pending_count: stillPending.length
    };
}

function authorized(req: Request): boolean {
    // Accept either the Moolre callback secret or a dedicated Vercel CRON_SECRET.
    // Vercel Cron automatically sends `Authorization: Bearer <CRON_SECRET>`.
    const secrets = [process.env.CRON_SECRET, process.env.MOOLRE_CALLBACK_SECRET].filter(Boolean) as string[];
    if (secrets.length === 0) return true; // no secret configured -> allow (best-effort)
    const url = new URL(req.url);
    const provided = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
        || req.headers.get('x-cron-secret')
        || url.searchParams.get('secret');
    return !!provided && secrets.includes(provided);
}

export async function GET(req: Request) {
    if (!authorized(req)) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const url = new URL(req.url);
    const lookbackDays = Math.min(parseInt(url.searchParams.get('days') || '7', 10) || 7, 90);
    const result = await reconcile(lookbackDays);
    return NextResponse.json({ success: !('error' in result), ...result });
}

export async function POST(req: Request) {
    return GET(req);
}
