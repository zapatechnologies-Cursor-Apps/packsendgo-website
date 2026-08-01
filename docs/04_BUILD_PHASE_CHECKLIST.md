# PackSendGo Build Phase Checklist

Granular phased build checklist for PackSendGo Website V1. Mark items `[x]` only when genuinely complete. Cursor must not run Git commands; the Product Owner performs all Git operations.

---

## Phase 0A — Repository and authority

### Authority check

- [x] `docs/00_PROJECT_AUTHORITY.md` created
- [x] `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md` created
- [x] `docs/02_DESIGN_AND_3D_AUTHORITY.md` created
- [x] README.md foundation content created
- [x] `.cursor/rules/00-packsendgo-api-saving-governance.mdc` created

### Implementation tasks

- [x] Repository structure created
- [x] Foundation files created (`.gitignore`, `.gitattributes`, `.editorconfig`)
- [x] Phase 0A foundation audit completed (PASS)

### Validation

- [x] Foundation audit performed against authority documents

### Git (Product Owner only)

- [ ] GitHub repository connected
- [ ] `main` pushed
- [ ] Documentation branch pushed

### Acceptance

- [x] Phase 0A foundation audit passed
- [ ] Product Owner acceptance recorded

---

## Phase 0B — Business facts and asset register

### Authority check

- [x] All Phase 0B documents reviewed against authority documents

### Implementation tasks

- [x] `docs/03_TECHNICAL_ARCHITECTURE.md` completed
- [x] `docs/04_BUILD_PHASE_CHECKLIST.md` completed
- [x] `docs/05_CONTENT_AND_ASSET_REGISTER.md` completed
- [x] `docs/06_QUOTATION_FORM_SPEC.md` completed
- [x] `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` completed
- [ ] Product Owner business-fact review
- [ ] Service confirmation
- [ ] Brand asset inventory
- [ ] Warehouse asset inventory

### Validation

- [x] All five documents non-empty and H1-validated
- [x] No fabricated business facts in documents
- [x] Pending items clearly labelled

### Browser / mobile validation

- [ ] Not applicable (documentation phase)

### Documentation update

- [x] Phase 0B completion recorded (accepted 1 August 2026)

### Git (Product Owner only)

- [ ] Product Owner commits and pushes Phase 0B documentation

### Acceptance

- [x] Product Owner acceptance (1 August 2026)

---

## Phase 1A — Stitch concept exploration

### Authority check

- [x] Design exploration aligned with `docs/02_DESIGN_AND_3D_AUTHORITY.md`

### Implementation tasks

- [x] Stitch concept exploration complete
- [x] Three distinct desktop homepage concepts produced (historical)
- [x] Mobile variants for each concept (historical)
- [x] Quote flow concept (historical)
- [x] Warehouse page concept (historical)
- [x] Review against design authority
- [x] Final concept selected: PackSendGo — Final Desktop Master V3
- [x] Product Owner direction selection (one concept approved)
- [x] Rejected concepts deleted from Stitch project

### Validation

- [x] Concepts reviewed for conversion path, accessibility and 3D feasibility

### Browser validation

- [x] Desktop review of exported concepts
- [x] Mobile review of exported concepts (historical)

### Documentation update

- [x] Stitch project reference recorded
- [x] Approved direction documented
- [x] Selected screen recorded (`f850fd8d653d41c8b8958f00ddaea79f`)

### Git (Product Owner only)

- [ ] Product Owner commits approved design exports

### Acceptance

- [x] Product Owner acceptance (2026-08-01)

---

## Phase 1B — Approved design system

### Authority check

- [x] Design system aligned with approved concept and design authority

### Implementation tasks

- [x] Colours defined and approved (Dark Industrial Elegance)
- [x] Typography defined and approved (Playfair Display, Geist)
- [x] Spacing scale defined
- [x] Component library direction documented
- [x] Buttons specified
- [x] Form controls specified
- [x] Motion principles documented
- [x] 3D placement and fallback strategy documented (Three.js hero authority resolved)
- [x] Desktop approval
- [x] Mobile approval (to be resolved in code)
- [x] Selected design handoff created (`design/stitch/03_SELECTED_DESIGN_HANDOFF.md`)
- [x] Frontend preflight audit created (`design/stitch/04_FRONTEND_FOUNDATION_PREFLIGHT_AUDIT.md`)
- [x] Design-system reference recorded (`assets/de64b70122504dc6b5c12ce0795dddb6`)

