import Link from 'next/link';

/**
 * Shared "Shop by Category" card used on the home page and the categories page.
 * Image background with a circular icon badge, an uppercase eyebrow tag,
 * a bold title and a "Shop now" affordance.
 */

const CARD_LABELS = ['Shop Now', 'Essentials', 'Fresh Picks', 'Just Landed', 'Top Picks', 'New In'];
const CARD_ICONS = [
    'ri-global-line',
    'ri-shopping-bag-3-line',
    'ri-home-4-line',
    'ri-sparkling-2-line',
    'ri-leaf-line',
    'ri-price-tag-3-line',
];

export interface CategoryCardProps {
    name: string;
    slug: string;
    image?: string | null;
    index?: number;
    /** Optional explicit overrides */
    label?: string;
    icon?: string;
    className?: string;
}

export default function CategoryCard({
    name,
    slug,
    image,
    index = 0,
    label,
    icon,
    className = '',
}: CategoryCardProps) {
    const resolvedImage =
        image || `https://via.placeholder.com/800x600?text=${encodeURIComponent(name)}`;
    const resolvedLabel = label || CARD_LABELS[index % CARD_LABELS.length];
    const resolvedIcon = icon || CARD_ICONS[index % CARD_ICONS.length];

    return (
        <Link
            href={`/shop?category=${slug}`}
            className={`group relative block overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] ${className}`}
        >
            {/* Image */}
            <img
                src={resolvedImage}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Legibility gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />

            {/* Circular icon badge */}
            <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-sm">
                <i className={`${resolvedIcon} text-base`} />
            </div>

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="block text-[10px] font-bold tracking-[0.18em] uppercase text-white/75 mb-1.5">
                    {resolvedLabel}
                </span>
                <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl leading-tight drop-shadow-sm">
                    {name}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/90 transition-all duration-300 group-hover:gap-2">
                    Shop now <i className="ri-arrow-right-line" />
                </span>
            </div>
        </Link>
    );
}
