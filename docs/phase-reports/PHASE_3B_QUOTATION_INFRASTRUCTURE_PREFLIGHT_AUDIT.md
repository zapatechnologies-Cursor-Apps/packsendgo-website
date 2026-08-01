# Phase 3B Quotation Infrastructure and Production Integrations Preflight Audit

**Date:** 2026-08-01  
**Mode:** API Saving Mode — audit and implementation-planning only  
**Repository:** `D:\Projects\packsendgo-website`  
**Expected branch:** `feature/phase-3b-quotation-infrastructure`  
**Base commit:** `a6bf7dd` — Merge PackSendGo quotation form foundation  
**Product Owner acceptance:** PENDING

---

## 1. Objective

Audit the accepted Phase 3A1 quotation implementation and define the exact, controlled implementation plan for Phase 3B: **Quotation infrastructure and production integrations**. Phase 3B must determine how the existing local implementation becomes safely testable in staging and production without expanding V1 product scope.

This audit does not implement integrations, configure credentials, connect to external services, apply migrations or modify source code.

---

## 2. Current Phase 3A1 baseline

Phase 3A1 is merged and accepted **with conditions** (2026-08-01).

| Area | Status |
| --- | --- |
| `/get-a-quote` five-step form | Implemented; Product Owner browser validation passed |
| Shared Zod validation (client + server) | Implemented |
| Prisma/MySQL schema + migration SQL | Created; **not applied** |
| `POST /api/quote` | Implemented |
| Idempotency (client key + DB unique constraint) | Implemented; DB tests blocked |
| Honeypot (`website` field) | Implemented |
| Turnstile boundary (server + client widget loader) | Implemented; live keys untested |
| Rate-limit boundary | No-op placeholder only |
| Email abstraction + development log transport | Implemented; **no live provider adapter** |
| SessionStorage draft persistence | Implemented |
| Accessibility and responsive behaviour | Product Owner validated |
| Local implementation verdict | **READY WITH CONDITIONS** |
| Production readiness verdict | **NOT READY** |

**Blocked infrastructure tests (not failures):**

- Database-backed successful quotation persistence
- Database-backed duplicate-idempotency test
- Live Turnstile verification
- Live email delivery

---

## 3. Authority reviewed

| # | Document | Purpose |
| --- | --- | --- |
| 1 | `docs/00_PROJECT_AUTHORITY.md` | Quotation workflow, stack, exclusions, Hostinger |
| 2 | `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md` | V1 scope, admin handling limits |
| 3 | `docs/03_TECHNICAL_ARCHITECTURE.md` | Submission flow, data model, security, env categories |
| 4 | `docs/04_BUILD_PHASE_CHECKLIST.md` | Phase 3A status and production gates |
| 5 | `docs/06_QUOTATION_FORM_SPEC.md` | Field register, email, privacy, retention |
| 6 | `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` | Deployment, MySQL, email DNS, rollback |
| 7 | `docs/phase-reports/PHASE_3A_QUOTATION_FORM_PREFLIGHT_AUDIT.md` | Accepted field register and PO decisions |
| 8 | `docs/phase-reports/PHASE_3A_QUOTATION_FORM_IMPLEMENTATION_REPORT.md` | Implementation baseline and blockers |
| 9 | `.env.example` | Runtime variable placeholders |
| 10 | `package.json` | Build scripts, Prisma integration, Node engine |
| 11 | `prisma/schema.prisma` | Data model |
| 12 | `prisma/migrations/20260801180000_init_quotation/migration.sql` | Initial migration |
| 13 | `src/app/api/quote/route.ts` | API handler |
| 14 | `src/lib/quote/submit.ts` | Submission orchestration |
| 15 | `src/lib/security/turnstile.ts` | Turnstile verification |
| 16 | `src/lib/security/rate-limit.ts` | Rate-limit boundary |
| 17 | `src/lib/email/transport.ts` | Email transport factory |
| 18 | `src/lib/email/types.ts` | Email messages and configuration |
| 19 | `.cursor/rules/00-packsendgo-api-saving-governance.mdc` | Audit controls |

---

## 4. Existing database architecture

Phase 3A1 implements a **consolidated single-table model** aligned with `docs/03_TECHNICAL_ARCHITECTURE.md` §7.2 (JSON consolidation permitted).

| Model | Purpose |
| --- | --- |
| `QuoteRequest` | Authoritative quotation record: reference, status, idempotency key, all structured form fields, consent timestamps |
| `QuoteNotificationAttempt` | Independent customer and internal email attempt records |

**Enums:**

| Enum | Values | Notes |
| --- | --- | --- |
| `QuoteStatus` | `RECEIVED` only | Other lifecycle statuses in architecture doc deferred to future admin tooling |
| `EmailAttemptType` | `CUSTOMER`, `INTERNAL` | One attempt record per message |
| `EmailAttemptStatus` | `SENT`, `FAILED`, `LOGGED` | `LOGGED` used by development transport |

**Submission flow (implemented):**

```
POST /api/quote
  → strict Zod validation
  → honeypot check
  → configuration guard (DATABASE_URL; production also Turnstile + email)
  → rate-limit check (no-op)
  → Turnstile verification
  → idempotency lookup
  → Prisma transaction (QuoteRequest create)
  → customer email + attempt record
  → internal email + attempt record
  → JSON success response
```

Database record is authoritative. Email failure does not roll back the quotation.

---

## 5. Prisma schema findings

### 5.1 Models and fields

**`QuoteRequest`** — 54 data columns plus `id`, `status`, timestamps:

- **Identity / reference:** `id` (UUID), `publicReference` (unique), `idempotencyKey` (unique), `status`
- **Contact:** `contactName`, `companyName`, `email`, `telephone`, `websiteUrl`, `country`, `preferredContactMethod`
- **Business:** `businessStage`, `productCategory`, `productCategoryOther`, `currentFulfilment`, `requiredStartDate`, `enquiryReason`, `salesChannels` (JSON), `salesChannelOther`, `customPlatformDetails`
- **Orders / stock:** `monthlyOrderRange`, `skuCount`, `itemsPerOrder`, `seasonalPeaks`, `growthExpectation`, `stockVolume`, `storageType` (JSON), `productDimensions`, `productWeight`, `specialHandling` (JSON), `specialHandlingDetails`
- **Delivery / services:** `deliveryRegions` (JSON), `internationalDestinations`, `parcelDimensions`, `parcelWeight`, `trackingRequired`, `specialCourierRequired`, `specialCourierDetails`, `additionalServices` (JSON), `additionalServicesOther`, `brandedPackagingDetails`, `returnsVolume`
- **Consent / notes:** `additionalNotes`, `privacyConsent`, `privacyConsentAt`, `marketingConsent`, `marketingConsentAt`, `accuracyConfirmation`, `accuracyConfirmationAt`
- **Audit:** `createdAt`, `updatedAt`

