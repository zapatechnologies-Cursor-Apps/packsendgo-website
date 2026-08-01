# PackSendGo Technical Architecture

## 1. Purpose and authority

This document defines the approved V1 technical architecture for the PackSendGo public website.

It exists to guide implementation, prevent architectural drift and ensure all technical decisions remain compatible with Hostinger Cloud Startup, the approved V1 scope and the project authority documents.

Where this document conflicts with `docs/00_PROJECT_AUTHORITY.md`, the project authority takes precedence unless the Product Owner explicitly overrides it.

No implementation agent may introduce material technologies, services or infrastructure that conflict with this document without Product Owner approval.

Cursor implementation and audit tasks must follow `.cursor/rules/00-packsendgo-api-saving-governance.mdc`, including narrow scope, targeted file reads, command limits and the prohibition on Cursor Git activity.

## 2. Architecture principles

The V1 architecture shall follow these principles:

- **Simple V1 architecture** — A deliberately small, maintainable system focused on public pages and quotation capture.
- **Informative public website first** — The primary purpose is marketing, trust-building and lead generation, not a customer fulfilment platform.
- **Conversion-led quotation workflow** — Technical design prioritises reliable quotation submission, storage and notification.
- **Hostinger compatibility** — All runtime, database and deployment choices must work on Hostinger Cloud Startup without Vercel-only dependencies.
- **Progressive enhancement** — Core content and forms must work without 3D, video or advanced client features.
- **Performance before decorative complexity** — 3D, video and motion must not block conversion or harm Core Web Vitals.
- **External services only where justified** — Email, spam protection, Spline, Matterport and long-form video use approved external providers.
- **No premature customer platform** — No accounts, dashboards, portals or operational integrations in V1.
- **No Vercel-only dependencies** — Avoid Edge-only runtimes, Vercel-specific APIs and deployment assumptions.
- **No unsupported real-time infrastructure** — No WebSockets, Redis, background workers or persistent job queues in V1.

## 3. Approved technology stack

| Layer | Technology | Notes |
| --- | --- | --- |
| Framework | Next.js App Router | Server and client components as appropriate |
| UI library | React | Aligned with Next.js |
| Language | TypeScript | Strict typing throughout application code |
| Styling | Tailwind CSS | Utility-first styling aligned with Stitch design system |
| Runtime | Node.js | Version compatible with Hostinger and selected Next.js release |
| ORM | Prisma | Type-safe database access |
| Database | MySQL | Hostinger-managed MySQL |
| Email | External transactional email provider | Provider selection pending Product Owner approval |
| Spam protection | Cloudflare Turnstile or approved equivalent | Server-side verification required |
| Interactive 3D | Spline | Browser-rendered stylised warehouse scene |
| Real warehouse media | Matterport or approved video platform | Loaded externally on user interaction |
| Source control | GitHub | Product Owner controls all Git operations |
| Hosting | Hostinger Cloud Startup | Production deployment target |

Exact package versions shall be confirmed during Phase 2 implementation and must remain compatible with Hostinger.

## 4. Logical system architecture

### 4.1 Primary request flow

```
Browser
  → Next.js public pages (SSR/SSG where appropriate)
  → Quotation API endpoint (Route Handler or Server Action)
  → Server-side validation
  → Turnstile verification
  → MySQL storage (Prisma transaction)
  → Quotation reference generated
  → PackSendGo internal notification email
  → Customer confirmation email
  → Each email attempt recorded independently (QuoteNotificationAttempt)
  → Success response returned
```

The database record is authoritative. Failure of either email must not delete or roll back the saved lead. Email failures must be recorded for follow-up. A customer-safe success response may still be returned after a successful database save, without exposing internal email errors.

### 4.2 Media and 3D flow

- **Spline** — Scene assets delivered from Spline; rendering occurs primarily in the browser. A poster image and static or video fallback display before and without WebGL.
- **Matterport / video** — Embedded or linked from external platforms. Long-form warehouse media loads only after deliberate user interaction.
- **Fallbacks** — Static poster, lightweight video and still-image alternatives for mobile, reduced-motion and weak-device scenarios.
- **No WebSocket dependency** — V1 does not require persistent client-server connections.
- **No background worker requirement** — Email dispatch and quotation processing occur within the request lifecycle or approved synchronous server flow.

