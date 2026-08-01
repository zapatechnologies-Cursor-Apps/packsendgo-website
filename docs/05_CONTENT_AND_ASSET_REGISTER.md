# PackSendGo Content and Asset Register

Structured register of PackSendGo website content, assets and confirmation status. Unknown values remain pending until the Product Owner or operational review confirms them.

**Authority:** `docs/00_PROJECT_AUTHORITY.md`, `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md`, `docs/02_DESIGN_AND_3D_AUTHORITY.md`

Cursor implementation and audit tasks must follow `.cursor/rules/00-packsendgo-api-saving-governance.mdc`, including narrow scope, targeted file reads, command limits and the prohibition on Cursor Git activity.

## Status definitions

| Status | Meaning |
| --- | --- |
| APPROVED | Confirmed for use in production |
| PENDING PRODUCT OWNER INPUT | Awaiting Product Owner decision or copy |
| PENDING OPERATIONAL CONFIRMATION | Awaiting operational or warehouse verification |
| REVIEW REQUIRED | Draft exists; requires review before approval |
| DEFERRED | Intentionally excluded from V1 |
| PROHIBITED | Must not appear in production |

---

## 1. Confirmed project facts

| Fact | Value | Status |
| --- | --- | --- |
| Project name | PackSendGo Public Website | APPROVED |
| Primary domain | packsendgo.com | APPROVED |
| Business category | Ecommerce fulfilment, warehousing, pick-and-pack and dispatch | APPROVED |
| Website purpose | Premium public marketing and lead-generation website | APPROVED |
| Primary conversion | Get a tailored quote | APPROVED |
| Secondary conversion | Tour our warehouse | APPROVED |
| Hosting | Hostinger Cloud Startup | APPROVED |
| Source control | GitHub | APPROVED |
| Production branch | `main` | APPROVED |
| Framework | Next.js | APPROVED |
| UI | React and Tailwind CSS | APPROVED |
| Language | TypeScript | APPROVED |
| Runtime | Node.js | APPROVED |
| ORM | Prisma | APPROVED |
| Database | MySQL | APPROVED |
| Design source | Google Stitch | APPROVED |
| Design handoff | Stitch MCP | APPROVED |
| Implementation agent | Cursor | APPROVED |
| Interactive 3D | Spline | APPROVED |
| Real warehouse media | Photography, video; optionally Matterport or 360-degree tour | APPROVED |
| Transactional email | External provider | APPROVED |
| Spam protection | Cloudflare Turnstile or approved equivalent | APPROVED |
| V1 quotation outcome | Structured enquiry stored and emailed for manual response | APPROVED |
| Proposition (working) | From shelf to doorstep, handled. | APPROVED |
| Supporting proposition (working) | Flexible ecommerce fulfilment, warehousing, pick and pack, and dispatch for growing brands. | APPROVED |
| Brand line (working) | Store. Pack. Send. Grow. | APPROVED |
| Ownership | Joint venture | APPROVED |

All copy remains subject to final Product Owner approval.

---

## 2. Business identity

| Item | Value | Status |
| --- | --- | --- |
| Legal company name | — | PENDING PRODUCT OWNER INPUT |
| Trading name | PackSendGo | APPROVED |
| Company registration number | — | PENDING PRODUCT OWNER INPUT |
| Registered office | — | PENDING PRODUCT OWNER INPUT |
| Trading address | — | PENDING PRODUCT OWNER INPUT |
| Warehouse address | — | PENDING PRODUCT OWNER INPUT |
| Contact email | — | PENDING PRODUCT OWNER INPUT |
| Quotation email | — | PENDING PRODUCT OWNER INPUT |
| Support email | — | PENDING PRODUCT OWNER INPUT |
| Telephone | — | PENDING PRODUCT OWNER INPUT |
| WhatsApp | — | PENDING PRODUCT OWNER INPUT |
| VAT number | — | PENDING PRODUCT OWNER INPUT |
| Governing law | — | PENDING PRODUCT OWNER INPUT |

---

## 3. Brand positioning

| Item | Value | Status |
| --- | --- | --- |
| Short description | Modern fulfilment partner for growing ecommerce brands | APPROVED |
| Long description | — | PENDING PRODUCT OWNER INPUT |
| Joint-venture story | Joint venture ownership | REVIEW REQUIRED |
| Customer profile | New and growing ecommerce brands, marketplace sellers, subscription businesses, importers, wholesalers | APPROVED |
| Geographic focus | — | PENDING OPERATIONAL CONFIRMATION |
| Competitive advantage | — | PENDING PRODUCT OWNER INPUT |
| Service promise | — | PENDING PRODUCT OWNER INPUT |
| Quote response time | — | PENDING PRODUCT OWNER INPUT |
| Minimum volume | — | PENDING OPERATIONAL CONFIRMATION |
| Capacity | — | PENDING OPERATIONAL CONFIRMATION |

