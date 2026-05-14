'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

interface ShippingFee {
  id: string;
  product_name: string;
  price: number | null;
  shipping_fee: number;
  image_url: string | null;
  notes: string | null;
}

export default function ShippingFeesPage() {
  const { addToCart, setIsCartOpen } = useCart();
  const [entries, setEntries] = useState<ShippingFee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFees = async () => {
      const { data } = await supabase
        .from('shipping_fees')
        .select('id, product_name, price, shipping_fee, image_url, notes')
        .order('product_name', { ascending: true });
      if (data) setEntries(data);
      setLoading(false);
    };
    fetchFees();
  }, []);

  const handleAddToCart = (entry: ShippingFee) => {
    if (entry.price == null) return;
    addToCart({
      id: entry.id,
      name: entry.product_name,
      price: entry.price,
      image: entry.image_url || '/placeholder.png',
      quantity: 1,
      variant: entry.shipping_fee > 0
        ? `Shipping: GH₵${Number(entry.shipping_fee).toFixed(2)}`
        : 'Free Shipping',
      slug: `shipping-fee-${entry.id}`,
      maxStock: 9999,
      moq: 1,
    });
    setAddedId(entry.id);
    setIsCartOpen(true);
    setTimeout(() => setAddedId(null), 2000);
  };

  const filtered = entries.filter((e) =>
    e.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasAnyPrice = entries.some((e) => e.price != null);
  const hasAnyImage = entries.some((e) => e.image_url);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-2xl mb-4">
          <i className="ri-truck-line text-2xl text-gray-700" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Shipping Fees</h1>
        <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
          Browse our products and their delivery costs. Add directly to your cart and checkout.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-sm mx-auto">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-4 py-2.5 w-full border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {loading ? (
        /* Skeleton */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-2xl mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <i className="ri-truck-line text-5xl text-gray-200 block mb-3" />
          <p className="text-gray-500 font-medium">
            {searchQuery ? 'No products match your search.' : 'No products have been added yet.'}
          </p>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="mt-3 text-sm text-gray-400 underline hover:text-gray-600">
              Clear search
            </button>
          )}
        </div>
      ) : hasAnyImage || hasAnyPrice ? (
        /* Card grid — when products have images or prices */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((entry) => {
            const canOrder = entry.price != null;
            const isAdded = addedId === entry.id;

            return (
              <div key={entry.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
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
                  {/* Shipping badge */}
                  <div className="absolute bottom-2 left-2">
                    {Number(entry.shipping_fee) === 0 ? (
                      <span className="px-2 py-0.5 bg-gray-900 text-white text-[10px] font-bold rounded-full">
                        Free Shipping
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-white/90 text-gray-800 text-[10px] font-bold rounded-full shadow-sm">
                        +GH₵{Number(entry.shipping_fee).toFixed(2)} shipping
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
                    {entry.product_name}
                  </h3>

                  {entry.notes && (
                    <p className="text-xs text-gray-400 line-clamp-1">{entry.notes}</p>
                  )}

                  <div className="mt-auto pt-1">
                    {entry.price != null ? (
                      <p className="text-base font-bold text-gray-900 mb-2">
                        GH₵{Number(entry.price).toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 mb-2">Price on request</p>
                    )}

                    <button
                      onClick={() => canOrder && handleAddToCart(entry)}
                      disabled={!canOrder}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        !canOrder
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isAdded
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
                      }`}
                    >
                      {!canOrder ? (
                        'Contact for Price'
                      ) : isAdded ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <i className="ri-check-line" /> Added to Cart
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1.5">
                          <i className="ri-shopping-cart-line" /> Add to Cart
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback plain table — when no images or prices set yet */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Shipping Fee</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:block">Notes</span>
          </div>
          <ul className="divide-y divide-gray-100">
            {filtered.map((entry) => (
              <li key={entry.id} className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 text-sm">{entry.product_name}</span>
                <span className="text-sm">
                  {Number(entry.shipping_fee) === 0 ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      <i className="ri-gift-line text-xs" /> Free
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-900">GH₵{Number(entry.shipping_fee).toFixed(2)}</span>
                  )}
                </span>
                <span className="text-xs text-gray-500 hidden sm:block self-center">{entry.notes || '—'}</span>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 text-right">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Info banner */}
      <div className="mt-10 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
        <i className="ri-information-line text-amber-500 text-lg mt-0.5 shrink-0" />
        <p className="text-sm text-amber-700">
          Shipping fees are estimates and may vary based on your delivery location.
          Contact us for exact rates before placing your order.
        </p>
      </div>
    </main>
  );
}
