'use client';

import { useCMS } from '@/context/CMSContext';
import { DEFAULT_CONTACT_ADDRESS, DEFAULT_CONTACT_PHONE } from '@/lib/contact';

export default function PrivacyPage() {
  const { getSetting } = useCMS();
  const siteName = getSetting('site_name') || 'KINAG VENTURES';
  const contactEmail = getSetting('contact_email') || getSetting('integration_admin_email') || 'support@kinagventures.com';
  const contactPhone = getSetting('contact_phone') || DEFAULT_CONTACT_PHONE;
  const contactAddress = getSetting('contact_address') || DEFAULT_CONTACT_ADDRESS;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-gray-50 via-white to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              This policy explains how {siteName} collects, uses, stores, and protects your personal information when you use our website and services.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: May 2026</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information needed to process your orders, provide support, and improve your shopping experience.
            </p>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-gray-900 mt-1"></i>
                <span><strong>Account & Contact Data:</strong> name, email address, phone number, and login credentials.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-gray-900 mt-1"></i>
                <span><strong>Order Data:</strong> products purchased, order totals, shipping/billing address, and delivery notes.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-gray-900 mt-1"></i>
                <span><strong>Payment Data:</strong> transaction references and payment status from our payment providers; we do not store full card details.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-gray-900 mt-1"></i>
                <span><strong>Technical Data:</strong> IP address, browser/device details, pages visited, and cookie/session identifiers.</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-line text-gray-900 mt-1"></i>
                <span>Process and deliver your orders, returns, exchanges, and refunds.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-line text-gray-900 mt-1"></i>
                <span>Send order updates, payment confirmations, and support communication.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-line text-gray-900 mt-1"></i>
                <span>Prevent fraud, abuse, and unauthorized transactions.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-line text-gray-900 mt-1"></i>
                <span>Improve website performance, product selection, and customer service.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-line text-gray-900 mt-1"></i>
                <span>Send marketing messages only when you opt in; you can unsubscribe anytime.</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information. We only share data with service providers required to run our operations, including:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-gray-900 mt-1"></i>
                <span>Payment processors and payment gateway partners.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-gray-900 mt-1"></i>
                <span>Delivery and logistics partners.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-gray-900 mt-1"></i>
                <span>Email/SMS communication providers used for order and support notifications.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-gray-900 mt-1"></i>
                <span>Authorities or regulators when legally required.</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use reasonable administrative, technical, and organizational safeguards to protect personal data, including access controls and encrypted transport where applicable.
            </p>
            <p className="text-gray-600 leading-relaxed">
              No online system is completely risk-free, but we continuously monitor and improve our security measures.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We keep personal data only for as long as needed to provide services, comply with legal obligations, and resolve disputes.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-line text-gray-900 mt-1"></i>
                <span>Order and transaction records may be retained for accounting and tax purposes.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-line text-gray-900 mt-1"></i>
                <span>Support and communication records are retained for service quality and audit history.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-line text-gray-900 mt-1"></i>
                <span>Marketing preferences are retained until you opt out.</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Subject to applicable law, you may request access to, correction of, or deletion of your personal information.
            </p>
            <p className="text-gray-600 leading-relaxed">
              To make a request, contact us at <a href={`mailto:${contactEmail}`} className="text-gray-900 font-medium hover:underline">{contactEmail}</a>. We may ask for identity verification before processing requests.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar technologies to keep your session active, remember preferences, secure checkout, and understand website usage.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You can control cookies in your browser settings, but some site features may not work correctly if essential cookies are disabled.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Policy Updates</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this policy from time to time. Any updates become effective when published on this page. Material changes will be highlighted on the website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Contact</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              For privacy questions, concerns, or requests, contact {siteName}:
            </p>

            <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <i className="ri-mail-line text-gray-900 text-xl mt-1"></i>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href={`mailto:${contactEmail}`} className="text-gray-900 hover:underline">{contactEmail}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="ri-phone-line text-gray-900 text-xl mt-1"></i>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href={`tel:${contactPhone}`} className="text-gray-900 hover:underline">{contactPhone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="ri-map-pin-line text-gray-900 text-xl mt-1"></i>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{contactAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
