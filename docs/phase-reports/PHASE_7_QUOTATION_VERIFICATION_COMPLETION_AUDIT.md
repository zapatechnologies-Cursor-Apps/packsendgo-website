# Phase 7 Quotation Verification Completion Audit

**Date:** 2026-08-02
**Mode:** API Saving Mode — audit only
**Repository:** `D:\Projects\packsendgo-website`
**Branch:** `audit/phase-7-quotation-verification-completion`
**Product Owner acceptance:** PENDING

**Programme tracker alignment:**

- Primary parent phase: Phase 7 — Quotation form and MySQL
- Security dependency: Phase 9 — SEO, security and performance

---

## 1. Objective

Determine precisely what quotation verification was built, why the hosted site renders the development verification placeholder, whether Cloudflare Turnstile is live-ready, and what configuration and code work remains before the hosted quotation workflow can persist rows to MySQL.

This audit is read-only. No source, environment, or database changes were made.

---

## 2. Tracker alignment

Phase 7 covers the quotation form, API, Prisma schema, and local persistence validation. Verification is part of the approved abuse-control boundary documented in Phase 3A/3B reports and deferred live verification is tracked in `docs/04_BUILD_PHASE_CHECKLIST.md` under “Live Turnstile verified in staging/production” (unchecked).

Phase 9 covers broader security hardening (CSP, rate limiting, production safeguards). Current rate limiting is a no-op stub; full production rate limiting remains Phase 9 scope.

---

## 3. Product Owner evidence

The Product Owner confirmed:

1. Local quotation workflow succeeded.
2. A local submission wrote to local MySQL.
3. Hostinger MySQL migration succeeded via `127.0.0.1:3306`.
4. Migration `20260801180000_init_quotation` applied successfully.
5. Hosted form displays verification UI with development placeholder text and “Complete development verification”.
6. Hosted submission displays “Service temporarily unavailable” and “Complete the verification step before submitting.”
7. No hosted quotation row was created.
8. Website normalisation work completed and merged separately.

**Evidence note:** The exact string `VerificationRequired` does not appear in the repository. Source renders a “Verification” heading with a separate “Required” badge in `QuoteStepReview.tsx`. The Product Owner description matches that UI plus the development placeholder copy.

---

## 4. Files inspected

| File | Role |
| --- | --- |
| `src/app/get-a-quote/page.tsx` | Quotation page; renders `QuoteForm` |
| `src/components/quote/QuoteForm.tsx` | Multi-step form, client submit, token state, `/api/quote` fetch |
| `src/components/quote/QuoteStepReview.tsx` | Step 5 review; verification UI branch |
| `src/components/quote/TurnstileField.tsx` | Live Turnstile widget loader |
| `src/lib/security/turnstile.ts` | Server verification, dev bypass, dev placeholder acceptance |
| `src/lib/quote/submit.ts` | Authoritative submit pipeline, config guard, persistence |
| `src/app/api/quote/route.ts` | HTTP handler, status mapping |
| `src/lib/quote/schema.ts` | Zod schemas including `turnstileToken` |
| `src/lib/quote/session.ts` | Draft and idempotency session storage |
| `src/lib/quote/constants.ts` | Route and payload limits |
| `src/lib/security/rate-limit.ts` | Rate limiter (no-op) |
| `src/lib/email/types.ts` | Email configuration check |
| `src/lib/email/transport.ts` | Development log / missing-config transports |
| `src/lib/prisma.ts` | Prisma client |
| `src/lib/quote/reference.ts` | Reference generation |
| `prisma/schema.prisma` | `QuoteRequest`, `QuoteNotificationAttempt` |
| `prisma/migrations/20260801180000_init_quotation/migration.sql` | Initial quotation migration |
| `.env.example` | Documented environment variables |
| `next.config.ts` | Next.js config (no env overrides) |
| `docs/phase-reports/PHASE_3A_QUOTATION_FORM_IMPLEMENTATION_REPORT.md` | Implementation baseline |
| `docs/phase-reports/PHASE_3B1_LOCAL_DATABASE_MIGRATION_AND_PERSISTENCE_REPORT.md` | Local persistence and bypass evidence |
| `docs/phase-reports/PHASE_3B_QUOTATION_INFRASTRUCTURE_PREFLIGHT_AUDIT.md` | Turnstile inventory and hardening gaps |
| `docs/phase-reports/PHASE_10A_HOSTINGER_PRIVATE_PREVIEW_PREPARATION_REPORT.md` | Hosted env status (Turnstile not configured) |
| `docs/phase-reports/PHASE_10B_HOSTINGER_DATABASE_MIGRATION_BUILD_REPORT.md` | Migration build fix |
| `docs/phase-reports/PHASE_7_QUOTATION_WEBSITE_NORMALISATION_REPORT.md` | Recent Phase 7 normalisation |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Tracker checklist entries |
| `docs/06_QUOTATION_FORM_SPEC.md` | Approved specification (referenced) |
| `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` | Deployment env requirements (referenced) |