---

## 4. Services confirmation matrix

The broad business category is approved. This section separates **public marketing authority**, **quotation-form collection authority**, **operational confirmation** and **current status**. No capability may be described as operational unless PackSendGo genuinely provides it or has an approved delivery partner.

### 4.1 Public marketing description authority

Only services explicitly authorised in `docs/00_PROJECT_AUTHORITY.md` §9 may be marked for public marketing description. Even where public description is authorised, detailed operational scope remains `PENDING OPERATIONAL CONFIRMATION` unless separately confirmed.

| Service | Public marketing authority | Quotation-form collection | Operationally confirmed | Status |
| --- | --- | --- | --- | --- |
| Ecommerce fulfilment | Yes (authority §9) | Yes | — | PENDING OPERATIONAL CONFIRMATION |
| Warehousing and storage | Yes (authority §9) | — | — | PENDING OPERATIONAL CONFIRMATION |
| Goods-in processing | Yes (authority §9) | — | — | PENDING OPERATIONAL CONFIRMATION |
| Inventory storage | Yes (authority §9) | — | — | PENDING OPERATIONAL CONFIRMATION |
| Pick and pack | Yes (authority §9) | — | — | PENDING OPERATIONAL CONFIRMATION |
| Parcel dispatch | Yes (authority §9) | — | — | PENDING OPERATIONAL CONFIRMATION |
| Returns processing | Yes (authority §9) | Yes | — | PENDING OPERATIONAL CONFIRMATION |
| Branded packaging | Yes (authority §9) | Yes | — | PENDING OPERATIONAL CONFIRMATION |
| Labelling and barcoding | Yes (authority §9) | Yes | — | PENDING OPERATIONAL CONFIRMATION |
| Marketplace fulfilment | Yes (authority §9) | — | — | PENDING OPERATIONAL CONFIRMATION |
| UK delivery | Yes (authority §9) | Yes | — | PENDING OPERATIONAL CONFIRMATION |
| International delivery | Yes (authority §9) | Yes | — | PENDING OPERATIONAL CONFIRMATION |
| Additional operational services | Product Owner approval required | — | — | PENDING PRODUCT OWNER INPUT |

### 4.2 Quotation-form options (not public service claims)

These items may be collected as customer requirements in the quotation form per `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md` §4. They are **not** authorised as public marketing service claims and must not imply the service is currently delivered.

| Service | Public marketing authority | Quotation-form collection | Operationally confirmed | Status |
| --- | --- | --- | --- | --- |
| Inserts | No | Yes (01 §4) | — | PENDING OPERATIONAL CONFIRMATION |
| Bundling | No | Yes (01 §4) | — | PENDING OPERATIONAL CONFIRMATION |
| Subscription-box assembly | No | Yes (01 §4) | — | PENDING OPERATIONAL CONFIRMATION |
| Quality checking | No | Yes (01 §4) | — | PENDING OPERATIONAL CONFIRMATION |
| Rework | No | Yes (01 §4) | — | PENDING OPERATIONAL CONFIRMATION |
| Other customer requirements | No | Yes (via Other field) | — | PENDING OPERATIONAL CONFIRMATION |

### 4.3 Warehouse processes and pending items

| Item | Public marketing authority | Quotation-form collection | Notes | Status |
| --- | --- | --- | --- | --- |
| Inspection | No | No | Warehouse process and operational-evidence requirement only; not an authorised standalone public service | REVIEW REQUIRED |
| Kitting | No | No | Not an approved named quotation option | PENDING PRODUCT OWNER INPUT |

**Rule:** Public pages must not claim quotation-form-only or pending items as operational services.

---

## 5. Platform-support matrix

Displaying a platform does not claim a live integration unless separately confirmed.

