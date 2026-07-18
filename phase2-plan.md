# Phase 2 — End-to-End Build Plan (Client + Admin)

**Chosen direction:** Theme A (animated). Base branch: `demo/theme-a-animated`.
**Goal:** ship a working, integrated system — public site captures leads → Firestore →
admin CRM works them; admin blog publishes → public reads. Both apps functional against
a real Firebase project.
**Out of scope here (→ Phase 3):** full automated test suite + test cases, QA against the
PRD acceptance checklist, SEO polish (sitemap/schema), GA4, seed scripts, production deploy.

> Working branch for Phase 2: `feat/phase-2` cut from `demo/theme-a-animated`.
> Merges to `main` when Phase 2 is accepted.

---

## 0. Shared foundation (do first — both apps depend on it)

| ID | Task | Notes |
|---|---|---|
| F-1 | **Firebase project** created; web app registered; Auth + Firestore + Storage enabled | **Needs you** — see Decisions. Blocks all integration. |
| F-2 | Env config in each app (`.env.local`, `NEXT_PUBLIC_FIREBASE_*`) + `.env.example` | Never commit secrets. |
| F-3 | `lib/firebase.ts` in client + admin (init Auth/Firestore/Storage) | Duplicated per app (two-app split). |
| F-4 | Extract Theme-A design tokens/components into a small in-app UI kit | Button, Card, Input, Section, Reveal, brand tokens. No shared package yet (YAGNI). |
| F-5 | Firestore data model + composite indexes | Per §Data model. |
| F-6 | Security rules v1 (`firestore.rules`, `storage.rules`) | Written in Phase 2, hardened/tested in Phase 3. |

Design-token note: admin does **not** inherit the animated marketing look. Admin = clean,
dense, calm dashboard (light) reusing brand green as accent. Marketing motion stays on the
public site only. (See Decision D-2.)

---

## 1. Client — public site (PRD §5)

Convert the single-scroll demo into a real multi-route site. Public pages SSG/SSR for SEO.

### 1a. Global (PRD §5.1)
- Header, footer, floating WhatsApp/Call → promote from demo to shared layout.
- **Quote modal** (FR-GLB-05): opens from any CTA, pre-fills product/solution context.
- Keep animated hero/reveals; ensure no horizontal scroll 360px→desktop (FR-GLB-04).

### 1b. Routes
| Route | Content | Source |
|---|---|---|
| `/` | Home (hero, trust, product grid, why, solutions, quick enquiry) | static |
| `/products` | Hub: 12-card grid + stage filter (FR-PRDH) | `/content/products/*` |
| `/products/[slug]` | **12 static product pages** — value line, features, specs table, industries, sticky "Enquire about this machine" (pre-fills name+capacity), pairs-with, unique SEO (FR-PRD) | static content; images from Storage |
| `/solutions` | 4 turnkey lines hub (FR-SOL) | static |
| `/solutions/[slug]` | Line page: step-by-step line, machines used (linked), value-adds, turnkey quote form (output + budget) | static |
| `/resources` | Blog index — **published** articles from Firestore (FR-RES-01) | Firestore `articles` |
| `/resources/[slug]` | Article page — dynamic body, cover, meta, CTA | Firestore |
| `/about` | Profile, director note, mission, presence map, certifications | static |
| `/industries` | Industries served | static |
| `/clients` | Logo wall, case snapshots | static |
| `/contact` | Form + phone/WhatsApp/email + Google Map embed | static |

### 1c. Expand static content
- Flesh `/content/products/<slug>.ts` to full `Product` shape (features, specs table,
  industries, images[], pairsWith, seo) — data straight from brochure. 12 files.
- `/content/solutions/*.ts` — 4 lines with machine links.

### 1d. Lead capture (PRD §6) — client side
- All capture points POST to `createLead` (header quote modal, per-product form, solution
  form, footer mini-form, contact form).
- Client validation (required name+phone, phone format), honeypot field, source/page tagging.
- Success → auto-ack UI ("we'll call within 24h").

**Client done when:** all routes render, 12 product pages live with Storage images, blog
reads Firestore, every form creates a real lead visible in admin.

---

## 2. Admin — CRM · Blog · Analytics · Users (PRD §7)

Admin app (`greenmatric-frontend/admin`) — clean dashboard, CSR, role-guarded, noindex.

### 2a. Auth & roles (FR-AUTH)
- Firebase Auth login `/admin/login`; guard all `/admin/*`, redirect unauth.
- Role via **custom claim** (`admin` | `rep`) — set by a callable/admin function.
- Route guards per permission matrix; enforced again in Firestore rules.
- `noindex` on every admin route.

### 2b. CRM dashboard (FR-CRM-01..05) — admin + rep
- Counters: New · Contacted · Follow-up due today · Won this month.
- Lead table: sortable, filters (status/source/product/rep/date/city) + keyword search.
- Realtime listener (new leads flagged **New** on top). CSV export of filtered set.

