# Phase 3A Quotation Form Preflight Audit

## 1. Objective

Audit the approved PackSendGo quotation-form specification against the accepted Phase 2B homepage implementation, produce a precise implementation plan for Phase 3A, and record Product Owner preflight acceptance and implementation decisions (2026-08-01).

## 2. Authority reviewed

| Document | Status | Purpose |
| --- | --- | --- |
| `docs/00_PROJECT_AUTHORITY.md` | Read | Quotation workflow, approved pages, stack (Prisma, MySQL, Turnstile, email) |
| `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md` | Read | V1 quotation scope, exclusions, field categories |
| `docs/03_TECHNICAL_ARCHITECTURE.md` | Read | Submission flow, data model, env vars, security |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Read | Phase 7 quotation-form gate (checklist label; Phase 3A branch aligns to this work) |
| `docs/05_CONTENT_AND_ASSET_REGISTER.md` | Read | Conversion CTAs, prohibited claims, kitting pending |
| `docs/06_QUOTATION_FORM_SPEC.md` | Read | Primary form authority — fields, steps, validation, email, exclusions |
| `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` | Read | Database, email DNS, Turnstile production requirements |
| `docs/15_RISKS_AND_DEFERRED_SCOPE.md` | **Does not exist** | Recorded as absent; audit continued without it |
| `docs/phase-reports/PHASE_2B_HOMEPAGE_IMPLEMENTATION_REPORT.md` | Read | Accepted homepage baseline, deferred quote form |
| `.cursor/rules/00-packsendgo-api-saving-governance.mdc` | Read | Audit controls |

## 3. Current implementation findings

### Routes and pages

| Item | Finding |
| --- | --- |
| Existing App Router pages | `/` (homepage), `/_not-found` only |
| `/get-a-quote` route | **Not implemented** — referenced throughout navigation and CTAs |
| Legal routes (`/privacy-policy`, `/cookie-policy`, `/terms`) | Referenced in `src/lib/site.ts` footer navigation but **not implemented** |

### Quote CTA destinations (all already target `/get-a-quote`)

| Location | File | href |
| --- | --- | --- |
| Hero primary CTA | `src/components/sections/Hero.tsx` | `/get-a-quote` |
| Header quote CTA | `src/components/layout/SiteHeader.tsx` | `/get-a-quote` |
| Mobile nav quote CTA | `src/components/layout/MobileNavigation.tsx` | `/get-a-quote` (default prop) |
| Final homepage CTA | `src/components/sections/QuoteCallToAction.tsx` | `/get-a-quote` |
| Main navigation | `src/lib/site.ts` | `{ label: "Get a Quote", href: "/get-a-quote" }` |

Homepage section `QuoteCallToAction` uses `id="quote"` but **no CTA links to `#quote`**; all quote CTAs correctly target the dedicated route per approved page list (`Get a Quote`).

### Site configuration

- `src/lib/site.ts` — proposition, CTAs, navigation including `/get-a-quote`
- `.env.example` — only `NEXT_PUBLIC_SITE_URL`; no database, email or Turnstile variables yet

### UI primitives

- `src/components/ui/Button.tsx` — primary/secondary/ghost button; usable for form actions
- No shared form field components (`Input`, `Select`, `Checkbox`, `FieldError`) exist yet

### Dependencies (`package.json`)

Current stack: Next.js 16.2.12, React 19, TypeScript, Tailwind CSS 4, Three.js stack, `next-themes`.

**Not installed:** Prisma, MySQL client, validation library, Turnstile widget package, email SDK.

### Phase 2B deferred items relevant to Phase 3A

Per Phase 2B acceptance report, quote form and backend remain deferred. Homepage CTAs and navigation are ready; only the destination page and submission pipeline are missing.

## 4. Quotation experience placement

### Approved structure

Per `docs/06_QUOTATION_FORM_SPEC.md` §3 and `docs/00_PROJECT_AUTHORITY.md` §7:

| Decision | Authority answer |
| --- | --- |
| Dedicated route vs on-page section | **Dedicated route:** approved V1 page **Get a Quote** at `/get-a-quote` |
| Multi-step | **Yes** — five-step staged flow with progressive disclosure |
| On-page anchor form | **No** — not the approved V1 structure |
| Account required | **No** |

### Correct route

**`/get-a-quote`** — matches `src/lib/site.ts` navigation and all existing CTAs. No CTA routing changes required.

### Browser back/forward behaviour

- Spec requires **Back** and **Continue** on steps 1–4 (§3).
- **Product Owner decision (2026-08-01):** Users may move backwards and forwards through steps 1–4. Browser back/forward must **not silently discard** entered form data during the active session.
- Client-side step state persisted for the session only (React state and/or `sessionStorage`) — **no server-side draft saving** in V1.
- URL step query params are not mandated.
- Final submission replaces form with success view; browser back after success must not resubmit — use client success state with idempotency protection.

