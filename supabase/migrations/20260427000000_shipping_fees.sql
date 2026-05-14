-- ============================================================================
-- Shipping fees table — admin-managed list of products and their delivery costs
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.shipping_fees (
  id          uuid        PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  product_name text       NOT NULL,
  shipping_fee numeric(10,2) NOT NULL DEFAULT 0,
  notes        text,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE public.shipping_fees ENABLE ROW LEVEL SECURITY;

-- Anyone (including guests) can view shipping fees
CREATE POLICY "Anyone can view shipping fees"
  ON public.shipping_fees FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admin/staff can insert
CREATE POLICY "Staff can insert shipping fees"
  ON public.shipping_fees FOR INSERT
  USING (public.is_admin_or_staff());

-- Only admin/staff can update
CREATE POLICY "Staff can update shipping fees"
  ON public.shipping_fees FOR UPDATE
  USING (public.is_admin_or_staff());

-- Only admin/staff can delete
CREATE POLICY "Staff can delete shipping fees"
  ON public.shipping_fees FOR DELETE
  USING (public.is_admin_or_staff());

CREATE INDEX idx_shipping_fees_created_at ON public.shipping_fees (created_at DESC);
