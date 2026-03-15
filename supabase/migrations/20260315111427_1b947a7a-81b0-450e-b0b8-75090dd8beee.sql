
-- Insert nominatas for the first 205 cities ordered by name
-- 100 active, 60 warning, 45 expired
WITH ordered_cities AS (
  SELECT id, name, ROW_NUMBER() OVER (ORDER BY name) AS rn
  FROM public.cities
)
INSERT INTO public.nominatas (city_id, status, created_at, approved_at, expires_at, sede_endereco, sede_numero, sede_bairro, sede_cidade, sede_cep, sede_telefone, notes)
SELECT
  id,
  CASE
    WHEN rn <= 100 THEN 'active'
    WHEN rn <= 160 THEN 'warning'
    ELSE 'expired'
  END,
  now() - (rn || ' days')::interval,
  now() - (rn || ' days')::interval + interval '15 days',
  CASE
    WHEN rn <= 100 THEN now() + interval '1 year'
    WHEN rn <= 160 THEN now() + interval '30 days'
    ELSE now() - interval '30 days'
  END,
  'Rua Principal',
  (100 + rn)::text,
  'Centro',
  name,
  '00000-000',
  '(11) 0000-0000',
  CASE
    WHEN rn <= 100 THEN 'Nominata ativa e regular.'
    WHEN rn <= 160 THEN 'Vencimento próximo - contatar presidente.'
    ELSE 'Nominata vencida. Aguardando renovação.'
  END
FROM ordered_cities
WHERE rn <= 205;