**`QuoteNotificationAttempt`:** `id`, `quoteRequestId` (FK, cascade delete), `emailType`, `status`, `providerResponse`, `createdAt`

### 5.2 MySQL compatibility

| Aspect | Finding |
| --- | --- |
| Provider | `mysql` in schema and migration lock |
| Character set | `utf8mb4` / `utf8mb4_unicode_ci` |
| Date/time | `DATETIME(3)` for millisecond precision |
| JSON | Five JSON columns on `QuoteRequest`; MySQL native JSON supported |
| UUID | `VARCHAR(36)` string UUIDs — compatible |
| ENUM columns | Three MySQL ENUMs matching Prisma enums |
| VARCHAR limits | Match Zod/schema field limits |

**Compatible with Hostinger MySQL** per approved architecture. Exact MySQL version and JSON support on Hostinger Cloud Startup require Product Owner / Hostinger confirmation.

### 5.3 Indexes and unique constraints

| Constraint / index | Column(s) | Purpose |
| --- | --- | --- |
| `UNIQUE` | `publicReference` | Human-readable reference uniqueness (`PSG-YYYYMMDD-XXXX`) |
| `UNIQUE` | `idempotencyKey` | Duplicate-submission protection |
| `INDEX` | `email` | Lookup and future rate-limit / admin queries |
| `INDEX` | `createdAt` | Chronological listing and retention jobs |
| `INDEX` | `quoteRequestId` on attempts | Per-quotation email history |

### 5.4 Idempotency design

- Client generates `idempotencyKey` (16–64 chars); stored in separate `sessionStorage` key
- Server validates format; looks up existing record before create
- Duplicate request returns existing `publicReference` with `duplicate: true`; **does not re-send emails** (by design — safe replay)
- DB unique constraint on `idempotencyKey` prevents race duplicates at persistence layer
- New key issued on “Start again” and after successful submit

**Gap:** No explicit handling for concurrent duplicate requests (two simultaneous creates with same key). MySQL unique constraint will cause one transaction to fail with a server error rather than returning the existing reference. Acceptable for V1; optional Phase 3B hardening: catch unique violation and return existing record.

### 5.5 Quotation-reference uniqueness

- Format: `PSG-YYYYMMDD-XXXX` (`src/lib/quote/reference.ts`)
- Random 4-character suffix from alphabet excluding ambiguous characters
- Up to 8 collision retries against DB
- `publicReference` unique index enforces final uniqueness

**Note:** Reference generation uses `Math.random()`, not `crypto.getRandomValues()`. Acceptable for V1 qualification references; classify as deferred hardening if predictability concerns arise.

### 5.6 Email-attempt persistence

- Two independent `QuoteNotificationAttempt` rows per successful submission (customer, internal)
- Status mapped from transport result: `SENT`, `FAILED`, `LOGGED`
- `providerResponse` stores short provider message (max 500 chars)
- Attempts created **after** transaction commit (outside `$transaction`) — quotation survives email failure

**Gap:** No provider message ID field separate from `providerResponse`. Sufficient for V1 if provider ID stored in `providerResponse` string.

### 5.7 Fields suitable for future admin review

All typed columns on `QuoteRequest` support future internal review without schema change:

- `publicReference`, `status`, `createdAt`
- Full contact and business profile
- Volume, stock, delivery and service selections
- Consent flags and timestamps
- `emailAttempts` relation for delivery status

No `QuoteStatusHistory` table in V1 — status changes deferred.

### 5.8 JSON fields — justification

| Field | Content | Justified |
| --- | --- | --- |
| `salesChannels` | String array of channel enums | Yes — variable-length multi-select |
| `storageType` | String array | Yes — multi-select |
| `specialHandling` | String array (optional) | Yes — multi-select |
| `deliveryRegions` | String array | Yes — multi-select |
| `additionalServices` | String array (optional) | Yes — multi-select |

Normalisation into junction tables is deferred per architecture authority. JSON preserves complete structured data for future pricing/AI without V1 complexity.

### 5.9 Deliberately not persisted

| Data | Handling |
| --- | --- |
| Honeypot (`website` payload field) | Rejected server-side; never stored |
| Turnstile token | Verified only; never stored |
| Raw client IP | Not collected or stored |
| Session draft | `sessionStorage` only; client-side |

Conditional hidden values: server schema and `buildQuoteRecord` store `null` or empty arrays when conditionals do not apply (client-side cleanup also clears stale values).

---

## 6. Migration findings

### 6.1 Migration completeness

| Item | Status |
| --- | --- |
| Migration folder | `prisma/migrations/20260801180000_init_quotation/` |
| SQL file | Present — CREATE TABLE only |
| `migration_lock.toml` | Valid — `provider = "mysql"` |
| Destructive operations | **None** — initial schema only |
| Foreign key | `QuoteNotificationAttempt` → `QuoteRequest` ON DELETE CASCADE |

### 6.2 Schema ↔ migration alignment

Manual comparison confirms migration SQL matches `schema.prisma`:

- All columns, types, nullability and defaults align
- Unique indexes and secondary indexes match `@@unique` and `@@index` directives
- ENUM values match Prisma enums

### 6.3 Safe application to empty Hostinger MySQL

**Yes.** Migration creates two new tables on an empty database with no ALTER/DROP. Safe first deploy.

### 6.4 Shadow database

| Context | Requirement |
| --- | --- |
| `prisma migrate dev` (local development) | Shadow database used by Prisma to detect drift — requires local MySQL capable of temporary DB creation |
| `prisma migrate deploy` (staging/production) | **Shadow database not required** — applies committed migrations sequentially |
| Empty production database | First `migrate deploy` applies `20260801180000_init_quotation` only |

### 6.5 Migration commands policy

| Command | Local dev | Staging | Production |
| --- | --- | --- | --- |
| `prisma migrate dev` | Permitted for new migration authoring | **Prohibited** | **Prohibited** |
| `prisma migrate deploy` | Permitted after local validation | **Required** | **Required** |
| `prisma db push` | Permitted only for throwaway local experiments | **Prohibited** | **Prohibited** |
| `prisma migrate reset` | Caution — destructive | **Prohibited** | **Prohibited** |

`prisma db push` bypasses migration history and must not be used in staging or production per deployment plan and governance.

### 6.6 Prisma Client generation on Hostinger build

Current `package.json`:

```json
"build": "prisma generate && next build"
```

- `prisma generate` requires **no database connection** — reads `schema.prisma` only
- Appropriate for Hostinger build step before `next build`
- Ensures deployed client matches committed schema

**Recommendation:** Retain this build script for Phase 3B. Run `prisma migrate deploy` as a **separate pre-start or post-build deployment step** (Product Owner / Hostinger delegate), not inside `npm run build`, so failed migrations do not produce a running app against wrong schema.