| Platform | May reference in quotation form | Operationally supported | Live API integration | Logo approved for display | Status |
| --- | --- | --- | --- | --- | --- |
| Shopify | Yes | — | No (V1 excluded) | — | PENDING OPERATIONAL CONFIRMATION |
| WooCommerce | Yes | — | No (V1 excluded) | — | PENDING OPERATIONAL CONFIRMATION |
| Amazon | Yes | — | No (V1 excluded) | — | PENDING OPERATIONAL CONFIRMATION |
| eBay | Yes | — | No (V1 excluded) | — | PENDING OPERATIONAL CONFIRMATION |
| TikTok Shop | Yes | — | No (V1 excluded) | — | PENDING OPERATIONAL CONFIRMATION |
| Etsy | Yes | — | No (V1 excluded) | — | PENDING OPERATIONAL CONFIRMATION |
| Custom ecommerce platform | Yes | — | No (V1 excluded) | — | PENDING OPERATIONAL CONFIRMATION |
| Other marketplace | Yes | — | No (V1 excluded) | — | PENDING OPERATIONAL CONFIRMATION |

---

## 6. Operational evidence

| Item | Value | Status |
| --- | --- | --- |
| Warehouse size | — | PENDING OPERATIONAL CONFIRMATION |
| Pallet capacity | — | PENDING OPERATIONAL CONFIRMATION |
| Shelving/bin capacity | — | PENDING OPERATIONAL CONFIRMATION |
| Daily order capacity | — | PENDING OPERATIONAL CONFIRMATION |
| Dispatch cut-off time | — | PENDING OPERATIONAL CONFIRMATION |
| Order accuracy | — | PENDING OPERATIONAL CONFIRMATION |
| Operating days | — | PENDING OPERATIONAL CONFIRMATION |
| Operating hours | — | PENDING OPERATIONAL CONFIRMATION |
| Security measures | — | PENDING OPERATIONAL CONFIRMATION |
| Insurance | — | PENDING OPERATIONAL CONFIRMATION |
| Warehouse-management platform | — | PENDING OPERATIONAL CONFIRMATION |
| Courier partners | — | PENDING OPERATIONAL CONFIRMATION |
| Certifications | — | PENDING OPERATIONAL CONFIRMATION |
| Registrations | — | PENDING OPERATIONAL CONFIRMATION |

---

## 7. Brand assets

| Asset | Location / reference | Status |
| --- | --- | --- |
| Primary SVG logo | — | PENDING PRODUCT OWNER INPUT |
| White logo variant | — | PENDING PRODUCT OWNER INPUT |
| Dark logo variant | — | PENDING PRODUCT OWNER INPUT |
| Icon / mark | — | PENDING PRODUCT OWNER INPUT |
| Favicon | — | PENDING PRODUCT OWNER INPUT |
| Social avatar | — | PENDING PRODUCT OWNER INPUT |
| Open Graph image | — | PENDING PRODUCT OWNER INPUT |
| Colour palette | Working roles in design authority; exact values pending Stitch | REVIEW REQUIRED |
| Typeface | Candidate families in design authority; final choice pending | REVIEW REQUIRED |
| Brand guidelines | — | PENDING PRODUCT OWNER INPUT |

---

## 8. Warehouse photography

| Area | Asset | Status |
| --- | --- | --- |
| Goods in / receiving | — | PENDING OPERATIONAL CONFIRMATION |
| Inspection / quality check | — | PENDING OPERATIONAL CONFIRMATION |
| Storage / racking | — | PENDING OPERATIONAL CONFIRMATION |
| Picking | — | PENDING OPERATIONAL CONFIRMATION |
| Packing benches | — | PENDING OPERATIONAL CONFIRMATION |
| Dispatch / despatch | — | PENDING OPERATIONAL CONFIRMATION |
| Returns processing | — | PENDING OPERATIONAL CONFIRMATION |
| Security / access control | — | PENDING OPERATIONAL CONFIRMATION |
| Exterior / signage | — | PENDING OPERATIONAL CONFIRMATION |
| Team (if approved) | — | PENDING PRODUCT OWNER INPUT |

---

## 9. Warehouse video and walkthrough

| Asset | Description | Status |
| --- | --- | --- |
| Teaser video | Short homepage or warehouse teaser | PENDING OPERATIONAL CONFIRMATION |
| Guided operational film | Full warehouse walkthrough film | PENDING OPERATIONAL CONFIRMATION |
| Stage-based chapters | Goods-in through returns | PENDING OPERATIONAL CONFIRMATION |
| Matterport tour | Optional interactive walkthrough | PENDING OPERATIONAL CONFIRMATION |
| 360-degree tour | Alternative to Matterport | PENDING OPERATIONAL CONFIRMATION |
| Mobile exports | Optimised mobile video variants | PENDING OPERATIONAL CONFIRMATION |
| Poster images | Static frames for lazy-load placeholders | PENDING OPERATIONAL CONFIRMATION |
| Captions / subtitles | Accessibility text for all video | PENDING OPERATIONAL CONFIRMATION |

---

## 10. Spline and 3D assets