### Validation

- [x] Design tokens exported
- [ ] Asset register updated

### Browser validation

- [x] Desktop design review
- [ ] Mobile design review (deferred to implementation)

### Documentation update

- [x] Handoff materials complete
- [x] `docs/02_DESIGN_AND_3D_AUTHORITY.md` aligned with Three.js hero decision

### Git (Product Owner only)

- [ ] Product Owner commits design handoff materials

### Acceptance

- [x] Product Owner acceptance (2026-08-01)

---

## Phase 2 — Next.js foundation

Phase 2A status: COMPLETE — ACCEPTED 2026-08-01
Phase 2B status: COMPLETE — ACCEPTED 2026-08-01

Phase 2 overall is **not** complete. Phase 2A foundation and Phase 2B homepage are accepted; deployment and later site phases remain deferred.

Report: `docs/phase-reports/PHASE_2A_FRONTEND_FOUNDATION_REPORT.md`

### Phase 2A — Foundation (complete where marked)

- [x] Next.js foundation initialised (App Router)
- [x] App Router established
- [x] TypeScript strict mode configured
- [x] Tailwind CSS configured
- [x] ESLint configured
- [ ] Formatting configured
- [x] `.env.example` created (no secrets)
- [x] Route shell and root layout
- [x] Metadata foundation
- [x] Shared component foundation (header, footer shell)
- [x] Playfair Display and Geist configured
- [x] Semantic design tokens established
- [x] System, Light and Dark theme architecture established
- [x] Three.js dependencies installed
- [x] Three.js client-side integration boundary established
- [x] Hostinger-compatible build verified locally
- [x] Automated validation passing (lint, typecheck, build)

### Phase 2A validation

- [x] Build succeeds
- [x] Lint passes
- [x] Type check passes
- [x] Root route browser review (Product Owner)
- [x] Layout responsive at key breakpoints (Product Owner)
- [x] Root layout usable on mobile viewport (Product Owner)
- [x] Product Owner desktop browser validation
- [x] Product Owner mobile browser validation (approximately 390 × 844)
- [x] Product Owner theme validation (System / Light / Dark with persistence)

### Phase 2B — Homepage and Three.js hero

**Phase 2B: COMPLETE — ACCEPTED 2026-08-01**

Report: `docs/phase-reports/PHASE_2B_HOMEPAGE_IMPLEMENTATION_REPORT.md`

- [x] Selected Stitch homepage implemented
- [x] Duplicate service rail excluded
- [x] Real separate Three.js source adapted
- [x] Three.js full hero background implemented
- [x] Sharp lime route line implemented
- [x] Moving lime parcel box implemented
- [x] Core Capabilities implemented
- [x] Compact five-stage process implemented
- [x] Warehouse-tour placeholder implemented
- [x] Sales-channel section contrast corrected
- [x] Customer-category section implemented
- [x] Operational commitments implemented
- [x] Final quote CTA implemented
- [x] Responsive homepage implemented
- [x] Production logo SVGs created
- [x] Compact production theme menu implemented
- [x] Automated lint/typecheck/build passed
- [x] Product Owner desktop homepage validation
- [x] Product Owner mobile homepage validation (approximately 390 × 844)
- [x] Product Owner Three.js hero validation
- [x] Product Owner lime-route validation
- [x] Product Owner moving-parcel validation
- [x] Product Owner Core Capabilities interaction validation
- [x] Product Owner theme validation
- [x] Product Owner current SVG logo acceptance
- [x] Product Owner Phase 2B acceptance (2026-08-01)
- [ ] Real warehouse media
- [ ] Legal-page implementation
- [ ] Confirmed contact and company details
- [ ] Production deployment

### Phase 3 — Homepage media refinement (stock placeholders)

