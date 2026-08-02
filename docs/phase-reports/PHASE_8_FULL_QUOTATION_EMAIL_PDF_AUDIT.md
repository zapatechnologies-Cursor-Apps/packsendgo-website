# Phase 8 — Full Quotation Email and PDF Audit

**Date:** 2026-08-02
**Mode:** API Saving Mode — audit only
**Repository:** `D:\Projects\packsendgo-website`
**Branch:** `audit/full-quotation-email-pdf`
**Base commit:** `a54b403`
**Product Owner acceptance:** PENDING

---

## 1. Objective

Audit the current quotation notification pipeline to determine why production emails contain only minimal contact fields, assess whether complete structured quotation data is available at notification time, and specify the design required to deliver full HTML emails, customer and internal PDF attachments, and failure-isolated delivery without rolling back saved quotations.

This audit is read-only. No source, package, environment, database, or Git changes were made.

---

## 2. Production symptom

Production quotation submission succeeds and the complete structured quotation is stored in MySQL. However, delivered emails contain only:

- reference;
- company;
- contact name;
- email;
- telephone;
- a sentence stating that full data is stored in the database.

There is no structured HTML body, no plain-text summary of submitted fields beyond contact details, and no PDF attachment on either email.

---

## 3. Current email-flow architecture

```
POST /api/quote
  └─ src/app/api/quote/route.ts
       └─ submitQuote(payload)
            └─ src/lib/quote/submit.ts
                 1. Zod validate (quoteSubmissionPayloadSchema)
                 2. Honeypot check (website field)
                 3. Config / rate-limit / idempotency checks
                 4. stripStaleConditionalFields(data)
                 5. prisma.quoteRequest.create (MySQL persist)
                 6. buildCustomerEmail(persisted, reference, from)
                 7. buildInternalEmail(persisted, reference, from, internalRecipient)
                 8. transport.send(customerMessage) → record QuoteNotificationAttempt
                 9. transport.send(internalMessage) → record QuoteNotificationAttempt
                10. Return { ok: true, reference, emailMode }
```

**Transport selection** (`src/lib/email/transport.ts`):

- Production + configured Resend → `ResendTransport`
- Production + missing config → `MissingConfigurationTransport` (FAILED)
- Development + missing config → `DevelopmentLoggingTransport` (LOGGED)

**Email builders** live in `src/lib/email/types.ts`. **Resend adapter** is `src/lib/email/resend-transport.ts`.

There is no view-model layer, no HTML renderer, no PDF generator, and no attachment support in the current pipeline.

---

## 4. Root cause

The minimal email content is **intentional in the current Phase 7/8 launch implementation**, not a Resend or persistence failure.

| Finding | Detail |
| --- | --- |
| Minimal email constructor | `buildCustomerEmail()` and `buildInternalEmail()` in `src/lib/email/types.ts` (lines 34–76) assemble plain-text bodies from five contact fields only. |
| Restrictive message type | `EmailMessage` in `src/lib/email/types.ts` defines only `to`, `from`, `replyTo?`, `subject`, and `text`. No `html` or `attachments`. |
| Transport passes text only | `ResendTransport.send()` passes only `text` to `client.emails.send()`. HTML and attachments are never sent even if Resend supports them. |
| Complete data ignored | `submitQuote()` passes the full `persisted: QuoteSubmissionPayload` to both builders, but the builders read only `contactName`, `companyName`, `email`, and `telephone`. |
| Existing formatter unused | `buildReviewSections()` in `src/lib/quote/review-summary.ts` already maps all form fields to labelled rows for the review UI but is not used by email or PDF code. |
| No PDF capability | `package.json` contains no PDF library. No PDF code exists in the repository. |

**Precise root cause:** Phase 7/8 launch scope implemented fail-soft plain-text acknowledgement emails as a placeholder. The submission pipeline persists the full record but the notification layer was never extended beyond minimal contact summaries.

---

## 5. Complete quotation field map

Authority: `src/lib/quote/schema.ts`, `prisma/schema.prisma`, `src/lib/quote/constants.ts`, form step components, `src/lib/quote/review-summary.ts`.

**Total customer-submitted fields mapped: 42**

Legend: **Int** = internal email, **Cust** = customer email, **PDF** = PDF inclusion, **Meta** = internal metadata (omit from customer outputs).

### Request details

| # | Source field | DB field | Customer label | Type | Required | Conditional rule | Formatting rule | Int | Cust | PDF | Data class |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | _(generated)_ | `publicReference` | Request reference | string | Yes | Always after save | Uppercase reference e.g. `PSG-20260802-ABCD` | Yes | Yes | Yes | Customer-visible |