---

## 5. Existing quotation architecture

### End-to-end flow

1. **Page render:** `src/app/get-a-quote/page.tsx` → `QuoteForm` (client component).
2. **Step navigation:** Steps 1–4 validate via `quoteStepSchemas`; step 5 is review/consent.
3. **Draft persistence:** `session.ts` stores form values and step in `sessionStorage`; Turnstile token and honeypot are excluded from draft by design (token held in React state only).
4. **Submit trigger:** Step 5 “Submit quotation request” calls `handleSubmit()` in `QuoteForm.tsx`.
5. **Client guards:** Step 5 Zod validation; non-empty `turnstileToken`; honeypot in hidden `website` field.
6. **API call:** `POST /api/quote` with JSON payload including `turnstileToken`, `idempotencyKey`, and honeypot field `website`.
7. **Route handler:** `src/app/api/quote/route.ts` — content-type, size limit, delegates to `submitQuote()`.
8. **Server pipeline:** `submitQuote()` in `src/lib/quote/submit.ts`:
   - `quoteSubmissionPayloadSchema` validation
   - honeypot check (`website` must be empty)
   - runtime configuration guard
   - rate limit check (no-op)
   - `verifyTurnstileToken()`
   - idempotency lookup
   - Prisma transaction create `QuoteRequest`
   - email transport send + `QuoteNotificationAttempt` records
9. **Success:** Returns `{ ok: true, reference }`; client clears draft and idempotency key.
10. **Failure:** Mapped HTTP status; client shows error; clears Turnstile token on failure.

---

## 6. Existing verification architecture

Verification is implemented as a replaceable Cloudflare Turnstile boundary with explicit non-production fallbacks.

| Layer | File | Function / component |
| --- | --- | --- |
| UI selection | `QuoteStepReview.tsx` | Branch on `NEXT_PUBLIC_TURNSTILE_SITE_KEY` |
| Live widget | `TurnstileField.tsx` | Script load, render, callbacks |
| Client token state | `QuoteForm.tsx` | `turnstileToken` state; submit guard |
| Payload schema | `schema.ts` | `turnstileToken` required string |
| Server verify | `turnstile.ts` | `verifyTurnstileToken()`, `isTurnstileBypassEnabled()` |
| Config guard | `submit.ts` | `getRuntimeConfigurationIssues()` |
| API mapping | `route.ts` | `turnstile` → HTTP 400; `configuration` → HTTP 503 |

There is no separate verification service, middleware, or third-party React Turnstile package. Integration uses Cloudflare’s explicit-render script directly.

---

## 7. Development placeholder implementation

### What renders the placeholder

`QuoteStepReview.tsx` lines 145–160:

```tsx
{siteKey ? (
  <TurnstileField ... />
) : (
  <>
    <p>Development verification placeholder. This is not a live security check.</p>
    <button onClick={() => onTurnstileTokenChange("development-placeholder-token")}>
      {turnstileToken ? "Development verification complete" : "Complete development verification"}
    </button>
  </>
)}
```

### Activation condition

The placeholder renders when `siteKey` is falsy after:

```tsx
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
```

### Dependencies

| Factor | Affects placeholder? | Evidence |
| --- | --- | --- |
| `NODE_ENV` | No (client branch) | Only checks public site key |
| Missing Turnstile site key | **Yes — primary trigger** | Empty `siteKey` → placeholder |
| `TURNSTILE_BYPASS_DEV` | No (client branch) | Server-only |
| `TURNSTILE_SECRET_KEY` | No (client branch) | Server-only; widget still requires site key |