### Progressive disclosure and UX (Product Owner decision — 2026-08-01)

Although the authority contains approximately 40 user-facing fields:

- Users must **not** see all fields at once.
- Fields are divided across the approved five steps.
- Conditional fields remain hidden until relevant.
- Optional fields must be clearly marked.
- Each step should remain concise and visually manageable.
- Helper text must be used where a question may be unclear.
- Mobile uses the same step structure — no excessively long single page.
- Validation occurs **per step** and again on the server at final submission.

## 5. Exact field register

All fields sourced from `docs/06_QUOTATION_FORM_SPEC.md` §4–§5, updated by Product Owner decisions (2026-08-01) where noted.

### Step 1 — Contact and company

| Label | Field name | Type | Required | Accepted values / validation | Helper / notes | Conditional | Limits | Accessibility | Personal data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Your name | `contactName` | Text | Yes | 2–100 chars; letters and common name characters | Full name | — | 100 | Visible label, autocomplete `name` | Yes |
| Company name | `companyName` | Text | Yes | 2–150 chars | Trading or legal name | — | 150 | autocomplete `organization` | Yes |
| Email address | `email` | Email | Yes | Valid email; max 254 chars | Primary contact email | — | 254 | autocomplete `email`, format hint | Yes |
| Telephone | `telephone` | Tel | Yes | Valid UK/international; 7–20 chars after normalisation | Include country code where applicable | — | 20 normalised | autocomplete `tel`, inputmode tel | Yes |
| Website or store URL | `websiteUrl` | URL | Optional | Valid URL or empty; http/https; max 500 | Ecommerce store if available | — | 500 | Optional field clearly marked | No |
| Country | `country` | Select | Yes | ISO country list | Primary operating country | — | — | Native or custom select with label | Yes |
| Preferred contact method | `preferredContactMethod` | Radio | Yes | `email`, `telephone`, `either` | — | — | — | fieldset/legend | Yes |

### Step 2 — Business and sales channels

| Label | Field name | Type | Required | Accepted values / validation | Helper / notes | Conditional | Limits | Accessibility | Personal data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Business stage | `businessStage` | Select | Yes | `pre_launch`, `early_stage`, `growing`, `established`, `switching_provider` | — | — | — | Visible label | No |
| Product category | `productCategory` | Select | Yes | Controlled selection from approved list; include **Other**; no cold-chain category; no free-text-only field | Exact option list: **PENDING PRODUCT OWNER APPROVAL** — centralise in one replaceable constant | — | — | Helper text if needed | No |
| Product category (other) | `productCategoryOther` | Text | Conditional | Required if **Other** selected; max 200 chars | Describe product type | If `productCategory` is Other | 200 | — | No |
| Current fulfilment arrangement | `currentFulfilment` | Select | Yes | `in_house`, `third_party`, `mixed`, `not_started`, `not_sure` | — | — | — | — | No |
| Desired start date | `requiredStartDate` | Select | Optional | `asap`, `within_2_weeks`, `within_1_month`, `within_1_3_months`, `more_than_3_months`, `exploring` — labels: As soon as possible; Within 2 weeks; Within 1 month; Within 1–3 months; More than 3 months; Just exploring | **RESOLVED** 2026-08-01 | — | — | — | No |
| Primary reason for enquiry | `enquiryReason` | Select | Yes | `cost`, `growth`, `quality`, `capacity`, `new_venture`, `other` | — | — | — | — | No |
| Sales channels | `salesChannels` | Checkbox group | Yes | Min one: Shopify, WooCommerce, Amazon, eBay, TikTok Shop, Etsy, Other marketplace, Custom platform | See §6 conditional logic | — | — | fieldset/legend | No |
| Other marketplace details | `salesChannelOther` | Text | Conditional | Required if Other marketplace selected; max 200 | — | If `salesChannels` includes Other marketplace | 200 | — | No |
| Custom platform details | `customPlatformDetails` | Text | Conditional | Required if Custom platform selected; max 200 | — | If `salesChannels` includes Custom platform | 200 | — | No |

### Step 3 — Orders and stock

