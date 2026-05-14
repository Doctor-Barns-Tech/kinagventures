import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KINAG VENTURES',
    short_name: 'KINAG',
    description: 'Quality imports & available goods.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#7C3AED',
    orientation: 'portrait-primary',
    categories: ['shopping', 'lifestyle'],
    lang: 'en',
    icons: [
      { src: '/logo-kinag.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/logo-kinag.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
    screenshots: [
      { src: '/logo-kinag.png', sizes: '1200x630', type: 'image/png', label: 'KINAG VENTURES Homepage' },
    ],
    shortcuts: [
      { name: 'Shop', short_name: 'Shop', description: 'Browse products', url: '/shop', icons: [{ src: '/logo-kinag.png', sizes: '96x96', type: 'image/png' }] },
      { name: 'Contact', short_name: 'Contact', description: 'Get in touch', url: '/contact', icons: [{ src: '/logo-kinag.png', sizes: '96x96', type: 'image/png' }] },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
