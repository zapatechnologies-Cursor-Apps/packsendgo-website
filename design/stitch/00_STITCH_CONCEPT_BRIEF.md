# PackSendGo Stitch Concept Brief

## 1. Purpose

This document governs Phase 1A Google Stitch concept exploration for the PackSendGo public website.

It defines the design objectives, required outputs, content boundaries and acceptance criteria for three distinct homepage directions, supporting page concepts and preliminary design-system exploration.

Stitch output is a design source only. No Stitch screen is automatically approved for production. Final acceptance requires explicit Product Owner approval per `docs/02_DESIGN_AND_3D_AUTHORITY.md` §15.

**Authority:** `docs/00_PROJECT_AUTHORITY.md`, `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md`, `docs/02_DESIGN_AND_3D_AUTHORITY.md`, `docs/05_CONTENT_AND_ASSET_REGISTER.md`

Cursor implementation and audit tasks must follow `.cursor/rules/00-packsendgo-api-saving-governance.mdc`, including narrow scope, targeted file reads, command limits and the prohibition on Cursor Git activity.

## 2. Phase objective

Phase 1A must produce:

- Three genuinely distinct desktop homepage concepts
- A mobile homepage interpretation for each direction
- One quotation-flow concept
- One warehouse-page concept
- A preliminary design system derived from the preferred direction
- A written recommendation for which direction should progress to Phase 1B

No concept is automatically approved. Phase 1A is complete only when the Product Owner explicitly selects one direction.

## 3. Audience

The design must speak clearly to:

- New ecommerce brands
- Growing ecommerce brands
- Online retailers
- Marketplace sellers
- Subscription businesses
- Importers
- Wholesalers
- Established businesses changing fulfilment provider

The site is a public marketing and lead-generation website. It is not a customer fulfilment platform, portal or dashboard.

## 4. Customer questions the design must answer

Within approximately thirty seconds on the homepage, a visitor should understand:

1. What does PackSendGo do?
2. Can it handle my type of business?
3. What happens to my stock?
4. How does the fulfilment process work?
5. Can I trust the warehouse?
6. How do I request a quotation?
7. What happens after I submit my details?

## 5. Homepage information hierarchy

Every homepage concept must include these sections in a logical order. Section treatment may vary by direction, but none may be omitted without Product Owner approval.

| Order | Section | Notes |
| --- | --- | --- |
| 1 | Header | Minimal navigation; clear brand mark placeholder |
| 2 | Premium hero | Proposition, supporting copy; must communicate offer before 3D loads |
| 3 | Primary and secondary CTAs | Get a tailored quote; Tour our warehouse |
| 4 | Stylised Spline warehouse placeholder | Integrated with or immediately following hero; primary dimensional hero experience; design placeholder only — not production 3D |
| 5 | Trust and capability strip | Structural placeholders only until assets confirmed |
| 6 | Core services | Approved public marketing categories only; curated subset permitted |
| 7 | How fulfilment works | Process from stock receipt to dispatch |
| 8 | Real warehouse evidence | Separate section: photography, video, Matterport or 360-degree placeholders; assets pending |
| 9 | Ecommerce-platform support area | Platform names may appear; no live-integration claim |
| 10 | Customer categories | Audience types from scope document |
| 11 | Operational proof placeholders | **PENDING OPERATIONAL CONFIRMATION** — no fabricated statistics |
| 12 | Quotation CTA | Repeat conversion path before footer |
| 13 | Footer | Legal links, structural contact placeholders |

**Placement rules:**

- The stylised Spline visual is the **primary dimensional hero experience** and must appear as part of the hero composition or immediately after the hero and CTAs.
- The later **real warehouse evidence** section (order 8) is separate trust content using photography, video, Matterport or 360-degree media — not a second stylised 3D experience.
- Concepts must **not** introduce two competing stylised warehouse experiences on the homepage.
- The hero must still communicate the proposition when the 3D asset has not loaded (poster fallback, readable copy and CTAs).

**Pending content labels:**

- Operational statistics: `PENDING OPERATIONAL CONFIRMATION`
- Testimonials: `PENDING PRODUCT OWNER INPUT`
- Partner or courier logos: `PENDING OPERATIONAL CONFIRMATION`
- Contact details: `PENDING PRODUCT OWNER INPUT`

## 6. Core service presentation

Use only approved public marketing categories from `docs/00_PROJECT_AUTHORITY.md` §9:

- Ecommerce fulfilment
- Warehousing and storage
- Goods-in processing
- Inventory storage
- Pick and pack
- Parcel dispatch
- Returns processing
- Branded packaging
- Labelling and barcoding
- Marketplace fulfilment
- UK delivery
- International delivery

Detailed operational availability for each service remains `PENDING OPERATIONAL CONFIRMATION`. Concepts may describe outcomes and capabilities in principle; they must not imply confirmed operational delivery, courier relationships or integrations.

Quotation-form-only options (e.g. Inserts, Bundling) must not be presented as public marketing service claims.

## 7. 3D hero requirements

The hero must reserve space for a stylised Spline warehouse experience to be implemented in a later phase. Per §5, this placeholder is integrated with or immediately follows the hero and CTAs — it is not a separate mid-page stylised experience.

Stitch concepts must use a **designed placeholder** — not pretend Stitch output is the production 3D implementation.

The placeholder must communicate:

| Element | Requirement |
| --- | --- |
| Composition | Intended frame, aspect ratio and visual weight |
| Camera angle | Elevated cutaway or controlled isometric view |
| Lighting | Dark-led; restrained cobalt and warm operational accents |
| Warehouse zones | Goods in, storage, picking, packing, dispatch |
| UI controls | HTML-style stage selectors adjacent to visual (Goods in, Store, Pick, Pack, Send) |
| Text placement | All essential copy outside the visual boundary |
| Loading poster | Static image state before interactive load |
| Mobile fallback | Static poster or lightweight video loop; no WebGL dependency |

