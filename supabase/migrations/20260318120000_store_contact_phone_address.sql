-- Canonical store contact (footer, contact page, WhatsApp, maps)
INSERT INTO public.store_settings (key, value, updated_at)
VALUES
  ('contact_phone', to_jsonb('0553610613'::text), now()),
  ('contact_address', to_jsonb('Kasoa Fijai, on the Nyanyano Road'::text), now()),
  ('contact_map_link', to_jsonb('https://www.google.com/maps/search/?api=1&query=Kasoa+Fijai+Nyanyano+Road+Ghana'::text), now())
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();
