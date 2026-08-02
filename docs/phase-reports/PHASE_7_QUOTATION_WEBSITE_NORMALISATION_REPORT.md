# Phase 7 — Quotation website normalisation report

**Date:** 2026-08-02
**Branch:** `fix/phase-7-quotation-website-normalisation`
**Repository:** `D:\Projects\packsendgo-website`
**Product Owner acceptance:** PENDING MANUAL REVIEW

---

## 1. Objective

Allow the optional quotation website field to accept bare domains and common URL formats, normalising to a valid `http:` or `https:` URL for client validation, server validation, and database persistence without changing Prisma schema or form scope.

## 2. Tracker alignment

Phase 7 — Quotation form and MySQL. No new programme phase created or renamed.

## 3. Original UX problem

The website field used `type="url"`, which enforced browser-native protocol requirements before application validation. Users entering `website.com` or `www.website.com` faced unnecessary friction. Zod validation also required an explicit `http://` or `https://` prefix.

## 4. Existing implementation audited

| Area | Finding |
| --- | --- |
| `QuoteStepContact.tsx` | `type="url"`, no placeholder, no help text |
| `schema.ts` | Regex requiring `^https?://` prefix |
| `submit.ts` | Stored `websiteUrl` from parsed payload without separate normalisation |
| `QuoteForm.tsx` | Submitted raw form values; step 1 validation did not rewrite display value |

Honeypot field `website`, idempotency, draft persistence, and conditional-field cleanup were unchanged.

## 5. Files created

- `src/lib/quote/normalise-website.ts`

## 6. Files modified

- `src/lib/quote/schema.ts`
- `src/components/quote/QuoteStepContact.tsx`
- `src/components/quote/QuoteForm.tsx`
- `docs/04_BUILD_PHASE_CHECKLIST.md`
- `next-env.d.ts` (build churn restored to dev routes import; no functional change retained)

## 7. Normalisation architecture

Single shared function `normaliseWebsite()` in `src/lib/quote/normalise-website.ts`:

1. Trims whitespace
2. Returns failure for blank input (optional field handled upstream via `emptyToUndefined`)
3. Preserves explicit `http://` and `https://`
4. Prepends `https://` when no scheme is present
5. Parses with platform `URL`
6. Allows only `http:` and `https:`
7. Rejects dangerous schemes (`javascript:`, `data:`, `file:`, `ftp:`, etc.)
8. Validates hostname labels; rejects spaces, leading/trailing dots, single-label hosts
9. Rejects credential-bearing URLs
10. Preserves path, query, and fragment
11. Removes trailing slash on root URLs only

Used by Zod schema transform/refine on both client step schemas and server payload schema.

## 8. Client-side behaviour

- Text input with `inputMode="url"`, `autoComplete="url"`, placeholder `example.com`
- Help text: `www and https:// are optional.`
- No native URL type validation
- Validation message: `Enter a valid website, for example example.com.`
- Display value preserved while typing; normalisation on schema parse and at submission payload build
- Field remains optional
- Error associated via existing `Field` component (`aria-invalid`, `aria-describedby`, `role="alert"`)

## 9. Server-side authority

`quoteSubmissionPayloadSchema` applies the same Zod `websiteUrl` rules. Direct API submissions are normalised and validated independently of client values.

## 10. Supported inputs

| Input | Normalised output |
| --- | --- |
| `website.com` | `https://website.com` |
| `www.website.com` | `https://www.website.com` |
| `website.com/shop` | `https://website.com/shop` |
| `www.website.com/shop` | `https://www.website.com/shop` |
| `https://website.com` | `https://website.com` |
| `http://website.com` | `http://website.com` |
| `https://subdomain.website.com/path` | `https://subdomain.website.com/path` |
| `https://subdomain.website.com/path?source=test` | `https://subdomain.website.com/path?source=test` |
| `  website.com  ` | `https://website.com` |
| `https://website.com/` | `https://website.com` |
| blank / whitespace | `undefined` (optional) |

## 11. Rejected inputs

| Input | Result |
| --- | --- |
| `javascript:alert(1)` | Rejected |
| `data:text/html,test` | Rejected |
| `ftp://website.com` | Rejected |
| `file:///etc/passwd` | Rejected |
| `not a website` | Rejected |
| `https://` | Rejected |
| `.com` | Rejected |
| `website` | Rejected |
| `https://user:password@website.com` | Rejected |
| `website .com` | Rejected |

## 12. Protocol handling

- Missing scheme → `https://`
- Explicit `http://` preserved (not upgraded)
- Explicit `https://` preserved

## 13. Security safeguards

- Non-HTTP(S) schemes rejected before storage
- Credential-bearing URLs rejected
- Hostname validation rejects malformed and space-containing hosts
- Server re-validates all submissions

## 14. Database-storage behaviour

`websiteUrl` column unchanged (`String?`). Normalised URL stored, e.g. `www.example.com/shop` → `https://www.example.com/shop`.

Verified reference: `PSG-20260802-JZBR` (synthetic row removed after validation).

## 15. Idempotency preservation

Duplicate POST with the same idempotency key returned the same reference (`PSG-20260802-9SFK`); one database row created with normalised `https://website.com`. Synthetic row removed after validation.

## 16. Accessibility

- Label, optional marker, hint, and error use existing accessible `Field` pattern
- Invalid state exposes `aria-invalid="true"` and error id in `aria-describedby`

## 17. Desktop validation

- `/get-a-quote` step 1 accepts bare domain `website.com` and advances to step 2
- Placeholder and help text visible
- Draft persistence retains entered website value on back navigation

## 18. Mobile validation

- 390×844 mobile viewport: website field, placeholder, and help text render correctly; no horizontal overflow observed in snapshot

## 19. Direct API validation

- Valid: `www.example.com/shop` → HTTP 200, reference `PSG-20260802-JZBR`
- Invalid: `javascript:alert(1)` → HTTP 400, `fieldErrors.websiteUrl` with authorised message

## 20. Local database validation

- Docker container `packsendgo-mysql-local` healthy
- Local `DATABASE_URL` loaded without logging connection string
- Stored value confirmed: `https://www.example.com/shop`

## 21. Synthetic-data cleanup

All synthetic quotation rows and associated notification attempts removed after validation.

## 22. Lint result

**PASS** — one pre-existing React Hook Form compiler warning in `QuoteForm.tsx`; no new errors.

## 23. Typecheck result

**PASS**

## 24. Build result

**PASS** — `prisma migrate deploy`, Prisma Client generation, Next.js build; `/get-a-quote` and `/api/quote` compile.

## 25. Runtime result

**PASS** — dev server step-1 validation, API submission, and database persistence verified.

## 26. Known warnings

- Pre-existing React Compiler warning for `watch()` in `QuoteForm.tsx`
- Pre-existing Next.js hydration notice for `PackSendGoLogo.tsx` in dev overlay (unrelated to this change)
- `npm warn Unknown env config "devdir"` during build (environment tooling; unrelated)

## 27. Verdict

**Quotation website normalisation verdict: READY FOR PRODUCT OWNER REVIEW**

## 28. Product Owner acceptance status

**PENDING MANUAL REVIEW**

Recommended manual checks:

1. Enter bare domain on step 1 and confirm smooth progression
2. Confirm optional field can remain blank
3. Confirm review summary shows entered website value
4. Submit with `www` domain and confirm success
5. Confirm invalid scheme shows accessible field error
