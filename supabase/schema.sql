-- Starter schema. Review and customize RLS before using real user data.
create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  description text not null default '',
  created_at timestamptz not null default now()
);

-- This starter uses the server-side service-role key from FastAPI.
-- The service role bypasses RLS. Never expose it in browser code.
-- Enable RLS now so future anon/authenticated access must be explicitly policy-controlled.
alter table public.projects enable row level security;

-- No anon/authenticated policies are created intentionally.
-- Add policies only after defining your authentication and data-ownership model.