---

## 7. Environment-separation plan

### 7.1 Required environments

| Environment | Database purpose | Isolation |
| --- | --- | --- |
| **Local development** | Developer testing, migration authoring, persistence and idempotency tests | Isolated local or Docker MySQL; must not point at staging/production |
| **Staging** | Pre-production E2E validation: migration deploy, email (sandbox/test mode), Turnstile test keys, rate-limit behaviour | **Must be separate database** from production |
| **Production** | Live quotation storage for packsendgo.com | **Must be separate database** from staging |

### 7.2 Per-environment policy

| Policy | Local | Staging | Production |
| --- | --- | --- | --- |
| `DATABASE_URL` ownership | Developer machine / local MySQL | Hostinger staging DB credentials (PO-managed) | Hostinger production DB credentials (PO-managed) |
| Migration policy | `migrate dev` for new migrations; `migrate deploy` to test deploy path | `migrate deploy` only | `migrate deploy` only; backup before each migration |
| Seed data | Optional manual test submissions | Synthetic test data only; no production copies | Real customer data — no artificial seed |
| Test-data policy | Free-form test enquiries | Clearly marked test submissions; periodic cleanup per retention decision | Real enquiries only; no load testing |
| Backup expectations | Optional | Backup before first migration; periodic per Hostinger plan | **Mandatory backup before every migration**; ongoing Hostinger backups |
| Access restrictions | Developer only | PO + authorised delegate | PO + minimum-privilege DB user for app |
| Credential rotation | Low priority | Rotate on compromise or staff change | Rotate on schedule or compromise; document in secure offline record |

### 7.3 Hostinger configuration recommendation

**Prefer: separate databases with separate database users** (minimum privilege per environment).

| Option | Assessment |
| --- | --- |
| One database, separate schemas | Possible on MySQL but weaker isolation; not recommended |
| **Separate databases** | **Recommended** — aligns with staging/production separation |
| **Separate database users** | **Recommended** — app user: INSERT/SELECT/UPDATE on quotation tables only; no DROP; migration user used only during deploy |
| Separate Hostinger accounts | Unnecessary if separate DBs available on same plan |

**Requires Hostinger confirmation:**

- Number of MySQL databases included on Cloud Startup plan
- Whether staging subdomain (e.g. `staging.packsendgo.com`) and separate Node.js app instance are supported
- MySQL version, connection limit and max packet size
- Whether `prisma migrate deploy` can run via SSH, Hostinger CLI or manual phpMyAdmin import alternative
- Automated backup schedule and restore procedure

Do not assume Redis, PostgreSQL, cron workers or multiple Node processes unless confirmed.

---

## 8. Hostinger MySQL requirements

| Requirement | Detail |
| --- | --- |
| Engine | MySQL (Hostinger-managed) |
| Character set | `utf8mb4` (migration default) |
| Initial schema | Two tables via `20260801180000_init_quotation` |
| Connection | `DATABASE_URL` in Hostinger environment settings |
| ORM | Prisma 6.19.3 |
| Node.js | `>=24 <25` per `package.json` — **confirm Hostinger support** |
| Pooling | Prisma default pool; tune if connection limits reported |
| Migrations | `npx prisma migrate deploy` against target `DATABASE_URL` |
| Backups | Export before first production migration |

---

## 9. Database credential model

| Credential | Scope | Privileges |
| --- | --- | --- |
| `DATABASE_URL` (app runtime) | Staging / production Node.js app | SELECT, INSERT, UPDATE on `QuoteRequest`, `QuoteNotificationAttempt`; no DDL |
| Migration credentials | Deploy step only (may be same URL in V1 if Hostinger restricts) | CREATE, ALTER, INDEX — used only during `migrate deploy` |
| Human admin access | Product Owner / DBA | Hostinger panel or read-only reporting user — separate from app user where possible |

**Rotation:** Store all URLs in Hostinger env config and secure offline record (`docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` §6). Rotate on personnel change or suspected compromise.

**Never commit** `DATABASE_URL` to Git.

---

## 10. Migration application plan

### 10.1 Sequence

1. **Local:** Configure `DATABASE_URL` → `npx prisma migrate deploy` (or `migrate dev` if creating new migrations) → verify tables → run persistence tests
2. **Staging:** Provision empty MySQL → set `DATABASE_URL` → backup (empty baseline) → `npx prisma migrate deploy` → verify `_prisma_migrations` table → smoke test API
3. **Production:** Provision empty MySQL → backup → `npx prisma migrate deploy` → verify → deploy application

### 10.2 Pre-migration checks

- [ ] Committed migration SQL reviewed (no destructive statements)
- [ ] `prisma migrate status` shows pending migration
- [ ] `DATABASE_URL` targets correct environment (verify database name)
- [ ] Backup completed (staging first deploy; mandatory production)
- [ ] Application not serving traffic against wrong schema (deploy migration before or atomically with app that requires tables)

### 10.3 Failed migration handling

- Do not run `db push` to recover
- Restore from backup if partial state
- Fix forward with new migration only after PO approval
- Document error in phase report before retry

---

## 11. Persistence test plan

### 11.1 Test matrix

| # | Test | Expected outcome |
| --- | --- | --- |
| P1 | Successful quotation creation | One `QuoteRequest` row; HTTP 200; reference returned |
| P2 | Reference format | Matches `PSG-YYYYMMDD-XXXX` pattern |
| P3 | All required typed fields persisted | Column values match submitted payload |
| P4 | Optional fields | Stored when provided; `NULL` when omitted |
| P5 | Conditional hidden values | e.g. no `salesChannelOther` when Other not selected; `internationalDestinations` null when International not selected |
| P6 | Consent timestamps | `privacyConsentAt`, `accuracyConfirmationAt` set; `marketingConsentAt` set only when opted in |
| P7 | Idempotency key uniqueness | Second insert with same key fails or returns existing (see §5.4 race note) |
| P8 | Repeated identical submission | Same `idempotencyKey` → same reference, `duplicate: true`, no second row |
| P9 | Partial email failure replay | Quotation stored; failed attempt recorded; idempotent replay does not duplicate row (emails not re-sent on duplicate — document for ops) |
| P10 | Quotation status | `RECEIVED` default |
| P11 | Customer email attempt | One `QuoteNotificationAttempt` row, type `CUSTOMER` |
| P12 | Internal email attempt | One row, type `INTERNAL` |
| P13 | Transaction rollback on persistence failure | Simulate invalid data / constraint — no orphan partial record (single-table create simplifies this) |
| P14 | Honeypot not persisted | Rejected at API; no row |
| P15 | Turnstile token not persisted | No column exists; verify DB after submit |
| P16 | Raw IP not persisted | No IP column; verify |

### 11.2 Environment allocation