### Contact and company (Step 1)

| # | Source field | DB field | Customer label | Type | Required | Conditional rule | Formatting rule | Int | Cust | PDF | Data class |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | `contactName` | `contactName` | Your name | string | Yes | Always | Plain text; HTML-escape on output | Yes | Yes | Yes | Customer data |
| 3 | `companyName` | `companyName` | Company name | string | Yes | Always | Plain text; HTML-escape | Yes | Yes | Yes | Customer data |
| 4 | `email` | `email` | Email address | string | Yes | Always | Plain text; HTML-escape | Yes | Yes | Yes | Customer data |
| 5 | `telephone` | `telephone` | Telephone | string | Yes | Always | Normalised digits on input; display as submitted | Yes | Yes | Yes | Customer data |
| 6 | `websiteUrl` | `websiteUrl` | Website or store URL | string | Optional | Always visible on form | Normalised URL via `normaliseWebsite()`; omit section row if unanswered | Yes | Yes | Yes | Customer data |
| 7 | `country` | `country` | Country | enum (ISO code) | Yes | Always | Map code to label via `COUNTRIES` | Yes | Yes | Yes | Customer data |
| 8 | `preferredContactMethod` | `preferredContactMethod` | Preferred contact method | enum | Yes | Always | Map to label via `PREFERRED_CONTACT_METHODS` | Yes | Yes | Yes | Customer data |

### Business and sales channels (Step 2)

| # | Source field | DB field | Customer label | Type | Required | Conditional rule | Formatting rule | Int | Cust | PDF | Data class |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | `businessStage` | `businessStage` | Business stage | enum | Yes | Always | Label via `BUSINESS_STAGES` | Yes | Yes | Yes | Customer data |
| 10 | `productCategory` | `productCategory` | Product category | enum | Yes | Always | Label via `PRODUCT_CATEGORIES`; if `other`, append other text | Yes | Yes | Yes | Customer data |
| 11 | `productCategoryOther` | `productCategoryOther` | Product category (other detail) | string | Conditional | Required when `productCategory === "other"` | Plain text; HTML-escape; stripped when not `other` | Yes | Yes | Yes | Customer data |
| 12 | `currentFulfilment` | `currentFulfilment` | Current fulfilment arrangement | enum | Yes | Always | Label via `CURRENT_FULFILMENT` | Yes | Yes | Yes | Customer data |
| 13 | `requiredStartDate` | `requiredStartDate` | Desired start date | enum | Optional | Always visible | Label via `REQUIRED_START_DATES`; omit if unanswered | Yes | Yes | Yes | Customer data |
| 14 | `enquiryReason` | `enquiryReason` | Primary reason for enquiry | enum | Yes | Always | Label via `ENQUIRY_REASONS` | Yes | Yes | Yes | Customer data |
| 15 | `salesChannels` | `salesChannels` | Sales channels | enum[] | Yes (min 1) | Always | Comma-separated labels via `SALES_CHANNELS` | Yes | Yes | Yes | Customer data |
| 16 | `salesChannelOther` | `salesChannelOther` | Other marketplace details | string | Conditional | When `salesChannels` includes `other_marketplace` | Plain text; stripped otherwise | Yes | Yes | Yes | Customer data |
| 17 | `customPlatformDetails` | `customPlatformDetails` | Custom platform details | string | Conditional | When `salesChannels` includes `custom_platform` | Plain text; stripped otherwise | Yes | Yes | Yes | Customer data |

### Orders and stock (Step 3)