| Asset | Description | Status |
| --- | --- | --- |
| Scene storyboard | 5–7 warehouse stages | PENDING PRODUCT OWNER INPUT |
| Spline models | Racking, pallets, cartons, benches, etc. | DEFERRED (Phase 5) |
| Animation notes | Stage transitions and camera moves | DEFERRED (Phase 5) |
| Desktop scene | Primary Spline embed | DEFERRED (Phase 5) |
| Simplified mobile scene | Reduced geometry or static fallback | DEFERRED (Phase 5) |
| Video fallback | Lightweight loop for mobile | DEFERRED (Phase 5) |
| Static fallback | Poster image for no-WebGL | DEFERRED (Phase 5) |

---

## 11. Trust evidence

| Item | Status |
| --- | --- |
| Customer testimonials | PENDING PRODUCT OWNER INPUT |
| Customer logos | PENDING PRODUCT OWNER INPUT |
| Case studies | DEFERRED (possible V1.1) |
| Leadership biographies | PENDING PRODUCT OWNER INPUT |
| Team photographs | PENDING PRODUCT OWNER INPUT |
| Insurance documentation | PENDING OPERATIONAL CONFIRMATION |
| Certification badges | PENDING OPERATIONAL CONFIRMATION |
| SLA evidence | PENDING OPERATIONAL CONFIRMATION |
| Security statements | REVIEW REQUIRED |

**Rule:** No fabricated testimonials, logos or statistics in production.

---

## 12. Legal and privacy content

| Item | Status |
| --- | --- |
| Privacy Policy | PENDING PRODUCT OWNER INPUT |
| Cookie Policy | PENDING PRODUCT OWNER INPUT |
| Website Terms | PENDING PRODUCT OWNER INPUT |
| Data retention period | PENDING PRODUCT OWNER INPUT |
| Analytics tooling decision | REVIEW REQUIRED |
| Marketing consent wording | PENDING PRODUCT OWNER INPUT |
| Quotation disclaimer | PENDING PRODUCT OWNER INPUT |

---

## 13. Prohibited content

The following must never appear in production:

| Item | Status |
| --- | --- |
| Lorem ipsum | PROHIBITED |
| Dummy contact details | PROHIBITED |
| Fabricated operational facts | PROHIBITED |
| Fabricated testimonials | PROHIBITED |
| Unsupported service or integration claims | PROHIBITED |
| Unauthorised third-party logos | PROHIBITED |
| AI-generated warehouse imagery presented as real | PROHIBITED |
| Copied third-party visual work | PROHIBITED |
| Invented pricing or binding quote promises | PROHIBITED |
| Template residue or placeholder statistics | PROHIBITED |

---

## 14. Asset storage

### Existing planning and source directories

These directories currently hold approved source or planning assets:

| Path | Purpose |
| --- | --- |
| `assets/brand/` | Brand source assets and planning files |
| `assets/warehouse/` | Warehouse photography source and planning files |
| `assets/video/` | Video source and planning files |
| `assets/3d/` | Spline and 3D planning assets |
| `assets/integrations/` | Integration-related planning assets |
| `assets/video/raw/` | Local working video files (gitignored) |
| `assets/warehouse/raw/` | Local working warehouse photography (gitignored) |
| `design/exports/temp/` | Temporary Stitch or design exports (gitignored) |

### Proposed production directories — PROPOSED DURING IMPLEMENTATION

The future Next.js `public/` structure is an intended implementation structure and **does not yet exist**. Example future paths:

| Path | Purpose |
| --- | --- |
| `public/images/` | Optimised production images |
| `public/video/` | Optimised short-form video assets |
| `public/models/` | Static 3D fallback assets if required |
| `public/brand/` | Production logo, favicon and Open Graph assets |

### Raw versus production-ready

- **Raw assets** — Unprocessed photography and video in `assets/` planning directories or gitignored raw paths; not suitable for direct public use.
- **Production-ready assets** — Optimised, rights-cleared, privacy-reviewed files suitable for the public website; will be committed to proposed `public/` paths during implementation or served via approved external platforms.

---

## 15. Phase completion criteria

Phase 0B content register is complete when:

- [ ] All tables populated with approved or clearly pending values
- [ ] No invented business facts in APPROVED rows
- [ ] Product Owner has reviewed business identity and service matrix
- [ ] Brand and warehouse asset gaps documented
- [ ] Prohibited content rules acknowledged by implementation agents
- [ ] Product Owner acceptance recorded

Until Product Owner input is received, production pages must use approved structural content only and omit or generically phrase unconfirmed operational claims.