| Tests | Local | Staging | Production |
| --- | --- | --- | --- |
| P1–P16 (synthetic data) | **Permitted** | **Required** before production | **Prohibited** (no synthetic load) |
| Single smoke submission | Optional | **Required** | **One PO-authorised real test** after go-live |
| Duplicate idempotency (P8) | Permitted | **Required** | Prohibited except incident debugging |
| Email failure simulation (P9) | Permitted (mock transport) | **Required** with sandbox provider | Prohibited |
| Rate-limit abuse simulation | Permitted | **Required** | Prohibited |

---

## 12. Idempotency test plan

| Step | Action | Verify |
| --- | --- | --- |
| I1 | Submit valid quotation with key `K1` | Row created; reference `R1` |
| I2 | Replay exact payload with same `K1` | HTTP 200; `reference: R1`, `duplicate: true`; row count unchanged |
| I3 | Replay with same `K1` after customer email failed | Still one row; duplicate response (emails not re-sent — ops must use manual recovery) |
| I4 | Submit with new key `K2` | New row; new reference |
| I5 | Client “Start again” | New session key; I1 repeatable |
| I6 | Concurrent duplicate (optional staging) | At most one row; no 500 to customer if hardened |

**Local:** I1–I5 after MySQL configured  
**Staging:** I1–I6 before production  
**Production:** No deliberate duplicate testing

---

## 13. Email provider decision criteria

No provider is selected. Phase 3B must not choose silently.

### 13.1 Selection criteria (repository-derived)

| Criterion | Requirement |
| --- | --- |
| UK business suitability | Provider accepts UK sender; GDPR-aligned DPA available |
| Custom sender domain | Verified domain sending (not shared sandbox-only for production) |
| API-based transactional sending | REST or official Node.js SDK — no Hostinger sendmail reliance |
| Delivery-status reporting | Dashboard or webhook for bounces/failures |
| Sender and reply-to controls | Distinct `from`; `replyTo` customer email on internal notification (already in `buildInternalEmail`) |
| Development/staging separation | Sandbox or separate API keys / domains for non-production |
| V1 usage pricing | Suitable for low initial enquiry volume — **Product Owner to assess against quotes** |
| Data protection | Sub-processor list review; minimal payload (current templates are plain text, low PII in body) |
| Node.js support | Official or well-maintained HTTP integration |
| Customer + internal messages | Two sends per submission (implemented) |
| Failure and retry behaviour | Document provider retry rules; app records `FAILED` (implemented) |
| Domain authentication | SPF, DKIM, DMARC DNS records on sender domain |

### 13.2 Integration implications from current code

- `EmailTransport` interface ready (`src/lib/email/types.ts`)
- `createEmailTransport()` currently returns `DevelopmentLoggingTransport` even when `isConfigured` — **must be fixed in Phase 3B2**
- Configuration today checks only `EMAIL_FROM` + `QUOTE_NOTIFICATION_EMAIL`; provider API key not yet in `.env.example`
- `getEmailConfigurationStatus().isConfigured` does not verify provider credentials — Phase 3B must extend

### 13.3 Product Owner decision required

1. **Select transactional email provider** (e.g. Resend, SendGrid, Postmark, Amazon SES, Mailgun — PO to choose; audit does not rank)
2. **Confirm sender domain** (likely `packsendgo.com` or subdomain)
3. **Confirm `EMAIL_FROM` address** (verified sender)
4. **Confirm `QUOTE_NOTIFICATION_EMAIL`** (internal distribution list or mailbox)
5. **Approve DNS change window** for SPF/DKIM/DMARC

---

## 14. Email integration plan

### 14.1 Target architecture

```
submitQuote()
  → createEmailTransport() ─┬─ DevelopmentLoggingTransport (local, unconfigured)
                            ├─ StagingProviderTransport (sandbox key)
                            └─ ProductionProviderTransport (live key)
  → buildCustomerEmail() / buildInternalEmail()
  → transport.send() → provider API
  → QuoteNotificationAttempt (independent per message)
```

### 14.2 Transport matrix

| Environment | Transport | When |
| --- | --- | --- |
| Local (unconfigured) | `DevelopmentLoggingTransport` | No `EMAIL_FROM` / recipient |
| Local (configured) | Provider sandbox or log — **PO decision** | Developer testing |
| Staging | Provider sandbox/test mode | E2E validation |
| Production | Live provider adapter | Launch |

### 14.3 Message requirements (already partially implemented)

| Message | To | From | Reply-To | Content |
| --- | --- | --- | --- | --- |
| Customer acknowledgement | Submitted email | `EMAIL_FROM` | — | Reference, name, company, manual-review statement |
| Internal notification | `QUOTE_NOTIFICATION_EMAIL` | `EMAIL_FROM` | Customer email | Reference, contact summary, pointer to DB record |

**Phase 3B2 tasks:** Enrich templates per `docs/06_QUOTATION_FORM_SPEC.md` §12 (full structured summary in internal email); add Privacy Policy link when route exists.

### 14.4 Provider message IDs

Store provider message ID in `providerResponse` (e.g. `msg_id: abc123`) until a dedicated column is justified.

### 14.5 Duplicate-send avoidance

- Idempotent replay skips email sends — correct for double-click protection
- New submission = new idempotency key = new emails

### 14.6 API timeout handling

Phase 3B2 should wrap provider call with reasonable timeout (e.g. 10–15s); on timeout record `FAILED` attempt; return success to customer if DB committed.

### 14.7 Safe customer success after committed quotation

Already implemented: DB commit precedes email; success returned even if `emailMode: partial-failure`.

### 14.8 Prisma email-attempt model sufficiency

**Sufficient for V1.** Optional future fields: `providerMessageId`, `attemptNumber`, `sentAt` — not required for Phase 3B.

### 14.9 Pending configuration (do not invent)

- `EMAIL_FROM` — pending PO
- `QUOTE_NOTIFICATION_EMAIL` — pending PO
- Provider API key variable name — pending provider selection (document in `.env.example` during 3B2 only)

---

## 15. Email recovery plan

| Scenario | V1 handling |
| --- | --- |
| Quotation stored; customer email failed | Row + `FAILED` attempt; customer sees success with reference; ops monitor provider dashboard and `QuoteNotificationAttempt` |
| Quotation stored; internal email failed | Same; PackSendGo may miss lead unless DB monitored — **critical for ops** |
| Both failed | Quotation in DB; both attempts `FAILED`; manual recovery required |
| Provider timeout | Record `FAILED`; customer success if DB ok |
| Sender domain misconfiguration | Provider reject; `FAILED` attempt; fix DNS and manual resend |

### V1 recovery mechanism (recommended)

**Documented manual recovery only** — no admin dashboard in V1 scope.

