-- Create the newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert their emails (for the signup form)
CREATE POLICY "Enable insert for anonymous users" 
ON public.newsletter_subscribers 
FOR INSERT 
TO public
WITH CHECK (true);

-- Only authenticated users (admins) can view the list
CREATE POLICY "Enable read access for authenticated users only"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (true);

-- Explicitly grant permissions to anon and authenticated roles
GRANT INSERT ON public.newsletter_subscribers TO anon;
GRANT INSERT ON public.newsletter_subscribers TO authenticated;

-- Force PostgREST to recognize the new table immediately
NOTIFY pgrst, 'reload schema';
