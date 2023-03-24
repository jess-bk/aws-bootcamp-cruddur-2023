-- this file was manually created
INSERT INTO public.users (display_name, email, handle, cognito_user_id)
VALUES
  ('Jess BK','victory187@hotmail.com' , 'jess-bk' ,'MOCK'),
  ('Andrew Bayko','saimarshad143@hotmail.com' , 'bayko' ,'MOCK'),
  ('Londo Mollari','lmollari@centari.com' ,'londo' ,'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'jess-bk' LIMIT 1),
    'This was imported as seed data!',
    created_at = (now + timedelta(hours=-3) + timedelta(minutes=minute)).isoformat()
  )