| Method | Use |
| --- | --- |
| Hostinger / provider logs | Identify failure by reference |
| SQL read of `QuoteRequest` by `publicReference` | Retrieve full enquiry |
| Provider dashboard “resend” or new API call via **one-off CLI script** | Optional Phase 3B2 deliverable if PO approves minimal script (not full admin UI) |
| Internal forward | Reply manually using DB export |

**Product Owner decision:** Approve minimal resend CLI script (`scripts/resend-quote-emails.ts`) vs manual provider resend only.

---

## 16. Turnstile findings

### 16.1 Current implementation

| Aspect | Behaviour |
| --- | --- |
| Client | `TurnstileField.tsx` loads Cloudflare script when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` set; explicit render; token via callback |
| Token reset | `expired-callback` and `error-callback` clear token |
| Dev placeholder | When no site key, form uses `development-placeholder-token` |
| Dev bypass | `TURNSTILE_BYPASS_DEV=true` + `NODE_ENV !== production` → any token accepted |
| Production bypass prevention | Bypass disabled when `NODE_ENV === production` |
| Server verify | POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `secret` + `response` |
| Missing secret (non-prod) | Accepts placeholder modes |
| Missing secret (production) | Returns `configuration` failure |
| Remote IP | **Not passed** to siteverify (`remoteip` parameter unused) |
| Hostname validation | **Not implemented** (Cloudflare returns hostname; not checked) |
| Action validation | Not used |
| Token persistence | Never stored |
| Replay | Server does not track used tokens; relies on Turnstile token single-use — **acceptable if verify called once per submission** |

### 16.2 Staging and production key separation

Use **separate Turnstile widgets** in Cloudflare dashboard:

- Staging site key + secret (hostname: staging domain)
- Production site key + secret (hostname: packsendgo.com)

### 16.3 Cloudflare dashboard inputs (Product Owner actions)

1. Create Turnstile widget for staging domain
2. Create Turnstile widget for production domain
3. Copy site keys → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
4. Copy secret keys → `TURNSTILE_SECRET_KEY`
5. Ensure widget mode suitable for form submit (managed/non-interactive per PO preference)
6. **Do not** set `TURNSTILE_BYPASS_DEV` in staging/production

### 16.4 Phase 3B3 hardening (recommended)

- Pass `remoteip` from `X-Forwarded-For` or Hostinger-trusted header if available
- Validate `hostname` in siteverify response matches expected domain
- Log verification failures server-side without token value

---

## 17. Live Turnstile test plan

| # | Test | Environment |
| --- | --- | --- |
| T1 | Widget renders with live site key | Staging |
| T2 | Submit without completing challenge | Rejected (`missing-token`) |
| T3 | Successful challenge → submit | Accepted |
| T4 | Expired token (wait or force expiry) | Token cleared; resubmit required |
| T5 | Invalid/tampered token | Rejected |
| T6 | Production keys on production domain only | Production smoke |
| T7 | Bypass env unset in production | Verify bypass impossible |
| T8 | CSP allows `challenges.cloudflare.com` | Staging + production (Phase 9 dependency) |

Local: T2–T5 with dev bypass off and keys in `.env.local`  
Staging: T1–T5, T8  
Production: T6–T7 only (minimal)

---

## 18. Rate-limit options

Current: `NoOpRateLimiter` — always allows.

V1 constraints: **No Redis** (`docs/00_PROJECT_AUTHORITY.md` §18); Hostinger Cloud Startup; possible single Node process (confirm).

### Option A — Database-backed limits

Store rolling windows in new table e.g. `RateLimitEntry` (`keyHash`, `windowStart`, `count`).

| Factor | Assessment |
| --- | --- |
| Multi-process effectiveness | **Works** if all instances share MySQL |
| Raw IP privacy | Store HMAC(ip, secret) or email hash only |
| Email-based limits | Key on normalised email |
| Expiry/cleanup | Delete rows older than window; optional cron via Hostinger if available — **else lazy delete on check** |
| DB contention | Low at V1 volume; row-level upsert |
| Abuse resistance | Moderate |
| Operational complexity | Low — no new infrastructure |
| Hostinger compatibility | **High** — uses existing MySQL |
| Cost | None |
| Failure mode | **Recommend failure-open** with logging to avoid blocking legitimate enquiries if DB slow — PO may choose failure-closed for abuse spikes |

### Option B — External managed KV

(e.g. Upstash Redis, Cloudflare KV)

| Factor | Assessment |
| --- | --- |
| Multi-process | Excellent |
| Hostinger compatibility | **Uncertain** — new vendor, not in approved stack |
| Authority alignment | Redis excluded from V1 |
| Cost | Additional subscription |
| **Verdict** | **Not recommended for V1** without explicit PO architecture amendment |

### Option C — Reverse-proxy / edge controls

Cloudflare rate limiting in front of Hostinger.

| Factor | Assessment |
| --- | --- |
| Effectiveness | Good for coarse IP limits |
| Email-based limits | Not available at edge |
| Hostinger compatibility | Requires DNS through Cloudflare — **confirm current DNS setup** |
| Operational complexity | Medium — PO Cloudflare access |
| **Verdict** | **Optional supplement**, not sole V1 solution |

### Option D — Application hybrid

Database email + idempotency limits (implemented key) plus optional Cloudflare IP throttling.

| Factor | Assessment |
| --- | --- |
| Effectiveness | Good layered defence |
| Complexity | Medium |
| **Verdict** | **Best long-term**; email DB limits mandatory for V1 |

---

## 19. Recommended rate-limit architecture

**Primary: Option A — database-backed application rate limiting.**

### V1 design

| Limit | Key | Suggested window | Max |
| --- | --- | --- | --- |
| Per email | `HMAC(normalisedEmail, RATE_LIMIT_SECRET)` | 1 hour | 3 submissions |
| Per idempotency | Existing unique constraint | — | Duplicate replay only |
| Optional IP pseudonym | `HMAC(ip, RATE_LIMIT_SECRET)` | 15 minutes | 10 submissions |

- **No raw IP stored**
- New env var: `RATE_LIMIT_SECRET` (secret; staging/production required when rate limiting active)
- Lazy cleanup of expired windows during `check()`
- On DB error during limit check: **failure-open** with structured log (recommended for conversion safety) — PO to confirm

**Optional Phase 3B3+:** Cloudflare edge rule on `POST /api/quote` if domain proxied through Cloudflare.

**Requires confirmation:** Whether Hostinger runs multiple Node instances (limits must be DB-backed regardless).

---

## 20. Privacy data inventory

### 20.1 Quotation personal data collected

| Data | Category |
| --- | --- |
| `contactName`, `companyName`, `email`, `telephone`, `country` | Personal / business contact |
| `websiteUrl` | Business identifier (optional) |
| `additionalNotes` | Possibly personal/business sensitive |
| Consent flags and timestamps | Legal consent record |

### 20.2 Operational data

| Data | Category |
| --- | --- |
| `publicReference`, `status`, `createdAt`, `updatedAt` | Operational |
| All qualification fields (volumes, channels, etc.) | Business enquiry data |

### 20.3 Email-attempt data

| Data | Category |
| --- | --- |
| `emailType`, `status`, `providerResponse`, `createdAt` | Operational / minimal |

### 20.4 Security metadata

| Data | Stored? |
| --- | --- |
| Turnstile token | No |
| Honeypot field | No |
| Raw IP | No |
| Idempotency key | Yes — security/dedup |
| Rate-limit pseudonyms (future) | Hashed keys only |

### 20.5 Deliberately not collected

Raw IP, Turnstile tokens, honeypot values, analytics field values (per spec §16).

### 20.6 Privacy Policy dependency

- Form links to `/privacy` (`PRIVACY_POLICY_PATH`)
- Footer links to `/privacy-policy` (`src/lib/site.ts`) — **path inconsistency**
- Privacy Policy route **not implemented**
- Production quotation submission should remain gated until approved Privacy Policy is live and linked consistently

---

## 21. Retention decision register

**Not legal advice.** Product Owner / legal input required.

| # | Decision | Options / notes |
| --- | --- | --- |
| R1 | **Quotation retention duration** | e.g. 12 / 24 / 36 months after last activity — pending |
| R2 | **Unsuccessful/abandoned submissions** | Not stored (client-only draft); no server action needed |
| R3 | **Email-attempt retention** | Align with quotation retention or shorter operational window |
| R4 | **Idempotency key retention** | Same as quotation record (tied to row) or anonymise on deletion |
| R5 | **Rate-limit metadata retention** | Short — 24–48 hours after window expiry (automatic cleanup) |
| R6 | **Database backup retention** | Hostinger default vs business requirement — confirm with Hostinger |
| R7 | **Deletion-request handling** | Process to locate by email/reference and delete or anonymise — manual V1 |

### Implications

- Backups may retain deleted data until backup rotation — document in Privacy Policy
- Failed email attempts contain no email body — low sensitivity
- Marketing consent requires honouring opt-out until deletion

---

## 22. Runtime environment matrix

| Variable | Local optional | Local required | Staging required | Production required | Public | Secret | Pending | Default |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | — | For canonical URLs | Yes | Yes | Yes | No | No | localhost dev OK |
| `DATABASE_URL` | If no DB tests | For persistence tests | Yes | Yes | No | Yes | No | Empty in `.env.example` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes (placeholder) | — | Yes | Yes | Yes | No | No | Empty |
| `TURNSTILE_SECRET_KEY` | Yes | — | Yes | Yes | No | Yes | No | Empty |
| `TURNSTILE_BYPASS_DEV` | Optional | — | **Forbidden** | **Forbidden** | No | No | No | `false` |
| `EMAIL_FROM` | Yes | — | Yes (sandbox) | Yes | No | No* | Yes — PO | Empty |
| `QUOTE_NOTIFICATION_EMAIL` | Yes | — | Yes | Yes | No | No | Yes — PO | Empty |
| Provider API key | Yes | — | Yes | Yes | No | Yes | Yes — provider | Not in `.env.example` yet |
| `RATE_LIMIT_SECRET` | Optional | — | Yes (when 3B3 active) | Yes | No | Yes | No | Generate per env |
| `NODE_ENV` | Set by tooling | — | `production` typical | `production` | No | No | No | — |

\*Email addresses are not secret but should not be committed; treat as configuration.

---

## 23. Missing runtime validation

| Gap | Severity | Phase 3B action |
| --- | --- | --- |
| Provider API key not validated in `getRuntimeConfigurationIssues()` | Production blocker when email live | Add check in 3B2 |
| `createEmailTransport()` ignores configured state | Implementation bug | Fix in 3B2 |
| Turnstile hostname not validated | Hardening | 3B3 |
| No startup validation log of missing production vars | Operational | Optional health route or build-time check — PO decision |
| `prisma validate` requires `DATABASE_URL` | CI friction | Document CI env injection |
| Privacy path mismatch `/privacy` vs `/privacy-policy` | UX/legal | Resolve when legal pages implemented |
| Rate limit not enforced | Production blocker | 3B3 |

---

## 24. Deployment sequence

Adjusted safest order for Phase 3B:

| Step | Action | Owner |
| --- | --- | --- |
| 1 | Product Owner decisions: provider, emails, retention, staging domain | PO |
| 2 | Staging MySQL provisioned | PO / Hostinger |
| 3 | Staging `DATABASE_URL` configured in Hostinger | PO |
| 4 | Run `prisma migrate deploy` against staging DB | PO / delegate |
| 5 | Verify tables and `_prisma_migrations` | Delegate |
| 6 | Configure staging env vars (Turnstile test keys, email sandbox, `RATE_LIMIT_SECRET`) | PO |
| 7 | Deploy application build to staging (`npm ci`, `prisma generate`, `next build`) | Hostinger |
| 8 | Staging smoke: `GET /get-a-quote`, health | Delegate |
| 9 | Persistence tests P1–P16 on staging | Delegate |
| 10 | Email tests (sandbox) | Delegate |
| 11 | Turnstile tests T1–T5 | Delegate |
| 12 | Rate-limit tests | Delegate |
| 13 | **Legal:** Privacy Policy published; path aligned; consent link valid | PO |
| 14 | Production MySQL provisioned | PO / Hostinger |
| 15 | Production backup confirmed | PO |
| 16 | `prisma migrate deploy` on production | PO / delegate |
| 17 | Production env vars set (live keys) | PO |
| 18 | Deploy application to production | Hostinger |
| 19 | Post-deployment validation (minimal smoke + one authorised test enquiry) | PO |
| 20 | Monitor logs and email delivery | PO |

**Pre-deployment checks:** Build passes locally; migration SQL reviewed; no `TURNSTILE_BYPASS_DEV` in prod; secrets not in Git.

**Migration command:** `npx prisma migrate deploy`  
**Build command:** `npm run build` (includes `prisma generate`)  
**Runtime command:** `npm start` (or Hostinger-configured start)

---

## 25. Rollback plan

| Scenario | Action | Limitation |
| --- | --- | --- |
| Failed migration | Do not deploy app; restore DB backup if partial; fix forward | Schema may be partially applied |
| Successful migration; failed deployment | Fix forward redeploy; DB unchanged | — |
| Bad application release (no schema change) | Redeploy previous Git commit via Hostinger | — |
| Bad application release (after schema change) | Redeploy old app **only if backward compatible** | Old app may fail if schema incompatible |
| Credential compromise | Rotate keys in Hostinger; redeploy if needed | — |
| Email misconfiguration | Disable via unset provider key → configuration 503 in production | Quotations blocked if strict config guard |
| Turnstile failure | Customer sees verification error; no persistence | — |

**Schema rollback:** Initial migration only — rollback = drop tables (destructive, data loss) or restore backup. After live data exists, **no destructive down migration** without PO approval.

---

## 26. Operational failure matrix

| Failure | Customer impact | Data state | V1 recovery |
| --- | --- | --- | --- |
| Quotation stored; customer email failed | Success + reference | Row + FAILED attempt | Manual resend from provider or script |
| Quotation stored; internal email failed | Success + reference | Row + FAILED attempt | DB query by reference; manual contact |
| Both emails failed | Success + reference | Row + 2 FAILED | Ops log review |
| Provider timeout | Success if DB ok | Row + FAILED | Retry manual |
| Duplicate idempotency request | Success; same reference | Single row | None needed |
| Database unavailable | 503 configuration/server | None | Hostinger MySQL restore |
| DB transaction failure | Generic error | None | Retry |
| Turnstile unavailable | Verification error | None | Cloudflare status; retry |
| Rate-limit service unavailable | Allowed (if failure-open) or 429 | — | Fix DB connectivity |
| Malformed payload | 400 field errors | None | User correction |
| Sender domain misconfiguration | Success; FAILED email | Row stored | Fix DNS; resend |
| App deployment rollback | Depends | DB unchanged | Redeploy |
| Migration failure | Site may not start | Partial possible | Restore backup |

### Phase 3B operational tooling

| Tool | Recommendation |
| --- | --- |
| Admin resend UI | **Out of scope** — propose PO decision |
| CLI resend script | **Optional** minimal script — PO decision |
| Scheduled email retry | **Deferred** — no background workers in V1 |
| DB status field changes | **Not required** — `QuoteNotificationAttempt` sufficient |
| Documented manual recovery | **Required** in Phase 3B4 report |

---

## 27. Security findings

| Finding | Classification |
| --- | --- |
| Secrets not in client bundle (Turnstile secret, DATABASE_URL) | Acceptable |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` public by design | Acceptable |
| Strict Zod `.strict()` rejects unknown keys | Acceptable |
| Honeypot not persisted | Acceptable |
| Turnstile token not persisted | Acceptable |
| No raw IP storage | Acceptable |
| Redacted email dev logging | Acceptable |
| Prisma parameterised queries | Acceptable |
| Generic client errors | Acceptable |
| Idempotency key length validation (16–64) | Acceptable |
| `createEmailTransport()` always dev log when configured | **Requires Phase 3B2** |
| No production rate limiting | **Production blocker — Phase 3B3** |
| Turnstile no hostname/`remoteip` validation | **Requires Phase 3B3** hardening |
| Privacy Policy missing | **Production blocker** (legal) |
| Retention period undecided | **Production blocker** (legal/compliance) |
| Reference uses `Math.random()` | Deferred hardening |
| Idempotency race → possible 500 | Requires Phase 3B optional hardening |
| Internal email template minimal (DB pointer only) | Acceptable for V1; enrich in 3B2 |
| Staging DB must not use production credentials | Requires Phase 3B1 process |
| Email header injection | Low risk — plain text from validated fields; sanitisation applied |
| CSP for Turnstile not yet configured | Deferred to Phase 9 |
| Privacy link path inconsistency | Requires legal-pages phase alignment |

