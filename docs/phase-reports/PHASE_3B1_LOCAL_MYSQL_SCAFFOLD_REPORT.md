# Phase 3B1 Local MySQL Scaffold Report

**Date:** 2026-08-01
**Mode:** API Saving Mode — controlled configuration implementation
**Repository:** `D:\Projects\packsendgo-website`
**Branch:** `feature/phase-3b-quotation-infrastructure`
**Base commit:** `f6f1a65`
**Product Owner acceptance:** ACCEPTED — 2026-08-01

---

## 1. Objective

Create a repeatable, local-only MySQL infrastructure scaffold using Docker Compose for Phase 3B1. Prepare the repository for an isolated local database without starting services, creating real credentials, connecting Prisma, applying migrations, or modifying application source.

---

## 2. Authority reviewed

| Document | Purpose |
| --- | --- |
| `docs/phase-reports/PHASE_3B_QUOTATION_INFRASTRUCTURE_PREFLIGHT_AUDIT.md` | Phase 3B1 database/migration plan, environment separation |
| `docs/phase-reports/PHASE_3A_QUOTATION_FORM_IMPLEMENTATION_REPORT.md` | Prisma baseline, blocked persistence tests |
| `docs/03_TECHNICAL_ARCHITECTURE.md` | MySQL, Prisma, Hostinger constraints |
| `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` | Production migration policy; local separation |
| `.gitignore` | Environment file protection |
| `.env.example` | Application runtime variables |
| `package.json` | Build and script conventions |
| `prisma/schema.prisma` | MySQL provider (read only — not modified) |
| `prisma/migrations/migration_lock.toml` | MySQL migration lock (read only — not modified) |
| `.cursor/rules/00-packsendgo-api-saving-governance.mdc` | Scope and Git prohibition |

---

## 3. Current Docker environment

Product Owner verified state (2026-08-01):

| Item | Status |
| --- | --- |
| Docker Desktop | Installed and running |
| Docker Compose | Available |
| Local secret files | `.env.mysql.local` and `.env.local` created (local-only) |
| Local files ignored by Git | **PASS** |
| Container | `packsendgo-mysql-local` running |
| Container health | **healthy** |
| MySQL image | `mysql:8.4` |
| Port binding | `127.0.0.1:3306` only |
| Database name | `packsendgo_local` |
| Application user | `packsendgo_app` |
| Secrets displayed or committed | **None** |
| Prisma migration applied | **No** |
| Application database connection tested | **No** |

---

## 4. Files created

| File | Purpose |
| --- | --- |
| `compose.local.yml` | Local-only MySQL 8.4 Docker Compose service |
| `.env.mysql.local.example` | Example MySQL container credentials (placeholders only) |
| `docs/phase-reports/PHASE_3B1_LOCAL_MYSQL_SCAFFOLD_REPORT.md` | This report |

---

## 5. Existing files modified

| File | Change |
| --- | --- |
| `.gitignore` | Added `.env.mysql.local` to ignored local secrets |
| `.env.example` | Clarified local Docker database guidance for `DATABASE_URL` |
| `package.json` | Added five `db:local:*` npm scripts |

---

## 6. Compose architecture

Single-service Compose file for local development only:

```
compose.local.yml
  └── service: mysql
        ├── image: mysql:8.4
        ├── container: packsendgo-mysql-local
        ├── env_file: .env.mysql.local
        ├── ports: 127.0.0.1:3306 → 3306
        ├── volume: packsendgo_mysql_local_data
        ├── command: utf8mb4 / utf8mb4_unicode_ci
        └── healthcheck: mysqladmin ping (runtime env, no password in repo)
```

No production network, no auxiliary services, no Hostinger references.

---

## 7. MySQL image

| Setting | Value |
| --- | --- |
| Image | `mysql:8.4` (official) |
| Platform | `linux` |
| Restart | `unless-stopped` |

Character set and collation configured via service `command`:

- `--character-set-server=utf8mb4`
- `--collation-server=utf8mb4_unicode_ci`

Aligns with Prisma migration default (`utf8mb4_unicode_ci`).

---

## 8. Local port binding

```yaml
ports:
  - "127.0.0.1:3306:3306"
```

MySQL is bound to localhost only. Not exposed on `0.0.0.0`.

---

## 9. Persistent volume

| Item | Value |
| --- | --- |
| Volume name | `packsendgo_mysql_local_data` |
| Mount | `/var/lib/mysql` |
| `db:local:down` | Stops container; **does not** delete the named volume |

No automatic reset or volume-deletion commands were added.

---

## 10. Health check

```yaml
healthcheck:
  test:
    [
      "CMD-SHELL",
      "mysqladmin ping -h localhost -u root -p\"$$MYSQL_ROOT_PASSWORD\" --silent",
    ]
  interval: 10s
  timeout: 5s
  retries: 5
  start_period: 40s
```

- Password is read from container environment at runtime (`$$MYSQL_ROOT_PASSWORD` → `$MYSQL_ROOT_PASSWORD` inside the container).
- No plaintext password appears in committed repository files.
- `start_period: 40s` allows MySQL initialisation before failures count.

---

## 11. Environment-file model

Two separate local environment files:

| File | Purpose | Git |
| --- | --- | --- |
| `.env.mysql.local.example` | Example MySQL container credentials | Tracked |
| `.env.mysql.local` | Real local MySQL passwords (PO-generated) | **Ignored** |
| `.env.example` | Application variable documentation | Tracked |
| `.env.local` | Real `DATABASE_URL` for Next.js/Prisma | **Ignored** |

**Container credentials** (`.env.mysql.local`):

- `MYSQL_ROOT_PASSWORD` — administration only
- `MYSQL_DATABASE=packsendgo_local`
- `MYSQL_USER=packsendgo_app`
- `MYSQL_PASSWORD` — application database user

