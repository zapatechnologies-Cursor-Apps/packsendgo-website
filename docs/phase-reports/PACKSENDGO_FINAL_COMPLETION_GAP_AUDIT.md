# PackSendGo Final Completion Gap Audit and 2–3 Hour Launch Plan

**Date:** 2026-08-02
**Mode:** API Saving Mode — audit only
**Repository:** `D:\Projects\packsendgo-website`
**Branch:** `audit/phase-7-quotation-verification-completion`
**Product Owner acceptance:** PENDING

---

## 1. Executive summary

PackSendGo has a production-quality homepage, a fully coded five-step quotation form with MySQL persistence, preview indexing controls, and Hostinger deployment scaffolding. It is **not launch-ready** today.

The primary launch blockers are:

1. **Turnstile and development verification** still gate the quotation form client and server — the Product Owner has deferred Turnstile to Phase 9 and requires it removed from launch, not bypassed.
2. **Resend is not implemented** — email transport is logging-only even when configured.
3. **Four public pages and three legal routes are missing** — navigation and footer links currently resolve to nothing (no `not-found.tsx` exists).
4. **Light mode is broken** on multiple homepage sections due to dark-only surface tokens (`bg-deep-charcoal`, `bg-midnight-graphite`) that do not adapt in `.light`.
5. **Footer credit** (“Website designed and built by We Build Anything”) is missing.
6. **Legal page content** remains pending in the asset register — shells can be built but approved copy must not be invented.

MySQL persistence, schema, migration, and local submission are proven. Hosted submission fails because Turnstile configuration guard and missing email configuration block production writes, compounded by the development verification UI.

A credible launch within **2–3 hours** is achievable only with a strictly minimal scope: remove verification, wire Resend, fix Light mode tokens, create lean public/legal page shells from existing approved homepage copy, add footer credit, deploy, and validate hosted quotation + email. Full legal copy, sitemap, favicon, and Phase 9 security hardening should be deferred unless time remains.

**Audit verdict:** READY FOR TIMEBOXED FINAL IMPLEMENTATION

---

## 2. Product Owner decisions

| Decision | Implication |
| --- | --- |
| Complete within ~2–3 hours | Minimal diffs only; no new platforms or architectural layers |
| Turnstile deferred to Phase 9 | Remove verification UI and server gate from launch; do not add CAPTCHA substitute; do not add production bypass |
| Resend approved for Phase 8 | Implement Resend transport today; configure `RESEND_API_KEY` on Hostinger |
| Light mode required before launch | Fix token/class defects across homepage, form, header, footer |
| No complexity additions | Reuse existing components, homepage data, and patterns |

---

## 3. Authoritative tracker

| Phase | Scope | Launch relevance |
| --- | --- | --- |
| 0A–1C | Authority, design | Complete |
| 2 | Next.js foundation | Complete (Light mode correction outstanding) |
| 3 | Homepage | Complete (Light mode defects) |
| 4 | Public pages | **Missing — launch blocker** |
| 5 | Spline warehouse | Deferred (Three.js hero used instead) |
| 6 | Real warehouse media | Deferred (stock placeholder in use) |
| 7 | Quotation form + MySQL | **Partial — Turnstile must be removed; hosted path blocked** |
| 8 | Transactional email | **Missing Resend — launch blocker** |
| 9 | SEO, security, performance | Turnstile, CSP, real rate limiting deferred |
| 10 | Hostinger deployment | **Partial — DB migration proven; quotation/email not working hosted** |

---

## 4. Sources reviewed

| Source | Use |
| --- | --- |
| `docs/00_PROJECT_AUTHORITY.md` | Stack, pages, security authority |
| `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md` | V1 page scope |
| `docs/02_DESIGN_AND_3D_AUTHORITY.md` | Design and 3D deferrals |
| `docs/03_TECHNICAL_ARCHITECTURE.md` | Architecture reference |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Tracker reconciliation |
| `docs/05_CONTENT_AND_ASSET_REGISTER.md` | Content/legal status |
| `docs/06_QUOTATION_FORM_SPEC.md` | Quotation requirements |
| `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` | Deployment env matrix |
| `docs/phase-reports/*` | Implementation evidence (13 reports) |
| `package.json` | Dependencies, build script, Node engine |
| `.env.example` | Environment variable baseline |
| `src/app/` route tree | Actual routes |
| Quotation, email, security, layout, homepage components | Implementation state |

---

## 5. Current deployed baseline