| Label | Field name | Type | Required | Accepted values / validation | Helper / notes | Conditional | Limits | Accessibility | Personal data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Approximate monthly orders | `monthlyOrderRange` | Select | Yes | `under_100`, `100_500`, `500_2000`, `2000_10000`, `over_10000`, `not_sure` | Qualification only; not pricing | — | — | Include "Not sure" | No |
| Number of SKUs | `skuCount` | Select | Yes | `under_10`, `10_50`, `50_200`, `200_1000`, `over_1000`, `not_sure` | — | — | — | — | No |
| Average items per order | `itemsPerOrder` | Select | Yes | `1`, `2_3`, `4_6`, `7_plus`, `not_sure` | — | — | — | — | No |
| Seasonal volume changes | `seasonalPeaks` | Select | Optional | `none`, `moderate`, `significant`, `not_sure` | — | — | — | — | No |
| Expected growth (12 months) | `growthExpectation` | Select | Optional | `stable`, `moderate_growth`, `rapid_growth`, `not_sure` | — | — | — | — | No |
| Approximate stock volume | `stockVolume` | Select | Yes | `under_10_pallets`, `10_50_pallets`, `50_200_pallets`, `over_200_pallets`, `not_sure` | Pallets/units estimate | — | — | — | No |
| Storage type required | `storageType` | Checkbox group | Yes | Min one: Pallet, Shelving, Bin, Mixed, Not sure | — | — | — | fieldset/legend | No |
| Average product dimensions | `productDimensions` | Text | Optional | Max 200 chars | e.g. approximate size category | — | 200 | — | No |
| Average product weight | `productWeight` | Select | Optional | `light`, `medium`, `heavy`, `mixed`, `not_sure` | — | — | — | — | No |
| Fragile or specialist handling | `specialHandling` | Checkbox group | Optional | Fragile, Hazardous (if applicable), Temperature-sensitive, Oversized, None, Not sure | — | — | — | fieldset/legend | No |
| Special handling details | `specialHandlingDetails` | Textarea | Conditional | Max 1000 chars | Required if any special handling except None/Not sure | See §6 | 1000 | — | No |

### Step 4 — Delivery and additional services

| Label | Field name | Type | Required | Accepted values / validation | Helper / notes | Conditional | Limits | Accessibility | Personal data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Delivery regions | `deliveryRegions` | Checkbox group | Yes | Min one: UK, Europe, International | — | — | — | fieldset/legend | No |
| International destinations | `internationalDestinations` | Textarea | Conditional | Max 500 chars | Required if International selected | If International in `deliveryRegions` | 500 | — | No |
| Average parcel size | `parcelDimensions` | Select | Optional | `small`, `medium`, `large`, `mixed`, `not_sure` | — | — | — | — | No |
| Average parcel weight | `parcelWeight` | Select | Optional | Same weight enums as product weight | — | — | — | — | No |
| Tracked delivery required | `trackingRequired` | Select | Optional | `always`, `sometimes`, `not_required`, `not_sure` | — | — | — | — | No |
| Special courier requirements | `specialCourierRequired` | Radio or select | Optional | `yes`, `no` | **RESOLVED** 2026-08-01 | — | — | fieldset/legend | No |
| Special courier details | `specialCourierDetails` | Textarea | Conditional | Max 500 chars; required when `specialCourierRequired` is `yes` | Describe courier requirements | If `specialCourierRequired` is `yes` | 500 | — | No |
| Additional services | `additionalServices` | Checkbox group | Optional | Branded packaging, Inserts, Labelling, Barcoding, Bundling, Returns, Rework, Quality checks, Subscription-box assembly, Other | Kitting **not** approved as named option | — | — | fieldset/legend | No |
| Other service details | `additionalServicesOther` | Text | Conditional | Max 200; required if Other selected | — | If Other in `additionalServices` | 200 | — | No |
| Branded packaging details | `brandedPackagingDetails` | Textarea | Conditional | Max 500; optional when shown | — | If Branded packaging selected | 500 | — | No |
| Expected returns volume | `returnsVolume` | Select | Optional | `under_5_pct`, `5_15_pct`, `over_15_pct`, `not_sure` | Only if Returns selected | If Returns in `additionalServices` | — | — | No |

### Step 5 — Review and consent

| Label | Field name | Type | Required | Accepted values / validation | Helper / notes | Conditional | Limits | Accessibility | Personal data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Additional requirements | `additionalNotes` | Textarea | Optional | Max 2000 chars | Free text | — | 2000 | — | Possibly |
| Privacy consent | `privacyConsent` | Checkbox | Yes | Must be `true` | Links to Privacy Policy | — | — | Required consent pattern | Consent record |
| Marketing communications | `marketingConsent` | Checkbox | No | Optional opt-in | Separate from privacy consent | — | — | Must not be pre-checked | Consent record |
| Accuracy confirmation | `accuracyConfirmation` | Checkbox | Yes | Must be `true` | Customer confirms accuracy | — | — | Required consent pattern | No |

### Non-display / security fields (not in §4 table; required by §8)

| Field name | Purpose | Server-only |
| --- | --- | --- |
| `_honeypot` | Hidden honeypot; reject if populated | Validated server-side |
| `turnstileToken` | Cloudflare Turnstile response token | Verified server-side |
| `idempotencyKey` | Duplicate-submission protection | Server validates window |

**Total user-facing fields:** 42 (+ honeypot; includes `productCategoryOther` and split special-courier fields). **Personal data fields:** contact name, company, email, telephone, country, plus consent flags and optional notes.

## 6. Form-step architecture

