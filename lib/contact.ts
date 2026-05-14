/** Default store phone when CMS / env not set */
export const DEFAULT_CONTACT_PHONE = '0553610613';

/** Default store location when CMS not set */
export const DEFAULT_CONTACT_ADDRESS =
  'Kasoa Fijai, on the Nyanyano Road';

/** Google Maps search for the store */
export const DEFAULT_CONTACT_MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=Kasoa+Fijai+Nyanyano+Road+Ghana';

/** Apply default contact values only when a field is missing. */
export function applyCanonicalContact(s: Record<string, string>): void {
  if (!s['contact_phone']?.trim()) s['contact_phone'] = DEFAULT_CONTACT_PHONE;
  if (!s['contact_address']?.trim()) s['contact_address'] = DEFAULT_CONTACT_ADDRESS;
  if (!s['contact_map_link']?.trim()) s['contact_map_link'] = DEFAULT_CONTACT_MAP_LINK;
}

/**
 * Format phone for WhatsApp wa.me link (digits only, with country code).
 */
export function toWhatsAppNumber(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('233')) return digits;
  if (digits.startsWith('0') && digits.length >= 10) return '233' + digits.slice(1);
  if (digits.length >= 9) return '233' + digits;
  return digits;
}
