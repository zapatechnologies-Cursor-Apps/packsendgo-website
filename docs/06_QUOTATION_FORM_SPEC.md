# PackSendGo Quotation Form Specification

Complete V1 specification for the PackSendGo quotation enquiry form.

**Authority:** `docs/00_PROJECT_AUTHORITY.md` §10, `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md` §4, `docs/03_TECHNICAL_ARCHITECTURE.md`

Cursor implementation and audit tasks must follow `.cursor/rules/00-packsendgo-api-saving-governance.mdc`, including narrow scope, targeted file reads, command limits and the prohibition on Cursor Git activity.

## 1. Purpose

The V1 quotation form qualifies fulfilment leads by collecting structured requirements. It does not calculate, display or send binding prices.

PackSendGo receives each enquiry by email and database record, then responds manually. The form supports future deterministic pricing and optional AI interpretation without activating either in V1.

## 2. User experience principles

- **Mobile-first** — Designed for small screens first; desktop enhances layout.
- **Low friction** — Minimum fields required to qualify; optional detail welcomed.
- **Progressive disclosure** — Multi-step flow reveals sections gradually.
- **Clear progress** — Visible step indicator and section titles.
- **Plain language** — No jargon without explanation.
- **"I'm not sure" options** — Available on range-based fields where specified.
- **Save only on final submission** — No draft persistence or partial saves in V1 unless separately approved.
- **No account required** — Anonymous submission; no login or registration.
- **No deceptive urgency** — No false countdowns or pressure tactics.
- **Accessible controls** — Keyboard, screen reader and focus management supported.
- **Clear post-submission expectations** — Customer informed that PackSendGo will respond manually; no instant pricing promise.

## 3. Recommended form structure

Five-step staged flow:

| Step | Title | Content |
| --- | --- | --- |
| 1 | Contact and company | Identity and contact preferences |
| 2 | Business and sales channels | Business profile and platforms |
| 3 | Orders and stock | Volume, SKUs and inventory |
| 4 | Delivery and additional services | Delivery profile and extras |
| 5 | Review and consent | Summary, notes and legal consent |

Navigation: Back and Continue buttons on steps 1–4; Submit on step 5.

## 4. Exact field register

### 4.1 Step 1 — Contact and company

| Field name | Label | Input type | Required | Allowed values / validation | Notes |
| --- | --- | --- | --- | --- | --- |
| `contactName` | Your name | Text | Yes | 2–100 characters; letters and common name characters | Full name |
| `companyName` | Company name | Text | Yes | 2–150 characters | Trading or legal name |
| `email` | Email address | Email | Yes | Valid email format; max 254 characters | Primary contact email |
| `telephone` | Telephone | Tel | Yes | Valid UK/international format; 7–20 characters after normalisation | Include country code where applicable |
| `websiteUrl` | Website or store URL | URL | Optional | Valid URL or empty; max 500 characters | Ecommerce store if available |
| `country` | Country | Select | Yes | ISO country list | Primary operating country |
| `preferredContactMethod` | Preferred contact method | Radio | Yes | `email`, `telephone`, `either` | — |

### 4.2 Step 2 — Business and sales channels

| Field name | Label | Input type | Required | Allowed values / validation | Notes |
| --- | --- | --- | --- | --- | --- |
| `businessStage` | Business stage | Select | Yes | See §5 enums | — |
| `productCategory` | Product category | Select or text | Yes | Approved category list or free text; max 200 characters | — |
| `currentFulfilment` | Current fulfilment arrangement | Select | Yes | See §5 enums | — |
| `requiredStartDate` | Desired start date | Select or date | Optional | Future date or range enum | — |
| `enquiryReason` | Primary reason for enquiry | Select | Yes | See §5 enums | — |
| `salesChannels` | Sales channels | Checkbox group | Yes | At least one: Shopify, WooCommerce, Amazon, eBay, TikTok Shop, Etsy, Other marketplace, Custom platform | See §6 conditional logic |
| `salesChannelOther` | Other marketplace details | Text | Conditional | Required if Other selected; max 200 characters | — |
| `customPlatformDetails` | Custom platform details | Text | Conditional | Required if Custom platform selected; max 200 characters | — |

### 4.3 Step 3 — Orders and stock

