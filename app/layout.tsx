import type { Metadata } from "next";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kinagventures.com';
const siteName = 'KINAG VENTURES';
const siteTagline = 'Quality Imports & Available Goods';
const siteDescription =
  'KINAG VENTURES — quality imports and available goods. Shop with confidence. Contact: 0553610613 · Kasoa Fijai, on the Nyanyano Road.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'KINAG Ventures',
    'online store',
    'e-commerce',
    'shop online',
    'quality imports',
    'Ghana',
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: 'Shopping',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/logo-kinag.png', type: 'image/png' }],
    apple: '/logo-kinag.png',
    shortcut: '/logo-kinag.png',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  openGraph: {
    type: 'website',
    locale: 'en',
    url: siteUrl,
    title: `${siteName} | ${siteTagline}`,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: '/logo-kinag.png',
        width: 1200,
        height: 630,
        alt: `${siteName}`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | ${siteTagline}`,
    description: siteDescription,
    images: [{ url: '/logo-kinag.png', alt: siteName }],
    creator: '',
    site: '',
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    'theme-color': '#7C3AED',
    'msapplication-TileColor': '#7C3AED',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': siteName,
    'format-detection': 'telephone=no',
  },
};

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
// Google reCAPTCHA v3 Site Key
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout: fonts apply to all pages */}
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": siteUrl,
          "logo": { "@type": "ImageObject", "url": `${siteUrl}/logo-kinag.png`, "width": 1024, "height": 1024 },
          "image": `${siteUrl}/logo-kinag.png`,
          "description": siteDescription
        })}} />

        {/* WebSite Schema with SearchAction */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteName,
          "url": siteUrl,
          "description": siteDescription,
          "inLanguage": "en",
          "potentialAction": {
            "@type": "SearchAction",
            "target": { "@type": "EntryPoint", "urlTemplate": `${siteUrl}/shop?search={search_term_string}` },
            "query-input": "required name=search_term_string"
          }
        })}} />

        {/* FAQ Schema for rich results */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How can I contact the store?", "acceptedAnswer": { "@type": "Answer", "text": "Reach us via the contact page or email. Configure contact details in Admin → Settings." } },
            { "@type": "Question", "name": "What payment methods do you accept?", "acceptedAnswer": { "@type": "Answer", "text": "See checkout for available payment options." } }
          ]
        })}} />

        {/* LocalBusiness / Store schema for Google My Business */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify((() => {
          const phone = process.env.NEXT_PUBLIC_STORE_PHONE || '+233 55 361 0613';
          const email = process.env.NEXT_PUBLIC_STORE_EMAIL;
          const address = process.env.NEXT_PUBLIC_STORE_ADDRESS ? {
            '@type': 'PostalAddress',
            streetAddress: process.env.NEXT_PUBLIC_STORE_ADDRESS,
            addressLocality: process.env.NEXT_PUBLIC_STORE_CITY || '',
            addressRegion: process.env.NEXT_PUBLIC_STORE_REGION || '',
            addressCountry: process.env.NEXT_PUBLIC_STORE_COUNTRY || 'GH',
          } : undefined;
          const sameAs = [
            process.env.NEXT_PUBLIC_FACEBOOK_URL,
            process.env.NEXT_PUBLIC_INSTAGRAM_URL,
            process.env.NEXT_PUBLIC_TWITTER_URL,
          ].filter(Boolean);
          return {
            '@context': 'https://schema.org',
            '@type': 'Store',
            name: siteName,
            description: siteDescription,
            url: siteUrl,
            image: `${siteUrl}/logo-kinag.png`,
            logo: `${siteUrl}/logo-kinag.png`,
            telephone: phone,
            ...(email && { email }),
            ...(address && { address }),
            ...(sameAs.length > 0 && { sameAs }),
            potentialAction: {
              '@type': 'OrderAction',
              target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/shop` },
              deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet',
            },
          };
        })())}} />
      </head>

      {/* Google Analytics */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google reCAPTCHA v3 */}
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      <body className="antialiased font-sans overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <CartProvider>
          <WishlistProvider>
            <div id="main-content">
              {children}
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
