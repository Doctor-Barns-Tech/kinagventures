import Link from 'next/link';
import { supabase } from '@/lib/supabase';

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
      <div className="relative bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden">
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
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.slug}`}
                  className="group block"
                >
                  {/* Image card */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-3.5">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Purple hover tint */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-500" />

                    {/* Index number */}
                    <span className="absolute top-3 right-3 text-[10px] font-mono font-bold text-white/30 tracking-[0.2em] select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Hover CTA badge */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold tracking-wide shadow-lg">
                        Shop Now <i className="ri-arrow-right-line text-xs" />
                      </span>
                    </div>
                  </div>

                  {/* Text row */}
                  <div className="flex items-center justify-between px-0.5">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-[15px] leading-snug group-hover:text-primary transition-colors duration-200 truncate pr-4">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{category.description}</p>
                      )}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 shrink-0 transition-all duration-200 group-hover:bg-primary/20">
                      <i className="ri-arrow-right-up-line text-xs" />
                    </div>
                  </div>

                  {/* Animated underline */}
                  <div className="mt-2 h-[1.5px] bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full" />
                  </div>
                </Link>
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
      <div className="bg-gradient-to-br from-primary-dark via-primary to-accent relative overflow-hidden">
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
  );
}