**Status: PRIVATE HOSTINGER PREVIEW APPROVED — LIGHT MODE AND GENUINE FACILITY MEDIA DEFERRED — 2026-08-01**

Report: `docs/phase-reports/PHASE_3_HOMEPAGE_MEDIA_REFINEMENT_REPORT.md`

- [x] Three.js hero visibility refinement
- [x] Five Core Capabilities stock images inserted
- [x] Tour our warehouse stock placeholder inserted
- [x] Local image assets used (no hotlinking)
- [x] Image sources recorded in asset register
- [x] Dark desktop validation (Product Owner) — **PASSED — 2026-08-01**
- [x] Dark mobile validation (Product Owner) — **PASSED — 2026-08-01**
- [x] Automated lint passed
- [x] Automated typecheck passed
- [x] Production build passed (`npm run build`) — **PASSED — 2026-08-01**
- [x] Product Owner private-preview acceptance — **ACCEPTED WITH CONDITIONS — 2026-08-01**

**Still incomplete:**

- [ ] Light-mode contrast correction
- [ ] Light-mode Product Owner acceptance
- [ ] Genuine PackSendGo warehouse photography
- [ ] Real warehouse video
- [ ] Matterport or 360 tour
- [ ] Final Phase 6 real-media acceptance
- [ ] Public production launch

### Phase 3A — Quotation form preflight and implementation

**Phase 3A status: IMPLEMENTED LOCALLY — DATABASE-BACKED PERSISTENCE VALIDATED — STAGING AND PRODUCTION PENDING — 2026-08-01**

Report: `docs/phase-reports/PHASE_3A_QUOTATION_FORM_IMPLEMENTATION_REPORT.md`
Phase 3B1 report: `docs/phase-reports/PHASE_3B1_LOCAL_DATABASE_MIGRATION_AND_PERSISTENCE_REPORT.md`

**Phase 3B1 status: LOCAL DATABASE MIGRATION AND PERSISTENCE VALIDATED — STAGING AND PRODUCTION PENDING — 2026-08-01**

#### Preflight and planning (complete)

- [x] Quotation-form authority reviewed
- [x] Current CTA routing audited
- [x] Exact five-step structure confirmed
- [x] Field register completed
- [x] Validation architecture approved
- [x] Prisma/MySQL persistence architecture approved
- [x] Email-delivery architecture approved
- [x] Turnstile and abuse-control architecture approved
- [x] Upload exclusion confirmed
- [x] Product Owner implementation decisions recorded
- [x] Phase 3A preflight audit accepted (2026-08-01)
- [x] Approved product categories recorded (2026-08-01)

#### Implementation (local slice complete — pending production dependencies)

- [x] Packages installed (`zod`, `react-hook-form`, `prisma`, `@prisma/client`)
- [x] Prisma schema created
- [x] Prisma schema formatted and validated
- [x] Prisma client generated
- [x] Migration SQL created and validated without application
- [x] Local MySQL configured
- [x] Database migration applied locally
- [x] Quotation route implemented (`/get-a-quote`)
- [x] Five-step quotation UI implemented
- [x] Progressive disclosure implemented
- [x] Client validation implemented
- [x] Strict server validation implemented
- [x] Review and consent step implemented
- [x] Session draft persistence implemented
- [x] Idempotency implemented
- [x] Honeypot implemented
- [x] Turnstile boundary implemented
- [x] Development email transport implemented
- [x] Provider-neutral email abstraction implemented
- [x] API Route Handler implemented
- [x] Success, validation and failure states implemented
- [x] Accessibility requirements implemented
- [x] Automated lint, typecheck and build passed
- [x] Database-backed successful quotation persistence — **PASSED — 2026-08-01 (local)**
- [x] Database-backed duplicate-idempotency test — **PASSED — 2026-08-01 (sequential replay)**
- [ ] Live Turnstile verified
- [ ] Production rate limiting complete
- [ ] Live email provider configured
- [ ] Customer email delivered through a live provider
- [ ] Internal email delivered through a live provider
- [ ] Privacy Policy implemented
- [ ] Retention period approved
- [ ] Production credentials configured
- [x] Product Owner browser validation — **PASSED — 2026-08-01**
- [ ] Production deployment

