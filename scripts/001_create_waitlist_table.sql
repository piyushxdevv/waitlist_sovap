-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notified BOOLEAN DEFAULT FALSE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (join waitlist)
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (for count display)
CREATE POLICY "Anyone can view waitlist count"
  ON public.waitlist
  FOR SELECT
  USING (true);