## 5. Application boundaries

| Boundary | Responsibility |
| --- | --- |
| Public marketing pages | Home, Services, How It Works, Warehouse, About, legal pages |
| Quotation feature | Multi-step form, validation, submission, success and error states |
| Shared UI components | Header, footer, buttons, cards, form controls, layout primitives |
| Server-side quotation processing | Validation, Turnstile, reference generation, persistence, email trigger |
| Database layer | Prisma models, migrations, structured quotation storage |
| Email layer | Customer confirmation and internal notification templates and dispatch |
| 3D/media layer | Spline embed, warehouse photography, video and walkthrough embeds |
| SEO and security layer | Metadata, sitemap, robots, security headers, CSP, structured data |

## 6. Proposed Next.js structure

The following structure is an implementation guide only. Creating these directories or files is not part of Phase 0B.

```
app/                    # App Router pages and layouts
components/             # Shared UI components
features/quotes/        # Quotation form, validation and submission logic
lib/                    # Utilities, email client, validation helpers
prisma/                 # Schema and migrations
public/                 # Static assets (images, posters, favicons)
styles/                 # Global styles and Tailwind configuration
```

Implementation agents must not create this structure until Phase 2 is approved.

## 7. Data architecture

### 7.1 Design goals

- Capture all structured quotation fields defined in `docs/06_QUOTATION_FORM_SPEC.md`.
- Preserve data for future deterministic pricing and optional AI interpretation.
- Allow implementation to simplify table count where justified, provided structured data is not lost.
- Generate a unique human-readable quotation reference for every submission.

### 7.2 Candidate entities

| Entity | Purpose |
| --- | --- |
| QuoteRequest | Root record: reference, status, timestamps, consent flags |
| QuoteContact | Name, company, email, telephone, website, country, contact preference |
| QuoteBusinessProfile | Business stage, category, current arrangement, start date, reason |
| QuoteOrderProfile | Monthly volume, SKUs, items per order, seasonality, growth |
| QuoteStockProfile | Stock volume, storage type, dimensions, weight, special handling |
| QuoteSalesChannel | Selected sales channels and platform details |
| QuoteDeliveryProfile | Delivery regions, parcel details, tracking and courier needs |
| QuoteAdditionalService | Selected additional services and notes |
| QuoteNotificationAttempt | Email type, status, timestamp, provider response reference |
| QuoteStatusHistory | Status changes with timestamp and optional note |

Implementation may consolidate related entities into structured JSON columns on `QuoteRequest` if normalisation adds complexity without benefit, but field coverage must remain complete.

### 7.3 Data ownership and lifecycle

- **Ownership** — PackSendGo owns all quotation data stored in MySQL.
- **Timestamps** — Every record includes `createdAt`; updates include `updatedAt`.
- **Reference generation** — Server-generated unique reference (format to be confirmed during implementation; e.g. `PSG-YYYYMMDD-XXXX`).
- **Status handling** — Initial status on submission: `RECEIVED`. Further status changes are internal and manual in V1.

## 8. Quotation statuses

Approved lifecycle statuses:

| Status | Meaning |
| --- | --- |
| RECEIVED | Submission stored successfully |
| UNDER_REVIEW | PackSendGo team reviewing enquiry |
| INFORMATION_REQUIRED | Additional information requested from customer |
| QUOTE_PREPARING | Quotation being prepared manually |
| QUOTE_SENT | Quotation delivered to customer |
| CLOSED | Enquiry completed |
| DECLINED | Enquiry declined or not progressed |

V1 may use only `RECEIVED` automatically on submission. Remaining statuses support future internal tooling and manual tracking.

## 9. Security architecture