| Item | Evidence | Status |
| --- | --- | --- |
| GitHub `main` | PO states at or after `9def1d2`; Cursor did not verify Git | Assumed current |
| Hostinger build | Phase 10A/10B reports; build command `prisma migrate deploy && prisma generate && next build` | Build passes |
| MySQL `127.0.0.1:3306` | PO confirmed migration applied | **Complete** |
| Migration `20260801180000_init_quotation` | Committed; PO confirmed hosted apply | **Complete** |
| Prisma Client generation | Embedded in build | **Complete** |
| Production build | Local and Hostinger builds reported PASS | **Complete** |
| Node version | `package.json` `>=24 <25`; Hostinger reported 22.18.0 with engine warning | **Warning — non-blocking today** |
| Hosted quotation | PO evidence: dev placeholder + 503/no row | **Broken** |
| Hosted email | No Resend; logging/missing-config transport | **Not working** |
| Temporary domain | Phase 10A prepared preview; PO testing on Hostinger | Preview mode expected |
| Uncommitted audit report | `PHASE_7_QUOTATION_VERIFICATION_COMPLETION_AUDIT.md` on audit branch | Pending PO Git action |

---

## 6. Existing completed work

- Next.js 16 App Router foundation with TypeScript strict mode
- Homepage with Hero (Three.js), Core Capabilities, How It Works, Warehouse Tour placeholder, Sales Channels, Customer Categories, Operational Commitments, Quote CTA
- Theme system (System / Light / Dark) via `next-themes`
- Header, mobile navigation, footer shell
- Five-step quotation form with Zod validation, session draft, idempotency, honeypot, website normalisation
- `POST /api/quote` with Prisma persistence and notification-attempt records
- Prisma schema and migration for `QuoteRequest` and `QuoteNotificationAttempt`
- Local MySQL persistence validated (Phase 3B1, PO browser acceptance)
- Preview `SITE_MODE` with noindex metadata and restrictive `robots.ts`
- Hostinger migration-build hotfix (Phase 10B)
- Phase 7 website normalisation (merged)

---

## 7. Existing partial work

| Area | Complete | Incomplete |
| --- | --- | --- |
| Quotation form | UI, validation, persistence, honeypot, idempotency | Turnstile/dev verification still present; production config guard requires Turnstile keys |
| Email | Templates, attempt records, dev logging | No Resend transport; production uses `MissingConfigurationTransport` when misconfigured |
| Theme / Light mode | Token architecture, theme switcher | Dark-only surface classes on multiple sections |
| Navigation | Links defined in `src/lib/site.ts` | Target routes do not exist |
| Deployment | Build, migration script, preview mode | Hosted quotation and email not validated |
| Legal | Footer links defined | No routes; content pending in asset register |
| SEO shell | Root metadata, preview robots | No sitemap, no favicon, no 404, no per-page metadata on missing routes |

---

## 8. Missing work

- `/services`, `/how-it-works`, `/our-warehouse` (or aligned path), `/about` pages
- `/privacy-policy`, `/cookie-policy`, `/terms` pages (or unified paths — see broken links)
- `not-found.tsx` (404)
- Resend email transport and `RESEND_API_KEY` configuration
- Turnstile removal from launch quotation path (Phase 9 deferral)
- Light mode token corrections
- Footer “We Build Anything” credit with link to `https://zapatechnologies.com`
- Favicon and Open Graph image assets (optional for minimum launch)
- Sitemap (Phase 9; optional today)
- Product Owner-approved legal copy and contact details
- Real rate limiting (Phase 9)
- Production Turnstile (Phase 9 — explicitly deferred)

---

## 9. Broken work

| Item | Evidence | Impact |
| --- | --- | --- |
| Hosted quotation submission | PO: dev placeholder visible; no DB row | Launch conversion broken |
| Navigation links | `mainNavigation` points to unimplemented routes | 404 on Services, How It Works, Warehouse, About |
| Footer legal links | `/privacy-policy`, `/cookie-policy`, `/terms` — no routes | Broken links |
| Privacy link in quotation form | `PRIVACY_POLICY_PATH = "/privacy"` vs footer `/privacy-policy` | Broken even if one legal page added |
| Core Capabilities “Explore” links | `href: "/services#..."` — no `/services` page | Broken deep links |
| Light mode on dark panels | `bg-deep-charcoal` / `bg-midnight-graphite` unchanged in `.light` | Unreadable or near-invisible text (PO observed) |
| Production email transport | `createEmailTransport()` returns dev logger when configured | No real delivery |
| Final checklist Turnstile requirement | `docs/04_BUILD_PHASE_CHECKLIST.md` line 875 | Stale — conflicts with PO deferral decision |

---

## 10. Tracker/checklist reconciliation