**Application connection** (`.env.local`):

- `DATABASE_URL` using `packsendgo_app@127.0.0.1:3306/packsendgo_local`
- Must not be committed

---

## 12. Gitignore protection

Added to `.gitignore`:

```
.env.mysql.local
```

Already ignored (unchanged):

- `.env.local`
- `.env` and other environment variants

Still trackable:

- `.env.example`
- `.env.mysql.local.example`

No broad `*.example` ignore rules added.

---

## 13. Package scripts

Added to `package.json` (build script unchanged):

| Script | Command |
| --- | --- |
| `db:local:config` | `docker compose --env-file .env.mysql.local -f compose.local.yml config --quiet` |
| `db:local:up` | `docker compose --env-file .env.mysql.local -f compose.local.yml up -d` |
| `db:local:down` | `docker compose --env-file .env.mysql.local -f compose.local.yml down` |
| `db:local:logs` | `docker compose --env-file .env.mysql.local -f compose.local.yml logs -f mysql` |
| `db:local:status` | `docker compose --env-file .env.mysql.local -f compose.local.yml ps` |

Not added: reset, volume deletion, `prisma db push`, migration, or deployment commands.

---

## 14. Security controls

| Control | Implementation |
| --- | --- |
| No committed passwords | Placeholders only in `.env.mysql.local.example` |
| No complete `DATABASE_URL` with password in repo | Shape documented in `.env.example` only |
| Localhost binding | `127.0.0.1:3306` |
| Application user | `packsendgo_app` (not root) |
| Root password | Container init/admin only |
| Real env files ignored | `.env.mysql.local`, `.env.local` |
| No production/Hostinger credentials | None referenced |
| Health check | Uses runtime env, not repo plaintext |

---

## 15. Validation commands

| # | Command | Purpose |
| --- | --- | --- |
| 1 | Authorised file scope review | Confirm only permitted files changed |
| 2 | `node -e "JSON.parse(...)"` on `package.json` | JSON syntax |
| 3 | `npm run db:local:config` | Quiet Compose validation (no resolved secrets printed) |
| 4 | `npm run db:local:status` | Container health and service status |

**Not run:** `git diff --check` — prohibited by project Git governance.

---

## 16. Compose validation result

| Check | Result |
| --- | --- |
| Local secret files created by Product Owner | **PASS** |
| Local files ignored by Git | **PASS** |
| Compose quiet validation (`config --quiet`) | **PASS** |
| Container start | **PASS** |
| Container health | **PASS** |
| MySQL image | `mysql:8.4` |
| Container name | `packsendgo-mysql-local` |
| Binding | `127.0.0.1:3306` |
| Database | `packsendgo_local` |
| Application user | `packsendgo_app` |
| No secrets displayed or committed | **PASS** |
| No migration applied | **Confirmed** |
| No application database connection tested | **Confirmed** |

### Infrastructure vs migration status

| Layer | Status |
| --- | --- |
| Infrastructure scaffold | **Complete** |
| Local MySQL container | **Healthy** |
| Prisma migration apply | **Not started** |
| Persistence validation | **Not started** |

---

## 17. Items deliberately not performed

Initial scaffold task (2026-08-01):

- Docker container start (deferred to Product Owner)
- Creation of `.env.mysql.local` or `.env.local` (deferred to Product Owner)
- Prisma `migrate`, `db push`, or `generate`
- Application build or persistence tests
- Application database connection via Prisma
- Package installation or `package-lock.json` modification
- Application source or Prisma file changes
- Git commands

Finalisation task (2026-08-01) — still not performed:

- Prisma migration apply
- Application database connection test
- Persistence or idempotency validation
- Package installation
- Git commands

---

## 18. Product Owner setup steps

**Completed by Product Owner (2026-08-01):**

1. Copied `.env.mysql.local.example` to `.env.mysql.local` with random passwords.
2. Created `.env.local` with `DATABASE_URL` for `packsendgo_app@127.0.0.1:3306/packsendgo_local`.
3. Validated Compose with quiet config (no resolved secrets printed).
4. Started local MySQL container (`packsendgo-mysql-local`).
5. Confirmed container health is `healthy` and binding is `127.0.0.1:3306` only.

**Next step (separate authorised task):**

6. Apply Prisma migration (`prisma migrate deploy`) and run persistence validation.

---

## 19. Risks

| Risk | Mitigation |
| --- | --- |
| PO skips `db:local:config` before first start | Documented in setup steps |
| App connects as root | `.env.example` documents `packsendgo_app` only |
| Port 3306 conflict | PO confirmed port free; bind is localhost-only |
| Compose config cannot run until `.env.mysql.local` exists | Expected; copy example first |
| Windows line endings in env files | Use UTF-8 without BOM when editing |

---

## 20. Next action

Authorise Phase 3B1 migration apply: run `prisma migrate deploy` against the healthy local MySQL instance, then execute persistence and idempotency validation (P1–P16, I1–I5 from Phase 3B preflight audit).

---

## 21. Verdict

**Scaffold verdict: COMPLETE — LOCAL MYSQL HEALTHY**

The local MySQL infrastructure scaffold is complete. Container `packsendgo-mysql-local` is running and healthy on `127.0.0.1:3306`. Prisma migration and persistence validation have **not** started.

---

## 22. Product Owner acceptance status

**Product Owner acceptance: ACCEPTED — 2026-08-01**

---

*Scaffold initial implementation: 2026-08-01. Finalisation (quiet config script + verified results): 2026-08-01. No secrets displayed or committed in this task. No application source or Prisma files modified. No packages installed. No migration applied. No Git commands executed.*
