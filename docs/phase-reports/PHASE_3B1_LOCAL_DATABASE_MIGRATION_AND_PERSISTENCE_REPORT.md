# Phase 3B1 Local Database Migration and Persistence Report

**Date:** 2026-08-01
**Mode:** API Saving Mode — controlled local database implementation and testing
**Repository:** `D:\Projects\packsendgo-website`
**Branch:** `feature/phase-3b-quotation-infrastructure`
**Base commit:** `5ecffaa`
**Product Owner acceptance:** ACCEPTED WITH CONDITIONS — 2026-08-01

**Programme tracker:** Phase 7 — Quotation form and MySQL (report filename retains Phase 3B1 terminology)

---

## 1. Objective

Apply the committed Phase 3A quotation migration to the isolated local MySQL database and prove the database-backed quotation workflow through structured API and database validation tests.

---

## 2. Authority reviewed

| Document | Purpose |
| --- | --- |
| `docs/phase-reports/PHASE_3B_QUOTATION_INFRASTRUCTURE_PREFLIGHT_AUDIT.md` | Persistence test matrix, migration policy |
| `docs/phase-reports/PHASE_3B1_LOCAL_MYSQL_SCAFFOLD_REPORT.md` | Local Docker MySQL baseline |
| `docs/phase-reports/PHASE_3A_QUOTATION_FORM_IMPLEMENTATION_REPORT.md` | Phase 3A implementation baseline |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Checklist gates |
| `prisma/schema.prisma` | Data model (read only — not modified) |
| `prisma/migrations/20260801180000_init_quotation/migration.sql` | Migration reviewed (not modified) |
| `prisma/migrations/migration_lock.toml` | MySQL provider lock |
| `src/app/api/quote/route.ts` | API handler |
| `src/lib/quote/schema.ts` | Payload authority |
| `src/lib/quote/submit.ts` | Submission orchestration |
| `src/lib/quote/reference.ts` | Reference generation |
| `src/lib/security/turnstile.ts` | Turnstile bypass boundary |
| `src/lib/security/rate-limit.ts` | No-op rate limit |
| `src/lib/email/transport.ts` | Development log transport |
| `src/lib/email/types.ts` | Email messages |
| `.cursor/rules/00-packsendgo-api-saving-governance.mdc` | Governance |

---

## 3. Local safety verification

| Check | Result |
| --- | --- |
| Container name `packsendgo-mysql-local` | **PASS** |
| Image `mysql:8.4` | **PASS** |
| Health `healthy` | **PASS** |
| Port binding `127.0.0.1:3306` only | **PASS** |
| `DATABASE_URL` identity matches approved local database | **PASS** |
| Pre-migration: no PackSendGo quotation tables | **PASS** (migration pending per `prisma migrate status`) |
| Migration contains no destructive `DROP`/`DELETE`/`TRUNCATE` | **PASS** |
| Provider lock is MySQL | **PASS** |
| Docker volume not reset | **Confirmed** |

---

## 4. Non-secret database identity

| Property | Value |
| --- | --- |
| Protocol | `mysql` |
| Username | `packsendgo_app` |
| Hostname | `127.0.0.1` |
| Port | `3306` |
| Database | `packsendgo_local` |

All values matched expected local identity before migration.

---

## 5. Pre-migration database state

- `prisma migrate status` reported one pending migration: `20260801180000_init_quotation`
- No `QuoteRequest`, `QuoteNotificationAttempt`, or `_prisma_migrations` tables existed before deploy
- No unexpected user tables observed via Prisma connectivity check

---

## 6. Migration reviewed

| Item | Finding |
| --- | --- |
| Migration file | `20260801180000_init_quotation/migration.sql` |
| Operations | `CREATE TABLE` only (two tables + FK) |
| Destructive operations | **None** |
| Character set | `utf8mb4` / `utf8mb4_unicode_ci` |
| Schema alignment | Matches `prisma/schema.prisma` (validated via `prisma validate` and successful deploy) |
| `migration_lock.toml` | `provider = "mysql"` |