| Phase | Requirement | Checklist | Source | Report evidence | PO evidence | Corrected status | Launch priority | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | Light mode | Deferred | Broken tokens | Phase 2A/3 reports | Visible errors | **Partial — broken** | MUST TODAY | Fix `.light` tokens and dark-panel classes |
| 3 | Homepage | Complete | Complete | Phase 2B/3 reports | — | Complete (Light excepted) | — | Light fix in Batch 2 |
| 4 | Services page | Not started | Missing | No route | Required | **Missing** | MUST TODAY | Create minimal page from `homepage-data` |
| 4 | How It Works page | Not started | Missing | Homepage section only | Required | **Missing** | MUST TODAY | Extract from `HowItWorks` + `processStages` |
| 4 | Our Warehouse page | Not started | Missing | Placeholder section only | Required `/our-warehouse` | **Missing** | MUST TODAY | Create page; align nav href |
| 4 | About page | Not started | Missing | No route | Required | **Missing** | MUST TODAY | Minimal approved copy only |
| 4 | Legal pages | Not started | Missing | Asset register pending | Shell required | **Missing** | MUST TODAY | PO-supplied or placeholder-safe shells |
| 7 | Quotation form | Mostly complete | Turnstile blocks launch | Phase 3A/7 audits | Hosted failure | **Partial — broken hosted** | MUST TODAY | Remove Turnstile from launch path |
| 7 | Live Turnstile | Pending | Implemented | Phase 7 audit | Deferred Phase 9 | **Deferred** | DEFER | No launch action |
| 8 | Resend email | Not started | Logging only | Phase 3A report | Approved today | **Missing** | MUST TODAY | Implement Resend transport |
| 9 | Turnstile production | Pending | Code exists | Phase 7 audit | Deferred | **Deferred** | DEFER | Remove from launch; revisit Phase 9 |
| 9 | Rate limiting | Pending | NoOp | `rate-limit.ts` | Lightweight only | **Deferred** | DEFER | Keep NoOp for launch |
| 9 | Sitemap | Not started | Missing | No `sitemap.ts` | Audit asked | **Missing** | IF TIME | Add post-launch or if time remains |
| 10 | Hosted quotation | Pending | Broken | Phase 10A/7 audits | No row | **Broken** | MUST TODAY | Fix Batch 1 + deploy |
| 10 | Hosted email | Pending | Not implemented | transport.ts | Required | **Missing** | MUST TODAY | Resend + env vars |
| 10 | MySQL migration | Pending in checklist | Complete | Phase 10B + PO | Applied | **Complete** | — | Verify row after fix |
| Nav | `/warehouse` vs `/our-warehouse` | Not tracked | Mismatch | `site.ts` uses `/warehouse` | PO requires `/our-warehouse` | **Broken label/path** | MUST TODAY | Align href in `site.ts` |

### Reconciliation findings

- **Checklist says complete but source incomplete:** Light mode marked established (Phase 2) but has proven contrast defects.
- **Source exists but checklist stale:** Turnstile boundary marked implemented (Phase 7) but PO now defers it; checklist final gating still requires Turnstile in production.
- **Wrong phase labels:** Phase 3B1 persistence report filed under Phase 7 tracker scope — documentation only, not a blocker.
- **Deferred item blocking launch:** Turnstile config guard and verification UI block hosted submission — must be removed for launch, not configured.
- **Later-phase feature leaked:** Turnstile (Phase 9) embedded in Phase 7 launch path.
- **Over-engineered for V1 launch:** Full Turnstile widget + dev placeholder + bypass trinity unnecessary for today’s launch scope.
- **Overlooked:** Privacy path inconsistency (`/privacy` vs `/privacy-policy`); missing 404; missing footer credit; warehouse route slug mismatch.

---

## 11. Quotation-form status

| Requirement | Status | Evidence |
| --- | --- | --- |
| Submit without Turnstile | **Not met** | Client token guard; server `verifyTurnstileToken`; config guard |
| No development verification UI | **Not met** | `QuoteStepReview.tsx` placeholder block |
| Server-side validation | **Met** | `quoteSubmissionPayloadSchema`, step schemas |
| Honeypot | **Met** | Hidden `website` field; server reject |
| Idempotency | **Met** | Session key + unique DB constraint |
| Website normalisation | **Met** | Phase 7 report |
| MySQL write | **Met locally** | Phase 3B1 + PO local success |
| Notification-attempt records | **Met locally** | Two records per submit |
| Retain details after recoverable errors | **Met** | Draft in sessionStorage; config errors keep form |
| Clear draft after success | **Met** | `clearQuoteDraft()` on success |
| Success reference | **Met** | `QuoteSuccess` component |
| Desktop/mobile | **Partial** | Form responsive; mobile full-flow checklist item open |
| Hosted working | **Broken** | Turnstile config + verification path |

---

## 12. Turnstile deferral decision

