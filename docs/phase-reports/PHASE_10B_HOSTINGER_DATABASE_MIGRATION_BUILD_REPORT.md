# Phase 10B Hostinger Database Migration Build Report

**Date:** 2026-08-02
**Mode:** API Saving Mode — controlled deployment hotfix
**Repository:** `D:\Projects\packsendgo-website`
**Branch:** `fix/hostinger-database-migration-build`
**Expected base commit:** `a85b2ca`
**Product Owner acceptance:** PENDING HOSTINGER REDEPLOYMENT

**Programme tracker:** Phase 10 — Hostinger deployment and launch

---

## 1. Objective

Ensure every Hostinger deployment invoked through the sole permitted build command (`npm run build`) applies pending Prisma migrations before generating the Prisma Client and building the Next.js application.

---

## 2. Hostinger constraint

Hostinger only allows the configured build command:

```bash
npm run build
```

No separate migration step can be added in the Hostinger UI. Migration execution must therefore be embedded in the repository build script.

---

## 3. Original build behaviour

Before this hotfix, the build script was:

```json
"build": "prisma generate && next build"
```

On Hostinger, this sequence ran successfully under Node 22.18.0 but did **not** execute `prisma migrate deploy`. Production MySQL tables were not created from the committed migration.

---

## 4. Root cause

The repository build script omitted `prisma migrate deploy`. Hostinger has no alternative hook for database migrations, so pending migrations were never applied despite a successful application build.

---

## 5. Exact package-script change

**Before:**

```json
"build": "prisma generate && next build"
```

**After:**

```json
"build": "prisma migrate deploy && prisma generate && next build"
```

---

## 6. Recursion safeguard

The script does **not** use:

```json
"build": "npx prisma migrate deploy && npm run build"
```

That pattern would recursively invoke the build script. The hotfix uses a single linear command chain instead.

---

## 7. Migration safety model

The updated build:

- uses `DATABASE_URL` from the server environment (Hostinger-provided; not read or logged locally);
- applies only pending **committed** migrations via `prisma migrate deploy`;
- preserves existing data (no reset, push, dev, seed, or manual SQL);
- fails the build if the database cannot be reached;
- fails the build if a migration cannot be applied;
- continues safely when all migrations are already applied (idempotent deploy);
- retains `prisma generate` and `next build`.

---

## 8. Expected migration

Committed migration:

`prisma/migrations/20260801180000_init_quotation`

No new migration was created or modified.

---

## 9. Expected production tables

After successful hosted deployment:

| Table | Purpose |
| --- | --- |
| `_prisma_migrations` | Prisma migration history |
| `QuoteRequest` | Quotation persistence |
| `QuoteNotificationAttempt` | Email attempt audit |

---

## 10. Files modified

| File | Change |
| --- | --- |
| `package.json` | Build script updated to include `prisma migrate deploy` |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Phase 10B implementation and validation entries |
| `docs/phase-reports/PHASE_10A_HOSTINGER_PRIVATE_PREVIEW_PREPARATION_REPORT.md` | Phase 10B addendum |

---

## 11. Files created

| File | Purpose |
| --- | --- |
| `docs/phase-reports/PHASE_10B_HOSTINGER_DATABASE_MIGRATION_BUILD_REPORT.md` | This report |

---

## 12. Local database used

| Check | Result |
| --- | --- |
| Docker Desktop engine | Running (Product Owner evidence) |
| MySQL container | `packsendgo-mysql-local` — healthy |
| Local database | `packsendgo_local` at `127.0.0.1:3306` |
| `.env.local` present | Yes (ignored; value not displayed) |
| `DATABASE_URL` loaded for build | Yes — temporarily into PowerShell process only; removed after builds |
| External database contacted | No |

**Local validation blocker:** RESOLVED (previously blocked when Docker daemon was unavailable).

---

## 13. First build result

**PASS** — exit code 0 (Product Owner evidence, 2026-08-02).

Command sequence executed in order:

1. `prisma migrate deploy`
2. `prisma generate`
3. `next build`

Results:

- Prisma schema loaded successfully
- One committed migration found
- `No pending migrations to apply`
- Prisma Client 6.19.3 generated
- Next.js 16.2.12 production build passed
- TypeScript passed during build

---

## 14. First migration result

| Item | Result |
| --- | --- |
| `prisma migrate deploy` invoked | Yes |
| Schema loaded | Yes |
| Committed migrations found | One (`20260801180000_init_quotation`) |
| Pending migrations applied | None — `No pending migrations to apply` |
| Result | **PASS** |