### Why it appears on Hostinger

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` is a Next.js public environment variable inlined at **build time** into the client bundle. Phase 10A report documents Turnstile keys as “Not configured” on Hostinger. A production build without this variable produces a client bundle where `siteKey` is always empty, so every visitor sees the development placeholder regardless of runtime server env.

This is **intentional fallback behaviour in code** when the site key is absent, but it is a **production defect in deployment** because the placeholder is not a live security control and cannot produce a Cloudflare-valid token.

### Can the placeholder produce a valid production token?

**No.**

- Client sets literal `"development-placeholder-token"`.
- Server accepts that token only when `NODE_ENV !== "production"` (`turnstile.ts` lines 27–28).
- In production, that token is rejected; with no secret key, verification returns `{ success: false, reason: "configuration" }`.
- Even before Turnstile verification, `submit.ts` blocks production submission when Turnstile keys are missing in `getRuntimeConfigurationIssues()`.

---

## 8. Environment-variable matrix

| Variable | Side | Required | Development behaviour | Production behaviour | Safe default when missing | In `.env.example` | Hostinger | Cloudflare |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client (build-time) | Optional locally; **required in production** | Empty → dev placeholder UI | Empty → dev placeholder UI in bundle; config guard blocks API | Empty string; placeholder UI | Yes | **Yes — must be set before rebuild** | Site key from Turnstile widget |
| `TURNSTILE_SECRET_KEY` | Server (runtime) | Optional locally; **required in production** | Missing + non-prod → dev placeholder token path or bypass | Missing → config guard 503; verify returns `configuration` | Verification fails in production | Yes | **Yes — runtime env** | Secret key from Turnstile widget |
| `TURNSTILE_BYPASS_DEV` | Server (runtime) | Optional | `"true"` + `NODE_ENV !== "production"` → any token accepted | Ignored when `NODE_ENV === "production"` | `false` / unset | Yes (`false`) | **Must be unset or `false`** | N/A |
| `NODE_ENV` | Server / build | Set by Next.js | Enables dev bypass and placeholder token acceptance | Disables bypass and placeholder acceptance | N/A (framework) | No | Set by Hostinger/Next production build | N/A |
| `DATABASE_URL` | Server (runtime) | Required for persistence | Local MySQL | Hostinger MySQL | Config 503 if missing | Yes (empty) | **Yes — configured per PO** | N/A |
| `EMAIL_FROM` | Server (runtime) | Optional locally; **required in production** | Dev log transport | Config guard 503 if missing | Email not sent; blocks prod submit | Yes (empty) | **Yes — required for prod submit** | N/A |
| `QUOTE_NOTIFICATION_EMAIL` | Server (runtime) | Optional locally; **required in production** | Dev log transport | Config guard 503 if missing | Same as above | Yes (empty) | **Yes — required for prod submit** | N/A |
| `SITE_MODE` | Server | Optional | Preview indexing block | Preview indexing block | `preview` | Yes | Already configured | N/A |
| `NEXT_PUBLIC_SITE_URL` | Client | Optional | Local URL | Canonical URL | localhost default | Yes | Recommended | N/A |

**Not implemented in code (documented elsewhere only):** `RATE_LIMIT_SECRET` — rate limiter is currently `NoOpRateLimiter` in `rate-limit.ts`.

**Critical Next.js note:** Changing `NEXT_PUBLIC_TURNSTILE_SITE_KEY` on Hostinger requires a **full rebuild and redeploy**. Setting it only at runtime without rebuild will not update the client bundle.

---

## 9. Local successful-flow explanation

### Evidence (Phase 3B1 report and source)

Local API persistence tests used:

- `NODE_ENV=development` (Next.js dev server)
- `TURNSTILE_BYPASS_DEV=true` → `verifyTurnstileToken()` accepts any non-empty token via `development-bypass` mode
- No Cloudflare contact

Product Owner local browser success (checklist 2026-08-01) used the full form flow with local MySQL. Source analysis of the likely browser path when no site key is configured locally:

1. Step 5 shows development placeholder (no `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in local env).
2. User clicks “Complete development verification” → `turnstileToken = "development-placeholder-token"`.
3. Client submit proceeds (`QuoteForm.tsx` line 196 guard passes).
4. API receives token; `verifyTurnstileToken()` accepts because `NODE_ENV !== "production"` and token matches placeholder literal.
5. `submitQuote()` persists to MySQL; returns reference.
6. Email attempts logged as `LOGGED` via `DevelopmentLoggingTransport`.