| Step | Title | Primary fields | Navigation |
| --- | --- | --- | --- |
| 1 | Contact and company | Step 1 register | Continue → step 2 |
| 2 | Business and sales channels | Step 2 register | Back / Continue |
| 3 | Orders and stock | Step 3 register | Back / Continue |
| 4 | Delivery and additional services | Step 4 register | Back / Continue |
| 5 | Review and consent | Read-only summary + step 5 fields + Turnstile | Back / Submit |

### Progress behaviour

- Visible step indicator with section titles (§2, §15).
- `aria-current="step"` on active step.
- Step cannot advance until current step passes client validation (§7).
- Data held in client state between steps; **no server draft save** in V1.
- Review step displays full summary; emphasise enquiry reason when switching provider (§6 conditional display rule).

### Mobile behaviour

- Mobile-first layout (§2).
- Single column; full-width controls; min 44px touch targets aligned with Phase 2B patterns.
- Step indicator may compress to numbered progress on small screens.

## 7. Conditional logic

| Condition | Behaviour |
| --- | --- |
| `salesChannels` includes **Other marketplace** | Show + require `salesChannelOther` |
| `salesChannels` includes **Custom platform** | Show + require `customPlatformDetails` |
| `deliveryRegions` includes **International** | Show + require `internationalDestinations` |
| `additionalServices` includes **Branded packaging** | Show `brandedPackagingDetails` (optional) |
| `additionalServices` includes **Returns** | Show `returnsVolume` (optional) |
| `additionalServices` includes **Other** | Show + require `additionalServicesOther` |
| `specialHandling` includes any except **None** / **Not sure** | Show + require `specialHandlingDetails` |
| `productCategory` is **Other** | Show + require `productCategoryOther` |
| `specialCourierRequired` is **yes** | Show + require `specialCourierDetails` |
| `enquiryReason` is `switching_provider` OR `currentFulfilment` is `third_party` | Emphasise context on review step (display only) |

Client and server must apply identical conditional required rules.

## 8. Client validation

Per §7 (usability layer):

- Required field indicators on all mandatory fields.
- Inline errors on blur and on step advance attempt.
- Email and URL format hints (not placeholder-only labels).
- Block Continue until current step valid.
- Error summary with `role="alert"` at step top on submit failure (§11, §15).
- Focus moved to first invalid field.
- Checkbox/radio groups use fieldset/legend.

Implementation: shared **Zod** schema mirrored on client via **React Hook Form** resolver (Product Owner approved 2026-08-01).

## 9. Server validation

Per §7 (authoritative layer):

- Reject missing required fields and invalid conditional fields.
- Normalise telephone (strip spaces; retain leading `+`).
- Trim and collapse whitespace on text fields.
- Enforce length limits per register.
- RFC-compliant email validation.
- URL scheme http/https or empty.
- Enum validation against allowed values only.
- Strip HTML from text; encode on output.
- Reject unexpected fields (strict schema).
- Verify Turnstile token before processing.
- Rate limit and honeypot checks before persistence.

Payload size: enforce reasonable body limit on Route Handler (recommend ≤ 64 KB for JSON form payload — sufficient for all text fields).

Duplicate submission: idempotency token or short-window deduplication by email hash + timestamp (§8).

## 10. Submission architecture

### Approved pattern

Per `docs/03_TECHNICAL_ARCHITECTURE.md` §4.1: **Route Handler or Server Action**.

**Recommendation:** `POST /api/quote` Route Handler as authoritative submission endpoint.

| Reason | Detail |
| --- | --- |
| Clear API boundary | Rate limiting, payload limits, idempotency headers |
| Testability | Integration tests against HTTP endpoint |
| Separation | Multi-step UI remains client component; single final POST |
| Hostinger compatible | Standard Next.js Route Handler on Node runtime |

Optional thin Server Action may wrap the same `submitQuote()` function if preferred for form action semantics — single shared server module either way.

### Submission flow

```
Step 5 Submit
  → Client POST JSON + turnstileToken + idempotencyKey
  → Route Handler
  → Honeypot check
  → Rate limit check
  → Turnstile verify
  → Server schema validation
  → Prisma transaction: QuoteRequest + related data
  → Generate reference (e.g. PSG-YYYYMMDD-XXXX)
  → Status RECEIVED
  → Commit DB (authoritative)
  → Dispatch internal notification email (async attempt, logged)
  → Dispatch customer confirmation email (logged)
  → Return success + reference (even if email fails post-commit)
  → Client shows QuoteSuccess
```

### Database requirement

**Explicitly required** — not optional:

- `docs/00_PROJECT_AUTHORITY.md` §10 step 5: Store in MySQL.
- `docs/06_QUOTATION_FORM_SPEC.md` §9: Database record is authoritative.
- `docs/03_TECHNICAL_ARCHITECTURE.md` §7: Prisma + MySQL entities.