---

## 28. Scope exclusions

Phase 3B must **not** add:

- Customer accounts, admin quotation dashboard, payments, live pricing
- Parcel tracking, uploads, CRM, marketing automation, analytics, AI quotation
- Redis, background workers, automated sales sequences
- Unrelated homepage work

Minimal CLI resend tool only if explicitly approved by Product Owner.

---

## 29. Product Owner decisions required

| # | Decision |
| --- | --- |
| D1 | Approve Phase 3B subphase sequence |
| D2 | Select transactional email provider |
| D3 | Confirm sender domain and DNS change window |
| D4 | Confirm `EMAIL_FROM` address |
| D5 | Confirm `QUOTE_NOTIFICATION_EMAIL` |
| D6 | Approve staging subdomain / environment (if used) |
| D7 | Create Cloudflare Turnstile widgets (staging + production) |
| D8 | Approve quotation data retention period |
| D9 | Approve Privacy Policy content and route path |
| D10 | Approve rate-limit thresholds and failure-open vs failure-closed |
| D11 | Approve optional CLI resend script vs manual-only recovery |
| D12 | Confirm www redirect and canonical host |
| D13 | Authorise Hostinger MySQL provisioning (staging then production) |

---

## 30. External credentials required

| Credential | Source | Environment |
| --- | --- | --- |
| Staging `DATABASE_URL` | Hostinger MySQL | Staging |
| Production `DATABASE_URL` | Hostinger MySQL | Production |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (×2) | Cloudflare Turnstile | Staging, Production |
| `TURNSTILE_SECRET_KEY` (×2) | Cloudflare Turnstile | Staging, Production |
| Provider API key | Selected email provider | Staging (sandbox), Production |
| `EMAIL_FROM` | PO + provider verification | Staging, Production |
| `QUOTE_NOTIFICATION_EMAIL` | PO | Staging, Production |
| `RATE_LIMIT_SECRET` | Generated per environment | Staging, Production |
| DNS records (SPF, DKIM, DMARC) | Domain registrar / DNS panel | Production (and staging if separate sender) |