### Conclusions

| Question | Answer |
| --- | --- |
| Development bypass used? | API tests: yes (`TURNSTILE_BYPASS_DEV=true`). Browser flow: likely **development-placeholder token** path (no site key required). |
| How browser marked complete? | Button click sets non-empty token string in React state. |
| Token sent to API | `"development-placeholder-token"` (or any token if bypass enabled). |
| How API accepted | Non-production only: placeholder token match or bypass flag. |
| Restricted to development? | **Yes** — both paths explicitly gated on `NODE_ENV !== "production"`. |
| DB write proves persistence? | **Yes** — local success demonstrates schema, migration, Prisma, and submit pipeline work independently of live Turnstile. |

---

## 10. Hosted failure-flow explanation

### Proven facts

1. Hosted build lacks `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build time (Phase 10A: not configured).
2. Development placeholder renders (matches PO observation).
3. `NODE_ENV === "production"` on Hostinger production deployment.
4. Turnstile secret and email env vars documented as not configured in Phase 10A.
5. PO confirms MySQL migration now applied — `DATABASE_URL` likely present.
6. No hosted row created (matches server rejection before or during submit).

### Most likely execution path (evidence-based)

| Step | Expected behaviour | Evidence strength |
| --- | --- | --- |
| 1. Verification UI | Development placeholder (no site key in client bundle) | **Proven** |
| 2. User completes placeholder | Token set to `"development-placeholder-token"` | **Proven** (button behaviour) |
| 3. Client submit | `/api/quote` called if token non-empty | **Proven** (code path) |
| 4. Config guard | Production missing Turnstile keys (+ likely email) → HTTP 503 `configuration` | **Proven** (submit.ts lines 48–67, 125–132) |
| 5. Turnstile verify (if reached) | Placeholder token rejected in production; missing secret → `configuration` | **Proven** (turnstile.ts) |
| 6. DB write | Not reached or not committed | **Proven** (no row) |
| 7. Client error display | 503 sets `configurationError=true` → heading “Service temporarily unavailable”; message from server | **Proven** for first failed submit |
| 8. Token cleared on failure | `setTurnstileToken("")` on error | **Proven** |
| 9. Retry without re-verifying | Client blocks with “Complete the verification step before submitting.” | **Proven** (QuoteForm.tsx line 197) |

### Product Owner message reconciliation

The combined display “Service temporarily unavailable” + “Complete the verification step before submitting.” is **consistent with source** if:

- First submit returned HTTP 503 configuration error (heading + server message), then token was cleared; **or**
- User retried submit without clicking verification again (client-side message).

The exact server configuration message is: “Quotation submission is temporarily unavailable. Please contact PackSendGo directly.” If the Product Owner saw the shorter verification message, that corresponds to the client-side guard or a retry after token clearance.

### Inference (clearly labelled)

- `/api/quote` was likely called on the first submit attempt after placeholder completion — client code always calls the API when token is set.
- Rejection occurred at the production configuration guard before Prisma write — most probable given missing Turnstile and email configuration documented in Phase 10A.

---

## 11. Client-side verification behaviour

| Behaviour | Status |
| --- | --- |
| Blocks submit when token empty | **Implemented** — `QuoteForm.tsx` `handleSubmit()` |
| Does not call API when token empty | **Implemented** |
| Sends `turnstileToken` in JSON body | **Implemented** |
| Excludes token from session draft | **Implemented** (React state only) |
| Clears token after failed submit | **Implemented** |
| UI branch: live widget vs placeholder | **Implemented** — keyed on public site key only |
| Production-safe unavailable state when misconfigured | **Partial** — shows dev placeholder instead of “verification unavailable” message |

---

## 12. Server-side verification behaviour

| Behaviour | Status |
| --- | --- |
| Requires non-empty token (schema) | **Implemented** |
| Dev bypass (`TURNSTILE_BYPASS_DEV`) | **Implemented** — production-safe |
| Dev placeholder token acceptance | **Implemented** — non-production only |
| Live Cloudflare siteverify POST | **Implemented** — `turnstile.ts` |
| Production config guard for missing keys | **Implemented** — returns 503 before persistence |
| Independent of client UI mode | **Implemented** — server never trusts UI branch |
| Hostname validation on siteverify response | **Missing** |
| Request timeout on siteverify fetch | **Missing** |
| Duplicate-token tracking | **Missing** |
| `remoteip` forwarding | **Missing** |

---

## 13. Live Turnstile implementation inventory

| Capability | Classification |
| --- | --- |
| Turnstile script loading (`api.js?render=explicit`) | **Implemented but unverified** — no live credentials test in repo |
| Live widget rendering (`TurnstileField.tsx`) | **Implemented but unverified** |
| Callback / token capture | **Implemented but unverified** |
| Expiry handling (`expired-callback` clears token) | **Implemented but unverified** |
| Error handling (`error-callback` clears token) | **Implemented but unverified** |
| Reset / remove on unmount | **Implemented but unverified** |
| Server-side siteverify request | **Implemented but unverified** |
| Hostname validation | **Missing** |
| Timeout handling | **Missing** |
| Duplicate-token protection | **Missing** |
| Production-safe unavailable state (no dev placeholder in prod) | **Partially implemented** — prod shows placeholder when key missing |
| Automated tests | **Missing** — no turnstile unit/integration tests found |

**Overall Turnstile status:** Core live integration code exists in repository; live behaviour is **unverified**; production deployment is **not configured**; security hardening items remain open.

---

## 14. Database-persistence readiness

| Item | Status |
| --- | --- |
| Prisma schema | **Ready** |
| Migration `20260801180000_init_quotation` | **Ready** — applied locally and on Hostinger per PO |
| Build embeds `prisma migrate deploy` | **Ready** (Phase 10B) |
| Submit persistence path | **Ready** — proven locally |
| Idempotency (sequential) | **Ready** — proven locally |
| Stale conditional field stripping | **Ready** |
| Turnstile token not stored | **Ready** — by design |
| Hosted persistence | **Blocked by verification/config gate**, not by schema |

Database layer is production-ready. Hosted submissions fail upstream of Prisma write due to missing production configuration (Turnstile and email), not due to schema or migration defects.

---

## 15. Notification-attempt readiness

| Item | Status |
| --- | --- |
| `QuoteNotificationAttempt` model | **Ready** |
| Records created per submit (customer + internal) | **Ready** — proven locally |
| Development logging transport | **Ready** |
| Production provider transport | **Not implemented** — `createEmailTransport()` returns `DevelopmentLoggingTransport` when configured, or `MissingConfigurationTransport` in production when not configured |
| Production email env required by config guard | **Yes** — blocks submit even if Turnstile were fixed |

Notification records will be created when submit succeeds. Production email delivery requires provider configuration beyond this audit scope, but `EMAIL_FROM` and `QUOTE_NOTIFICATION_EMAIL` must be set for production submit to pass the config guard today.

---

## 16. Security findings

1. **Development placeholder in production build** — When site key is missing at build time, production users see a non-security control and may believe verification is complete. Defect from deployment configuration, enabled by intentional dev fallback in code.
2. **Dev bypass correctly restricted** — `isTurnstileBypassEnabled()` requires both non-production `NODE_ENV` and `TURNSTILE_BYPASS_DEV === "true"`.
3. **Dev placeholder token correctly restricted** — Accepted only when `NODE_ENV !== "production"`.
4. **Server config guard** — Production refuses submit when Turnstile or email configuration missing; fails closed before DB write.
5. **Honeypot** — Server rejects non-empty `website` field; not persisted.
6. **Rate limiting** — No-op; no production protection (Phase 9 deferred).
7. **No hostname validation on siteverify** — Documented hardening gap from Phase 3B audit.
8. **Turnstile token not persisted** — Correct per spec.

---

## 17. Configuration findings

1. Hostinger lacks `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build time → development placeholder in client bundle.
2. Hostinger lacks `TURNSTILE_SECRET_KEY` at runtime → server config guard and verification failure.
3. Hostinger likely lacks `EMAIL_FROM` and `QUOTE_NOTIFICATION_EMAIL` → additional config guard failure in production.
4. `DATABASE_URL` now configured per PO — persistence path unblocked once verification and email config pass.
5. `TURNSTILE_BYPASS_DEV` must remain unset or `false` on Hostinger — correct if omitted.
6. Rebuild required after adding public Turnstile site key.