---

## 7. Migration deploy result

**PASS**

```
npx prisma migrate deploy
Applying migration `20260801180000_init_quotation`
All migrations have been successfully applied.
```

Commands used: `prisma migrate deploy` only. No `db push`, `migrate dev`, or `migrate reset`.

---

## 8. Prisma migration status

**PASS** — `Database schema is up to date!`

One migration recorded: `20260801180000_init_quotation`

---

## 9. Tables and indexes verified

**Tables:**

- `_prisma_migrations`
- `QuoteRequest`
- `QuoteNotificationAttempt`

**Unique constraints on `QuoteRequest`:**

- `QuoteRequest_publicReference_key` (`publicReference`)
- `QuoteRequest_idempotencyKey_key` (`idempotencyKey`)

**Secondary indexes on `QuoteRequest`:**

- `QuoteRequest_email_idx` (`email`)
- `QuoteRequest_createdAt_idx` (`createdAt`)

**Index on `QuoteNotificationAttempt`:**

- `QuoteNotificationAttempt_quoteRequestId_idx` (`quoteRequestId`)

No Turnstile, honeypot, or IP columns in schema.

---

## 10. Application test environment

| Item | Value |
| --- | --- |
| Server | Next.js 16.2.12 dev (`npm run dev -p 3000`) |
| Environment | `.env.local` loaded by Next.js |
| Turnstile | `TURNSTILE_BYPASS_DEV=true` (non-production bypass) |
| Email | Development logging transport (`emailMode: development-log`) |
| External services | **None contacted** (no Cloudflare, no email provider) |
| Dev server | Stopped after testing |

---

## 11. Synthetic test-data model

| Item | Value |
| --- | --- |
| Test marker | `PHASE3B1-20260801` |
| Company | Phase 3B1 Test Co |
| Email domain | `@packsendgo.test` |
| Idempotency keys | Cryptographically random (`psg3b1-*-{32 hex}`) |
| Repository fixtures | **None added** |
| Temp test scripts | Created outside repository; deleted after use |

---

## 12. Successful persistence result (P1)

**PASS**

- `POST /api/quote` returned HTTP 200, `ok: true`
- Public reference returned (example: `PSG-20260801-V56Z`)
- `emailMode: development-log`

---

## 13. Reference result (P2)

**PASS**

- Pattern `PSG-YYYYMMDD-XXXX` matched
- Same reference stored in `QuoteRequest.publicReference`

---

## 14. Typed-field result (P3–P4)

**PASS**

- Exactly one `QuoteRequest` row per test idempotency key
- Required and representative optional typed columns persisted correctly (`businessStage`, `requiredStartDate`, `websiteUrl`, `productCategoryOther`, etc.)

---

## 15. Multi-select result (P5)

**PASS**

JSON array fields stored expected values:

- `salesChannels`: `shopify`, `other_marketplace`
- `storageType`: `pallet`, `shelving`
- `deliveryRegions`: `uk`, `international`
- `additionalServices`: `branded_packaging`, `returns`

---

## 16. Conditional-field result (P6)

**PASS**

Visible conditional fields persisted when controlling choices were active:

- `salesChannelOther`, `internationalDestinations`, `specialCourierDetails`, `brandedPackagingDetails`, `returnsVolume`

---

## 17. Stale-hidden-value result (P7)

**PASS (after source correction)**

Initial test **failed**: stale conditional values were persisted when controlling choices were false.

**Correction applied:** `stripStaleConditionalFields()` in `src/lib/quote/submit.ts` — normalises hidden conditional fields to `undefined` before persistence and email build.

**Re-test:** stale `salesChannelOther`, `internationalDestinations`, `specialCourierDetails`, and `productCategoryOther` all stored as `null`.

---

## 18. Consent result (P8)

**PASS**

