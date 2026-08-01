# PackSendGo Hostinger Deployment Plan

Deployment authority for PackSendGo Website V1 on Hostinger Cloud Startup.

**Authority:** `docs/00_PROJECT_AUTHORITY.md` §19, `docs/03_TECHNICAL_ARCHITECTURE.md`

Cursor implementation and audit tasks must follow `.cursor/rules/00-packsendgo-api-saving-governance.mdc`, including narrow scope, targeted file reads, command limits and the prohibition on Cursor Git activity.

## 1. Purpose

This document defines the approved production deployment target, constraints and procedures for packsendgo.com.

It ensures deployment remains compatible with Hostinger Cloud Startup, preserves Product Owner control of Git and production changes, and excludes infrastructure not supported on the approved hosting plan.

## 2. Approved deployment architecture

```
GitHub (main branch)
  → Hostinger-connected Node.js deployment
  → npm install
  → Next.js production build
  → Persistent Node.js application process
  → Hostinger MySQL (Prisma)
  → External transactional email provider
  → External Spline scene delivery
  → External Matterport / video platforms
  → Cloudflare Turnstile (or equivalent)
```

Public traffic flows: Browser → Hostinger Node.js app → MySQL / external services.

No Redis, PostgreSQL, WebSocket server or background worker in V1.

## 3. Repository and branch authority

| Item | Value |
| --- | --- |
| GitHub repository | https://github.com/zapatechnologies-Cursor-Apps/packsendgo-website.git |
| Production branch | `main` |
| Feature branches | Scoped branches per build phase (see `docs/04_BUILD_PHASE_CHECKLIST.md`) |
| Merge authority | Product Owner only |
| Push authority | Product Owner only |
| Cursor Git prohibition | Cursor must not run any Git command |
| Production edits | No direct uncontrolled edits on Hostinger or GitHub `main` |

All production deployments originate from Product Owner-approved commits on `main`.

## 4. Node.js and framework compatibility

Requirements:

- **Node.js version** — Must be supported by Hostinger Cloud Startup and the selected Next.js release. Confirm during Phase 2 implementation.
- **Next.js runtime** — Standard Node.js runtime; App Router with server components and Route Handlers as needed.
- **No Vercel Edge dependence** — Do not use Edge-only APIs, middleware features requiring Edge or Vercel-specific deployment assumptions.
- **No Vercel-only services** — No Vercel Analytics, Vercel KV, Vercel Postgres or similar.
- **Build command** — Confirm during implementation (typically `npm run build` or equivalent).
- **Start command** — Confirm during implementation (typically `npm start` or `next start`).
- **Lockfile** — Commit `package-lock.json` (or approved lockfile) during Phase 2; ensures repeatable production installs.
- **Repeatable production build** — Same commit must produce identical build output given same environment.

Exact version numbers shall not be locked in this document until verified against Hostinger documentation during Phase 2.

## 5. Database plan

| Item | Requirement |
| --- | --- |
| Database engine | Hostinger MySQL |
| Connection | `DATABASE_URL` environment variable |
| ORM | Prisma with migration workflow |
| Migration process | `prisma migrate deploy` (or equivalent) applied before production validation |
| Backups | Database backup taken before every production migration |
| PostgreSQL | Not permitted |
| Redis | Not permitted |
| Connection limits | Pool size configured within Hostinger MySQL limits |
| Destructive migrations | Require backup, review and Product Owner approval |

Initial schema defined in Phase 7 per `docs/03_TECHNICAL_ARCHITECTURE.md` and `docs/06_QUOTATION_FORM_SPEC.md`.

## 6. Environment variables

All secrets configured in Hostinger environment settings. Never committed to Git.

