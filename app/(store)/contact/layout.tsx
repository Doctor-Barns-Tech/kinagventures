import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch. Contact us for orders, enquiries or any questions. Configure contact details in Admin → Settings.',
  keywords: [
    'contact',
    'customer service',
    'support',
  ].join(', '),
  openGraph: {
    title: 'Contact | KINAG VENTURES',
    description: 'Get in touch. Configure contact details in Admin → Settings.',
    images: [{ url: '/logo-kinag.png', width: 1200, height: 630, alt: 'Contact — KINAG VENTURES', type: 'image/png' }],
    url: '/contact',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | KINAG VENTURES',
    description: 'Get in touch.',
    images: ['/logo-kinag.png'],
  },
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
