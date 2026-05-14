# Google My Business & SEO Checklist

## 1. Environment variables (for schema & sitemap)

Add to `.env.local` (and your production env):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_APP_URL` | **Required.** Your live site URL (e.g. `https://kinagventures.com`). Used in sitemap, robots, Open Graph, and structured data. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Meta tag value from [Google Search Console](https://search.google.com/search-console) → Ownership verification. |
| `NEXT_PUBLIC_STORE_PHONE` | Shown in LocalBusiness schema (defaults to +233 59 311 0125 if not set). |
| `NEXT_PUBLIC_STORE_EMAIL` | Shown in LocalBusiness schema if set. |
| `NEXT_PUBLIC_STORE_ADDRESS` | Street address for Google My Business / maps. |
| `NEXT_PUBLIC_STORE_CITY` | City (e.g. Accra). |
| `NEXT_PUBLIC_STORE_REGION` | Region/state. |
| `NEXT_PUBLIC_STORE_COUNTRY` | Country code (e.g. GH). |
| `NEXT_PUBLIC_FACEBOOK_URL` | Full URL to your Facebook page (for `sameAs`). |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Full URL to your Instagram profile. |
| `NEXT_PUBLIC_TWITTER_URL` | Full URL to your Twitter/X profile. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX). |

## 2. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property: your exact site URL (`NEXT_PUBLIC_APP_URL`).
3. Verify ownership (HTML tag method): copy the `content` value and set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to it.
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`.

**If Search Console shows "X errors" on the sitemap:** Click the error count to see the exact type (e.g. "Page not found (404)", "Redirect error", "Couldn't fetch"). Fix those URLs or their targets, then request re-indexing. The sitemap only includes valid product/category slugs and safe dates to reduce invalid-URL errors.

## 3. Google My Business (Google Business Profile)

1. Go to [Google Business Profile](https://business.google.com) and create or claim your business.
2. Use the **exact** same business name, address, and phone as on your site (and in the env vars above).
3. Add your website URL (`NEXT_PUBLIC_APP_URL`).
4. Add business category (e.g. Retail store, Online store).
5. Optional: add opening hours, photos, and a short description matching your site.

The site already outputs **LocalBusiness/Store** structured data (name, description, URL, logo, telephone, address, social links) so Google can use it for rich results and knowledge panel.

## 4. SEO already in place

- **Metadata:** Default title, description, and keywords (including “KINAG Ventures”, “Ghana”, “quality imports”).
- **Structured data:** Organization, WebSite (with search), FAQPage, and Store (LocalBusiness) JSON-LD.
- **Open Graph & Twitter cards** for sharing.
- **Sitemap:** `/sitemap.xml` (generated from DB; includes home, shop, categories, products).
- **Robots:** `/robots.txt` generated from `NEXT_PUBLIC_APP_URL`; allows shop/categories/product/about/contact; disallows admin, account, checkout, api, auth.
- **Canonical URL** and **Google verification** meta tag (when `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set).

## 5. After going live

1. Set `NEXT_PUBLIC_APP_URL` to your real domain.
2. Verify in Search Console and submit the sitemap.
3. Optionally add GA4 and complete your Business Profile with address, hours, and photos.
