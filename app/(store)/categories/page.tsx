import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import CategoryCard from '@/components/CategoryCard';

export const revalidate = 0;

export default async function CategoriesPage() {
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('id, name, slug, description, image_url, position')
    .eq('status', 'active')
    .order('position', { ascending: true });

  const categories = (categoriesData || []).map((c) => ({
    ...c,
    image: c.image_url || `https://via.placeholder.com/800x600?text=${encodeURIComponent(c.name)}`,
  }));

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <div className="relative bg-primary-dark overflow-hidden">
        {/* Background image */}
        <img
          src="/hero-warehouse.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Brand gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/85 to-accent/85" aria-hidden />
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative z-10 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.3em] uppercase text-primary-light/80 mb-4">
            Curated for You
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            All Collections
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-md mx-auto font-light leading-relaxed">
            Premium goods sourced directly from China — explore our full range of curated categories.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {[
              { icon: 'ri-global-line',       label: 'Direct Import' },
              { icon: 'ri-shield-check-line', label: 'Verified Quality' },
              { icon: 'ri-truck-line',         label: 'Fast Delivery' },
            ].map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/75 text-xs font-medium backdrop-blur-sm"
              >
                <i className={`${s.icon} text-primary-light text-sm`} />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category Grid ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

        {categories.length > 0 ? (
          <>
            {/* Section header — matches home page "Shop by Category" */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 sm:mb-12">
              <div>
                <span className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] uppercase text-primary mb-3">
                  <span className="w-7 h-px bg-primary" /> Shop by Category
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark leading-tight">
                  Find what you need
                </h2>
                <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
                  Browse our most-loved categories and stock up on quality imports.
                </p>
              </div>
              <Link
                href="/shop"
                className="self-start sm:self-auto inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-primary-dark transition-colors shrink-0"
              >
                Browse full catalogue <i className="ri-arrow-right-line" />
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                  image={category.image}
                  index={index}
                />
              ))}
            </div>

            {/* Count label */}
            <p className="mt-10 text-center text-xs text-gray-400 font-medium tracking-wide">
              {categories.length} collection{categories.length !== 1 ? 's' : ''} available
            </p>
          </>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <i className="ri-store-2-line text-2xl text-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No collections yet</h3>
            <p className="text-sm text-gray-400">Check back soon for new arrivals.</p>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-gradient-to-br from-primary-dark via-primary to-accent relative overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center relative z-10">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">
            Need Help?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Can't find what you're looking for?
          </h2>
          <p className="text-white/65 text-sm sm:text-base mb-8 leading-relaxed max-w-sm mx-auto">
            Browse all products or reach out — we source directly and can help you find exactly what you need.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-7 py-3.5 rounded-full hover:bg-gray-50 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <i className="ri-store-2-line" /> Browse All Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/20 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <i className="ri-customer-service-line" /> Contact Us
            </Link>
          </div>
        </div>
        </div>
      </div>

    </div>
  );
}
