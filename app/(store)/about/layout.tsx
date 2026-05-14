import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about us. We specialize in bringing quality products to our customers with reliable service. Customize in Admin → Settings.',
  keywords: [
    'about',
    'our story',
    'mission',
  ].join(', '),
  openGraph: {
    title: 'About | KINAG VENTURES',
    description: 'Our story and mission. Customize in Admin → Settings.',
    images: [{ url: '/logo-kinag.png', width: 1200, height: 630, alt: 'About — KINAG VENTURES', type: 'image/png' }],
    url: '/about',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | KINAG VENTURES',
    description: 'Our story and mission.',
    images: ['/logo-kinag.png'],
  },
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