| Field name | Label | Input type | Required | Allowed values / validation | Notes |
| --- | --- | --- | --- | --- | --- |
| `monthlyOrderRange` | Approximate monthly orders | Select | Yes | See §5 ranges | Qualification only; not pricing |
| `skuCount` | Number of SKUs | Select | Yes | See §5 ranges | — |
| `itemsPerOrder` | Average items per order | Select | Yes | See §5 ranges | — |
| `seasonalPeaks` | Seasonal volume changes | Select | Optional | `none`, `moderate`, `significant`, `not_sure` | — |
| `growthExpectation` | Expected growth (12 months) | Select | Optional | `stable`, `moderate_growth`, `rapid_growth`, `not_sure` | — |
| `stockVolume` | Approximate stock volume | Select | Yes | See §5 ranges | Pallets/units estimate |
| `storageType` | Storage type required | Checkbox group | Yes | At least one: Pallet, Shelving, Bin, Mixed, Not sure | — |
| `productDimensions` | Average product dimensions | Text | Optional | Max 200 characters | e.g. approximate size category |
| `productWeight` | Average product weight | Select | Optional | `light`, `medium`, `heavy`, `mixed`, `not_sure` | — |
| `specialHandling` | Fragile or specialist handling | Checkbox group | Optional | Fragile, Hazardous (if applicable), Temperature-sensitive, Oversized, None, Not sure | Show detail field if any selected |
| `specialHandlingDetails` | Special handling details | Textarea | Conditional | Max 1000 characters | Required if special handling selected (except None/Not sure) |

### 4.4 Step 4 — Delivery and additional services

| Field name | Label | Input type | Required | Allowed values / validation | Notes |
| --- | --- | --- | --- | --- | --- |
| `deliveryRegions` | Delivery regions | Checkbox group | Yes | At least one: UK, Europe, International | — |
| `internationalDestinations` | International destinations | Textarea | Conditional | Max 500 characters | Required if International selected |
| `parcelDimensions` | Average parcel size | Select | Optional | `small`, `medium`, `large`, `mixed`, `not_sure` | — |
| `parcelWeight` | Average parcel weight | Select | Optional | See product weight enums | — |
| `trackingRequired` | Tracked delivery required | Select | Optional | `always`, `sometimes`, `not_required`, `not_sure` | — |
| `specialCourierNeeds` | Special courier requirements | Textarea | Conditional | Max 500 characters | Show if tracking or special need indicated |
| `additionalServices` | Additional services | Checkbox group | Optional | Branded packaging, Inserts, Labelling, Barcoding, Bundling, Returns, Rework, Quality checks, Subscription-box assembly, Other | Unlisted requirements may be entered under Other |
| `additionalServicesOther` | Other service details | Text | Conditional | Max 200 characters | Required if Other selected |
| `brandedPackagingDetails` | Branded packaging details | Textarea | Conditional | Max 500 characters | Show if Branded packaging selected |
| `returnsVolume` | Expected returns volume | Select | Optional | See §5 returns ranges | Only if Returns selected |

**Pending options:** Kitting is not an approved named enumeration option. It remains `PENDING PRODUCT OWNER INPUT` and may only be described under Other if the Product Owner later approves collection.

### 4.5 Step 5 — Review and consent

| Field name | Label | Input type | Required | Allowed values / validation | Notes |
| --- | --- | --- | --- | --- | --- |
| `additionalNotes` | Additional requirements | Textarea | Optional | Max 2000 characters | Free text |
| `privacyConsent` | Privacy consent | Checkbox | Yes | Must be true | Links to Privacy Policy |
| `marketingConsent` | Marketing communications | Checkbox | No | Optional opt-in | Separate from privacy consent |
| `accuracyConfirmation` | Accuracy confirmation | Checkbox | Yes | Must be true | Customer confirms information is accurate |

## 5. Range options

Qualification aids only. Must not imply pricing.

### Monthly orders

| Value | Label |
| --- | --- |
| `under_100` | Under 100 |
| `100_500` | 100 – 500 |
| `500_2000` | 500 – 2,000 |
| `2000_10000` | 2,000 – 10,000 |
| `over_10000` | Over 10,000 |
| `not_sure` | Not sure |

### SKU count

| Value | Label |
| --- | --- |
| `under_10` | Under 10 |
| `10_50` | 10 – 50 |
| `50_200` | 50 – 200 |
| `200_1000` | 200 – 1,000 |
| `over_1000` | Over 1,000 |
| `not_sure` | Not sure |

### Stock volume (pallet/unit estimate)

| Value | Label |
| --- | --- |
| `under_10_pallets` | Under 10 pallets |
| `10_50_pallets` | 10 – 50 pallets |
| `50_200_pallets` | 50 – 200 pallets |
| `over_200_pallets` | Over 200 pallets |
| `not_sure` | Not sure |

### Items per order