- `privacyConsent`: true with `privacyConsentAt` set
- `accuracyConfirmation`: true with `accuracyConfirmationAt` set
- `marketingConsent`: true with `marketingConsentAt` set (opt-in submitted)

---

## 19. Email-attempt result (P9)

**PASS**

- Two independent attempts per submission: `CUSTOMER`, `INTERNAL`
- Both statuses: `LOGGED` (development transport)
- No claim of real provider delivery
- Idempotent replay did not create duplicate attempts (count remained 2)

---

## 20. Sequential idempotency result (P10)

**PASS**

- Replay with same idempotency key: HTTP 200, same public reference
- Row count remained 1
- Email attempt count remained 2 (no duplicate sends/records)

---

## 21. New-key result (P11)

**PASS**

- Same business data with new idempotency key created new quotation
- New distinct public reference generated

---

## 22. Unknown-key result (P12)

**PASS**

- Unknown payload key: HTTP 400, `ok: false`
- No quotation row created

---

## 23. Missing-consent result (P13)

**PASS**

- Missing privacy consent: HTTP 400
- Missing accuracy confirmation: HTTP 400
- No quotation rows created

---

## 24. Honeypot result (P14)

**PASS**

- Non-empty honeypot (`website` field): HTTP 400
- No quotation or email-attempt record created

---

## 25. Security-data non-persistence result (P15)

**PASS**

- No Turnstile token column in schema
- Honeypot field name `website` is payload-only; no honeypot persistence column
- No raw IP column in schema
- Turnstile token not stored in quotation rows

---

## 26. Database-authority result (P16)

**PASS**

- Quotation stored with status `RECEIVED` despite log-only email transport
- `emailMode: development-log` returned safely to client
- Database record authoritative; email failure simulation not required

---

## 27. Concurrent-race limitation

**Not exercised.**

Implementation uses lookup-then-insert with unique constraint on `idempotencyKey`. Concurrent duplicate requests may receive HTTP 500 on unique violation rather than idempotent replay — documented as Phase 3B hardening item per preflight audit.

Unique constraint verified present.

---

## 28. Source corrections

| File | Change | Reason |
| --- | --- | --- |
| `src/lib/quote/submit.ts` | Added `stripStaleConditionalFields()`; applied before persistence and email | P7 proved stale conditional values were persisted |

No Prisma schema or migration changes.

---

## 29. Test-data cleanup

**PASS**

- Deleted quotation rows matching test marker / test company
- Related `QuoteNotificationAttempt` rows removed via cascade
- Final count: 0 test quotations, 0 test email attempts
- `_prisma_migrations` preserved
- Schema preserved
- Docker volume preserved
- Container remains healthy

---

## 30. Prisma validate result

**PASS** — schema valid with private `DATABASE_URL` loaded from `.env.local`.

---

## 31. Prisma migration-status result

**PASS** — database schema up to date.

---

## 32. Prisma generation result

**PASS (final — 2026-08-01)**

After repository-specific Node processes were stopped, `npx prisma generate` completed successfully. Prisma Client version `6.19.3` generated.

An earlier Windows EPERM file lock on `query_engine-windows.dll.node` (from a running Node dev process) is **resolved** and documented here as a resolved local Windows warning only — not an active blocker.

---

## 33. Lint result

**PASS** — 0 errors, 1 warning

React Compiler warning on React Hook Form `watch()` in `QuoteForm.tsx` (known, non-blocking, pre-existing).

---

## 34. Typecheck result

**PASS** — `tsc --noEmit` completed with no errors.

---

## 35. Build result

**PASS (final — 2026-08-01)**

| Command | Result |
| --- | --- |
| `npm run build` | **PASS** — `prisma generate && next build` |
| Next.js production build | **PASS** — `16.2.12` |
| TypeScript | **PASS** |
| Static page generation | **PASS** |
| Routes compiled | `/`, `/get-a-quote`, `/api/quote` |

---

## 36. Container final health