**Classification:** DEFER AFTER LAUNCH — PHASE 9

Existing implementation (do not use at launch):

| File | Current role |
| --- | --- |
| `src/components/quote/QuoteStepReview.tsx` | Verification section + dev placeholder |
| `src/components/quote/QuoteForm.tsx` | Token state and submit guard |
| `src/components/quote/TurnstileField.tsx` | Cloudflare widget |
| `src/lib/security/turnstile.ts` | Server verification |
| `src/lib/quote/schema.ts` | `turnstileToken` required in payload |
| `src/lib/quote/submit.ts` | Config guard + `verifyTurnstileToken()` |

**Launch requirement:** Remove verification from the launch path entirely. Do not add `TURNSTILE_BYPASS_DEV` or any production bypass. Files may remain in repository unused, or verification may be stripped from schema/submit/client — minimal approach is remove UI, client guard, schema field, server verify call, and Turnstile entries from production config guard.

Turnstile env vars must **not** be required on Hostinger for launch.

---

## 13. MySQL status

| Item | Status |
| --- | --- |
| Schema | Complete |
| Migration committed | Complete |
| Local persistence | Proven |
| Hosted migration | PO confirmed applied |
| Build embeds `migrate deploy` | Complete (Phase 10B) |
| Hosted row creation | Blocked by quotation config/verification — not DB layer |

**Launch action:** After Batch 1, validate one hosted `QuoteRequest` row and two `QuoteNotificationAttempt` rows.

---

## 14. Resend/email status

| Item | Status |
| --- | --- |
| Current transport | `DevelopmentLoggingTransport` always when “configured”; `MissingConfigurationTransport` in production when not |
| Resend package | **Not installed** |
| Production-capable | **No** |
| Notification-attempt tracking | **Yes** — `QuoteNotificationAttempt` with SENT/FAILED/LOGGED |
| Email blocks DB write | **No** — quote created in transaction first; emails sent after |
| Failed delivery recording | **Yes** — FAILED status + `providerResponse` |
| Quote preserved on email fail | **Yes** — DB commit precedes email sends |

**Exact source changes required:**

1. Add `resend` dependency (Product Owner approval for package install during implementation).
2. Create `src/lib/email/resend-transport.ts` (or extend `transport.ts`) calling Resend API.
3. Update `createEmailTransport()` to use Resend when `RESEND_API_KEY` and email addresses configured.
4. Update `.env.example` with `RESEND_API_KEY`.
5. Remove Turnstile keys from production config guard; keep `EMAIL_FROM` + `QUOTE_NOTIFICATION_EMAIL` required.

**Environment variables:**

| Variable | Side | Required for launch |
| --- | --- | --- |
| `RESEND_API_KEY` | Server | Yes |
| `EMAIL_FROM` | Server | Yes |
| `QUOTE_NOTIFICATION_EMAIL` | Server | Yes |

Sender domain verification (SPF/DKIM) is a Product Owner / DNS task outside Cursor.

---

## 15. Light-theme defect inventory

**Root cause:** `.light` in `globals.css` updates semantic surfaces but leaves `--midnight-graphite` and `--deep-charcoal` at dark values. Components using `bg-deep-charcoal` or `bg-midnight-graphite` with `text-on-surface` produce dark-on-dark text in Light mode.

| Area | File | Classes / tokens | Defect |
| --- | --- | --- | --- |
| Global tokens | `src/app/globals.css` | `.light` missing `--midnight-graphite`, `--deep-charcoal` overrides | Root cause |
| Hero fallback | `globals.css` | `.hero-scene-fallback` hardcoded `#151920`, `#121417` | Dark-only gradient |
| Hero overlay | `WarehouseHeroBoundary.tsx` | `from-background via-background/48` | Acceptable if background token correct |
| Core Capabilities panel | `CoreCapabilities.tsx` | `bg-deep-charcoal`, `from-deep-charcoal/35` | Dark panel + light-mode dark text |
| Customer categories cards | `CustomerCategories.tsx` | `bg-deep-charcoal` | Same |
| Warehouse tour container | `WarehouseTour.tsx` | `bg-deep-charcoal`, `from-deep-charcoal/88` | Same |
| Final quote CTA | `QuoteCallToAction.tsx` | `bg-midnight-graphite`, `text-on-surface` | **Critical** — text matches background in Light |
| Form field errors | `Field.tsx` | `text-red-300` | Low contrast on light background |
| Quote errors | `QuoteSubmissionError.tsx`, `QuoteStepReview.tsx` | `text-red-200`, `bg-red-950/20` | Dark-theme error palette |
| Header | `SiteHeader.tsx` | Semantic tokens | Likely OK |
| Footer | `SiteFooter.tsx` | `bg-surface-container` | Likely OK |
| Logo | `PackSendGoLogo.tsx` | Switches to black in Light | OK |
| Buttons | `Button.tsx`, CTAs | `bg-signal-lime text-midnight-graphite` | OK (midnight is dark text — intentional on lime) |
| Theme menu | `ThemeMenu.tsx` | Semantic tokens | Likely OK |
| Quotation form fields | `Field.tsx` | `bg-surface-container text-on-surface` | Likely OK after token fix |