| Value | Label |
| --- | --- |
| `1` | 1 item |
| `2_3` | 2 – 3 items |
| `4_6` | 4 – 6 items |
| `7_plus` | 7 or more |
| `not_sure` | Not sure |

### Returns volume (optional)

| Value | Label |
| --- | --- |
| `under_5_pct` | Under 5% of orders |
| `5_15_pct` | 5 – 15% of orders |
| `over_15_pct` | Over 15% of orders |
| `not_sure` | Not sure |

### Business stage

| Value | Label |
| --- | --- |
| `pre_launch` | Pre-launch |
| `early_stage` | Early stage |
| `growing` | Growing |
| `established` | Established |
| `switching_provider` | Switching provider |

### Current fulfilment

| Value | Label |
| --- | --- |
| `in_house` | In-house |
| `third_party` | Third-party provider |
| `mixed` | Mixed |
| `not_started` | Not yet fulfilment-ready |
| `not_sure` | Not sure |

### Enquiry reason

| Value | Label |
| --- | --- |
| `cost` | Cost efficiency |
| `growth` | Supporting growth |
| `quality` | Service quality |
| `capacity` | Capacity constraints |
| `new_venture` | New venture |
| `other` | Other |

## 6. Conditional logic

| Condition | Behaviour |
| --- | --- |
| `salesChannels` includes Other marketplace | Show and require `salesChannelOther` |
| `salesChannels` includes Custom platform | Show and require `customPlatformDetails` |
| `deliveryRegions` includes International | Show and require `internationalDestinations` |
| `additionalServices` includes Branded packaging | Show `brandedPackagingDetails` (optional) |
| `additionalServices` includes Returns | Show `returnsVolume` (optional) |
| `additionalServices` includes Other | Show and require `additionalServicesOther` |
| `specialHandling` includes any option except None/Not sure | Show `specialHandlingDetails` |
| `enquiryReason` is switching_provider or current fulfilment is third_party | Emphasise `enquiryReason` and current provider context in review step |

## 7. Validation

### Client-side (usability)

- Required field indicators
- Inline field errors on blur or step advance
- Email and URL format hints
- Step cannot advance until current step valid

### Server-side (authoritative)

- Reject requests with missing required fields
- Normalise telephone (strip spaces; retain leading +)
- Trim and collapse whitespace on text fields
- Enforce length limits per field register
- Validate email format (RFC-compliant check)
- Validate URL scheme (http/https) or empty
- Validate enums against allowed values only
- Sanitise text input (strip HTML; encode on output)
- Reject unexpected fields (strict schema)
- Verify Turnstile token before processing

## 8. Spam and abuse protection

- **Turnstile** — Required on submission; verified server-side.
- **Rate limiting** — Per-IP and per-email limits on submission endpoint.
- **Honeypot field** — Hidden field; submission rejected if populated.
- **No detailed security errors** — Generic message to client; details logged server-side.
- **Duplicate-submission protection** — Idempotency token or short-window deduplication by email hash and timestamp.

## 9. Submission workflow

```
Customer submits step 5
  → Client sends payload + Turnstile token to API
  → Server validates all fields
  → Server verifies Turnstile
  → Server checks rate limit and honeypot
  → Database transaction begins
  → QuoteRequest and related records created
  → Unique reference generated (e.g. PSG-YYYYMMDD-XXXX)
  → Status set to RECEIVED
  → Database transaction commits
  → PackSendGo internal notification email dispatched
  → Customer confirmation email dispatched
  → Each email attempt recorded independently (QuoteNotificationAttempt)
  → Success response returned
  → Success screen displayed with reference
```

The database record is authoritative. Failure of either email must not delete or roll back the saved lead. Email failures must be recorded for follow-up. A customer-safe success response may still be shown after a successful database save, without exposing internal email errors.

### Email failure after database save

If email dispatch fails after successful database commit:

- Enquiry **must remain stored** with status `RECEIVED`
- Failure logged with quotation reference and provider response
- Customer sees success screen with reference (lead is not lost)
- PackSendGo team alerted via log review or fallback monitoring
- Retry mechanism may be implemented within request or manual re-send from internal process (future)

## 10. Success experience

Display after successful submission:

- **Quotation reference** — Prominent, copy-friendly reference number
- **Confirmation message** — Thank you; enquiry received
- **Expected response timeframe** — `PENDING PRODUCT OWNER INPUT` (placeholder text until confirmed)
- **No instant pricing claim** — Explicitly state that PackSendGo will review and respond manually
- **Direct contact details** — Display only once confirmed by Product Owner

## 11. Error experience