**PASS** — `packsendgo-mysql-local` Up, `healthy`, `127.0.0.1:3306->3306/tcp`, image `mysql:8.4`

---

## 37. Files created

- `docs/phase-reports/PHASE_3B1_LOCAL_DATABASE_MIGRATION_AND_PERSISTENCE_REPORT.md`

---

## 38. Existing files modified

- `docs/04_BUILD_PHASE_CHECKLIST.md` — Phase 3B1 local database items marked complete
- `src/lib/quote/submit.ts` — stale conditional field normalisation (proven defect fix)

---

## 39. Commands run

- `npm run db:local:status`
- Private `DATABASE_URL` load from `.env.local` (not displayed)
- `npx prisma validate`
- `npx prisma migrate status` (pre- and post-deploy)
- `npx prisma migrate deploy`
- `npm run dev` (local API tests; stopped after)
- Synthetic API test matrix via temporary external script
- Test-data cleanup via temporary external script
- `npx prisma generate` — PASS (final)
- `npm run lint`
- `npm run typecheck`
- `npm run build` — PASS (final)
- `npm run db:local:status` (final)

**Not run:** Git commands, Hostinger contact, Cloudflare, email provider, `prisma db push`, `prisma migrate dev`, `prisma migrate reset`, package install.

---

## 40. Tests not safely exercised

| Test | Reason |
| --- | --- |
| Live Turnstile verification | Local bypass used by design |
| Production rate limiting | No-op boundary unchanged |
| Concurrent idempotency race | Not in scope; sequential replay only |
| Email failure after DB commit | No safe local simulation without provider backdoor |

---

## 41. Warnings

- Windows EPERM on `prisma generate` when Node dev process holds query engine DLL — **resolved** (stop repository-specific Node processes before generate/build)
- React Compiler / RHF `watch()` warning (pre-existing)
- `npm warn Unknown env config "devdir"` (environment tooling, non-blocking)

---

## 42. Remaining production blockers

- Staging and production MySQL provisioning
- Production migration deploy
- Live Turnstile integration
- Production rate limiting
- Transactional email provider and verified sender
- Privacy Policy route and approved wording
- Retention period approval
- Staging end-to-end validation
- Hostinger deployment

---

## 43. Product Owner browser validation

**PASSED — 2026-08-01**

| Item | Result |
| --- | --- |
| Local MySQL container | Healthy |
| Committed migration applied | Yes |
| Prisma migration status | Current |
| Browser quotation submission | Successful |
| Browser success reference | `PSG-20260801-EZS2` |
| Database reference match | **PASS** — same reference in local MySQL |
| Stored quotation status | `RECEIVED` |
| Session draft after success | Cleared |
| Blocking browser/terminal errors | None |
| Synthetic browser test data | Removed after evidence collected |
| Local schema and migration history | Preserved |

Does **not** claim live email delivery, live Turnstile verification, or Hostinger database validation.

---

## 44. Verdict

**Local database verdict: PASS**

Migration applied, persistence validated, sequential idempotency confirmed, test data cleaned, container healthy.

**Production readiness verdict: NOT READY**

Staging, production integrations, legal content, and deployment validation remain pending.

---

## 45. Product Owner acceptance status

**Product Owner acceptance: ACCEPTED WITH CONDITIONS — 2026-08-01**

**Remaining conditions:**

- Hostinger staging or preview deployment
- Hostinger MySQL provisioning
- Staging and production migration deployment
- Transactional email provider
- Verified sender domain and addresses
- Live Turnstile
- Production-grade rate limiting
- Privacy Policy
- Retention decision
- Staging end-to-end validation
- Production deployment validation

---

*Initial completion: 2026-08-01. Product Owner browser acceptance recorded: 2026-08-01. Build validation correction: 2026-08-01. No secrets displayed or committed. No local environment files modified. No Prisma schema or applied migration modified. No packages installed. No external services contacted. No Git commands executed.*