Do not mark Phase 3A production complete until database, credentials, legal content and deployment validation are resolved.

### Phase 2B / Phase 3 — Remaining deferred work

### Authority check

- [x] Implementation aligned with `docs/03_TECHNICAL_ARCHITECTURE.md`

### Documentation update

- [x] Phase 2A foundation report created
- [ ] Architecture and deployment docs updated if needed

### Git (Product Owner only)

- [ ] Product Owner commits foundation code

### Acceptance

- [x] Product Owner Phase 2A acceptance (2026-08-01)
- [x] Product Owner Phase 2B acceptance (2026-08-01)

---

## Phase 3 — Homepage

### Authority check

- [ ] All sections aligned with `docs/00_PROJECT_AUTHORITY.md` §8

### Implementation tasks

- [ ] Header and navigation
- [ ] Premium hero with proposition and CTAs
- [ ] Interactive or animated warehouse visual placeholder
- [ ] Primary quotation CTA
- [ ] Trust and capability strip
- [ ] Core services section
- [ ] How fulfilment works section
- [ ] Warehouse experience section
- [ ] Ecommerce platform compatibility section
- [ ] Customer categories section
- [ ] Operational evidence section (pending assets only where confirmed)
- [ ] Quotation CTA section
- [ ] Footer
- [ ] Automated validation passing

### Validation

- [ ] Build and lint pass
- [ ] No lorem ipsum or fabricated claims

### Browser validation

- [ ] Desktop homepage review
- [ ] All CTAs route correctly

### Mobile validation

- [ ] Mobile homepage review
- [ ] Touch targets and readability confirmed

### Documentation update

- [ ] Content register updated

### Git (Product Owner only)

- [ ] Product Owner commits homepage

### Acceptance

- [ ] Product Owner acceptance

---

## Phase 4 — Public pages

### Authority check

- [ ] Pages aligned with `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md` §3

### Implementation tasks

- [ ] Services page
- [ ] How It Works page
- [ ] Our Warehouse page (structure; media pending where required)
- [ ] About PackSendGo page
- [ ] Privacy Policy template
- [ ] Cookie Policy template
- [ ] Website Terms template
- [ ] Internal linking and navigation complete
- [ ] Automated validation passing

### Validation

- [ ] Build and lint pass
- [ ] No broken internal links

### Browser validation

- [ ] All public pages reviewed on desktop

### Mobile validation

- [ ] All public pages reviewed on mobile

### Documentation update

- [ ] Legal content status updated in asset register

### Git (Product Owner only)

- [ ] Product Owner commits public pages

### Acceptance

- [ ] Product Owner acceptance

---

## Phase 5 — Spline warehouse experience

### Authority check

- [ ] 3D scope aligned with `docs/02_DESIGN_AND_3D_AUTHORITY.md` §8–10

### Implementation tasks

- [ ] Scene storyboard approved
- [ ] Spline model created (5–7 warehouse stages)
- [ ] HTML controls for stage selection
- [ ] Camera and animation transitions
- [ ] Poster fallback before load
- [ ] Mobile fallback media
- [ ] Reduced-motion fallback
- [ ] Lazy loading implemented
- [ ] Off-screen pause where practical
- [ ] Performance review completed

### Validation

- [ ] 3D does not block essential content
- [ ] Fallbacks verified without WebGL

### Browser validation

- [ ] Desktop 3D interaction review
- [ ] Stage controls accessible

### Mobile validation

- [ ] Mobile fallback review
- [ ] Performance acceptable on mid-range device

### Documentation update

- [ ] Spline assets recorded in asset register

### Git (Product Owner only)

- [ ] Product Owner commits 3D integration

### Acceptance

- [ ] Product Owner acceptance

---

## Phase 6 — Real warehouse media

### Authority check

- [ ] Media aligned with warehouse page authority and privacy requirements

### Implementation tasks