---

## 18. Proven defects

1. **Production client bundle renders development verification placeholder** when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` was not set at build time — matches hosted PO observation.
2. **Production submit blocked by configuration guard** when Turnstile and/or email env vars missing — matches no hosted DB row.
3. **Development placeholder token cannot succeed in production** — by design; PO cannot complete real verification via placeholder button on Hostinger.
4. **Failed submit clears Turnstile token** — causes “Complete the verification step before submitting.” on retry without re-verification.

---

## 19. Unproven risks

1. Live Turnstile widget behaviour with real Cloudflare keys (script load, CSP, ad blockers) — not tested in repository.
2. Siteverify network failures/timeouts — no timeout handling; behaviour unverified.
3. Turnstile widget hostname allow-list mismatch for temporary Hostinger domain — requires Cloudflare dashboard configuration.
4. Concurrent idempotency race — documented limitation; not verification-specific.
5. Whether PO’s hosted deploy includes email env vars since Phase 10A — assumed still missing; not re-verified in this audit.

---

## 20. Exact completion requirements

### Required source changes (recommended — not implemented in this audit)

1. **Production misconfiguration UX** — When `NODE_ENV === "production"` and site key missing at build, show explicit “Verification unavailable” message instead of development placeholder (optional hardening; configuration remains primary fix).
2. **Siteverify hardening** — Add fetch timeout, optional hostname check against `NEXT_PUBLIC_SITE_URL` host, log mode on success (Phase 3B3 items).
3. **Rate limiting** — Phase 9; replace `NoOpRateLimiter` when scope approved.
4. **Production email transport** — Provider SDK when email scope approved (required for config guard today).

### Minimum to unblock hosted quotation (configuration-first)

1. Create Cloudflare Turnstile widget with Hostinger hostname(s).
2. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in Hostinger **before rebuild**.
3. Set `TURNSTILE_SECRET_KEY` in Hostinger runtime env.
4. Set `EMAIL_FROM` and `QUOTE_NOTIFICATION_EMAIL` in Hostinger runtime env.
5. Rebuild and redeploy application on Hostinger.
6. Verify live widget renders (not placeholder).
7. Submit test quotation; confirm `QuoteRequest` row and notification attempts.

---

## 21. Exact Hostinger configuration required

| Variable | When to set | Action |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Build environment | Set to Cloudflare site key; trigger full rebuild |
| `TURNSTILE_SECRET_KEY` | Runtime | Set to Cloudflare secret key |
| `TURNSTILE_BYPASS_DEV` | Runtime | Omit or set `false` |
| `DATABASE_URL` | Runtime | Already configured per PO |
| `EMAIL_FROM` | Runtime | Set verified sender address |
| `QUOTE_NOTIFICATION_EMAIL` | Runtime | Set internal recipient |
| `SITE_MODE` | Runtime | Keep `preview` until launch review |
| `NEXT_PUBLIC_SITE_URL` | Build | Set to Hostinger preview/production URL |

---

## 22. Exact Cloudflare configuration required

1. Create a Turnstile widget in Cloudflare dashboard.
2. Add **Hostinger hostname(s)** to widget allowed domains (including temporary preview hostname).
3. Copy **site key** → Hostinger `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
4. Copy **secret key** → Hostinger `TURNSTILE_SECRET_KEY`.
5. Choose widget mode (managed recommended for quotation form).
6. If domain is Cloudflare-proxied, ensure Turnstile script domain `challenges.cloudflare.com` is reachable from client browsers.
7. For local testing later, add `localhost` to widget domains or use separate dev widget keys.

