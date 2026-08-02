# Phase 4 and 9 Legal, 404 and Sitemap Completion Report

**Date:** 2026-08-02
**Mode:** API Saving Mode — Batch 4 controlled legal-shell and technical-SEO implementation
**Repository:** `D:\Projects\packsendgo-website`
**Branch:** `launch/final-completion`
**Parent programme phases:** Phase 4 — Public pages; Phase 9 — SEO, security and performance
**Product Owner acceptance:** PENDING MANUAL REVIEW
**Batch 4 verdict:** READY FOR PRODUCT OWNER REVIEW

---

## 1. Objective

Complete Privacy Policy, Terms and Conditions, Cookie Policy, custom 404 page, XML sitemap, footer legal disclosures and local launch validation.

## 2. Parent programme phases

- Phase 4 — Public pages (legal pages)
- Phase 9 — SEO, security and performance (sitemap, robots)

## 3. Verified legal identity

PackSendGo operated by Denzil Deals Ltd (13240080). Website technology operated by Zapa Technologies Ltd (14719144) on behalf of Denzil Deals Ltd. Contact: support@packsendgo.com.

## 4. Denzil Deals Ltd role

Responsible for customer relationships, quotation enquiries and fulfilment services.

## 5. Zapa Technologies Ltd role

Operates and manages the website and technology platform on behalf of Denzil Deals Ltd. Not the fulfilment-service provider.

## 6. Authority and implementation files reviewed

- Quotation schema (`src/lib/quote/schema.ts`)
- Prisma `QuoteRequest` model
- Quotation session storage (`src/lib/quote/session.ts`)
- Email transport and Resend (`src/lib/email/`)
- Theme provider (`src/components/theme/ThemeProvider.tsx`)
- Quote review consent UI (`src/components/quote/QuoteStepReview.tsx`)
- Site mode and robots (`src/lib/site-mode.ts`, `src/app/robots.ts`)
- Footer and navigation constants

## 7. Actual personal-data audit

Quotation form collects contact, business, operational, consent and optional marketing data stored in MySQL. Email notifications sent via Resend when configured. No automated acceptance decisions.

## 8. Actual browser-storage audit

- `sessionStorage`: quotation draft (`packsendgo-quote-draft-v1`) and idempotency key (`packsendgo-quote-idempotency-v1`)
- `localStorage`: theme preference via next-themes (`theme` key)
- No application `localStorage` for quotation drafts (session only)

## 9. Actual cookie audit

No application-set HTTP cookies found in repository source. Infrastructure may process standard request data.

## 10. Actual analytics/tracking audit

No Google Analytics, Meta Pixel, gtag or advertising scripts in source. `TRACKING_REQUIRED` form field refers to parcel tracking preference, not web analytics.

## 11. Files created

- `src/app/privacy-policy/page.tsx`
- `src/app/terms-and-conditions/page.tsx`
- `src/app/cookie-policy/page.tsx`
- `src/app/not-found.tsx`
- `src/app/sitemap.ts`
- `src/lib/legal-data.ts`
- `src/components/legal/LegalPageLayout.tsx`
- `docs/phase-reports/PHASE_4_9_LEGAL_404_SITEMAP_COMPLETION_REPORT.md`

## 12. Files modified

- `src/components/layout/SiteFooter.tsx`
- `src/app/robots.ts`
- `docs/04_BUILD_PHASE_CHECKLIST.md`

## 13. Shared legal-page architecture

`LegalPageLayout`, `LegalSection`, `LegalIdentityBlock`, `LegalContactLink` in `src/components/legal/LegalPageLayout.tsx`. Business facts centralised in `src/lib/legal-data.ts`.

## 14. Privacy Policy

Implemented at `/privacy-policy` with all required sections, verified operator roles, provider references, retention, rights and ICO complaint information.

## 15. Terms and Conditions

Implemented at `/terms-and-conditions` as website and quotation-request terms with governing law England and Wales.

## 16. Cookie Policy

Implemented at `/cookie-policy` reflecting actual session/local storage uses. No analytics or advertising cookies stated.

## 17. Data-controller wording

Denzil Deals Ltd identified as responsible for quotation and fulfilment-service personal information.

## 18. Technology-operator wording

Zapa Technologies Ltd identified as website and technology platform operator on behalf of Denzil Deals Ltd.

## 19. Hosting and email-provider wording

Hostinger (hosting/database) and Resend (transactional email) referenced without invented locations or safeguards.

## 20. Data-retention wording

Practical necessity-based retention; no fixed invented periods.

## 21. Individual-rights wording

UK data-protection rights and ICO complaint route included.

## 22. Cookie-banner decision

No cookie banner added — no non-essential analytics or advertising cookies in application code.

## 23. Footer legal disclosure

Denzil Deals Ltd and Zapa Technologies Ltd statements added with company numbers.

## 24. We Build Anything credit preservation

Design credit preserved separately with link to `https://zapatechnologies.com`.

## 25. Custom 404

`src/app/not-found.tsx` with Home, Services and Get a quote links; `robots: noindex`.

## 26. Sitemap

`src/app/sitemap.ts` generates absolute URLs for nine public routes.

## 27. Robots/site-mode behaviour

Preview mode: `Disallow: /`, no sitemap. Public mode: `Allow: /` with sitemap URL (when `SITE_MODE=public`).

## 28. Legal metadata

Individual titles, descriptions and Open Graph on all three legal pages.

## 29. Desktop behaviour

Privacy Policy validated at desktop width with readable prose and footer disclosures.

## 30. Mobile behaviour

Legal pages use compact hero and max-width prose; footer stacks cleanly.

## 31. Light mode

Validated on privacy policy page.

## 32. Dark mode

Theme toggle functional; legal text readable.

## 33. Accessibility

Semantic headings, mailto links, focus states on navigation and footer links.

## 34. Route validation

All required routes return HTTP 200; unknown route returns 404; `/warehouse` returns 308.

## 35. Link validation

Footer and quotation privacy link resolve to `/privacy-policy`. No active `/privacy`, `/terms` or `/cookies` links.

## 36. Sitemap validation

Nine intended routes; absolute URLs; no API routes; no `/warehouse`.

## 37. Lint

PASS — 0 errors after unused import fix; 1 pre-existing QuoteForm warning.

## 38. Typecheck

PASS

## 39. Build

PASS

## 40. Browser console

PASS — no runtime errors observed.

## 41. Known warnings

Pre-existing React Hook Form compiler warning in `QuoteForm.tsx`.

## 42. Legal-review recommendation

Independent legal review is recommended before unrestricted public launch.

## 43. Remaining launch work

Independent legal review; production domain verification; Hostinger deployment; production Resend verification; final Product Owner launch acceptance.

## 44. Verdict

**Batch 4 verdict: READY FOR PRODUCT OWNER REVIEW**

## 45. Product Owner acceptance status

**Product Owner acceptance: PENDING MANUAL REVIEW**