- [ ] Filming plan approved
- [ ] Warehouse prepared for filming
- [ ] Privacy review (no customer data, PII or unauthorised branding visible)
- [ ] Photography captured for all key areas
- [ ] Images optimised (WebP/AVIF where appropriate)
- [ ] Teaser video produced
- [ ] Guided operational film or chapters (if approved)
- [ ] Captions and accessibility text
- [ ] Poster assets for video and 3D
- [ ] Optional Matterport or 360-degree tour embedded on interaction
- [ ] Mobile-optimised exports

### Validation

- [ ] All media represents real operation
- [ ] No AI-generated imagery presented as real

### Browser validation

- [ ] Warehouse page media review on desktop

### Mobile validation

- [ ] Warehouse page media review on mobile

### Documentation update

- [ ] Asset register updated with all media assets

### Git (Product Owner only)

- [ ] Product Owner commits media assets

### Acceptance

- [ ] Product Owner acceptance

---

## Phase 7 — Quotation form and MySQL

**Phase 7 status: LOCAL QUOTATION FORM AND MYSQL VALIDATED — HOSTINGER AND PRODUCTION INTEGRATIONS PENDING — 2026-08-01**

Report: `docs/phase-reports/PHASE_3B1_LOCAL_DATABASE_MIGRATION_AND_PERSISTENCE_REPORT.md` (Phase 3B1 filename; Phase 7 tracker scope)

### Authority check

- [x] Form aligned with `docs/06_QUOTATION_FORM_SPEC.md`
- [x] Data model aligned with `docs/03_TECHNICAL_ARCHITECTURE.md` §7

### Implementation tasks

- [x] Prisma schema defined
- [x] Database migration created
- [x] Multi-step form UI implemented
- [x] Client-side usability validation
- [x] Server-side authoritative validation
- [x] Turnstile integration (local boundary; live verification pending)
- [x] Quotation API endpoint
- [x] Reference generation
- [x] Success state
- [x] Error state and field-level errors
- [x] Duplicate-submission protection (sequential idempotency validated)
- [x] Automated validation passing (lint, typecheck, build)

### Validation

- [x] Test submission stores complete structured record (local API and browser)
- [x] Invalid submissions rejected safely
- [x] Local MySQL infrastructure configured and healthy
- [x] Local migration applied; Prisma migration status current
- [x] Browser and database reference match verified (`PSG-20260801-EZS2`)
- [x] Typed field persistence verified
- [x] Conditional value handling verified (including stale-hidden normalisation)
- [x] Consent persistence verified
- [x] Development notification-attempt records verified
- [x] Sequential idempotency tested
- [x] Honeypot non-persistence verified
- [x] Security-token non-persistence verified (Turnstile token, raw IP)
- [x] Synthetic test data cleaned after validation
- [x] Prisma Client generation — **PASS — 2026-08-01**
- [ ] Concurrent idempotency race test

### Browser validation

- [x] Full form flow on desktop — **PASSED — 2026-08-01 (database-backed)**
- [x] Review and consent step verified
- [x] Product Owner local browser validation — **PASSED — 2026-08-01**
- [x] Session draft cleared after successful submission

### Mobile validation

- [ ] Full form flow on mobile (local database-backed)

### Hostinger and production (incomplete)

- [ ] Hostinger MySQL provisioned
- [ ] Staging migration deployed
- [ ] Production migration deployed
- [ ] Transactional email provider configured
- [ ] Live Turnstile verified in staging/production
- [ ] Production rate limiting complete
- [ ] Privacy Policy implemented
- [ ] Retention period approved
- [ ] Staging end-to-end validation
- [ ] Production deployment validation

### Documentation update

- [x] Phase 7 local validation recorded in persistence report

### Git (Product Owner only)

- [ ] Product Owner commits quotation feature

### Acceptance

- [x] Product Owner local acceptance — **ACCEPTED WITH CONDITIONS — 2026-08-01**

Do not mark Phase 7 fully production complete until Hostinger, credentials, legal content and deployment validation are resolved.

---

## Phase 8 — Transactional email

### Authority check