| Category | Variable (examples) | Notes |
| --- | --- | --- |
| Database | `DATABASE_URL` | MySQL connection string |
| Site URL | `NEXT_PUBLIC_SITE_URL` | Canonical public URL (https://packsendgo.com) |
| Email provider | Provider-specific API key or SMTP credentials | Provider pending final selection |
| Email sender | `EMAIL_FROM` | Verified sender domain |
| Internal notification | `QUOTE_NOTIFICATION_EMAIL` | Pending Product Owner input |
| Turnstile | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Site key is intentionally public and used by the browser; secret key is server-only and must never enter client code or Git |
| Media (optional) | Spline embed URL, Matterport embed ID | If not hard-coded in approved config |
| Runtime | `NODE_ENV` | `production` in production |

Maintain a secure offline record of production environment variables (not in Git).

## 7. Transactional email

V1 requires an external transactional email provider. Local sendmail or Hostinger mailbox sending is not sufficient for reliable quotation notifications.

### Requirements

- Provider selection pending Product Owner approval
- Sender domain verification completed before launch
- **SPF** — DNS record configured for sending domain
- **DKIM** — DNS record configured for sending domain
- **DMARC** — Recommended; configure when sender domain confirmed
- Customer confirmation email on every successful submission
- Internal lead notification to PackSendGo
- Failure logging per `QuoteNotificationAttempt`
- No dependence on Hostinger sendmail rate limits

Email templates must not contain invented contact addresses.

## 8. Domain and DNS

| Item | Value / decision |
| --- | --- |
| Primary domain | packsendgo.com |
| DNS | Point to Hostinger per Hostinger deployment instructions |
| SSL | Hostinger-managed SSL; HTTPS enforced |
| www redirect | `PENDING PRODUCT OWNER INPUT` (www → apex or apex → www) |
| Canonical host | Single canonical URL for SEO |
| Email DNS | SPF, DKIM, DMARC for transactional sender domain |
| Staging subdomain | Only if separately approved (e.g. staging.packsendgo.com) |

## 9. Build and deployment workflow

Deployment is performed by the Product Owner or authorised delegate. Cursor must not deploy.

| Step | Action | Owner |
| --- | --- | --- |
| 1 | Product Owner merges approved work to `main` | Product Owner |
| 2 | Product Owner pushes `main` to GitHub | Product Owner |
| 3 | Hostinger detects deployment trigger | Automatic |
| 4 | Install dependencies (`npm ci` or equivalent) | Hostinger |
| 5 | Production build | Hostinger |
| 6 | Apply database migration if schema changed | Product Owner / delegate |
| 7 | Start or restart Node.js application | Hostinger |
| 8 | Health check — root URL returns 200 | Product Owner / delegate |
| 9 | Production smoke test (see §13) | Product Owner / delegate |
| 10 | Product Owner acceptance | Product Owner |

Rollback procedure in §12 if smoke test fails.

## 10. Spline and warehouse media

| Requirement | Implementation |
| --- | --- |
| Spline lazy loading | Scene loads after poster and primary content |
| External scene delivery | Spline hosts scene assets |
| Poster fallback | Static image in `public/` before 3D |
| Mobile fallback | Video loop or static image |
| Matterport | Embed only after user click/tap |
| CSP | Allowlist Spline, Matterport and approved video domains |
| Long-form video | External streaming provider where file size warrants |

CSP configuration documented during Phase 9 and applied in production.

## 11. Security

Production security requirements:

- **SSL** — Valid certificate; HTTP redirects to HTTPS
- **Security headers** — HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- **Content Security Policy** — Restricts scripts and frames to approved domains
- **Environment variables** — Secrets only in Hostinger config
- **Server-side validation** — All quotation data validated on server
- **Turnstile** — Active on production quotation form
- **Rate limiting** — Active on submission endpoint
- **Logging hygiene** — No secrets or full PII in logs
- **Dependency review** — Known vulnerabilities addressed before launch
- **No secrets in client bundles** — Verify build output excludes private keys

## 12. Backups and rollback

| Scenario | Procedure |
| --- | --- |
| Before migration | Export Hostinger MySQL backup |
| Code rollback | Redeploy previous known-good Git commit on `main` |
| Hostinger rollback | Use Hostinger deployment history if available |
| Asset rollback | Revert media commits or restore from backup |
| Environment variables | Secure offline record enables restoration |
| Decision owner | Product Owner authorises all rollbacks |

Never run destructive migration without backup and Product Owner approval.

## 13. Production validation

Complete before launch acceptance:

### Pages and content

- [ ] Homepage loads with all sections
- [ ] Services, How It Works, Warehouse, About pages load
- [ ] Privacy Policy, Cookie Policy, Website Terms accessible
- [ ] 404 page behaves correctly
- [ ] No lorem ipsum or placeholder content

### Quotation flow

- [ ] Form submits successfully in production
- [ ] Database record created with complete data
- [ ] Quotation reference displayed on success screen
- [ ] Customer confirmation email received
- [ ] Internal notification email received

### Media and 3D

- [ ] Spline loads on desktop with poster fallback
- [ ] Mobile fallback displays correctly
- [ ] Matterport or video loads only on interaction
- [ ] Reduced-motion behaviour verified

### Technical

- [ ] SSL active; no mixed content warnings
- [ ] Canonical redirect (www/apex) correct
- [ ] Metadata present on key pages
- [ ] Sitemap accessible
- [ ] robots.txt accessible
- [ ] Security headers present
- [ ] Turnstile active
- [ ] Error handling shows user-safe messages

### Devices

- [ ] Mobile smoke test on real device or emulator
- [ ] Desktop smoke test on current browser

## 14. Monitoring

| Area | Method |
| --- | --- |
| Application logs | Hostinger runtime logs |
| Quotation failures | Log review by reference; alert on error rate |
| Email delivery | Provider dashboard and `QuoteNotificationAttempt` records |
| Uptime | External uptime monitor (tool pending selection) |
| Form abuse | Rate limit and Turnstile metrics |
| Performance | Core Web Vitals periodic review |
| Analytics | Privacy-conscious tooling; decision pending Product Owner |

No sensitive quotation field data in monitoring or analytics.

## 15. Hostinger limitation register

The following are not available or not approved on Hostinger Cloud Startup for V1:

| Limitation | Mitigation |
| --- | --- |
| No Redis | No caching layer requiring Redis; use Next.js built-in caching where appropriate |
| No PostgreSQL | Use MySQL only |
| No incoming WebSocket server | No real-time features |
| No self-hosted AI | External AI deferred to future release |
| No persistent background workers | Synchronous request processing for V1 |
| No large private media streaming | External video provider for long media |
| File uploads not in V1 | External object storage if introduced later |

## 16. Launch checklist

### Pre-launch

- [ ] All Phase 10 build checklist items complete
- [ ] Production environment variables set and verified
- [ ] Database migrated and backup taken
- [ ] Email DNS (SPF, DKIM, DMARC) configured
- [ ] Domain DNS pointing to Hostinger
- [ ] SSL certificate active
- [ ] CSP tested with all external embeds
- [ ] Final release-gating checklist complete (`docs/04_BUILD_PHASE_CHECKLIST.md`)

### Launch

- [ ] Product Owner pushes approved `main`
- [ ] Deployment succeeds on Hostinger
- [ ] Production validation (§13) complete
- [ ] Product Owner launch acceptance recorded

### Post-launch immediate

- [ ] Test quotation submission in production
- [ ] Verify emails received
- [ ] Check Hostinger logs for errors
- [ ] Confirm analytics (if enabled) recording conversion events only

## 17. Post-launch checklist

### First day

- [ ] Monitor Hostinger logs for runtime errors
- [ ] Review first production quotation submissions
- [ ] Confirm email delivery rates
- [ ] Check SSL and redirect behaviour
- [ ] Verify mobile experience on real devices

### First week

- [ ] Review quotation enquiry quality with PackSendGo team
- [ ] Monitor form abuse and rate limit triggers
- [ ] Review Core Web Vitals
- [ ] Address any production defects
- [ ] Confirm no unsupported claims reported by visitors

### First month

- [ ] Review uptime and error trends
- [ ] Assess email deliverability metrics
- [ ] Collect Product Owner feedback on lead quality
- [ ] Document lessons for V1.1 planning
- [ ] Confirm backup and rollback procedures remain valid

## 18. Acceptance criteria

Hostinger deployment is accepted when:

1. packsendgo.com serves the approved V1 website over HTTPS.
2. All production validation items in §13 pass.
3. Quotation submissions store and email successfully.
4. No V1 exclusions are present in production.
5. Environment variables are secure and not in Git.
6. Rollback procedure is documented and understood.
7. Launch and post-launch checklists initiated.
8. Product Owner explicitly accepts production launch.

Only the Product Owner may accept deployment and launch.

**Git reminder:** Cursor must not run Git commands, push code or trigger deployment. All Git and deployment actions are Product Owner responsibilities.
