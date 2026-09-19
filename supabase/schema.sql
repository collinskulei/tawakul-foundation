-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query).
-- Safe to re-run: guarded with "if not exists" / "or replace" where possible.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  cover_image_url text,
  goal_amount numeric(12, 2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects (id) on delete set null,
  donor_name text,
  phone text not null,
  amount numeric(12, 2) not null,
  status text not null default 'pending'
    check (status in ('pending', 'success', 'failed', 'cancelled')),
  mpesa_receipt_number text,
  checkout_request_id text unique,
  merchant_request_id text,
  result_desc text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Public-safe aggregate: totals per project, no donor PII (name/phone).
create or replace view public.project_progress as
select
  p.id as project_id,
  p.title,
  p.slug,
  p.description,
  p.cover_image_url,
  p.goal_amount,
  p.is_active,
  p.created_at,
  coalesce(sum(d.amount) filter (where d.status = 'success'), 0) as raised_amount,
  count(d.id) filter (where d.status = 'success') as donor_count
from public.projects p
left join public.donations d on d.project_id = p.id
group by p.id;

alter table public.projects enable row level security;
alter table public.donations enable row level security;

drop policy if exists "Public can view projects" on public.projects;
create policy "Public can view projects"
  on public.projects for select
  using (true);

drop policy if exists "Authenticated users manage projects" on public.projects;
create policy "Authenticated users manage projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users view donations" on public.donations;
create policy "Authenticated users view donations"
  on public.donations for select
  using (auth.role() = 'authenticated');

-- No insert/update/delete policies on donations: only the service-role key
-- (used server-side by the M-Pesa API routes) can write, bypassing RLS.

grant usage on schema public to anon, authenticated;
grant select on public.projects to anon, authenticated;
grant select on public.project_progress to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
grant select on public.donations to authenticated;
