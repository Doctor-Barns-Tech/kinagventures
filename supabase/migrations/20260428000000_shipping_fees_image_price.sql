-- ============================================================================
-- Add image_url and price columns to shipping_fees table
-- ============================================================================

ALTER TABLE public.shipping_fees
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS price     numeric(10,2);
