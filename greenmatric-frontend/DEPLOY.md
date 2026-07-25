# Deploy — Greenmatrix (Supabase + Netlify)

Backend: **Supabase** (Postgres + Auth + Storage, free tier, no card). Hosting: **Netlify**,
two sites (client + admin). Supabase is reached from anywhere; Netlify just runs the Next apps.

## 1. Supabase project (once)
- Create a project at supabase.com (free, no card). Region: Mumbai / ap-south-1.
- **SQL Editor** → paste `supabase/schema.sql` → Run (tables, RLS, role helpers, storage buckets).
- **Project Settings → API** → copy: Project URL, `anon` key, `service_role` key (secret).

## 2. Seed / initialise (creates admin user, sample data, uploads product images)
Put the 3 values in `admin/.env.local` + `client/.env.local`, then:
```bash
cd greenmatric-frontend
./seed.sh      # 2 users, 6 leads, 2 articles, 12 product photos → Storage
```
Demo logins: `admin@greenmatrix.test` / `rep@greenmatrix.test` — password `password123`.
> Change these in `admin/scripts/seed.mjs` before a real launch.

## 3. Netlify — two sites
For each app: New site → this repo → **Base directory**:
- Client: `greenmatric-frontend/client`
- Admin:  `greenmatric-frontend/admin`

Build/publish come from each `netlify.toml` (`@netlify/plugin-nextjs` runs automatically).

### Env vars (Netlify → Site settings → Environment)
**Both sites:**
```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key>   # secret; server-only (no NEXT_PUBLIC_)
```
**Client site also:**
```
NEXT_PUBLIC_SITE_URL=https://<client-domain>
NEXT_PUBLIC_GA_ID=G-XXXX        # optional
```
**Admin site also:**
```
NEXT_PUBLIC_CLIENT_URL=https://<client-domain>
```
> `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS — never expose it to the browser. It's used only by
> the `/api/lead` and `/api/users` server routes. Admin site is `noindex` (robots + header).

### Storage CORS (for blog image uploads from the admin origin)
Supabase Storage allows cross-origin GET by default. For uploads from the admin site, add the
admin origin under **Storage → Policies / CORS** if needed (localhost:3001 works out of the box).

## 4. Verify
- Client: product pages show machine photos; submit a quote → appears in admin CRM;
  `/sitemap.xml`, `/robots.txt` resolve.
- Admin: log in, work a lead (status/notes/follow-up), publish an article → live at
  client `/resources/<slug>`; rep login is blocked from Blog/Analytics/Users.

## Local dev + tests
```bash
cd greenmatric-frontend
# put the 3 Supabase values in client/.env.local and admin/.env.local
./seed.sh
npm --prefix client run dev -- -p 3000
npm --prefix admin  run dev -- -p 3001
./test.sh      # unit tests + live e2e (RLS, auth, routes) against the project
```
