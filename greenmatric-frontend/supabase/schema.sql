-- Greenmatrix — Supabase schema + RLS. Run in the SQL editor of your project.
-- Roles live in auth JWT app_metadata.role ('admin' | 'rep'), set by the users API.

-- ---------- role helpers ----------
create or replace function public.role() returns text
  language sql stable as $$ select auth.jwt() -> 'app_metadata' ->> 'role' $$;
create or replace function public.is_admin() returns boolean
  language sql stable as $$ select coalesce(public.role() = 'admin', false) $$;
create or replace function public.is_staff() returns boolean
  language sql stable as $$ select coalesce(public.role() in ('admin','rep'), false) $$;

-- ---------- profiles (mirrors auth.users) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  email text,
  role text not null default 'rep' check (role in ('admin','rep')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles self or admin read" on public.profiles for select
  using (public.is_admin() or id = auth.uid());
create policy "profiles admin write" on public.profiles for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------- leads ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source text not null default 'web_form',
  source_page text not null default '/',
  name text not null,
  phone text not null,
  email text, company text, city text, state text,
  product_interest text, capacity text, message text,
  status text not null default 'new'
    check (status in ('new','contacted','qualified','quoted','negotiation','won','lost')),
  contacted boolean default false,
  contacted_at timestamptz,
  assigned_to text,
  feedback text,
  follow_up_date date,
  closed_by text,
  won_lost_reason text,
  deal_value numeric
);
alter table public.leads enable row level security;
-- No anon insert policy → client cannot create; the createLead route uses the service key.
create policy "leads staff read"   on public.leads for select using (public.is_staff());
create policy "leads staff update" on public.leads for update using (public.is_staff());
create policy "leads admin delete" on public.leads for delete using (public.is_admin());
create index if not exists leads_status_created_idx on public.leads (status, created_at desc);

-- ---------- lead_notes (append-only) ----------
create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads on delete cascade,
  text text not null,
  author_uid text,
  author_name text,
  created_at timestamptz not null default now()
);
alter table public.lead_notes enable row level security;
create policy "notes staff read"   on public.lead_notes for select using (public.is_staff());
create policy "notes staff insert" on public.lead_notes for insert with check (public.is_staff());
-- no update/delete policies → immutable

-- ---------- articles ----------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Untitled article',
  slug text not null unique,
  cover_image text,
  body text not null default '',
  excerpt text,
  seo_title text, seo_meta text,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  author_uid text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.articles enable row level security;
create policy "articles public read published" on public.articles for select
  using (status = 'published' or public.is_admin());
create policy "articles admin write" on public.articles for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------- storage buckets ----------
insert into storage.buckets (id, name, public) values ('products','products',true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('blog','blog',true)
  on conflict (id) do nothing;
-- public read; admin write
create policy "public read products" on storage.objects for select using (bucket_id = 'products');
create policy "admin write products" on storage.objects for all
  using (bucket_id = 'products' and public.is_admin()) with check (bucket_id = 'products' and public.is_admin());
create policy "public read blog" on storage.objects for select using (bucket_id = 'blog');
create policy "admin write blog" on storage.objects for all
  using (bucket_id = 'blog' and public.is_admin()) with check (bucket_id = 'blog' and public.is_admin());
