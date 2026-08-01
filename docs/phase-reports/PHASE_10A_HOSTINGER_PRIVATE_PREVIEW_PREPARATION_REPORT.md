# Phase 10A Hostinger Private Preview Preparation Report

**Date:** 2026-08-01
**Mode:** API Saving Mode — controlled deployment-preparation implementation
**Repository:** `D:\Projects\packsendgo-website`
**Branch:** `feature/phase-10-private-preview-deployment`
**Base commit:** `713192d`
**Product Owner acceptance:** PENDING HOSTINGER DEPLOYMENT

**Programme tracker:** Phase 10 — Hostinger deployment and launch (early private-preview checkpoint only)

---

## 1. Objective

Prepare the PackSendGo application for deployment to an unadvertised Hostinger temporary domain connected to GitHub `main`, without connecting to Hostinger, configuring credentials, or completing public launch.

Deliverables:

- environment-controlled search-index protection via `SITE_MODE`;
- restrictive preview `robots.txt`;
- preview-safe root metadata;
- Node.js deployment-version clarity;
- Hostinger deployment documentation;
- deterministic build and runtime validation.

---

## 2. Tracker alignment

This task is an early **Phase 10A** checkpoint under **Phase 10 — Hostinger deployment and launch**.

It does **not**:

- complete Phase 10;
- approve public launch;
- connect Hostinger;
- configure production database, email, Turnstile, or rate limiting.

Checklist status line:

**PRIVATE HOSTINGER PREVIEW PREPARED — DEPLOYMENT AND HOSTED INTEGRATIONS PENDING**

---

## 3. Baseline

| Item | Status |
| --- | --- |
| Homepage media refinement accepted for private preview | Confirmed |
| Dark desktop and mobile presentations passed | Confirmed |
| Light-mode contrast correction | Deferred |
| `npm run build` | Passed before task |
| Prisma Client generation | Passed before task |
| Local quotation submission and MySQL persistence | Passed before task |
| Hostinger connected | Not yet |
| Production database / email / Turnstile / rate limiting | Not configured |

---

## 4. Files created

| File | Purpose |
| --- | --- |
| `src/lib/site-mode.ts` | Central server-safe `SITE_MODE` resolver |
| `src/app/robots.ts` | Dynamic robots route for preview/public modes |
| `docs/phase-reports/PHASE_10A_HOSTINGER_PRIVATE_PREVIEW_PREPARATION_REPORT.md` | This report |

---

## 5. Existing files modified

| File | Change |
| --- | --- |
| `src/app/layout.tsx` | Replaced static metadata export with `generateMetadata()` using `getSiteMode()`; added `dynamic = "force-dynamic"` so Hostinger runtime env is honoured |
| `src/components/theme/ThemeProvider.tsx` | Changed `defaultTheme` from `"system"` to `"dark"` |
| `.env.example` | Added documented `SITE_MODE=preview` |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Added Phase 10A completed and deferred checklist entries |

**Not modified:** `package.json` (existing `engines.node` already suitable — see §11).

---

## 6. Site-mode architecture

`src/lib/site-mode.ts` provides:

- typed `SiteMode` union: `"preview" | "public"`;
- `getSiteMode()` — reads server `process.env.SITE_MODE` only (never `NEXT_PUBLIC_*`);
- `isPublicSite()` / `isPreviewSite()` convenience helpers;
- no logging of secrets or env values.

Consumers:

- `src/app/layout.tsx` — root metadata;
- `src/app/robots.ts` — crawl directives.

Both routes export `dynamic = "force-dynamic"` so `SITE_MODE` is evaluated at request/runtime on Hostinger, not baked in at build time.

---

## 7. Safe default behaviour

| `SITE_MODE` input | Resolved mode |
| --- | --- |
| unset | `preview` |
| blank | `preview` |
| unknown value | `preview` |
| `preview` | `preview` |
| exact `public` | `public` |

Local development without `SITE_MODE` in `.env.local` therefore defaults safely to preview/noindex behaviour.

Hostinger private preview must set `SITE_MODE=preview`. Public launch requires an explicit reviewed change to `SITE_MODE=public`.

Controlled resolution test (Node inline, no server):

- unset → preview
- blank → preview
- `unknown` → preview
- `preview` → preview
- `public` → public

---

## 8. Robots behaviour

**Preview mode (`preview`, default):**

```
User-Agent: *
Disallow: /
```

- all user agents blocked;
- no sitemap advertised.

**Public mode (`public`):**

```
User-Agent: *
Allow: /
```

- crawling permitted;
- no sitemap URL invented (no approved production hostname/sitemap in scope).