JSON columns permitted for channel/service arrays if normalisation deferred (§13).

### Email failure behaviour

- DB commit **must not** roll back on email failure.
- Record each attempt in `QuoteNotificationAttempt`.
- Customer sees success with reference after successful DB save.
- Internal email failure logged for manual follow-up.

### Submission IDs

- Human-readable quotation reference required on every submission.
- Internal UUID primary key recommended for database relations.

### Idempotency

Required per §8 — client-generated key or dedup window on email hash.

## 11. Email-delivery requirements

### Required emails

| Email | Recipient | Sender | Required content |
| --- | --- | --- | --- |
| Customer confirmation | Submitted `email` | Verified `EMAIL_FROM` | Reference, name, company, non-sensitive summary, manual-response statement, Privacy Policy link, no price |
| Internal notification | `QUOTE_NOTIFICATION_EMAIL` | `EMAIL_FROM` | Reference, full structured data, timestamp, future internal link if approved |

### Reply-to

Not explicitly defined in spec — **recommend** `Reply-To` set to customer email on internal notification only; confirm with Product Owner.

### Provider

- External transactional provider required (`docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` §7).
- Provider selection: **pending Product Owner input**.
- Abstraction layer required (`src/lib/email/`) so provider can be swapped.

### Behaviour without credentials

- **Local development:** safe development logging transport permitted; do not send live email.
- **Production:** must fail closed or report configuration failure clearly when required email configuration is absent.
- Do **not** invent recipient addresses, sender domains or API keys.

Pending inputs: `QUOTE_NOTIFICATION_EMAIL`, `EMAIL_FROM`, verified sender domain, selected transactional email provider, provider API key.

## 12. Turnstile and abuse controls

| Control | Requirement |
| --- | --- |
| Cloudflare Turnstile | Required on submission; verified server-side (§8) |
| Client | Render widget on step 5 only; pass token with submit |
| Server | Verify token with `TURNSTILE_SECRET_KEY` before DB write |
| Rate limiting | Per-IP and per-email on submission endpoint |
| Honeypot | Hidden field; reject if populated |
| Error presentation | Generic client message; details server-side only |
| Duplicate protection | Idempotency / dedup window |

### Environment variables (approved names)

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — public, client
- `TURNSTILE_SECRET_KEY` — server-only

### Local behaviour without keys

- **Development:** configurable bypass (e.g. `TURNSTILE_BYPASS_DEV=true`) permitted only when explicitly enabled, limited to non-production environments, impossible to enable silently in production, and clearly documented.
- Keep Turnstile behind a replaceable integration boundary.
- Do not call Cloudflare during audit tasks.

### Privacy

Turnstile is a third-party script — disclose in Privacy Policy (content pending). Load only on quote page step 5 to minimise exposure.

## 13. Privacy and consent

| Topic | Requirement |
| --- | --- |
| Personal data collected | Contact identity, company, email, phone, country, optional website, free-text notes |
| Privacy consent | Required checkbox before submit; link to Privacy Policy; **production submission blocked** until Privacy Policy route and approved legal wording exist |
| Marketing consent | Optional; separate from operational consent; **unticked by default**; must not be required for submission |
| Accuracy confirmation | Required before final submission |
| Retention duration | **PENDING PRODUCT OWNER INPUT** — blocks production launch; does not block local implementation; must not be invented in code or legal copy |
| Legal wording | Privacy Policy content **pending** — page route referenced but not implemented |
| Analytics | Privacy-conscious events only (§16); **marketing analytics excluded** from Phase 3A scope |
| Cookies | Turnstile may set cookies; theme preference already exists — no additional marketing cookies |

Do not invent legal text.

## 14. File-upload authority

Per `docs/06_QUOTATION_FORM_SPEC.md` §18 V1 exclusions:

**File or document uploads are explicitly excluded from V1.**

Do **not** implement: stock-list uploads, spreadsheets, catalogues, photographs, product-document attachments, or any upload control in Phase 3A.

## 15. Success and failure states

### Success (§10) — Product Owner decision (2026-08-01)

- Prominent copy-friendly quotation reference (display where submission succeeded).
- **Headline:** `Thank you. Your quotation request has been received.`
- **Supporting copy:** `Our team will review your requirements and contact you shortly.`
- Do **not** promise a specific response time.
- Explicit statement: no instant or binding pricing (retain from authority).
- Direct contact details on success screen: display only once confirmed by Product Owner (**pending**).

### Failure (§11)

| Type | UX |
| --- | --- |
| Field validation | Inline errors, error summary, focus first error |
| Turnstile failure | Generic message; allow retry |
| Rate limit | Generic message; retry later |
| Server error | Generic message; no duplicate record; allow retry |
| Network failure | Client retry prompt; idempotency prevents duplicates |

## 16. Accessibility requirements

Per §15:

- Visible labels (no placeholder-only labels).
- Keyboard navigation all steps.
- Focus management on step change (return to step heading).
- Error summary `role="alert"`.
- Step indicator `aria-current="step"`.
- Checkbox/radio fieldset/legend.
- WCAG 2.1 AA contrast target.
- Reduced motion: no essential information by animation alone.

Reuse Phase 2B focus-visible patterns from header/theme components.

## 17. Mobile behaviour

- Mobile-first form layout.
- Step indicator readable at 390 × 844.
- Back/Continue full-width buttons, min 44px height.
- Review step scrollable summary.
- Turnstile widget responsive mode.
- No horizontal overflow.

## 18. Environment-variable register

| Variable | Purpose | Local dev | Staging/prod | Status |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | Required | Required | In `.env.example` |
| `DATABASE_URL` | MySQL connection string | Required for full submit test | Required | Pending local MySQL setup |
| `EMAIL_FROM` | Verified sender address | Optional (dev log mode) | Required | **Pending Product Owner / DNS** |
| `QUOTE_NOTIFICATION_EMAIL` | Internal notification recipient | Optional (dev log mode) | Required | **Pending Product Owner input** |
| Email provider API key | Provider-specific (e.g. `RESEND_API_KEY`) | Optional | Required | **Pending provider selection** |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile key | Optional with bypass | Required | **Pending Cloudflare setup** |
| `TURNSTILE_SECRET_KEY` | Server Turnstile secret | Optional with bypass | Required | **Pending Cloudflare setup** |
| `TURNSTILE_BYPASS_DEV` | Dev-only bypass (proposed) | Optional `true` locally | Must be unset/false | Proposed convention |
| `NODE_ENV` | Runtime environment | Automatic | Required | Standard |

No real values in this report. Extend `.env.example` during implementation (not in this audit).

## 19. Dependency assessment

### Product Owner approved for implementation (2026-08-01)

| Package | Purpose | Status |
| --- | --- | --- |
| `zod` | Shared client/server validation schema | **Approved** |
| `react-hook-form` | Multi-step form state and field binding | **Approved** |
| `@hookform/resolvers` | Zod resolver for React Hook Form | **Approved** (with RHF + Zod) |
| `prisma` | MySQL schema and migrations | **Approved** |
| `@prisma/client` | Type-safe database access | **Approved** |

### Conditional / deferred

| Package | Purpose | Status |
| --- | --- | --- |
| `@marsidev/react-turnstile` | Turnstile React widget | **Optional** — use only if it materially improves accessibility and lifecycle management; keep provider integration replaceable |
| Email provider SDK | Transactional email dispatch | **Install only after provider selected** — do not install a speculative provider package |

Prefer existing stack + approved dependencies + provider-abstracted email module.

## 20. Proposed component boundaries

| Component | Type | Responsibility |
| --- | --- | --- |
| `GetAQuotePage` (`app/get-a-quote/page.tsx`) | Server | Page shell, metadata, intro copy |
| `QuoteForm` | Client | Step state, navigation, submit orchestration |
| `QuoteProgress` | Client | Step indicator, aria-current |
| `QuoteStepContact` | Client | Step 1 fields |
| `QuoteStepBusiness` | Client | Step 2 fields + conditionals |
| `QuoteStepOrders` | Client | Step 3 fields |
| `QuoteStepDelivery` | Client | Step 4 fields |
| `QuoteStepReview` | Client | Summary, consent, Turnstile, submit |
| `QuoteSuccess` | Client | Reference display, post-submit messaging |
| `FieldError` | Shared | Inline error display |
| Form primitives (`TextField`, `SelectField`, etc.) | Shared | Reusable accessible inputs |

Server Components by default; Client Components only for interactive form, Turnstile, step state.

## 21. Proposed file structure

```
src/app/get-a-quote/
  page.tsx                    # Server page
  layout.tsx                  # Optional quote-specific layout

src/app/api/quote/
  route.ts                    # POST submission handler

src/components/quote/
  QuoteForm.tsx
  QuoteProgress.tsx
  QuoteStepContact.tsx
  QuoteStepBusiness.tsx
  QuoteStepOrders.tsx
  QuoteStepDelivery.tsx
  QuoteStepReview.tsx
  QuoteSuccess.tsx

src/components/forms/
  TextField.tsx
  SelectField.tsx
  CheckboxGroup.tsx
  RadioGroup.tsx
  TextareaField.tsx
  FieldError.tsx

src/lib/quote/
  schema.ts                   # Zod schema + enums
  types.ts                    # Inferred types
  submit.ts                   # Core submit orchestration
  reference.ts                # PSG-YYYYMMDD-XXXX generator
  conditionals.ts             # Shared conditional required logic

src/lib/security/
  turnstile.ts                # Verify token
  rate-limit.ts               # In-memory or DB-backed limiter
  honeypot.ts

src/lib/email/
  client.ts                   # Provider abstraction
  templates/
    customer-confirmation.tsx # Or plain text/HTML strings
    internal-notification.tsx

prisma/
  schema.prisma               # QuoteRequest and related models
```

