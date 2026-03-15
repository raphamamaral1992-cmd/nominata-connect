
-- Cities table
CREATE TABLE public.cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  state text NOT NULL DEFAULT 'SP',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read cities"
  ON public.cities FOR SELECT TO authenticated USING (true);

-- Nominatas table
CREATE TABLE public.nominatas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES public.cities(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'warning', 'expired')),
  created_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz,
  expires_at timestamptz,
  sede_endereco text,
  sede_numero text,
  sede_bairro text,
  sede_cidade text,
  sede_cep text,
  sede_telefone text,
  notes text,
  UNIQUE(city_id)
);

ALTER TABLE public.nominatas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read nominatas"
  ON public.nominatas FOR SELECT TO authenticated USING (true);