- **Server-side validation** — All quotation fields validated authoritatively on the server.
- **Turnstile verification** — Token verified server-side before persistence.
- **Rate limiting** — Submission endpoints protected against abuse (implementation-specific limits).
- **Environment-variable protection** — Secrets stored in Hostinger environment configuration, never in Git or client bundles.
- **No secrets in browser code** — Only public keys (e.g. `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) exposed to the client.
- **Safe database queries** — Prisma parameterised queries; no raw SQL unless justified and reviewed.
- **Security headers** — HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy and related headers configured.
- **Content Security Policy** — Allowlisted domains for Spline, Matterport, Turnstile, approved video providers and transactional email webhooks where applicable.
- **Sanitised text input** — Free-text fields trimmed, length-limited and sanitised before storage.
- **Audit timestamps** — Creation and update times recorded on all quotation records.
- **Privacy-conscious logging** — Logs include quotation reference but not full sensitive payloads.
- **No sensitive data in URLs** — Quotation details never passed as query parameters.

## 10. Media and 3D architecture

- **Lazy-loaded Spline** — Scene loads after initial page content; poster displayed immediately.
- **Poster fallback** — Static image shown before 3D initialisation and when WebGL unavailable.
- **Mobile video or static fallback** — Lightweight alternative media for constrained devices.
- **Reduced-motion support** — Respects `prefers-reduced-motion`; disables or replaces intensive animation.
- **Real warehouse media** — Photography optimised and served from `public/` or approved CDN; formats include WebP/AVIF where supported.
- **Long-form video** — Hosted on a suitable external streaming provider where file size or bandwidth warrants it.
- **Matterport** — Embedded only after user interaction; must not autoplay or block page content.
- **Important text outside 3D canvas** — All essential information available in HTML for accessibility, SEO and fallback.

## 11. Hostinger constraints

The architecture must respect these Hostinger Cloud Startup constraints:

- MySQL rather than PostgreSQL
- No Redis requirement
- No incoming WebSocket server dependency
- No Vercel Edge runtime requirement
- No local AI model hosting
- No persistent background workers
- External object storage if file uploads are introduced in a future release
- External specialised services (email, Spline, Matterport, video) where necessary

## 12. Environment-variable categories

Required categories (values set during deployment; never committed to Git):

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | MySQL connection string |
| `NEXT_PUBLIC_SITE_URL` or approved site URL variable | Canonical public site URL |
| Email provider credentials | API key or SMTP credentials for transactional email |
| `EMAIL_FROM` | Verified sender address |
| `QUOTE_NOTIFICATION_EMAIL` | Internal PackSendGo notification recipient |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile site key; intentionally exposed to the browser |
| `TURNSTILE_SECRET_KEY` | Server-only secret; never in client code or Git |
| Spline / Matterport configuration | Optional embed URLs or scene identifiers |
| `NODE_ENV` | Runtime environment |

## 13. Observability and error handling

- **Structured server logs** — JSON or consistent text format with timestamp, level and context.
- **Quotation reference in logs** — Every submission and email attempt traceable by reference.
- **Email attempt recording** — `QuoteNotificationAttempt` or equivalent logs success and failure.
- **User-safe errors** — Generic messages to users; detailed errors logged server-side only.
- **No secrets or full sensitive payloads in logs** — Redact email bodies and personal data in log output.
- **Hostinger runtime-log review** — Product Owner or delegate reviews logs after deployment and on incidents.

## 14. V1 exclusions

The following are explicitly excluded from V1 architecture:

- Customer registration, login and dashboard
- Live inventory, shipment tracking and carrier APIs
- Ecommerce-platform API integrations
- Automatic price calculation and binding quotations
- Online payments
- AI chatbot, AI pricing and OpenAI integration
- Mobile applications
- Customer file uploads
- Live WebSocket features
- Redis and background worker infrastructure
- Self-hosted AI
- Fully explorable custom WebGL warehouse
- Large content-management system
- Multi-tenant functionality
- CRM integration unless separately approved

## 15. Architecture acceptance criteria

Architecture implementation may proceed only when:

1. This document is approved by the Product Owner.
2. All technology choices remain within the approved stack.
3. No excluded infrastructure or features are introduced.
4. Quotation data model covers all fields in `docs/06_QUOTATION_FORM_SPEC.md`.
5. Security, CSP and Hostinger constraints are documented in deployment plan.
6. Environment-variable categories are defined without secrets in Git.
7. 3D and media fallback strategy aligns with `docs/02_DESIGN_AND_3D_AUTHORITY.md`.
8. Implementation agent confirms Hostinger-compatible Node.js and Next.js versions during Phase 2.

Only the Product Owner may accept the architecture phase.