No Cloudflare contact was made during this audit.

---

## 23. Proposed implementation file scope

If Product Owner approves follow-up implementation:

| File | Potential change |
| --- | --- |
| `src/components/quote/QuoteStepReview.tsx` | Production-safe misconfiguration message |
| `src/lib/security/turnstile.ts` | Timeout, hostname validation, logging |
| `src/lib/email/transport.ts` | Production provider (when approved) |
| `src/lib/security/rate-limit.ts` | Real limiter (Phase 9) |
| `.env.example` | Documentation only if new vars added |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Mark live Turnstile verified after PO acceptance |

No quotation schema, migration, or API contract changes required for basic live Turnstile completion.

---

## 24. Local retest plan

1. Configure `.env.local` with Cloudflare **test** site key and secret (or continue dev placeholder for non-Turnstile tests).
2. `npm run dev` with local MySQL (`DATABASE_URL`).
3. Confirm step 5 shows live widget when site key set; placeholder when unset.
4. Complete widget; submit; confirm HTTP 200 and DB row.
5. Test with `TURNSTILE_BYPASS_DEV=true` only in development — confirm still works.
6. Confirm `TURNSTILE_BYPASS_DEV=true` with `NODE_ENV=production` does **not** bypass (production build test).
7. Run `npm run lint`, `npm run typecheck`, `npm run build`.