| # | Source field | DB field | Customer label | Type | Required | Conditional rule | Formatting rule | Int | Cust | PDF | Data class |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 18 | `monthlyOrderRange` | `monthlyOrderRange` | Approximate monthly orders | enum | Yes | Always | Label via `MONTHLY_ORDER_RANGES` | Yes | Yes | Yes | Customer data |
| 19 | `skuCount` | `skuCount` | Number of SKUs | enum | Yes | Always | Label via `SKU_COUNTS` | Yes | Yes | Yes | Customer data |
| 20 | `itemsPerOrder` | `itemsPerOrder` | Average items per order | enum | Yes | Always | Label via `ITEMS_PER_ORDER` | Yes | Yes | Yes | Customer data |
| 21 | `seasonalPeaks` | `seasonalPeaks` | Seasonal volume changes | enum | Optional | Always visible | Label via `SEASONAL_PEAKS`; omit if unanswered | Yes | Yes | Yes | Customer data |
| 22 | `growthExpectation` | `growthExpectation` | Expected growth (12 months) | enum | Optional | Always visible | Label via `GROWTH_EXPECTATIONS`; omit if unanswered | Yes | Yes | Yes | Customer data |
| 23 | `stockVolume` | `stockVolume` | Approximate stock volume | enum | Yes | Always | Label via `STOCK_VOLUMES` | Yes | Yes | Yes | Customer data |
| 24 | `storageType` | `storageType` | Storage type required | enum[] | Yes (min 1) | Always | Comma-separated labels via `STORAGE_TYPES` | Yes | Yes | Yes | Customer data |
| 25 | `productDimensions` | `productDimensions` | Average product dimensions | string | Optional | Always visible | Plain text; omit if unanswered | Yes | Yes | Yes | Customer data |
| 26 | `productWeight` | `productWeight` | Average product weight | enum | Optional | Always visible | Label via `PRODUCT_WEIGHTS`; omit if unanswered | Yes | Yes | Yes | Customer data |
| 27 | `specialHandling` | `specialHandling` | Fragile or specialist handling | enum[] | Optional | Always visible | Comma-separated labels via `SPECIAL_HANDLING`; omit if empty | Yes | Yes | Yes | Customer data |
| 28 | `specialHandlingDetails` | `specialHandlingDetails` | Special handling details | string | Conditional | When handling includes value other than `none` / `not_sure` | Plain text; long-text wrap; stripped otherwise | Yes | Yes | Yes | Customer data |

### Delivery and additional services (Step 4)

| # | Source field | DB field | Customer label | Type | Required | Conditional rule | Formatting rule | Int | Cust | PDF | Data class |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 29 | `deliveryRegions` | `deliveryRegions` | Delivery regions | enum[] | Yes (min 1) | Always | Comma-separated labels via `DELIVERY_REGIONS` | Yes | Yes | Yes | Customer data |
| 30 | `internationalDestinations` | `internationalDestinations` | International destinations | string | Conditional | When `deliveryRegions` includes `international` | Plain text; stripped otherwise | Yes | Yes | Yes | Customer data |
| 31 | `parcelDimensions` | `parcelDimensions` | Average parcel size | enum | Optional | Always visible | Label via `PARCEL_DIMENSIONS`; omit if unanswered | Yes | Yes | Yes | Customer data |
| 32 | `parcelWeight` | `parcelWeight` | Average parcel weight | enum | Optional | Always visible | Label via `PRODUCT_WEIGHTS`; omit if unanswered | Yes | Yes | Yes | Customer data |
| 33 | `trackingRequired` | `trackingRequired` | Tracked delivery required | enum | Optional | Always visible | Label via `TRACKING_REQUIRED`; omit if unanswered | Yes | Yes | Yes | Customer data |
| 34 | `specialCourierRequired` | `specialCourierRequired` | Special courier requirements | enum | Optional | Always visible | Label via `SPECIAL_COURIER_OPTIONS`; omit if unanswered | Yes | Yes | Yes | Customer data |
| 35 | `specialCourierDetails` | `specialCourierDetails` | Special courier details | string | Conditional | When `specialCourierRequired === "yes"` | Plain text; stripped otherwise | Yes | Yes | Yes | Customer data |
| 36 | `additionalServices` | `additionalServices` | Additional services | enum[] | Optional | Always visible | Comma-separated labels via `ADDITIONAL_SERVICES`; omit if empty | Yes | Yes | Yes | Customer data |
| 37 | `additionalServicesOther` | `additionalServicesOther` | Other service details | string | Conditional | When `additionalServices` includes `other` | Plain text; stripped otherwise | Yes | Yes | Yes | Customer data |
| 38 | `brandedPackagingDetails` | `brandedPackagingDetails` | Branded packaging details | string | Conditional | When `additionalServices` includes `branded_packaging` | Plain text; stripped otherwise | Yes | Yes | Yes | Customer data |
| 39 | `returnsVolume` | `returnsVolume` | Expected returns volume | enum | Conditional | When `additionalServices` includes `returns` | Label via `RETURNS_VOLUMES`; stripped otherwise | Yes | Yes | Yes | Customer data |

### Additional information and declarations (Step 5)