- [ ] Email flow aligned with `docs/06_QUOTATION_FORM_SPEC.md` §12

### Implementation tasks

- [ ] External email provider configured
- [ ] Sender domain verification (SPF, DKIM, DMARC)
- [ ] Customer confirmation email template
- [ ] PackSendGo internal notification template
- [ ] Email dispatch on successful submission
- [ ] Failure logging to `QuoteNotificationAttempt` or equivalent
- [ ] Behaviour when email fails after database save verified
- [ ] Test emails sent and reviewed

### Validation

- [ ] Emails deliver to test inboxes
- [ ] No secrets in templates committed to Git

### Browser validation

- [ ] Success screen reflects email dispatch status appropriately

### Mobile validation

- [ ] Confirmation readable on mobile email clients

### Documentation update

- [ ] Email provider and DNS recorded in deployment plan

### Git (Product Owner only)

- [ ] Product Owner commits email integration

### Acceptance

- [ ] Product Owner acceptance

---

## Phase 9 — SEO, accessibility, security and performance

### Authority check

- [ ] Requirements aligned with `docs/00_PROJECT_AUTHORITY.md` §20

### Implementation tasks

- [ ] Page metadata on all public routes
- [ ] Sitemap generated
- [ ] `robots.txt` configured
- [ ] Structured data where applicable
- [ ] Keyboard accessibility verified
- [ ] Focus management on form steps
- [ ] Error summaries for form validation
- [ ] Reduced-motion support verified
- [ ] Content Security Policy configured
- [ ] Security headers configured
- [ ] Image and media optimisation
- [ ] Core Web Vitals review
- [ ] Automated validation passing

### Validation

- [ ] Lighthouse or equivalent audit reviewed
- [ ] CSP allows required external services only

### Browser validation

- [ ] Keyboard-only navigation test
- [ ] Screen reader spot check

### Mobile validation

- [ ] Mobile performance review

### Documentation update

- [ ] Security and CSP notes updated in deployment plan

### Git (Product Owner only)

- [ ] Product Owner commits SEO and security hardening

### Acceptance

- [ ] Product Owner acceptance

---

## Phase 10 — Hostinger deployment and launch

### Authority check

- [ ] Deployment aligned with `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md`

### Implementation tasks

- [ ] Hostinger Node.js application configured
- [ ] Environment variables set in Hostinger (no secrets in Git)
- [ ] MySQL database provisioned
- [ ] Prisma migration applied to production
- [ ] Domain DNS configured for packsendgo.com
- [ ] SSL active
- [ ] www redirect decision implemented
- [ ] Production build deployed
- [ ] Production smoke test completed
- [ ] Rollback procedure documented and understood
- [ ] Launch checklist completed

### Validation

- [ ] Production build matches approved `main`
- [ ] Database backup taken before migration

### Browser validation

- [ ] Full production walkthrough on desktop

### Mobile validation

- [ ] Full production walkthrough on mobile

### Documentation update

- [ ] Deployment plan marked complete
- [ ] Environment-variable record stored securely (not in Git)

### Git (Product Owner only)

- [ ] Product Owner merges approved release to `main`
- [ ] Product Owner triggers or confirms deployment

### Acceptance

- [ ] Product Owner launch acceptance

---

## Final release-gating checklist

All items must be complete before V1 launch acceptance:

- [ ] All V1 pages live and content-approved
- [ ] No lorem ipsum, dummy content or fabricated claims
- [ ] Quotation form submits, stores and emails successfully
- [ ] Turnstile and rate limiting active in production
- [ ] Spline and media fallbacks verified in production
- [ ] Legal pages published with Product Owner-approved content
- [ ] SSL and security headers active
- [ ] Sitemap and robots accessible
- [ ] Mobile experience validated
- [ ] Accessibility fundamentals verified
- [ ] No V1 exclusions accidentally implemented
- [ ] Rollback procedure confirmed
- [ ] Product Owner explicit V1 launch acceptance

**Git reminder:** Cursor must not run `git add`, `git commit`, `git push`, `git merge`, `git rebase` or any other Git command. The Product Owner alone performs and approves Git operations.