## 22. CTA-routing changes required

**None.** All quote CTAs already target `/get-a-quote`. Phase 3A must **create** the route page; no href changes needed.

Optional future enhancement: add `"Get a Quote"` active state in header when on `/get-a-quote`.

## 23. Implementable work without credentials

The following can proceed before live email, Turnstile or production MySQL credentials:

1. Prisma schema and local MySQL migration (local `DATABASE_URL`).
2. `/get-a-quote` page shell with approved intro copy (no instant pricing language).
3. Full five-step form UI with progress indicator.
4. Shared form primitives and accessible error patterns.
5. Client + server Zod schema for all fields and conditionals.
6. Conditional field visibility logic.
7. Review step summary rendering.
8. Route Handler with validation, honeypot, rate-limit scaffold.
9. Reference generation and DB persistence (local).
10. Turnstile widget integration with dev bypass flag.
11. Email abstraction with dev-only log transport.
12. Success and error UI states with **approved success copy** (2026-08-01).
13. `.env.example` extension with variable names only.
14. Unit/integration tests for schema and submit handler (local DB).

## 24. Blocked inputs and credentials

### Resolved by Product Owner (2026-08-01)

| Item | Resolution |
| --- | --- |
| `requiredStartDate` | Approved enum values recorded |
| `specialCourierNeeds` | Yes/No with conditional required description |
| Success-screen wording | Approved headline and supporting copy |
| Upload authority | Excluded from V1 |
| Dependencies | Zod, React Hook Form, Prisma approved |

### Still pending — blocks production launch (not local implementation)

| Blocker | Owner | Impact |
| --- | --- | --- |
| Exact product-category option list | Product Owner | Step 2 controlled select incomplete — **do not invent values** |
| `QUOTE_NOTIFICATION_EMAIL` | Product Owner | Internal notification cannot go live |
| `EMAIL_FROM` + verified sender domain | Product Owner / DNS | Customer email cannot go live |
| Email provider selection + API key | Product Owner | No production email dispatch |
| Turnstile site/secret keys | Product Owner / Cloudflare | Production spam protection inactive |
| Production `DATABASE_URL` (Hostinger MySQL) | Product Owner / hosting | Production persistence |
| Privacy Policy legal content + route | Product Owner / legal | Production submission blocked |
| Data retention duration | Product Owner / legal | Privacy documentation and launch condition incomplete |
| Direct contact details on success screen | Product Owner | Success screen partial |

## 25. Risks and security controls

| Risk | Control |
| --- | --- |
| Spam submissions | Turnstile + honeypot + rate limit |
| SQL injection | Prisma parameterised queries |
| XSS in stored text | Strip HTML input; encode output |
| Secret exposure | Server-only env vars; never in client bundle |
| Lost leads on email failure | DB authoritative; log attempts |
| Duplicate submissions | Idempotency key / dedup window |
| Oversized payloads | Body size limit on Route Handler |
| Legal consent invalid | Block submit until Privacy Policy route exists or interim approved copy |
| Schema drift client/server | Single Zod schema shared module |
| Dev bypass left on in production | Assert `TURNSTILE_BYPASS_DEV` false when `NODE_ENV=production` |

## 26. Deterministic validation plan