| # | Source field | DB field | Customer label | Type | Required | Conditional rule | Formatting rule | Int | Cust | PDF | Data class |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 40 | `additionalNotes` | `additionalNotes` | Additional requirements | string | Optional | Always visible on Step 5 | Plain text; long-text wrap; omit if unanswered | Yes | Yes | Yes | Customer data |
| 41 | `privacyConsent` | `privacyConsent` | Privacy Policy acceptance | boolean | Yes (literal `true`) | Always | Internal: `Yes` + timestamp; Customer: `Confirmed` | Yes | Yes | Yes | Customer data |
| 42 | `marketingConsent` | `marketingConsent` | Marketing communications | boolean | Optional | Always | `Yes` / `No`; internal includes timestamp when true | Yes | Yes | Yes | Customer data |
| 43 | `accuracyConfirmation` | `accuracyConfirmation` | Accuracy confirmation | boolean | Yes (literal `true`) | Always | Internal: `Yes` + timestamp; Customer: `Confirmed` | Yes | Yes | Yes | Customer data |

### Internal-only fields (never customer-visible)

| Source field | DB field | Purpose | Int | Cust | PDF |
| --- | --- | --- | --- | --- | --- |
| `idempotencyKey` | `idempotencyKey` | Duplicate-submission protection | No | No | No |
| `website` | _(not stored)_ | Honeypot | No | No | No |
| `id` | `id` | Database primary key | No | No | No |
| `status` | `status` | Workflow state | Optional | No | No |
| `privacyConsentAt` | `privacyConsentAt` | Audit timestamp | Yes | No | Internal PDF only |
| `marketingConsentAt` | `marketingConsentAt` | Audit timestamp | Yes (if consented) | No | Internal PDF only |
| `accuracyConfirmationAt` | `accuracyConfirmationAt` | Audit timestamp | Yes | No | Internal PDF only |
| `createdAt` | `createdAt` | Submission time | Yes | No | Internal PDF only |
| `updatedAt` | `updatedAt` | Record update time | No | No | No |
| Notification attempts | `QuoteNotificationAttempt` | Delivery audit | No | No | No |

---

## 6. Conditional-field map

| Trigger | Dependent field(s) | Validation location | Stripped on persist when inactive |
| --- | --- | --- | --- |
| `productCategory === "other"` | `productCategoryOther` | `refineStep2Business` | Yes — set to `undefined` |
| `salesChannels` includes `other_marketplace` | `salesChannelOther` | `refineStep2Business` | Yes |
| `salesChannels` includes `custom_platform` | `customPlatformDetails` | `refineStep2Business` | Yes |
| `specialHandling` includes value other than `none` / `not_sure` | `specialHandlingDetails` | `refineStep3Orders` | Yes |
| `deliveryRegions` includes `international` | `internationalDestinations` | `refineStep4Delivery` | Yes |
| `specialCourierRequired === "yes"` | `specialCourierDetails` | `refineStep4Delivery` | Yes |
| `additionalServices` includes `other` | `additionalServicesOther` | `refineStep4Delivery` | Yes |
| `additionalServices` includes `branded_packaging` | `brandedPackagingDetails` | `stripStaleConditionalFields` | Yes |
| `additionalServices` includes `returns` | `returnsVolume` | `stripStaleConditionalFields` | Yes |

**UI emphasis (non-field):** When `businessStage === "switching_provider"` or `currentFulfilment === "third_party"`, review UI shows a migration emphasis note. This should appear in internal HTML/PDF; optional in customer copy.

---

## 7. Current internal notification

**Builder:** `buildInternalEmail()` in `src/lib/email/types.ts`

| Property | Current value |
| --- | --- |
| To | `QUOTE_NOTIFICATION_EMAIL` |
| From | `EMAIL_FROM` |
| Reply-To | Customer `email` (correct per PO decision) |
| Subject | `New PackSendGo quotation enquiry — {REFERENCE}` |
| Body | Plain text only; six lines (reference, company, contact, email, telephone, database note) |
| HTML | Not sent |
| Attachment | None |

---

## 8. Current customer notification

**Builder:** `buildCustomerEmail()` in `src/lib/email/types.ts`

| Property | Current value |
| --- | --- |
| To | Submitted `email` |
| From | `EMAIL_FROM` |
| Reply-To | Not set |
| Subject | `PackSendGo quotation request received — {REFERENCE}` |
| Body | Plain text only; name, company, acknowledgement, no-price disclaimer |
| HTML | Not sent |
| Attachment | None |
| Support contact | Not included (available in `src/lib/legal-data.ts` as `support@packsendgo.com`) |

---

## 9. Current email transport capabilities

