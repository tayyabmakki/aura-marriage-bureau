-- Aura Marriage Bureau: Database Schema (Phase 2)
-- Supabase Postgres SQL with Row Level Security (RLS)

-- 1. Sequence for AMB-### Reference ID
CREATE SEQUENCE IF NOT EXISTS profile_ref_seq START 1;

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref_no TEXT UNIQUE NOT NULL DEFAULT ('AMB-' || LPAD(nextval('profile_ref_seq')::TEXT, 3, '0')),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'matched', 'archived')),
    consent BOOLEAN NOT NULL DEFAULT true,
    
    -- Indexed Search Columns
    name TEXT,
    gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female')),
    age INTEGER,
    city TEXT,
    caste TEXT,
    sect TEXT,
    marital TEXT,

    -- Complete Raw Form Payload
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Internal Bureau Notes
    notes TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Indexes for fast administration queries
CREATE INDEX IF NOT EXISTS idx_profiles_ref_no ON public.profiles(ref_no);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_gender ON public.profiles(gender);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_caste ON public.profiles(caste);
CREATE INDEX IF NOT EXISTS idx_profiles_sect ON public.profiles(sect);
CREATE INDEX IF NOT EXISTS idx_profiles_marital ON public.profiles(marital);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Strict RLS Policies:
-- NO PUBLIC READ
CREATE POLICY "Deny public read access" 
ON public.profiles 
FOR SELECT 
TO public 
USING (false);

-- NO PUBLIC INSERT (Inserts permitted ONLY via service-role key in secure server route)
CREATE POLICY "Deny public direct insert" 
ON public.profiles 
FOR INSERT 
TO public 
WITH CHECK (false);

-- Authenticated Admin Email Allowlist Access
-- TODO: Configure admin allowlist in auth.users or custom JWT claim
CREATE POLICY "Allow authenticated staff with allowlisted emails"
ON public.profiles
FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'auramarriagebureau.pk@gmail.com'
    -- Add additional authorized staff emails here
  )
);
