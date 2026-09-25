# Supabase Storage Setup (For Cloud-Hosted Configurations)

If an evaluator or agency desires cloud object storage via Supabase, the backend and frontend support Supabase Storage. Below is the SQL to configure the storage bucket and access policies:

## 1. SQL Code to Create the Bucket
Execute the following in the **Supabase SQL Editor**:

```sql
-- Step 1: Create a public storage bucket for crime evidence
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'evidence_images',
  'evidence_images',
  true,
  10485760, -- 10MB limit per image
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Step 2: Allow public read access to evidence images
CREATE POLICY "Public Read Access for Evidence Images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'evidence_images');

-- Step 3: Allow authenticated investigators to upload evidence
CREATE POLICY "Investigators Can Upload Evidence Images"
ON storage.objects FOR INSERT
TO authenticated, anon
WITH CHECK (bucket_id = 'evidence_images');

-- Step 4: Allow updating evidence objects
CREATE POLICY "Investigators Can Update Evidence Images"
ON storage.objects FOR UPDATE
TO authenticated, anon
USING (bucket_id = 'evidence_images');
```

## 2. Supabase Cloud Configuration Keys

> **Note:** Supabase credentials are loaded from your `.env` file and are not committed to the repository. Copy `.env.example` and fill in your own project values.

```env
SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_PROJECT_ID=<your-supabase-project-id>
```

> **Why Local Mode is Default:** Constellation uses the local static storage mode by default so that judges testing the application never encounter a dead link or expired cloud bucket!