---

## 15. Second build result

**PASS** — exit code 0 (Product Owner evidence, 2026-08-02).

Full build chain completed again: `prisma migrate deploy` → `prisma generate` → `next build`.

---

## 16. Idempotency result

**PASS** — second `prisma migrate deploy` reported one committed migration found and `No pending migrations to apply`. Idempotency proven.

---

## 17. Prisma generation result

**PASS** — Prisma Client 6.19.3 generated successfully on both builds.

---

## 18. Next.js build result

**PASS** — Next.js 16.2.12 production build passed on both runs; TypeScript passed during build.

---

## 19. Routes compiled

**PASS** — all expected routes compiled on both builds:

| Route | Status |
| --- | --- |
| `/` | Compiled |
| `/_not-found` | Compiled |
| `/api/quote` | Compiled |
| `/get-a-quote` | Compiled |
| `/robots.txt` | Compiled |

---

## 20. Node engine warning

| Item | Value |
| --- | --- |
| Declared in `package.json` | `"node": ">=24 <25"` |
| Hostinger build log (reported) | Node 22.18.0 |
| Changed in this task | No |
| Status | Separate deployment warning — engine reconciliation deferred |

Application build previously passed on Hostinger under Node 22.18.0; this hotfix does not alter the engine declaration.

---

## 21. Package-lock result

**Unchanged** — script-only edit; no npm install or lockfile update required.

---

## 22. Dependency-change result

**None** — no packages installed, upgraded, or removed.

---

## 23. Production deployment procedure

1. Product Owner merges this hotfix to `main`.
2. Hostinger automatic deployment from GitHub `main` runs `npm run build`.
3. Confirm Hostinger environment provides `DATABASE_URL` (already configured).
4. Confirm build log shows, in order:
   - `prisma migrate deploy` — pending migration applied or none pending;
   - `prisma generate`;
   - `next build` — success.
5. If deploy fails, inspect build log for Prisma connection or migration errors before retrying.

---

## 24. Hosted verification procedure

After redeployment:

1. Verify `_prisma_migrations` exists in Hostinger MySQL.
2. Verify `QuoteRequest` table exists.
3. Verify `QuoteNotificationAttempt` table exists.
4. Confirm migration `20260801180000_init_quotation` is recorded in `_prisma_migrations`.
5. Smoke-test quotation API persistence when Turnstile and email integrations are configured.

Do not expose or log `DATABASE_URL` during verification.

---

## 25. Remaining blockers

- Updated commit not yet merged to `main` (Product Owner Git operation)
- Hostinger automatic redeployment not yet triggered
- Hosted migration execution unverified
- Hosted table verification pending
- Hosted quotation submission pending integrations
- Node 22.18.0 versus declared Node 24 reconciliation pending
- Public launch pending

**Resolved:**

- Local build idempotency test — **PASS** (Product Owner evidence)
- Docker/MySQL availability blocker — **RESOLVED**

---

## 26. Verdict

**Completion status: PASS**

**Hostinger migration-build hotfix verdict: READY FOR PRODUCT OWNER REVIEW**

The repository build script correctly embeds `prisma migrate deploy`. Local double-build validation passed with idempotent migration deploy, Prisma Client generation, and Next.js production build on both runs. Product Owner should merge to `main` and redeploy to Hostinger to verify hosted migration execution.

---

## 27. Product Owner acceptance status

**Product Owner acceptance: PENDING HOSTINGER REDEPLOYMENT**

Local validation is complete. Acceptance depends on successful Hostinger build log showing migration deploy and hosted verification of expected tables.

---

## Local validation summary (Product Owner evidence — 2026-08-02)

| Check | Result |
| --- | --- |
| Local migration execution | **PASS** |
| First production build | **PASS** |
| Second production build | **PASS** |
| Migration idempotency | **PASS** |
| Prisma generation | **PASS** |
| Expected routes compiled | **PASS** |
| Local validation blocker | **RESOLVED** |
| Docker/MySQL availability blocker | **RESOLVED** |

After both builds: `DATABASE_URL` removed from the PowerShell process; no credential value printed; no external database contacted; no package installed or upgraded.

---

## Scope confirmation

- No Prisma schema or migration SQL modified
- No `DATABASE_URL` value exposed
- No packages installed or upgraded
- No Hostinger or external database contacted
- No Git commands run from Cursor
