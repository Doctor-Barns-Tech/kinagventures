-- ============================================================================
-- Preorders table — admin-managed list of products available for preorder
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.preorders (
  id            uuid          PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  product_name  text          NOT NULL,
  description   text,
  price         numeric(10,2) NOT NULL DEFAULT 0,
  image_url     text,
  expected_date date,
  status        text          NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'coming_soon')),
  created_at    timestamptz   DEFAULT now(),
  updated_at    timestamptz   DEFAULT now()
);

ALTER TABLE public.preorders ENABLE ROW LEVEL SECURITY;

-- Customers can view active preorder items
CREATE POLICY "Anyone can view preorders"
  ON public.preorders FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admin/staff can insert
CREATE POLICY "Staff can insert preorders"
  ON public.preorders FOR INSERT
  USING (public.is_admin_or_staff());

-- Only admin/staff can update
CREATE POLICY "Staff can update preorders"
  ON public.preorders FOR UPDATE
  USING (public.is_admin_or_staff());

-- Only admin/staff can delete
CREATE POLICY "Staff can delete preorders"
  ON public.preorders FOR DELETE
  USING (public.is_admin_or_staff());

CREATE INDEX idx_preorders_status ON public.preorders (status);
CREATE INDEX idx_preorders_created_at ON public.preorders (created_at DESC);