---

## 25. Hosted retest plan

1. Apply Hostinger env vars (section 21).
2. Rebuild and redeploy.
3. Load `/get-a-quote` step 5 — confirm **live Turnstile widget**, not development placeholder.
4. Complete verification; submit valid quotation.
5. Confirm success reference displayed.
6. Confirm row in Hostinger MySQL `QuoteRequest`.
7. Confirm two `QuoteNotificationAttempt` rows.
8. Retry same idempotency — confirm duplicate handling.
9. Submit without verification — confirm client block, no API call.
10. Confirm `TURNSTILE_BYPASS_DEV` not enabled.

---

## 26. Product Owner acceptance steps

1. Confirm Cloudflare Turnstile widget created with correct hostname(s).
2. Confirm Hostinger environment variables set (section 21).
3. Confirm rebuild completed after public site key added.
4. Confirm hosted step 5 shows live widget.
5. Submit test quotation on Hostinger.
6. Verify MySQL row and reference match success screen.
7. Verify notification attempt records exist.
8. Confirm development placeholder no longer visible on hosted site.
9. Confirm search indexing still blocked if `SITE_MODE=preview`.
10. Explicitly accept Phase 7 verification completion in tracker.

---

## 27. Remaining blockers

1. **Cloudflare Turnstile widget not created/configured** for Hostinger hostname.
2. **`NEXT_PUBLIC_TURNSTILE_SITE_KEY` not in Hostinger build env** — causes dev placeholder.
3. **`TURNSTILE_SECRET_KEY` not in Hostinger runtime env**.
4. **`EMAIL_FROM` / `QUOTE_NOTIFICATION_EMAIL` likely missing** — production config guard.
5. **Hostinger rebuild/redeploy** required after public env changes.
6. **Live Turnstile never end-to-end tested** with real keys.
7. **Rate limiting** still no-op (Phase 9).
8. **Production email provider** not integrated (transport still dev log even when env set).

---

## 28. Audit verdict

**VERIFICATION PARTIALLY IMPLEMENTED — CODE AND CONFIGURATION REQUIRED**

Live Turnstile client and server verification code exists in the repository and is architecturally complete for a basic production path, but:

- Hosted deployment lacks Turnstile (and likely email) configuration.
- The client bundle renders the development placeholder on Hostinger because the public site key was not present at build time.
- The development placeholder cannot produce a valid production token.
- Production configuration guard correctly prevents database writes.
- Local success used non-production verification paths (development placeholder token and/or `TURNSTILE_BYPASS_DEV`), proving persistence but not live Turnstile.
- Security hardening (hostname validation, timeout, rate limiting) remains incomplete.

Configuration of Cloudflare Turnstile keys, Hostinger rebuild, and production email variables is the immediate critical path. Optional code hardening improves production safety but is secondary to configuration for first hosted success.

---

**Audit completion:** PASS
**Source files modified:** None (report only)
**Environment values exposed:** None
**External services contacted:** None
**Git commands run:** None
