
CREATE TABLE public.nomination_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES public.cities(id) ON DELETE CASCADE NOT NULL,
  token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  phone text,
  status text NOT NULL DEFAULT 'pendente',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  filled_at timestamp with time zone
);

ALTER TABLE public.nomination_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read nomination_links"
  ON public.nomination_links FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert nomination_links"
  ON public.nomination_links FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update nomination_links"
  ON public.nomination_links FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