**Not configured during this audit.**

---

## 31. Hostinger confirmations required

| # | Question |
| --- | --- |
| H1 | Node.js 24.x supported on Cloud Startup? |
| H2 | How many MySQL databases included? |
| H3 | MySQL version and `utf8mb4` default? |
| H4 | Connection limit per database? |
| H5 | Procedure to run `npx prisma migrate deploy` (SSH, panel, CI)? |
| H6 | Separate staging Node.js app or environment supported? |
| H7 | Backup frequency and restore procedure? |
| H8 | Trusted client IP header for Turnstile `remoteip`? |
| H9 | Single vs multiple Node.js worker processes? |
| H10 | Environment variable management UI confirmed? |

---

## 32. Recommended Phase 3B subphases

### Phase 3B1 — Database and migration infrastructure

| Item | Detail |
| --- | --- |
| **Objective** | MySQL provisioning, migration deploy, local + staging persistence validation |
| **Authorised files** | `prisma/*`, `.env.example` (documentation only if needed), `src/lib/prisma.ts` (pool tuning if required), phase reports |
| **Credentials** | `DATABASE_URL` (local, staging) |
| **PO inputs** | Hostinger DB provisioned; local MySQL decision |
| **Tasks** | Configure local MySQL; `migrate deploy`; run P1–P16 locally; document staging migrate steps |
| **Validation** | Tables exist; successful quotation persisted; idempotency tests I1–I5 |
| **Blockers** | No MySQL available |
| **Commit boundary** | Infrastructure docs + any pool config; no email/Turnstile changes |
| **Rollback** | Drop dev tables or restore empty backup |