| Error type | Behaviour |
| --- | --- |
| Field validation | Inline errors; focus moved to first error; error summary at step top |
| Turnstile failure | Generic message; allow retry |
| Rate limit | Generic message; suggest retry later |
| Server error | Generic message; no duplicate record created; allow retry |
| Network failure | Client retry prompt; server idempotency prevents duplicates where implemented |

## 12. Email requirements

### Customer confirmation

Must include:

- Quotation reference
- Submitted contact name and company
- Summary of key requirements (non-sensitive overview)
- Statement that PackSendGo will respond manually
- Link to Privacy Policy
- No binding price or payment request

Sender: verified `EMAIL_FROM` address. Recipient: submitted email.

### PackSendGo internal notification

Must include:

- Quotation reference
- Full structured submission data
- Submission timestamp
- Link to future internal view if approved

Recipient: `QUOTE_NOTIFICATION_EMAIL` (value pending Product Owner input).

Do not invent email addresses in configuration or templates.

## 13. Database mapping

| Form section | Entity / storage |
| --- | --- |
| Step 1 | `QuoteContact` |
| Step 2 business fields | `QuoteBusinessProfile` |
| Step 2 sales channels | `QuoteSalesChannel` (array or JSON) |
| Step 3 orders | `QuoteOrderProfile` |
| Step 3 stock | `QuoteStockProfile` |
| Step 4 delivery | `QuoteDeliveryProfile` |
| Step 4 additional services | `QuoteAdditionalService` |
| Step 5 consent | `QuoteRequest` (privacyConsent, marketingConsent, accuracyConfirmation) |
| Step 5 notes | `QuoteRequest.additionalNotes` |
| Reference, status, timestamps | `QuoteRequest` |
| Email attempts | `QuoteNotificationAttempt` |

Implementation may use JSON columns on `QuoteRequest` for channel and service arrays if normalisation is deferred.

## 14. Privacy and retention

- Privacy consent required before submission.
- Marketing consent optional and separate.
- Data processed per Privacy Policy (content pending Product Owner/legal input).
- **Retention duration:** `PENDING PRODUCT OWNER INPUT`
- Data not used for purposes beyond quotation handling without consent.
- No sensitive data in analytics events.

## 15. Accessibility

- Visible labels on all inputs (no placeholder-only labels)
- Keyboard navigation through all steps
- Focus trapped appropriately in multi-step flow
- Focus returned to step heading on step change
- Error summary with `role="alert"` on step submit failure
- ARIA attributes on step indicator (`aria-current="step"`)
- Checkbox and radio groups with fieldset/legend
- Reduced-motion: no essential information conveyed by animation alone
- Colour contrast per WCAG 2.1 AA target

## 16. Analytics

Privacy-conscious conversion events only:

| Event | Data captured |
| --- | --- |
| `quote_form_started` | Timestamp, page path |
| `quote_step_completed` | Step number only |
| `quote_form_submitted` | Success flag, reference hash (not full reference if avoidable) |

Do not send field values, email addresses or free-text content to analytics platforms.

Analytics tooling decision: `REVIEW REQUIRED`.

## 17. AI-ready design

Structured fields support future releases without V1 activation:

- **Deterministic pricing** — Volume, SKU, storage, delivery and service selections map to future pricing rules.
- **OpenAI interpretation** — Free-text notes and unstructured combinations can be normalised in a future release; OpenAI must not invent pricing.
- **Manual review** — V1 workflow preserves human review before any quotation is sent.

No OpenAI, chatbot or automatic calculation endpoints in V1.

## 18. V1 exclusions

Explicitly excluded from the quotation form:

- Instant or displayed price
- Binding quote generation
- Online payment
- Account creation or login
- File or document uploads
- AI calculation or chatbot assistance
- CRM integration unless later approved
- Live inventory or tracking queries
- Automatic provider matching

## 19. Acceptance criteria

The quotation form phase is accepted when:

- [ ] All fields in §4 implemented with correct types and validation
- [ ] Five-step flow works on desktop and mobile
- [ ] Server-side validation rejects invalid and malicious payloads
- [ ] Turnstile verified server-side on every submission
- [ ] Rate limiting and honeypot active
- [ ] Submissions stored with complete structured data and unique reference
- [ ] Customer confirmation and internal notification emails dispatch successfully
- [ ] Email failure after save logged without losing lead
- [ ] Success and error states meet §10 and §11
- [ ] Accessibility spot check passed
- [ ] No instant pricing or binding quote language
- [ ] No V1 exclusions implemented
- [ ] Product Owner explicit acceptance

Only the Product Owner may accept this phase.
