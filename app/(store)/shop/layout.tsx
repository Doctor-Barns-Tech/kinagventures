import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our collection. Quality products, fast delivery.',
  keywords: [
    'shop',
    'online store',
    'e-commerce',
  ].join(', '),
  openGraph: {
    title: 'Shop | KINAG VENTURES',
    description: 'Browse our collection. Quality products, fast delivery.',
    images: [{ url: '/logo-kinag.png', width: 1200, height: 630, alt: 'Shop — KINAG VENTURES', type: 'image/png' }],
    url: '/shop',
    type: 'website',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop | KINAG VENTURES',
    description: 'Browse products at KINAG VENTURES.',
    images: [{ url: '/logo-kinag.png', alt: 'Shop — KINAG VENTURES' }],
  },
  alternates: { canonical: '/shop' },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