Runtime preview verification: HTTP 200, body matches restrictive directives, no `Sitemap` line.

---

## 9. Root metadata behaviour

Existing titles, descriptions, Open Graph fields, and `metadataBase` are preserved.

**Preview mode** adds restrictive robots metadata:

- `noindex`
- `nofollow`
- `noarchive`
- `noimageindex`
- matching restrictive `googleBot` directives

**Public mode** returns the existing base metadata without restrictive robots fields, allowing indexing without altering titles or descriptions.

Runtime preview verification: homepage HTML contains `noindex`, `nofollow`, `noarchive`, and `noimageindex`.

---

## 10. Theme-default finding and decision

**Finding:** `ThemeProvider` previously used `defaultTheme="system"`, following the operating-system theme when no stored preference exists.

**Decision:** Changed to `defaultTheme="dark"` only.

**Preserved:**

- existing theme control (`ThemeMenu`);
- user ability to select System or Light;
- stored user preference via `next-themes`;
- `suppressHydrationWarning` on `<html>`;
- Light mode remains available — no Light-mode redesign in this task.

---

## 11. Node.js version declaration

`package.json` already declares:

```json
"engines": {
  "node": ">=24 <25"
}
```

This satisfies Hostinger Node.js 24.x selection. No change was required; `package-lock.json` was not modified.

---

## 12. Hostinger repository and branch

| Setting | Value |
| --- | --- |
| Repository | `zapatechnologies-Cursor-Apps/packsendgo-website` |
| Deployment branch | `main` |
| First deployment domain | Hostinger temporary domain (unadvertised) |
| Automatic deployment source | GitHub `main` |

---

## 13. Hostinger build settings

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Node.js | 24.x (`engines.node`: `>=24 <25`) |
| Install command | Hostinger default npm install behaviour |
| Build command | `npm run build` |
| Start command | `npm start` |
| Preview environment | `SITE_MODE=preview` |

Build pipeline includes Prisma Client generation via the existing build script (`prisma generate && next build`).

---

## 14. Initial preview environment variables

**Required for first render-only preview:**

| Variable | Value |
| --- | --- |
| `SITE_MODE` | `preview` |

**Security rule for Turnstile bypass:**

- never set `TURNSTILE_BYPASS_DEV=true` on Hostinger;
- omit it or set it to `false`.

---

## 15. Deferred environment variables

Not yet supplied on Hostinger for first preview:

| Variable | Status |
| --- | --- |
| `DATABASE_URL` | Not configured |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Not configured |
| `TURNSTILE_SECRET_KEY` | Not configured |
| `EMAIL_FROM` | Not configured |
| `QUOTE_NOTIFICATION_EMAIL` | Not configured |
| Future email-provider API key | Not configured |
| Future production rate-limit secret | Not configured |

---

## 16. Quotation limitations in first preview

With only `SITE_MODE=preview` configured:

- homepage and quotation form **can render**;
- successful hosted quotation submission is **not yet available** without Hostinger MySQL and production integrations;
- a submission attempt may return a safe configuration-unavailable response;
- this is acceptable only for the unadvertised private preview.

---

## 17. Search-index protection

Preview protection layers:

1. `SITE_MODE` defaults to preview unless explicitly set to `public`;
2. root metadata emits `noindex`, `nofollow`, `noarchive`, `noimageindex`;
3. `/robots.txt` disallows all crawling with no sitemap;
4. `SITE_MODE` is server-only — not exposed via `NEXT_PUBLIC_*`.

Public indexing remains blocked until Product Owner explicitly sets `SITE_MODE=public` after launch review.

---

## 18. Security considerations

- No credentials added to Git or documentation;
- no Hostinger connection from Cursor;
- no production service calls during validation;
- `TURNSTILE_BYPASS_DEV=true` must never be used on Hostinger;
- preview deployment is intentionally unindexed and unadvertised;
- dynamic rendering ensures runtime env controls indexing without rebuild when switching modes on Hostinger.

---

## 19. Validation commands

```bash
npm run lint
npm run typecheck
npm run build
npm start   # with SITE_MODE=preview for controlled runtime test
```

Controlled runtime checks (preview):

- `GET /robots.txt` — restrictive directives, no sitemap;
- `GET /` — HTTP 200, restrictive robots meta tags;
- `GET /get-a-quote` — HTTP 200;
- `.next/server/app/api/quote/route.js` exists (API route compiled).

Safe-default resolution verified via controlled Node env tests (no external services).

---

## 20. Lint result

**PASS** — exit code 0.