During implementation (not this audit):

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`
4. `prisma migrate dev` / `prisma db push` against local MySQL
5. Automated schema tests — required/optional/conditional fields
6. Route Handler tests — valid submit, invalid submit, honeypot trip, rate limit, Turnstile fail
7. DB assertion — record created with reference and all fields
8. Email mock assertion — attempts logged
9. Idempotency test — duplicate submit rejected or deduped
10. Runtime smoke — `POST /api/quote` and full browser flow

## 27. Manual browser-validation plan

Product Owner to verify:

- Desktop full five-step flow at 1280px+
- Mobile full flow at 390 × 844
- Back/Continue preserves entered data within session
- Conditional fields appear/hide correctly
- Review summary accurate before submit
- Turnstile renders on step 5
- Success shows reference; no instant pricing claim
- Invalid step blocked with visible errors and focus management
- Theme readability (System/Light/Dark) on form pages
- All homepage/header CTAs land on `/get-a-quote`
- Privacy consent link resolves (once page exists)
- No horizontal overflow; touch targets adequate

## 28. Recommended implementation sequence

1. **Install approved dependencies** — `zod`, `react-hook-form`, `@hookform/resolvers`, `prisma`, `@prisma/client`.
2. **Prisma schema + local MySQL** — models per §13; migrate.
3. **Central constants** — product-category options placeholder (empty/pending until Product Owner approval); start-date enums; all other approved enums.
4. **Zod schema + React Hook Form** — full field register including conditionals.
5. **Form primitives** — accessible inputs aligned with design tokens.
6. **Quote page shell** — `/get-a-quote` metadata and intro.
7. **Steps 1–4 UI** — progressive per-step validation.
8. **Step 5 review + consent** — summary, Turnstile, privacy/accuracy consent.
9. **Route Handler + submit module** — validation, honeypot, rate limit, Turnstile verify, DB transaction, reference.
10. **Email abstraction** — dev log transport; production fail-closed guard.
11. **Success/error states** — approved success copy and reference display.
12. **`.env.example` extension** — variable names only (during implementation).
13. **Automated validation** — lint, typecheck, build, submit tests.
14. **Product Owner supplies** — category list, credentials, Privacy Policy, retention decision.
15. **Staging/production credentials** — Turnstile, email, Hostinger MySQL.
16. **Product Owner browser acceptance**.

## 29. Verdict

**READY WITH CONDITIONS**

Phase 3A implementation **may begin** (2026-08-01). The quotation-form specification and Product Owner decisions are sufficient for implementation work. **Production launch remains blocked** by documented credentials, legal content, product-category option list and retention decision.

Conditions before production launch:

- Product Owner approves exact product-category option list (centralised constant).
- Product Owner supplies email addresses, sender domain, provider and Turnstile keys.
- Privacy Policy page and approved consent wording implemented.
- Data retention duration confirmed.
- Confirmed contact details where required on success screen.

## 30. Product Owner acceptance status

**Product Owner acceptance: ACCEPTED — 2026-08-01**

Preflight audit accepted. Implementation may proceed under documented conditions. Production launch is not authorised until production blockers in §24 are resolved.

---

## 31. Product Owner decisions — 2026-08-01

### Quotation experience

- Dedicated route: `/get-a-quote`
- Five-step multi-step form
- Users may move backwards and forwards through steps 1–4
- Data remains in client-side form state until final submission
- No server-side draft saving in V1
- Review and consent step required before submission
- All existing quotation CTAs already target `/get-a-quote`
- Browser back/forward must not silently discard entered form data during the active session

### Progressive disclosure and UX

- Approximately 40 user-facing fields divided across five steps — not shown at once
- Conditional fields hidden until relevant; optional fields clearly marked
- Concise steps; helper text where questions may be unclear
- Mobile uses same step structure; per-step and final server validation

### Product category

- Controlled selection with **Other** option; selecting Other reveals required description field
- No cold-chain category; no free-text-only product-category field
- Exact controlled option list: **PENDING PRODUCT OWNER APPROVAL**
- Implementation must centralise options in one replaceable constant — no speculative hard-coded categories across components

### Required start date (resolved)

- As soon as possible
- Within 2 weeks
- Within 1 month
- Within 1–3 months
- More than 3 months
- Just exploring

### Special courier needs (resolved)

- Yes / No selection
- Supporting description field shown only when **Yes**; required when visible

### Success state (resolved)

- Headline: `Thank you. Your quotation request has been received.`
- Supporting: `Our team will review your requirements and contact you shortly.`
- No specific response-time promise; display quotation reference on success

### Uploads (resolved — excluded)

No stock-list uploads, spreadsheets, catalogues, photographs or product-document attachments in V1.

### Consent

- Marketing consent: optional, separate, unticked by default, not required for submission
- Privacy consent: required, links to Privacy Policy; production submission blocked until route and approved wording exist
- Accuracy confirmation: required before final submission

### Data retention

- Final retention period pending — blocks production launch, not local implementation; must not be invented

### Storage and submission

- Authoritative Prisma/MySQL storage with database transaction
- Unique quotation reference per approved pattern
- Database commit authoritative; email failure after commit must not make customer believe quotation was lost
- Email-delivery attempts recordable independently; duplicate-submission and idempotency controls required

### Email

Pending: `QUOTE_NOTIFICATION_EMAIL`, `EMAIL_FROM`, verified sender domain, provider, API key. Local dev may use safe logging transport. Production must fail closed or report configuration failure clearly.

### Turnstile and abuse controls

Pending live credentials. Approved: Turnstile on final submission, server verification, honeypot, rate limiting, idempotency key, generic client errors, detailed server-side logging. Dev bypass only when explicitly enabled, non-production only, documented, not silently enabled in production. Replaceable integration boundary.

### Dependencies (resolved)

Approved: `zod`, `react-hook-form`, `prisma`, `@prisma/client` (and `@hookform/resolvers` with Zod). Turnstile React wrapper optional. Email SDK only after provider selected.

### Scope exclusions

Phase 3A must not introduce: customer accounts, login, dashboard, live pricing, instant quotations, payments, shipment tracking, AI quotation, CRM integration, marketplace integration, file uploads, marketing analytics, unrelated cookies, product or stock-management features.
