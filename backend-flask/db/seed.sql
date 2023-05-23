-- this file was manually created
INSERT INTO public.users (display_name, email, handle, cognito_user_id)
VALUES
  ('Jess BK','victory187@hotmail.com' , 'jess-bk' ,'MOCK'),
  ('cloud dev','saimarshad143@hotmail.com' , 'cloud-dev' ,'MOCK'),
  ('Andrew Bayko','saimarshad143@hotmail.com' , 'bayko' ,'MOCK'),
  ('Londo Mollari','lmollari@centari.com' ,'londo' ,'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'jess-bk' LIMIT 1),
    'This was imported as seed data!',
    current_timestamp + interval '10 day'
  )