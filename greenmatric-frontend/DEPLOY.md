# Deploy — Greenmatrix (real Firebase + Netlify)

Two Netlify sites (client + admin), one Firebase project. Firebase is provider-agnostic —
Netlify just hosts the Next apps; server routes run as Netlify Functions.

## 1. Firebase project (once)
- Create a project. Enable **Auth → Email/Password**, **Firestore**, **Storage** (Blaze plan).
- Project settings → Web app → copy the 6 `NEXT_PUBLIC_FIREBASE_*` values.
- Project settings → Service accounts → **Generate new private key** → this JSON is `FIREBASE_SERVICE_ACCOUNT`.

## 2. Deploy rules + indexes
```bash
cd greenmatric-frontend
firebase use <your-project-id>
firebase deploy --only firestore:rules,firestore:indexes,storage
# Storage CORS (edit origins in storage-cors.json first):
gsutil cors set storage-cors.json gs://<your-bucket>
```

## 3. Seed the real project (uploads product images + admin user)
```bash
export GCLOUD_PROJECT=<your-project-id>
export NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-bucket>
export FIREBASE_SERVICE_ACCOUNT="$(cat serviceAccount.json)"
node admin/scripts/seed.mjs      # creates users, sample article, uploads 12 machine photos
```
> Set the admin login you want inside `seed.mjs` (or extend it to read env) before running in prod.

## 4. Netlify — two sites
For each app, New site → pick this repo → **Base directory**:
- Client site: `greenmatric-frontend/client`
- Admin site:  `greenmatric-frontend/admin`

Build command / publish are in each `netlify.toml`. Netlify auto-runs `@netlify/plugin-nextjs`.

### Env vars (Netlify → Site settings → Environment)
**Both sites:**
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_USE_EMULATOR=false
```
**Client site also:**
```
NEXT_PUBLIC_SITE_URL=https://<client-domain>
NEXT_PUBLIC_GA_ID=G-XXXX            # optional
FIREBASE_SERVICE_ACCOUNT={...json}  # for /api/lead + SSR blog
GCLOUD_PROJECT=<project-id>
```
**Admin site also:**
```
FIREBASE_SERVICE_ACCOUNT={...json}  # users API
GCLOUD_PROJECT=<project-id>
NEXT_PUBLIC_CLIENT_URL=https://<client-domain>
```
> Do NOT set the `*_EMULATOR_HOST` vars in prod. Keep `FIREBASE_SERVICE_ACCOUNT` secret.

## 5. Verify
- Client: submit a quote → appears in admin CRM. Product pages show machine photos. `/sitemap.xml`, `/robots.txt` resolve.
- Admin: log in, work a lead, publish an article → live at client `/resources/<slug>`.
- Admin site returns `X-Robots-Tag: noindex`.

## Local dev / tests (emulator)
```bash
cd greenmatric-frontend
./emulator.sh          # terminal 1
./seed.sh              # once, after emulator is up
npm --prefix client run dev -- -p 3000
npm --prefix admin  run dev -- -p 3001
./test.sh              # full suite: units + rules + lead-route integration
```
