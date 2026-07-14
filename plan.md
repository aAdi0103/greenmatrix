# Greenmatrix Revamp — Build Plan

**Source of truth:** `Greenmatrix_PRD.md` v2.0. Brochure + PPT = content/brand.
**Reference site:** https://greenmatrix.co.in/
**Brand to lead with:** Greenmatrix (PRD Q-01 default). Kept in one config constant.

---

## Stack (per PRD §3)

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Public site:** SSR/SSG (SEO is a KPI). **Admin:** CSR, role-guarded.
- **Backend:** Firebase — Auth (custom-claim roles), Firestore, Cloud Storage, one Cloud Function / API route `createLead` for public writes.
- **Hosting:** Vercel or Firebase Hosting. HTTPS. Admin `noindex`.
- **Analytics:** GA4 + Search Console (public); in-app analytics from Firestore.

## Repo structure

```
green/                          # git root (init here — branches live here)
├─ plan.md
├─ Greenmatrix_PRD.md           # copy in for reference (optional)
└─ greenmatric-frontend/
   ├─ client/                   # Next.js — public marketing site + lead capture
   └─ admin/                    # Next.js — CRM · Blog · Analytics · Users
```

Two separate Next.js apps (your call). Shared Firebase **project**; each app has its
own `lib/firebase.ts`. A shared UI/types package is deferred — add only if duplication
actually hurts (YAGNI).

> Note: PRD models admin as a `/admin` route group of one app. We're splitting into two
> apps per your request. Cost: duplicated Firebase config + Tailwind theme. Benefit:
> cleaner demo phase, independent deploys, smaller blast radius. Fine either way.

---

## Phase 1 — Two demo client sites (design bake-off)

**Goal:** two throwaway-quality-but-real dummy client sites so the client picks a
direction. **No backend.** Static/dummy content pulled from brochure + PPT. Built in
`greenmatric-frontend/client`. Each lives on its own branch off `main`.

Prereq: `git init` at `green/`, commit scaffold to `main`, branch from there.

| Branch | Theme | Feel |
|---|---|---|
| `demo/theme-a-animated` | **A — Animated / bold** | framer-motion scroll reveals, parallax hero, animated product grid, motion CTAs. Energetic, "premium tech" feel. |
| `demo/theme-b-minimal` | **B — Modern clean minimalist** | Generous whitespace, refined type scale, restrained green/blue accents (logo palette), subtle micro-interactions only. Calm, premium, procurement-friendly. |

Both themes render the same real screens so comparison is fair:
- Home (hero + ISO badge, PSU trust strip, product grid, quick enquiry — form is dummy)
- Products hub (12 machines from PRD Appendix A) + one product detail sample
- Solutions hub (4 turnkey lines) + one sample
- About, Clients (logo wall), Contact (dummy form)
- Sticky Get-a-Quote, floating WhatsApp/Call (visual only in phase 1)

Content: real copy/specs from brochure. Images: placeholders (assets TBD, PRD Q-05).
Palette: from logo — blue drop `#1E90FF`-ish + leaf green `#2E9E3F`-ish; exact tokens
set in phase 1.

**Deliverable:** two running dev sites (`npm run dev` on each branch) + screenshots.
Client picks A or B.

---

## Phase 2 — Complete chosen client + admin

*Starts after client picks a theme. That branch → `main`, other demo branch archived.*

### Client (public) — build to PRD §5
- Global: sticky header, footer (14-state presence, ISO badge, social), floating
  WhatsApp/Call, Quote modal (pre-fills product context). Responsive 360px→desktop.
- Home (FR-HOME-01..06).
- Products hub w/ stage filter → 12 **static** product pages (`/content/products/*.ts`),
  images from Firebase Storage, per-page SEO. (PRD §5.4, Appendix A.)
- Solutions hub + 4 line pages (static).
- Resources/blog **reads** from Firestore (list + article render).
- About, Industries, Clients, Contact (+ Google Map embed).
- All lead forms wired to `createLead` (validation, honeypot). Full backend flow = Phase 3,
  but forms + API contract land here.

### Admin — build to PRD §7
- Auth + role guards (admin | rep), `/admin/login`, noindex.
- CRM dashboard (counters, sortable/filterable lead table, CSV export).
- Lead detail + lifecycle (New→Contacted→Qualified→Quoted→Negotiation→Won/Lost),
  append-only notes, follow-ups.
- Blog Manager CRUD (draft/publish/unpublish, Storage image upload).
- Analytics (admin-only): lead/pipeline/conversion + GA4 embed.
- User management (admin-only).

---

## Phase 3 — End-to-end backend + testing

- Firebase wiring complete: Firestore collections (`leads`, `articles`, `users` +
  `leads/{id}/notes`), Storage buckets, **security rules** (PRD §8.4) — public can't read
  `leads`; drafts hidden; role enforcement server-side.
- `createLead` function: rate limit + honeypot/captcha, source/page tagging, sales email
  alert + customer auto-ack (hook left for WhatsApp/Telegram — PRD Q-03).
- Publish→public: ISR revalidate (or SSR) on article publish.
- SEO: sitemap.xml, robots.txt, schema.org Org/Product, GA4 conversion events.
- Seed data (PRD §11): 1 admin, 1 rep, 2–3 leads, 1 draft + 1 published article.
- **Testing + test cases:**
  - Unit: form validation, role guards, lead lifecycle transitions, slug/publish logic.
  - Integration: `createLead` → Firestore doc; security rules (Firestore emulator).
  - E2E (Playwright): every capture point creates a lead; rep blocked from admin-only
    routes; admin full access + funnel numbers; blog draft→publish→edit→unpublish;
    product pages static w/ Storage images + unique meta.
  - Runs against Firebase **emulator suite** (no prod writes in tests).
  - Full run = PRD §11 acceptance checklist, all boxes green.

---

## Open questions (PRD defaults used unless you say otherwise)

| # | Question | Default |
|---|---|---|
| Q-01 | Brand — Greenmatrix or Galaxy Solutions? | **Greenmatrix** (config constant) |
| Q-02 | Reps see all leads or own only? | **All**, behind Settings toggle |
| Q-03 | Lead alerts — email only or +WhatsApp/Telegram? | **Email** now, hook for chat |
| Q-05 | Real photos/logos/reviews available? | Placeholders until assets arrive |
| — | Company name: "Greenmatrix Industry Pvt. Ltd." — confirm final legal name/logo file | Using PPT logo + brochure text |
| — | WhatsApp/phone for CTAs | Using brochure: +91 9110992936 / +91 7667113766 until told otherwise |

---

## Immediate next step

Phase 1 kickoff: `git init`, scaffold `greenmatric-frontend/client` (Next + TS + Tailwind),
commit to `main`, cut the two demo branches, build theme A and theme B. Waiting on your
**go** to start Phase 1.