### 2c. Lead detail & lifecycle (FR-CRM-06..11)
- `/admin/leads/[id]`: full record, editable (status, assignee, contacted flag+date,
  feedback, follow-up date, closedBy, won/lost reason, deal value).
- Enforced pipeline New→Contacted→Qualified→Quoted→Negotiation→Won/Lost (valid transitions only).
- **Notes** append-only subcollection (author + timestamp, immutable). Follow-up drives "due today".
- Quick actions: WhatsApp / Call lead.

### 2d. Blog Manager (FR-BLOG) — admin only
- List (draft/published) + search. Create/Edit/Delete (confirm).
- Editor: title, auto-slug (editable), cover image (Storage upload), rich-text body,
  excerpt, SEO title/meta, tags. Draft→Publish→Unpublish. Publish → live on `/resources`.
- Rich text: lightweight editor (see Decision D-3).

### 2e. Analytics (FR-ANL) — admin only
- Lead analytics: totals, new vs worked, by status/source/product/rep.
- Conversion funnel New→Contacted→Quoted→Won with rates. Won pipeline value + win/loss.
- Time filters (7/30/90/custom). GA4 embed/summary. Computed from Firestore.

### 2f. User management (FR-USR) — admin only
- List users (role, active). Create user + set role, deactivate (blocks login).
- Sets Auth custom claim + `users` doc.

**Admin done when:** rep sees only CRM; admin sees everything; lifecycle + notes +
follow-ups work; blog CRUD publishes to public; analytics numbers match raw data.

---

## 3. Backend integration (Firebase)

| Piece | Detail |
|---|---|
| Firestore collections | `leads`, `articles`, `users`, `leads/{id}/notes` (per Data model) |
| `createLead` | Cloud Function **or** Next API route in client — only public write path into `leads`; rate-limit + honeypot; source/page tagging; sets `status=new` |
| Notifications (FR-LEAD-03/04) | Email to sales + auto-ack to customer (SMTP or Firebase ext). Hook left for WhatsApp/Telegram (Q-03) |
| Storage | Product images (uploaded out-of-band), blog cover/body images (admin upload). Public-read published |
| Security rules v1 | `leads`: create-only public, no public read, read/update admin+rep, delete admin. `articles`: public read published, write admin. `users`: admin only (self-read). Storage: published public-read, writes admin |
| Publish→public | ISR revalidate (or SSR) on `/resources` when article published |

---

## Data model (Firestore) — recap of PRD §8

- `leads/{id}`: createdAt, updatedAt, source, sourcePage, name, phone, email, company,
  city, state, productInterest, capacity, message, status, contacted, contactedAt,
  assignedTo, feedback, followUpDate, closedBy, wonLostReason, dealValue.
  - `leads/{id}/notes/{noteId}`: text, authorUid, authorName, createdAt (append-only).
- `users/{uid}`: name, email, role (`admin`|`rep`), active, createdAt.
- `articles/{id}`: title, slug, coverImage, body, excerpt, seoTitle, seoMeta, tags,
  status (`draft`|`published`), authorUid, publishedAt, createdAt, updatedAt.

---

## Build sequence (milestones)

1. **M0 Foundation** — F-1..F-6: Firebase live, both apps connect, rules v1, UI kit.
2. **M1 Client shell** — global layout + Quote modal + routing skeleton for all pages.
3. **M2 Products** — hub + 12 product detail pages (Storage images, per-page SEO).
4. **M3 Solutions + trust** — 4 solution pages, About, Industries, Clients, Contact + map.
5. **M4 Lead pipe** — `createLead` + all forms wired + notifications + auto-ack.
6. **M5 Admin shell** — auth, role guards, layout, noindex.
7. **M6 CRM** — dashboard, table/filters/search/export, lead detail + lifecycle + notes + follow-ups.
8. **M7 Blog** — CRUD + Storage upload + publish→public `/resources` live.
9. **M8 Analytics + Users** — dashboards + user management.
10. **M9 Integration pass** — end-to-end walkthrough: every capture point → CRM; blog
    round-trip; role enforcement. Hand off to Phase 3 (testing/QA/SEO/GA4/deploy).

---

## Decisions needed

| ID | Decision | Default if you don't pick |
|---|---|---|
| D-1 | **Firebase project** | ✅ LOCKED — build on **local emulator** now, swap in your real project config later (zero rework) |
| D-2 | Admin look | ✅ LOCKED — **clean light dashboard** (function over flash) |
| D-3 | Blog rich-text editor | **Tiptap** (lightweight, images, headings) |
| D-4 | Hosting target | **Vercel** for both (simplest Next.js path) |
| D-5 | Lead notification email transport | SMTP creds you provide, or Firebase "Trigger Email" extension |

---

## Blockers

- **D-1 (Firebase)** gates all real integration. Until it's resolved I can build every
  screen against a local Firebase **emulator** and swap in your project config later —
  zero rework. Recommend starting that way so nothing waits.