| Capability | Supported in code | Supported by Resend SDK | Gap |
| --- | --- | --- | --- |
| Plain text | Yes | Yes | — |
| HTML | No | Yes | `EmailMessage` lacks `html`; transport does not pass it |
| Attachments | No | Yes (Buffer/Base64) | Type and transport lack `attachments` |
| Reply-To | Yes (internal only) | Yes | Customer email has no Reply-To |
| From / To | Yes | Yes | — |
| Idempotency header | No | Resend supports optional idempotency keys | Not implemented |
| Failure isolation | Yes — transport returns status without throwing | — | Quotation not rolled back on email failure |
| Development logging | Yes — redacted subject + recipient only | — | No PII in dev logs |

---

## 10. Complete-data availability

**Result: COMPLETE DATA IS AVAILABLE AT NOTIFICATION TIME.**

After step 5 of the current pipeline:

- `persisted: QuoteSubmissionPayload` contains all 42 customer fields (post conditional stripping).
- `quote` Prisma record contains the same data plus metadata (`id`, timestamps, reference).
- `buildReviewSections(persisted)` can produce a full labelled summary today.

**No database re-fetch is required** for implementation, though reloading from DB would also work and would include consent timestamps.

**Current gap is presentation, not data access.** Email builders deliberately ignore available fields.

---

## 11. Proposed document view model

Design a single normalised view model consumed by HTML, plain-text, and PDF renderers.

```typescript
type QuotationDocumentAudience = "internal" | "customer";

type QuotationDocumentRow = {
  label: string;
  value: string;
  optional?: boolean;
  omitWhenEmpty?: boolean;
};

type QuotationDocumentSection = {
  id: string;
  title: string;
  emphasis?: string;
  rows: QuotationDocumentRow[];
};

type QuotationDocumentViewModel = {
  audience: QuotationDocumentAudience;
  reference: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  submittedAt?: string;           // internal only — ISO or formatted locale
  sections: QuotationDocumentSection[];
  declarations: QuotationDocumentRow[];
  footerNote: string;
  supportEmail: string;
  pdfTitle: "PackSendGo Quotation Request Summary";
  attachmentFilename: string;     // PackSendGo-Quotation-Request-{REFERENCE}.pdf
};
```

**Factory:** `buildQuotationDocumentViewModel(source, audience)` where `source` is `QuoteSubmissionPayload` plus `{ publicReference, submittedAt, consentTimestamps }`.

**Implementation strategy:**

1. Extend `src/lib/quote/review-summary.ts` (or extract shared module) so section/row building is audience-aware.
2. Add Step 5 section: Additional information (`additionalNotes`).
3. Add Declarations section: privacy, marketing, accuracy (with timestamps for internal).
4. Add Request details header section with reference (and submission time for internal).
5. Centralise enum-to-label mapping via existing `labelForValue` / `labelsForValues`.
6. Apply `escapeHtml()` at HTML render boundary only; plain-text and PDF receive already-sanitised plain strings.
7. Omit unanswered optional rows rather than showing raw enum codes.
8. Show `Not provided` only where the review UI already does (optional fields shown in summary context).

---

## 12. Proposed internal HTML structure

```
┌─────────────────────────────────────────┐
│ PackSendGo — New quotation request      │
│ Reference: PSG-YYYYMMDD-XXXX            │
│ Submitted: {formatted datetime}         │
├─────────────────────────────────────────┤
│ [Section: Contact and company]          │
│   label / value rows (table or dl)      │
│ [Section: Business and sales channels]  │
│   optional emphasis callout if switching│
│ [Section: Orders and stock]             │
│ [Section: Delivery and additional svc]  │
│ [Section: Additional information]       │
│ [Section: Declarations and consent]     │
│   incl. consent timestamps              │
├─────────────────────────────────────────┤
│ Footer: operational note, no secrets    │
└─────────────────────────────────────────┘
```

- Semantic HTML: `html`, `body`, `h1`, `h2`, `dl`/`table`.
- Inline CSS only (email-client safe): system font stack, simple borders, no external assets required.
- All customer text HTML-escaped.
- PDF attached: `PackSendGo-Quotation-Request-{REFERENCE}.pdf`.

---

## 13. Proposed customer HTML structure

Same section structure as internal except:

- Omit `submittedAt` (optional — reference is sufficient).
- Omit internal metadata (DB id, idempotency, notification attempts).
- Declarations show `Confirmed` / `Yes` / `No` without raw timestamps.
- Opening paragraph: receipt confirmation with reference.
- Closing paragraph: support contact (`support@packsendgo.com`), manual review expectation, no binding price disclaimer.
- No marketing content.
- PDF attached (same filename; customer-safe content only inside PDF).

---

## 14. Proposed plain-text fallback

Generate from the same view model (not a separate hand-maintained template):