**Fix strategy (minimal):** Add Light-mode values for `--midnight-graphite` and `--deep-charcoal` **or** replace dark-panel usages with `bg-surface-container` / `bg-surface` and theme-aware error colours. Prefer token fix in `globals.css` plus error colour adjustment.

---

## 16. Public-page inventory

| Route (PO) | Route (current nav) | Exists | Status | Reusable source |
| --- | --- | --- | --- | --- |
| `/services` | `/services` | No | **Missing** | `capabilities` in `homepage-data.ts`; services matrix in `docs/05` §4 |
| `/how-it-works` | `/how-it-works` | No | **Missing** | `processStages`; homepage `HowItWorks` section |
| `/our-warehouse` | `/warehouse` | No | **Missing** | `warehouseTourImage`, `warehouseTourChapters`; scope §3 in `01_V1` |
| `/about` | `/about` | No | **Missing** | Joint venture note in asset register §3 — REVIEW REQUIRED only |

**Per-page implementation scope (minimal V1):**

| Page | Likely files | Metadata | CTA | Media |
| --- | --- | --- | --- | --- |
| Services | `src/app/services/page.tsx` | title + description from approved services copy | Link to `/get-a-quote` | Reuse capability images from `public/images/homepage/` |
| How It Works | `src/app/how-it-works/page.tsx` | From `processStages` | Quote CTA | Optional icons only |
| Our Warehouse | `src/app/our-warehouse/page.tsx` | From V1 scope §3 | Quote CTA | Stock placeholder image (existing) |
| About | `src/app/about/page.tsx` | Minimal approved positioning | Quote CTA | No invented team photos |

**Mobile:** Reuse `Container`, existing typography tokens, single-column layout.

---

## 17. Header/navigation status

| Item | Status |
| --- | --- |
| Desktop nav | Implemented in `SiteHeader.tsx` |
| Mobile nav | Implemented in `MobileNavigation.tsx` |
| Quote CTA | `/get-a-quote` — works |
| Home | `/` — works |
| Services, How It Works, Warehouse, About | **Broken — routes missing** |
| Warehouse path | Nav uses `/warehouse`; PO requires `/our-warehouse` |

---

## 18. Footer status

| Item | Status |
| --- | --- |
| Logo, description, company links | Present |
| Legal links | **Broken — routes missing** |
| Quote link | Works |
| Copyright | Present |
| We Build Anything credit | **Missing** |
| Contact details | Not present (asset register: pending — do not invent) |

**Footer credit requirement:** Edit `src/components/layout/SiteFooter.tsx` — add below copyright:

