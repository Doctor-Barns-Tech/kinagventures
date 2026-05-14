import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Explore all categories. Shop quality products.',
  keywords: [
    'categories',
    'shop by category',
    'products',
  ].join(', '),
  openGraph: {
    title: 'Categories | KINAG VENTURES',
    description: 'All categories.',
    images: [{ url: '/logo-kinag.png', width: 1200, height: 630, alt: 'Categories — KINAG VENTURES', type: 'image/png' }],
    url: '/categories',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Categories | KINAG VENTURES',
    description: 'All categories.',
    images: ['/logo-kinag.png'],
  },
  alternates: { canonical: '/categories' },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
