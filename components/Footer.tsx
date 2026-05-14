'use client';

import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { DEFAULT_CONTACT_ADDRESS, DEFAULT_CONTACT_PHONE } from '@/lib/contact';

export default function Footer() {
  const { getSetting } = useCMS();

  const siteName = getSetting('site_name') || 'KINAG VENTURES';
  const footerLogo = '/logo-kinag.png';
  const rawFooterLogoHeight = Number.parseInt(getSetting('footer_logo_height') || '36', 10);
  const footerLogoHeight = Number.isFinite(rawFooterLogoHeight) ? Math.min(56, Math.max(24, rawFooterLogoHeight)) : 36;
  const contactEmail = getSetting('contact_email') || '';
  const contactPhone = getSetting('contact_phone') || DEFAULT_CONTACT_PHONE;
  const contactAddress = getSetting('contact_address') || DEFAULT_CONTACT_ADDRESS;
  const links = [
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ];

  const footerBg = getSetting('footer_bg') || '#5B21B6';
  const footerText = getSetting('footer_text') || '#FFFFFF';

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: footerBg, color: footerText }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <img
                src={footerLogo}
                alt={siteName}
                className="w-auto object-contain"
                style={{ height: `${footerLogoHeight}px` }}
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Quality imports & available goods.
            </p>
          </div>

          {/* Links Column */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-3">
              {links.slice(0, 4).map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {links.slice(4).map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-white/80">
              {contactEmail && (
                <li className="flex items-start gap-3">
                  <i className="ri-mail-line mt-0.5"></i>
                  <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                    {contactEmail}
                  </a>
                </li>
              )}
              {contactPhone && (
                <li className="flex items-start gap-3">
                  <i className="ri-phone-line mt-0.5"></i>
                  <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                    {contactPhone}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <i className="ri-map-pin-line mt-0.5"></i>
                <span>{contactAddress}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
