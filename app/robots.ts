import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kinagventures.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/shop', '/categories', '/product/', '/about', '/contact'],
        disallow: [
          '/admin/',
          '/account/',
          '/checkout/',
          '/api/',
          '/auth/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