```
PackSendGo Quotation Request Summary
Reference: PSG-YYYYMMDD-XXXX

=== Contact and company ===
Your name: ...
...

=== Declarations and consent ===
Privacy Policy acceptance: Confirmed
...

---
Our team will review your requirements and contact you shortly.
For support: support@packsendgo.com

This is a request summary, not a formal quotation or price offer.
```

- Fixed-width section headers for readability.
- Long text wrapped at ~78 characters.
- Included as `text` part alongside `html` in multipart email.

---

## 15. Proposed PDF structure

**Title:** PackSendGo Quotation Request Summary (not a formal quotation or price offer)

**Pages:**

1. **Cover/header block** — PackSendGo name, document title, reference, date, company name.
2. **Sections 1–4** — Same rows as email, two-column label/value layout.
3. **Additional information** — `additionalNotes` if present.
4. **Declarations** — Consent summary (customer PDF omits internal timestamps).
5. **Footer on each page** — Page number, document title, reference.

**Formatting:**

- A4 portrait.
- Standard PDF built-in fonts (Helvetica) — no restricted font file embedding required.
- Text wrapping for long answers (`specialHandlingDetails`, `additionalNotes`, etc.).
- Optional: PackSendGo wordmark as text heading initially; SVG logo (`public/brand/packsendgo-logo-black.svg`) would require rasterisation for PDF embedding — defer logo image to avoid SVG dependency unless a PNG asset is added.

---

## 16. PDF-generation options assessed

| Option | Node/Next compatible | In-memory Buffer | No browser | Multi-page | Text wrap | Page numbers | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **PDFKit** | Yes | Yes (`doc.on("data")` → Buffer) | Yes | Yes | Yes (`width` option) | Manual (`page.number`) | **Recommended** |
| pdf-lib | Yes | Yes | Yes | Yes | Limited for flow text | Manual | Better for editing, not authoring |
| @react-pdf/renderer | Yes (server) | Yes | Yes | Yes | Yes | Supported | Heavier; React PDF DSL overhead |
| jsPDF | Yes | Yes | Yes | Awkward multi-page | Basic | Plugin | Less suited to long documents |
| Puppeteer / Playwright | Yes | Yes | **No** (Chromium) | Yes | Yes | Yes | **Excluded by PO** |
| External PDF API | Yes | Yes | Yes | Yes | Yes | Yes | **Excluded by PO** |

---

## 17. Recommended PDF approach

Use **PDFKit** (`pdfkit` npm package) with a dedicated generator module:

- `generateQuotationPdf(viewModel: QuotationDocumentViewModel): Promise<Buffer>`
- Pure TypeScript, no filesystem writes.
- Stream pages in memory and concatenate chunks to a single Buffer.
- Reuse view-model sections for layout iteration.
- Standard Helvetica font — Hostinger-safe, no font licensing issue.

---

## 18. Required dependency decision

| Package | Purpose | Scope |
| --- | --- | --- |
| `pdfkit` | Server-side PDF generation | **Add to dependencies** |
| `@types/pdfkit` | TypeScript types | **Add to devDependencies** |

No other new packages required. Existing `resend` already supports HTML and attachments.

---

## 19. Reply-To behaviour

| Email | From | To | Reply-To |
| --- | --- | --- | --- |
| Internal | `EMAIL_FROM` | `QUOTE_NOTIFICATION_EMAIL` | Customer submitted email |
| Customer | `EMAIL_FROM` | Customer submitted email | `EMAIL_FROM` or `support@packsendgo.com` |

Internal Reply-To is **already correct** in current code. Customer email should set Reply-To to a monitored PackSendGo address so replies do not go to a no-reply From if used.

---

## 20. Subject-line design

| Audience | Recommended subject |
| --- | --- |
| Internal | `New quotation request {REFERENCE} — {COMPANY}` |
| Customer | `We received your PackSendGo quotation request — {REFERENCE}` |

Current subjects are close but should be updated to match PO wording exactly.

---

## 21. Attachment filename

`PackSendGo-Quotation-Request-{REFERENCE}.pdf`

Example: `PackSendGo-Quotation-Request-PSG-20260802-ABCD.pdf`

Same file attached to both emails; internal PDF may include additional timestamp rows in declarations section via audience flag.

---

## 22. HTML escaping

- Input sanitisation already occurs at submission via `sanitizePlainText()` / `stripMarkup()` in `src/lib/quote/sanitize.ts`.
- Output escaping required at HTML render time: escape `&`, `<`, `>`, `"`, `'` in all customer-supplied values.
- Recommend small `escapeHtml()` utility used only by the HTML renderer.
- Do not double-escape labels (static strings from constants are safe).