“Website designed and built by [We Build Anything](https://zapatechnologies.com)”

---

## 19. Legal-page status

| Route | Footer link | Form link | Exists | Content status |
| --- | --- | --- | --- | --- |
| Privacy | `/privacy-policy` | `/privacy` | No | PENDING PRODUCT OWNER INPUT |
| Cookie Policy | `/cookie-policy` | — | No | PENDING |
| Terms | `/terms` | — | No | PENDING |

**Adequacy:** Not launch-adequate without pages. Minimum viable approach: create pages with clearly marked pending sections and unify paths (`/privacy-policy` recommended; update `PRIVACY_POLICY_PATH` in `src/lib/quote/constants.ts`). Do not invent legal facts, retention periods, or contact details.

---

## 20. SEO/site-shell status

| Item | Status |
| --- | --- |
| Root metadata | Complete in `layout.tsx` |
| Preview noindex | Complete via `SITE_MODE` + `generateMetadata()` |
| Public indexing switch | `SITE_MODE=public` — documented |
| `robots.ts` | Complete — preview disallows all |
| Sitemap | **Missing** |
| 404 page | **Missing** |
| Favicon | **Missing** (no `favicon.ico` or `app/icon`) |
| Open Graph image | Not configured |
| Per-route metadata | Only `/get-a-quote` has page metadata |
| Contact details in shell | Pending PO input |

---

## 21. Deployment status

| Item | Evidence | Status |
| --- | --- | --- |
| GitHub → Hostinger auto-deploy from `main` | Phase 10A | Configured (PO) |
| Build command | `npm run build` with migrate | Complete |
| `DATABASE_URL` on Hostinger | PO confirmed MySQL | Complete |
| Turnstile env on Hostinger | Not required for launch after Batch 1 | Remove requirement |
| Resend env on Hostinger | Not yet | Required today |
| Node 22 vs 24 engine warning | Phase 10A §24 | Warning only; build passed on 22.18.0 |
| Hosted quotation | Broken | Fix then redeploy |
| Preview domain validation | PO actively testing | In progress |

---

## 22. Must complete today

1. Remove Turnstile/dev verification from quotation launch path (client, schema, server, config guard).
2. Implement Resend email transport and configure Hostinger env vars.
3. Fix Light mode defects (globals tokens + error colours + dark panels).
4. Create four public pages: Services, How It Works, Our Warehouse, About.
5. Align warehouse nav href to `/our-warehouse`.
6. Create legal page shells with PO-approved or clearly pending content; fix privacy path consistency.
7. Add footer We Build Anything credit.
8. Add `not-found.tsx` (minimal).
9. Deploy to Hostinger via `main` and validate hosted quotation + email + DB row.

---

## 23. Complete if time remains

1. Favicon and basic Open Graph image
2. `sitemap.ts` (respecting `SITE_MODE`)
3. Mobile quotation full-flow re-test documented
4. Node engine reconciliation note in Hostinger (switch to 24.x)
5. Per-page metadata on all new routes
6. Contact details in footer once PO supplies them

---

## 24. Defer after launch

- Cloudflare Turnstile (Phase 9)
- Real rate limiting (Phase 9)
- CSP and security headers (Phase 9)
- Spline warehouse experience (Phase 5)
- Real warehouse photography/video/360 (Phase 6)
- Concurrent idempotency race hardening
- Lighthouse/CWV audit
- Custom domain cutover and `SITE_MODE=public`
- Full legal copy revision if only shells shipped today

---

## 25. Exact implementation batches

### Batch 1 — Quotation and Resend (45–60 min)

| Field | Detail |
| --- | --- |
| Parent phase | 7 + 8 |
| Objective | Launch-safe quotation submit without verification; Resend delivery; DB + notification records |
| Files | `QuoteForm.tsx`, `QuoteStepReview.tsx`, `schema.ts`, `submit.ts`, `transport.ts`, new `resend-transport.ts`, `.env.example`, `route.ts` (if error codes change) |
| Allowed scope | Remove verification UI/guards/schema/server check; remove Turnstile from `getRuntimeConfigurationIssues()`; add Resend transport |
| Dependencies | PO provides Resend API key and email addresses on Hostinger |
| Env vars | `DATABASE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`, `QUOTE_NOTIFICATION_EMAIL`, `SITE_MODE`, `NEXT_PUBLIC_SITE_URL` |
| Validation | `npm run lint`, `npm run typecheck`, `npm run build`; local POST `/api/quote`; check DB row + attempts |
| Browser | Full form submit on desktop; confirm success reference |
| Commit boundary | `launch: remove verification gate and add Resend email` |
| Deploy | Push to `main` after local validation |
| Acceptance | Submit succeeds without verification step; emails sent or FAILED recorded; quote row persists |

### Batch 2 — Light-mode correction (40–50 min)

| Field | Detail |
| --- | --- |
| Parent phase | 2 + 3 |
| Objective | Readable Light mode across homepage, header, footer, form |
| Files | `globals.css`, `CoreCapabilities.tsx`, `CustomerCategories.tsx`, `WarehouseTour.tsx`, `QuoteCallToAction.tsx`, `Field.tsx`, `QuoteSubmissionError.tsx`, `QuoteStepReview.tsx` (error block only) |
| Dependencies | None |
| Validation | Manual theme toggle on `/`, `/get-a-quote`; check listed sections |
| Browser | Light mode desktop + mobile (~390px) |
| Commit boundary | `launch: fix light theme contrast and surfaces` |
| Deploy | Can combine with Batch 3 push |
| Acceptance | No dark-on-dark text; error states readable |

### Batch 3 — Public pages and footer (50–70 min)

| Field | Detail |
| --- | --- |
| Parent phase | 4 |
| Objective | Implement four public pages; fix nav; add footer credit |
| Files | `src/app/services/page.tsx`, `how-it-works/page.tsx`, `our-warehouse/page.tsx`, `about/page.tsx`, `src/lib/site.ts`, `SiteFooter.tsx`, optional shared `PageHero` if reused |
| Dependencies | Batch 2 tokens helpful but not blocking |
| Validation | `npm run build`; click every nav/footer link |
| Browser | Desktop + mobile nav |
| Commit boundary | `launch: add public pages and footer credit` |
| Acceptance | All nav links 200; warehouse at `/our-warehouse`; credit visible |

### Batch 4 — Final shell and deployment (30–45 min)

| Field | Detail |
| --- | --- |
| Parent phase | 4 + 9 + 10 |
| Objective | Legal shells, 404, deploy, hosted validation |
| Files | `privacy-policy/page.tsx`, `cookie-policy/page.tsx`, `terms/page.tsx`, `not-found.tsx`, `constants.ts` (privacy path), optional `sitemap.ts` |
| Dependencies | PO legal copy input; Batches 1–3 on `main` |
| Env vars | All Hostinger production vars from section 27 |
| Validation | Hosted quotation end-to-end; email inbox check; MySQL row |
| Commit boundary | `launch: legal shells, 404, and path fixes` |
| Deploy | Final push to `main`; confirm Hostinger redeploy |
| Acceptance | Hosted quote + email + no broken critical links |

**Total estimated time:** 2h 45m – 3h 45m (aggressive; legal copy availability is the main variable).

---

## 26. Exact file scopes

### Batch 1

- `src/components/quote/QuoteForm.tsx`
- `src/components/quote/QuoteStepReview.tsx`
- `src/lib/quote/schema.ts`
- `src/lib/quote/submit.ts`
- `src/lib/email/transport.ts`
- `src/lib/email/resend-transport.ts` (new)
- `.env.example`
- `package.json` / `package-lock.json` (Resend dependency only)

### Batch 2

- `src/app/globals.css`
- `src/components/sections/CoreCapabilities.tsx`
- `src/components/sections/CustomerCategories.tsx`
- `src/components/sections/WarehouseTour.tsx`
- `src/components/sections/QuoteCallToAction.tsx`
- `src/components/forms/Field.tsx`
- `src/components/quote/QuoteSubmissionError.tsx`

### Batch 3

- `src/app/services/page.tsx` (new)
- `src/app/how-it-works/page.tsx` (new)
- `src/app/our-warehouse/page.tsx` (new)
- `src/app/about/page.tsx` (new)
- `src/lib/site.ts`
- `src/components/layout/SiteFooter.tsx`

### Batch 4

- `src/app/privacy-policy/page.tsx` (new)
- `src/app/cookie-policy/page.tsx` (new)
- `src/app/terms/page.tsx` (new)
- `src/app/not-found.tsx` (new)
- `src/lib/quote/constants.ts`
- Optional: `src/app/sitemap.ts`

**Do not modify in launch batches:** Prisma schema, migrations, Turnstile files (leave dormant for Phase 9), homepage structure beyond Light fixes, Three.js hero, existing audit reports.

---

## 27. Environment-variable matrix

| Variable | Side | Launch required | Hostinger | Notes |
| --- | --- | --- | --- | --- |
| `DATABASE_URL` | Server | Yes | Yes | PO confirmed |
| `RESEND_API_KEY` | Server | Yes | Yes | New for Batch 1 |
| `EMAIL_FROM` | Server | Yes | Yes | Verified sender in Resend |
| `QUOTE_NOTIFICATION_EMAIL` | Server | Yes | Yes | Internal recipient |
| `SITE_MODE` | Server | Yes | Yes | Keep `preview` until launch review |
| `NEXT_PUBLIC_SITE_URL` | Client/build | Yes | Yes | Hostinger preview/production URL |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client | **No** | **No** | Phase 9 |
| `TURNSTILE_SECRET_KEY` | Server | **No** | **No** | Phase 9 |
| `TURNSTILE_BYPASS_DEV` | Server | **No** | **No** | Must not use |

---

## 28. Validation matrix

| Check | Command / action | Expected |
| --- | --- | --- |
| Lint | `npm run lint` | Exit 0 |
| Typecheck | `npm run typecheck` | Exit 0 |
| Build | `npm run build` | Exit 0; migrate deploy succeeds |
| Local quote | Browser `/get-a-quote` → submit | Success reference; no verification step |
| Local DB | Inspect `QuoteRequest` | Row created |
| Local email attempts | Inspect `QuoteNotificationAttempt` | 2 rows; SENT or FAILED |
| Light mode | Toggle Light on `/` | All sections readable |
| Nav links | Click all header/footer links | HTTP 200 |
| Hosted quote | PO on Hostinger | Row + reference |
| Hosted email | PO inbox | Customer + internal received |
| Robots preview | `GET /robots.txt` | Disallow all when `SITE_MODE=preview` |
| No secrets in Git | Review diff | No API keys committed |

---

## 29. Branch and commit plan

**Current state:**

- Branch: `audit/phase-7-quotation-verification-completion`
- Uncommitted: `PHASE_7_QUOTATION_VERIFICATION_COMPLETION_AUDIT.md`
- This report: `PACKSENDGO_FINAL_COMPLETION_GAP_AUDIT.md`

**Recommended sequence (Product Owner executes Git):**

1. On audit branch: commit both audit reports (docs only) — optional separate docs commit.
2. Merge audit branch to `main` **or** cherry-pick docs only — does not require redeploy if docs-only.
3. Create `launch/final-completion` from current `main` (at or after `9def1d2`).
4. Implement Batches 1–4 sequentially on `launch/final-completion` with one commit per batch (four commits maximum).
5. Merge `launch/final-completion` → `main` to trigger Hostinger auto-deploy.
6. Avoid parallel feature branches — single launch branch reduces conflict risk.

Cursor must not run Git commands.

---

## 30. Hostinger deployment plan

1. Set env vars: `DATABASE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`, `QUOTE_NOTIFICATION_EMAIL`, `SITE_MODE=preview`, `NEXT_PUBLIC_SITE_URL`.
2. Do **not** set Turnstile variables.
3. Merge launch branch to `main`.
4. Wait for Hostinger build (`prisma migrate deploy && prisma generate && next build`).
5. Confirm build log: migration idempotent, no pending migrations error.
6. Load temporary domain `/get-a-quote` — confirm no verification UI.
7. Submit test quotation — confirm success.
8. Verify MySQL row and Resend delivery.
9. Keep `SITE_MODE=preview` until PO explicit public indexing review.

---

## 31. Hosted acceptance test

1. Homepage loads in Light and Dark mode without contrast failures.
2. All navigation and footer links resolve (no 404 on primary nav).
3. `/get-a-quote` completes without verification step.
4. Success reference displayed; draft cleared on refresh.
5. `QuoteRequest` row exists in Hostinger MySQL.
6. Two `QuoteNotificationAttempt` rows exist.
7. Customer email received at submitted address.
8. Internal email received at `QUOTE_NOTIFICATION_EMAIL`.
9. `/robots.txt` blocks crawling (preview mode).
10. Footer shows We Build Anything credit linking to `https://zapatechnologies.com`.
11. Legal pages load (content may be pending-marked).
12. Failed email test (optional): quote still persisted; attempt marked FAILED.

---

## 32. Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| 2–3 hour window exceeded by public pages | Medium | Use homepage copy reuse; minimal layouts |
| Legal content not supplied by PO | High | Shell pages with pending markers; block only if PO requires full legal text |
| Resend domain not verified | High | PO verifies sender in Resend dashboard before deploy |
| Engine Node 22 vs 24 | Low | Build already passed on 22.18.0 |
| Removing Turnstile from schema breaks API clients | Low | No external clients; update schema and payload together |
| Light mode fix incomplete | Medium | Prioritise QuoteCallToAction and card panels |
| Checklist Turnstile gating confusion | Low | Update checklist post-launch in separate docs task |

---

## 33. Estimated completion time

| Batch | Duration |
| --- | --- |
| Batch 1 — Quotation + Resend | 45–60 min |
| Batch 2 — Light mode | 40–50 min |
| Batch 3 — Public pages + footer | 50–70 min |
| Batch 4 — Shell + deploy + hosted test | 30–45 min |
| **Total** | **2h 45m – 3h 45m** |

Achievable within 3 hours if legal shells use minimal approved copy and public pages reuse existing homepage data without custom design.

---

## 34. Final launch checklist

- [ ] Turnstile removed from launch quotation path (not bypassed)
- [ ] Resend transport implemented and configured
- [ ] Light mode readable on homepage and form
- [ ] `/services`, `/how-it-works`, `/our-warehouse`, `/about` live
- [ ] Nav hrefs aligned (`/our-warehouse`)
- [ ] Legal pages live (PO-approved or pending-marked)
- [ ] Privacy path consistent (`/privacy-policy`)
- [ ] Footer We Build Anything credit added
- [ ] `not-found.tsx` added
- [ ] Local lint, typecheck, build pass
- [ ] Merged to `main` and Hostinger redeployed
- [ ] Hosted quotation creates MySQL row
- [ ] Hosted emails delivered
- [ ] `SITE_MODE=preview` retained until PO public launch review
- [ ] Product Owner explicit launch acceptance

---

## 35. Audit verdict

**READY FOR TIMEBOXED FINAL IMPLEMENTATION**

The repository contains sufficient completed infrastructure to launch within a focused 2–3 hour implementation session provided the Product Owner executes the four batches in order, supplies Resend credentials and email addresses, and accepts minimal public/legal page shells where full copy remains pending.

---

**Audit completion:** PASS
**Source files modified:** None (this report only)
**Environment values exposed:** None
**External services contacted:** None
**Git commands run:** None
