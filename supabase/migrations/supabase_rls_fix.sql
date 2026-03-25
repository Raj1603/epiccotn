-- 1. Drop the old policy so we can recreate it perfectly
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.newsletter_subscribers;

-- 2. Create the exact policy specifically for 'anon' rather than 'public' role
CREATE POLICY "Enable insert for anonymous users" 
ON public.newsletter_subscribers 
FOR INSERT 
TO anon
WITH CHECK (true);

-- 3. Ensure privileges are fully granted explicitly
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.newsletter_subscribers TO anon;

-- 4. Force cache reload
NOTIFY pgrst, 'reload schema';