One pre-existing warning in `src/components/quote/QuoteForm.tsx` (React Hook Form / React Compiler incompatible-library notice). No new lint issues from Phase 10A files.

---

## 21. Typecheck result

**PASS** — `tsc --noEmit` exit code 0.

---

## 22. Build result

**PASS** — exit code 0.

```
Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /api/quote
├ ƒ /get-a-quote
└ ƒ /robots.txt
```

All routes dynamic (`ƒ`) so `SITE_MODE` is honoured at runtime on Hostinger.

---

## 23. Runtime result

**PASS** (preview mode, production server, `SITE_MODE=preview`):

| Check | Result |
| --- | --- |
| `/robots.txt` HTTP status | 200 |
| `/robots.txt` body | `User-Agent: *` / `Disallow: /` |
| Sitemap advertised | No |
| `/` HTTP status | 200 |
| Root `noindex` | Present |
| Root `nofollow` | Present |
| Root `noarchive` | Present |
| Root `noimageindex` | Present |
| `/get-a-quote` HTTP status | 200 |
| `/api/quote` compiled | Yes |
| External services contacted | No |
| Development server left running | No (stopped after test) |

Safe-default resolution (unset, blank, unknown → preview; exact `public` → public): **PASS**.

Public-mode indexing paths verified in source (`Allow: /`, base metadata without restrictive robots). Dynamic rendering ensures runtime `SITE_MODE=public` on Hostinger will apply without rebuild.

---

## 24. Known warnings

| Warning | Notes |
| --- | --- |
| ESLint React Hook Form incompatible-library warning in `QuoteForm.tsx` | Pre-existing; unchanged by this task |
| npm `Unknown env config "devdir"` | Environment tooling notice; non-blocking |
| Prisma generate tip about Accelerate | Informational only |

---

## 25. Deployment steps for Product Owner

1. Merge approved Phase 10A changes to `main` (Product Owner Git operation).
2. In Hostinger, create or configure the Node.js application:
   - repository: `zapatechnologies-Cursor-Apps/packsendgo-website`;
   - branch: `main`;
   - Node.js: 24.x;
   - build: `npm run build`;
   - start: `npm start`.
3. Connect GitHub `main` for automatic deployment to the Hostinger temporary domain.
4. Set Hostinger environment variable: `SITE_MODE=preview`.
5. Do **not** set `TURNSTILE_BYPASS_DEV=true`.
6. Deploy and verify on the temporary domain:
   - homepage renders (HTTP 200);
   - `/get-a-quote` renders (HTTP 200);
   - `/robots.txt` disallows all crawling;
   - page source contains `noindex` / `nofollow`.
7. Confirm quotation form renders but accept that submission may fail safely until MySQL and integrations are configured in a later phase.
8. Keep the temporary domain unadvertised until hosted integrations and launch review are complete.

---

## 26. Rollback approach

1. Revert the Phase 10A merge on `main` (Product Owner Git operation) or redeploy the previous approved commit.
2. In Hostinger, confirm `SITE_MODE=preview` remains set during any rollback window.
3. If indexing was accidentally enabled, set `SITE_MODE=preview` and redeploy immediately.
4. Document rollback commit hash and redeployment time for audit.

---

## 27. Remaining blockers

- Hostinger GitHub connection not yet performed
- First Hostinger deployment not yet performed
- Hostinger temporary-domain validation pending
- Automatic redeployment validation pending
- Hostinger MySQL not provisioned
- Hosted migration not applied
- Hosted quotation persistence not available
- Hosted email not configured
- Live Turnstile not configured
- Production rate limiting not configured
- Custom domain and SSL validation pending
- Light-mode correction deferred
- Public indexing and launch pending explicit Product Owner approval

---

## 28. Verdict

**Private-preview preparation verdict: READY FOR HOSTINGER DEPLOYMENT**

All Phase 10A implementation, documentation, lint, typecheck, build, and controlled preview runtime validation passed. Deployment preparation is complete; Hostinger connection and hosted integrations remain pending Product Owner action.

---

## 29. Product Owner acceptance status

**Product Owner acceptance: PENDING HOSTINGER DEPLOYMENT**

Implementation and local validation are complete. Acceptance is deferred until the Product Owner connects Hostinger, deploys to the temporary domain, and confirms preview behaviour in the hosted environment.

---

## Scope confirmation

The following were **not** modified in this task:

- homepage sections or image assets;
- Three.js scene;
- quotation form or quotation API;
- Prisma files or migrations;
- Docker files;
- local environment files (`.env.local`, etc.);
- email or Turnstile integration;
- legal content;
- authority documents.

No packages were installed. No external services were contacted. No Git commands were run from Cursor.