The hero must not depend on the 3D scene to communicate the service. Proposition and CTAs must remain fully readable without interaction.

## 8. Warehouse-page requirements

The warehouse-page concept must support:

- Real warehouse photography placeholders (assets `PENDING OPERATIONAL CONFIRMATION`)
- Guided walkthrough preview area
- Optional Matterport or 360-degree tour embed zone (loads on user interaction only)
- Operational sections: goods-in, storage, picking, packing, dispatch, returns
- Security and operational evidence placeholders (no fabricated claims)
- Quotation CTA at page end

Before filming or photography, the real warehouse must be clean, organised, safely presented and free from customer data or unauthorised branding per design authority.

## 9. Quotation-flow requirements

Design approximately five steps aligned with `docs/06_QUOTATION_FORM_SPEC.md`:

| Step | Title |
| --- | --- |
| 1 | Contact and company |
| 2 | Business and sales channels |
| 3 | Orders and stock |
| 4 | Delivery and additional requirements |
| 5 | Review and consent |

The flow must include:

- Clear progress indicator
- Mobile-first form controls
- Plain language labels
- "I'm not sure" options on range fields
- No account requirement
- No instant-price or binding-quote promise
- Accessible error and success states
- Privacy consent and optional marketing consent as separate fields

## 10. Motion direction

### Approved

- Slow ambient movement in 3D placeholder
- Controlled warehouse-stage transitions
- Process-line progression
- Subtle depth on hover
- Section reveals on scroll
- Button feedback
- Form-step transitions

### Avoid

- Scroll hijacking
- Excessive parallax
- Constant decorative movement
- Fast zooming
- Cursor-following effects
- Autoplay audio
- Motion that delays or hides essential content

Performance has authority over decorative complexity.

## 11. Desktop requirements

- Strong first-screen proposition visible immediately
- Primary CTA visible without scrolling
- Large warehouse visual with clear hierarchy
- Clear navigation (Home, Services, How It Works, Our Warehouse, About, Get a Quote)
- Spacious content hierarchy with generous whitespace
- No excessive card grids or badge clutter
- No dashboard, portal or SaaS appearance

## 12. Mobile requirements

- Conversion CTA visible early in the viewport
- Text presented before heavy media loads
- Static or video warehouse fallback instead of full 3D
- No horizontal overflow
- No tiny tap targets (minimum 44px touch targets)
- No essential hover-only interaction
- Shorter content blocks with clear section breaks
- Clear quotation flow with thumb-friendly controls
- Performance-first layout decisions

## 13. Accessibility requirements

- Strong colour contrast (target WCAG 2.1 AA)
- Keyboard-accessible navigation and form controls
- Visible focus states
- Semantic heading hierarchy (H1–H3)
- Normal HTML text outside any 3D canvas
- Reduced-motion alternative layouts indicated
- Useful media alternatives (poster, still image, captions)
- No meaning conveyed by colour alone

## 14. Prohibited concept content

Concepts must not include:

- Fabricated statistics or performance claims
- Fabricated testimonials or customer logos
- Unsupported courier or carrier logos
- Unsupported platform-integration claims (live API)
- Fake warehouse photographs presented as real
- Lorem ipsum
- Placeholder addresses, telephone numbers or emails shown as real
- Fake pricing or instant-quote promises
- AI quotation or chatbot promises
- Customer dashboards, portals or login screens
- Live tracking or inventory displays
- Online payment flows
- Copied third-party website layouts
- Cartoon or science-fiction warehouse styling

## 15. Required Stitch outputs

For each of the three homepage directions, export:

| Output | Format | Notes |
| --- | --- | --- |
| Desktop homepage | Full-page screenshot or Stitch export | 1440px width minimum |
| Mobile homepage | Full-page screenshot or Stitch export | 390px width reference |
| Hero detail | Cropped export | Showing placeholder, CTAs and typography |
| 3D placeholder detail | Cropped export | Showing zones, controls and poster state |
| Navigation and footer | Cropped export | For handoff reference |

Additional required outputs:

| Output | Scope |
| --- | --- |
| Quotation flow | All five steps, desktop and mobile |
| Warehouse page | Desktop and mobile |
| Design-system extraction | From preferred direction only |
| Stitch project reference | URL or project ID recorded in review scorecard |

Store exports in `design/exports/` or approved project location. Do not commit large raw files without Product Owner approval.

## 16. Acceptance criteria

Phase 1A concept exploration is accepted when:

1. Three genuinely distinct desktop homepage concepts are produced and exported.
2. Mobile interpretations exist for each direction.
3. Quotation-flow and warehouse-page concepts are produced.
4. Preliminary design-system extraction is completed for the preferred direction.
5. Concept review scorecard is completed with weighted scores.
6. One direction is explicitly selected by the Product Owner.
7. Required revisions are documented before Phase 1B begins.
8. No prohibited content appears in any export.
9. No fabricated business facts, statistics or operational claims are shown as real.
10. Product Owner records acceptance date in `design/stitch/02_CONCEPT_REVIEW_SCORECARD.md`.

Only the Product Owner may accept Phase 1A.

## Approved working copy

All copy remains subject to final Product Owner approval.

| Element | Working copy |
| --- | --- |
| Primary proposition | From shelf to doorstep, handled. |
| Supporting proposition | Flexible ecommerce fulfilment, warehousing, pick and pack, and dispatch for growing brands. |
| Brand line | Store. Pack. Send. Grow. |
| Primary CTA | Get a tailored quote |
| Secondary CTA | Tour our warehouse |
