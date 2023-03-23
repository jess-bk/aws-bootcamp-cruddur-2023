-- this file was manually created
INSERT INTO public.users (display_name, handle, email, cognito_user_id)
VALUES
  ('Jess BK', 'jess-bk' , 'jessbk@hotmail.com', 'MOCK'),
  ('Andrew Bayko', 'bayko' , 'test@test.com', 'MOCK'),
  ('Londo Mollari','lmollari@centari.com' ,'londo' ,'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'jess-bk' LIMIT 1),
    'This was imported as seed data!',
    current_timestamp + interval '10 day'
  )