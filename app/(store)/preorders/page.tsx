'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

interface Preorder {
  id: string;
  product_name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  status: 'active' | 'coming_soon' | 'closed';
}

export default function PreordersPage() {
  const { addToCart, setIsCartOpen } = useCart();
  const [entries, setEntries] = useState<Preorder[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('preorders')
        .select('id, product_name, description, price, image_url, status')
        .in('status', ['active', 'coming_soon'])
        .order('created_at', { ascending: false });
      if (data) setEntries(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const handlePreorder = (entry: Preorder) => {
    addToCart({
      id: entry.id,
      name: entry.product_name,
      price: entry.price,
      image: entry.image_url || '/placeholder.png',
      quantity: 1,
      variant: 'Available in Ghana',
      slug: `available-${entry.id}`,
      maxStock: 9999,
      moq: 1,
    });
    setAddedId(entry.id);
    setIsCartOpen(true);
    setTimeout(() => setAddedId(null), 2000);
  };

  const active = entries.filter((e) => e.status === 'active');
  const comingSoon = entries.filter((e) => e.status === 'coming_soon');

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold tracking-widest uppercase rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse" />
          In Stock & Ready to Ship
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-3">Available Goods in Ghana</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Browse goods currently available in Ghana. Order today and we&apos;ll
          get your items to you fast.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-2xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-24">
          <i className="ri-shopping-bag-line text-5xl text-gray-200 block mb-4" />
          <p className="text-gray-500 font-medium text-lg">No goods available right now</p>
          <p className="text-sm text-gray-400 mt-1 mb-6">Check back soon for new arrivals</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Browse the Shop <i className="ri-arrow-right-line" />
          </Link>
        </div>
      ) : (
        <div className="space-y-14">
          {/* Active Preorders */}
          {active.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-900">Available Now</h2>
                <span className="px-2.5 py-0.5 bg-gray-900 text-white text-xs font-bold rounded-full">
                  {active.length}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {active.map((entry) => (
                  <PreorderCard
                    key={entry.id}
                    entry={entry}
                    onPreorder={handlePreorder}
                    justAdded={addedId === entry.id}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Coming Soon */}
          {comingSoon.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-900">Coming Soon</h2>
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                  {comingSoon.length}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {comingSoon.map((entry) => (
                  <PreorderCard
                    key={entry.id}
                    entry={entry}
                    onPreorder={handlePreorder}
                    justAdded={addedId === entry.id}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-14 grid sm:grid-cols-3 gap-4">
        {[
          { icon: 'ri-lock-2-line', title: 'Secure Payment', desc: 'Safe checkout with trusted payment options' },
          { icon: 'ri-truck-line', title: 'Fast Delivery', desc: 'Available in Ghana — ships quickly' },
          { icon: 'ri-customer-service-2-line', title: 'Full Support', desc: 'Questions? Contact us anytime' },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3 bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
            <i className={`${item.icon} text-xl text-gray-500 mt-0.5 shrink-0`} />
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function PreorderCard({
  entry,
  onPreorder,
  justAdded,
}: {
  entry: Preorder;
  onPreorder: (e: Preorder) => void;
  justAdded: boolean;
}) {
  const isComingSoon = entry.status === 'coming_soon';

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        {entry.image_url ? (
          <img
            src={entry.image_url}
            alt={entry.product_name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className="ri-image-line text-4xl text-gray-300" />
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {isComingSoon ? (
            <span className="px-2.5 py-1 bg-amber-400 text-amber-900 text-[10px] font-bold rounded-full uppercase tracking-wide">
              Coming Soon
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
          {entry.product_name}
        </h3>

        {entry.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{entry.description}</p>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">
            GH₵{Number(entry.price).toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => !isComingSoon && onPreorder(entry)}
          disabled={isComingSoon}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isComingSoon
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : justAdded
              ? 'bg-gray-800 text-white'
              : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
          }`}
        >
          {isComingSoon ? (
            'Notify Me'
          ) : justAdded ? (
            <span className="flex items-center justify-center gap-1.5">
              <i className="ri-check-line" /> Added to Cart
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              <i className="ri-shopping-bag-line" /> Add to Cart
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