### Phase 3B2 — Transactional email provider adapter

| Item | Detail |
| --- | --- |
| **Objective** | Provider adapter, fix transport factory, DNS verification support, staging email tests |
| **Authorised files** | `src/lib/email/*`, `.env.example`, `package.json` (if provider SDK added — justify) |
| **Credentials** | Provider API key, `EMAIL_FROM`, `QUOTE_NOTIFICATION_EMAIL` |
| **PO inputs** | D2–D5, D11 |
| **Tasks** | Implement provider transport; fix `createEmailTransport()`; extend config validation; enrich templates; optional resend script |
| **Validation** | Sandbox customer + internal delivery; FAILED path; attempt records |
| **Blockers** | Provider not selected; domain unverified |
| **Commit boundary** | Email layer complete; no Turnstile/rate-limit |
| **Rollback** | Revert to dev log transport via env unset |

### Phase 3B3 — Live Turnstile and production rate limiting

| Item | Detail |
| --- | --- |
| **Objective** | Live Turnstile verification; database rate limiter; production config guards |
| **Authorised files** | `src/lib/security/*`, `prisma/schema.prisma` + new migration (rate limit table only), `TurnstileField.tsx`, `.env.example` |
| **Credentials** | Turnstile keys; `RATE_LIMIT_SECRET` |
| **PO inputs** | D7, D10; Cloudflare widgets |
| **Tasks** | Rate limit table + implementation; hostname/`remoteip` hardening; remove bypass in staging/prod |
| **Validation** | T1–T8; rate-limit triggers 429 |
| **Blockers** | Turnstile keys missing |
| **Commit boundary** | Security boundaries production-ready |
| **Rollback** | Feature flag to no-op limiter only with PO approval (temporary) |

### Phase 3B4 — Staging end-to-end validation and production-readiness review

| Item | Detail |
| --- | --- |
| **Objective** | Full staging E2E; production readiness gate; deployment runbook |
| **Authorised files** | Phase reports, deployment notes; legal pages if in separate authorised phase |
| **Credentials** | All staging credentials |
| **PO inputs** | D8, D9, D13; Privacy Policy live |
| **Tasks** | Execute full test matrix; production deploy checklist; manual recovery doc |
| **Validation** | All staging tests pass; production blockers cleared |
| **Blockers** | Privacy Policy; retention decision |
| **Commit boundary** | Documentation and any critical fixes from staging findings |
| **Rollback** | Production deploy only after PO sign-off |

---

## 33. Exact files expected per subphase

| Subphase | Files |
| --- | --- |
| **3B1** | `prisma/schema.prisma`, `prisma/migrations/*`, `src/lib/prisma.ts`, `.env.example`, `docs/phase-reports/PHASE_3B1_*` |
| **3B2** | `src/lib/email/transport.ts`, `src/lib/email/types.ts`, new `src/lib/email/*provider*`, `src/lib/quote/submit.ts` (config checks), `.env.example`, `package.json` (if SDK), optional `scripts/resend-quote-emails.ts` |
| **3B3** | `src/lib/security/rate-limit.ts`, `src/lib/security/turnstile.ts`, `prisma/schema.prisma`, new migration, `src/components/quote/TurnstileField.tsx`, `src/lib/quote/submit.ts`, `.env.example` |
| **3B4** | `docs/phase-reports/PHASE_3B4_*`, updates to `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` only if PO authorises |

**Not in Phase 3B unless separately authorised:** legal page routes, admin dashboard, CRM.

---

## 34. Validation matrix

| Area | Local | Staging | Production |
| --- | --- | --- | --- |
| Migration deploy | Required | Required | Required |
| Persistence P1–P16 | Required | Required | Smoke only |
| Idempotency I1–I5 | Required | Required | Prohibited |
| Email sandbox/live | Optional | Required | One PO test |
| Turnstile T1–T5 | Optional | Required | T6–T7 |
| Rate limit | Optional | Required | Monitor only |
| Privacy Policy link | N/A | Required before prod | Required |
| Lint/typecheck/build | Required each subphase | CI/Hostinger build | Hostinger build |
| Config guard (503) | Required | Required | Required |

---

## 35. Risks

| Risk | Mitigation |
| --- | --- |
| Hostinger Node 24 unsupported | Confirm H1 before deploy; adjust `engines` if needed |
| Provider/domain verification delays launch | Start DNS early in 3B2 |
| Email failure invisible to sales team | Monitor FAILED attempts; internal notification critical |
| Idempotency skips email on replay | Document ops procedure |
| No Redis limits bypassed by distributed attack | DB rate limits + optional Cloudflare |
| Privacy Policy delay blocks launch | Parallel legal workstream |
| `prisma migrate deploy` access unclear | Confirm H5 early |
| Staging absent — test in production | **Reject** — require staging DB |

---

## 36. Production blockers

| Blocker | Owner |
| --- | --- |
| MySQL not provisioned / migration not applied | PO / Hostinger |
| Email provider not selected and verified | PO |
| `EMAIL_FROM` / `QUOTE_NOTIFICATION_EMAIL` not set | PO |
| Live Turnstile not configured | PO / Cloudflare |
| Production rate limiting not implemented | Phase 3B3 |
| Privacy Policy not published | PO / legal |
| Retention period not approved | PO / legal |
| Staging E2E not completed | Phase 3B4 |
| `createEmailTransport()` bug unfixed | Phase 3B2 |

---

## 37. Audit verdict

**READY WITH CONDITIONS**

Evidence:

- Phase 3A1 implementation is structurally sound and aligned with authority
- Prisma schema and migration are complete, non-destructive and Hostinger-compatible
- Email and security boundaries are correctly abstracted but not production-filled
- Clear subphase plan exists with known PO decisions and Hostinger confirmations
- Production blockers are identified and sequenced; none require architectural rework

Conditions: Product Owner decisions (§29), external credentials (§30), Hostinger confirmations (§31), and subphase implementation must complete before production quotation submission.

---

## 38. Recommended next action

1. **Product Owner:** Confirm Hostinger MySQL availability and staging environment (H1–H10).
2. **Product Owner:** Select transactional email provider (D2) and approve Phase 3B1 start.
3. **Implementation agent (Phase 3B1):** Configure local MySQL, apply `prisma migrate deploy`, execute persistence and idempotency tests P1–P16 and I1–I5 locally.
4. **Parallel:** Legal/Privacy Policy and retention decisions (D8, D9) to avoid blocking 3B4.

---

## 39. Product Owner acceptance status

**Product Owner acceptance: PENDING**

---

*Audit performed 2026-08-01. No source code, configuration, Prisma schema, package files, authority documents or checklists were modified. No packages installed. No database or external service contacted. No Git commands executed.*