---

## 23. Long-answer handling

| Field | Max length | Risk | Mitigation |
| --- | --- | --- | --- |
| `specialHandlingDetails` | 1000 | Medium | Word-wrap in HTML (`word-break`), PDFKit `width`, plain-text wrap |
| `additionalNotes` | 2000 | Medium | Same |
| `specialCourierDetails` | 500 | Low | Same |
| `internationalDestinations` | 500 | Low | Same |
| `brandedPackagingDetails` | 500 | Low | Same |

**Attachment size:** A full quotation PDF with maximum-length text fields is estimated well under 200 KB — within Resend attachment limits (typically 40 MB total). Low risk.

---

## 24. Failure-isolation design

**Required order (per PO):**

1. Validate request
2. Save quotation in MySQL
3. Prepare structured view model
4. Generate PDF
5. Send internal email
6. Send customer email
7. Record notification results

**Proposed failure rules:**

| Failure point | Quotation row | HTML email | PDF attachment | Notification attempt |
| --- | --- | --- | --- | --- |
| Validation | Not saved | Not sent | Not generated | Not recorded |
| DB save | Rolled back / not created | Not sent | Not generated | Not recorded |
| View model | Saved | Can proceed with fallback | Can proceed | — |
| PDF generation | **Saved** | **Send HTML without attachment** | Skipped | Record PDF failure in attempt metadata or log |
| Internal email fail | **Saved** | — | — | `FAILED` for INTERNAL |
| Customer email fail | **Saved** | — | — | `FAILED` for CUSTOMER |

**Can send full HTML when PDF fails?** Not today. After implementation: **yes**, if PDF generation is wrapped in try/catch and email builders accept `attachment?: Buffer | null`.

**Current partial isolation:** Email transport failures do not roll back the saved quotation. The outer `try/catch` in `submitQuote()` would roll back only if `prisma.quoteRequest.create` throws — not on email failure.

**Reorder required:** Current code sends customer before internal; PO requires internal first.

---

## 25. Notification-attempt handling

Current model (`QuoteNotificationAttempt`) is sufficient:

- One row per email type per submission.
- Status: `SENT`, `FAILED`, `LOGGED`.
- `providerResponse` stores Resend message id or error summary (max 500 chars).

**Recommendations:**

- Record attempts after each send (current behaviour) or batch at end (PO preference: step 7).
- On PDF failure, log `[quote-pdf]` warning without PII; do not store PDF bytes in DB.
- Extend `providerResponse` text to note `pdf=attached` or `pdf=skipped` when useful (within 500 chars).
- No schema change required for launch.

---

## 26. Resend idempotency

- Duplicate submission: `idempotencyKey` lookup returns early **without re-sending emails** — correct.
- Resend API supports idempotency keys per request; not currently used.
- **Recommendation:** Pass idempotency key `{reference}-customer` and `{reference}-internal` on first send only. Optional hardening, not blocking.
- No Resend contact or configuration change required for this audit.

---

## 27. Hostinger compatibility

| Factor | Assessment |
| --- | --- |
| Node version | `>=24 <25` in `package.json` — PDFKit compatible |
| Next.js runtime | Route uses `export const runtime = "nodejs"` — correct for PDFKit |
| Build | `prisma migrate deploy && prisma generate && next build` — PDFKit is pure JS, no native addon |
| No Chromium | PDFKit satisfies PO constraint |
| Memory | In-memory PDF for one quotation is negligible on Hostinger Node plan |
| Fonts | Standard PDF fonts — no restricted files |
| Logo | SVG assets exist but PDFKit needs PNG/JPEG; use text branding initially |

**Risk:** Low. PDFKit is widely deployed on shared Node hosts.

---

## 28. Exact files likely to be created

| File | Purpose |
| --- | --- |
| `src/lib/quote/document-view-model.ts` | Build normalised view model from persisted quotation |
| `src/lib/email/render-html.ts` | HTML email renderer from view model |
| `src/lib/email/render-plain-text.ts` | Plain-text renderer from view model |
| `src/lib/pdf/generate-quotation-pdf.ts` | PDFKit generator returning Buffer |
| `src/lib/utils/escape-html.ts` | HTML output escaping utility |

---

## 29. Exact files likely to be modified

