-- Create the contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert contact messages
CREATE POLICY "Enable insert for anonymous users on contact" 
ON public.contact_messages 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (admins) can view the list of messages
CREATE POLICY "Enable read access for authenticated users only on contact"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);

-- Explicitly grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.contact_messages TO anon;
GRANT INSERT ON public.contact_messages TO authenticated;

-- Force PostgREST to recognize the new table immediately
NOTIFY pgrst, 'reload schema';
