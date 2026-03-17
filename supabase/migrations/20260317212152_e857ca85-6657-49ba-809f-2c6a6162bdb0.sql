INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at, 
  created_at, updated_at, role, aud, confirmation_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@teste.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated',
  ''
);