| File | Change |
| --- | --- |
| `src/lib/email/types.ts` | Extend `EmailMessage`; replace minimal builders with view-model-driven assembly |
| `src/lib/email/resend-transport.ts` | Pass `html` and `attachments` to Resend |
| `src/lib/quote/submit.ts` | Reorder pipeline: view model → PDF → internal → customer → record attempts |
| `src/lib/quote/review-summary.ts` | Extract shared section builder or import from document-view-model |
| `package.json` | Add `pdfkit` |
| `package-lock.json` | Lockfile update |

**Not modified:** Prisma schema, API route (unless response shape extended), form components, `.env.example` (existing vars sufficient).

---

## 30. Package impact

| Action | Package |
| --- | --- |
| Add dependency | `pdfkit` |
| Add devDependency | `@types/pdfkit` |
| Unchanged | `resend`, `@prisma/client`, all others |

---

## 31. Database impact

**None required.**

Existing `QuoteRequest` stores all fields. `QuoteNotificationAttempt` supports delivery audit. PDF bytes must not be stored in MySQL.

---

## 32. Environment-variable impact

**None required.**

Existing variables remain authoritative:

| Variable | Role |
| --- | --- |
| `EMAIL_FROM` | Sender address |
| `QUOTE_NOTIFICATION_EMAIL` | Internal recipient |
| `RESEND_API_KEY` | Resend authentication |
| `DATABASE_URL` | Persistence (already required) |

---

## 33. Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Email HTML rendering inconsistency across clients | Medium | Simple table/dl layout, inline CSS, plain-text fallback |
| PDF layout complexity | Low | Start with text-only PDF; iterate branding later |
| Large attachment rejection | Low | Monitor size; text-only PDF stays small |
| PDF failure blocking emails | High if uncaught | try/catch around PDF; send HTML without attachment |
| Duplicate emails on retry | Medium | Existing idempotencyKey guard; optional Resend idempotency keys |
| PII in logs | Medium | Continue redacted logging pattern from `transport.ts` |
| SVG logo in PDF | Low | Use text heading until PNG asset available |
| Send-order change | Low | Internal first per PO; test both paths independently |

---

## 34. Implementation sequence

1. Add `escape-html` utility and extend `EmailMessage` type with `html?` and `attachments?`.
2. Create `document-view-model.ts` by extending review-summary section logic; add declarations and request header.
3. Create plain-text and HTML renderers from view model.
4. Add PDFKit generator; return Buffer in memory.
5. Update `ResendTransport` to send multipart HTML + text + optional attachment.
6. Refactor `submit.ts` pipeline to PO order with PDF try/catch isolation.
7. Update subject lines and customer Reply-To.
8. Manual local test: full submission → verify HTML content, PDF attachment, DB row retained on simulated PDF/email failure.
9. Hosted validation on Hostinger after deploy.

---

## 35. Validation plan

| Test | Expected outcome |
| --- | --- |
| Submit complete quotation locally | MySQL row with all fields; two notification attempts |
| Internal email | Full HTML sections; Reply-To = customer email; PDF attached |
| Customer email | Full HTML summary; support contact; PDF attached; no internal metadata |
| PDF content | Title “PackSendGo Quotation Request Summary”; all sections; page numbers |
| PDF filename | `PackSendGo-Quotation-Request-{REFERENCE}.pdf` |
| Simulated PDF failure | Quotation saved; emails sent with HTML, no attachment; warning logged |
| Simulated internal email failure | Quotation saved; customer email still attempted; attempts recorded independently |
| Duplicate idempotencyKey | Same reference returned; no second row; no duplicate emails |
| Missing optional fields | Omitted from output; no raw enum codes |
| Long `additionalNotes` | Wrapped in HTML, plain text, and PDF without overflow |
| HTML injection attempt | Escaped in email output |
| Production missing Resend config | Quotation saved; FAILED/LOGGED attempts; no crash |

---

## 36. Verdict

**READY FOR NARROW IMPLEMENTATION**

The persistence layer is complete. The notification layer requires a focused extension: shared view model, HTML/plain-text renderers, PDFKit PDF generator, transport attachment support, and pipeline reorder. No schema, migration, or new environment variables are required. Product Owner decisions on content, PDF constraints, and failure isolation are already documented in this phase brief.

---

## 37. Product Owner decision required

1. **Confirm PDFKit** as the approved PDF library (recommended above alternatives).
2. **Confirm customer Reply-To** address: `EMAIL_FROM` vs `support@packsendgo.com`.
3. **Confirm PDF branding v1**: text-only header acceptable for launch, or require logo rasterisation first.
4. **Confirm internal PDF includes consent timestamps** while customer PDF shows simplified declarations.
5. **Accept implementation** after hosted validation of full HTML + PDF on both emails.

**Product Owner acceptance:** PENDING
