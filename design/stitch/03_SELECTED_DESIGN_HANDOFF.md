# PackSendGo Selected Design Handoff

## 1. Document purpose

This document records the approved Stitch design-to-code handoff for PackSendGo Website V1 homepage implementation.

It captures the surviving Stitch project resources, locked visual and content authority, approved implementation deviations and assets still required before production.

This is a documentation artefact only. It does not authorise implementation acceptance.

## 2. Authority and precedence

Where instructions conflict, use this order:

1. Latest explicit Product Owner instruction
2. `docs/00_PROJECT_AUTHORITY.md`
3. Approved phase specification
4. `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md`
5. `docs/02_DESIGN_AND_3D_AUTHORITY.md`
6. This handoff document
7. Stitch screen output
8. Implementation-agent inference

The surviving Stitch homepage screen is the **layout and visual-composition authority** for the desktop homepage.

The separate Three.js Stitch screen is **not** embedded in that homepage crop. Cursor must embed the Three.js scene as the full hero background during implementation.

## 3. Exact Stitch project reference

| Field | Value |
| --- | --- |
| Project resource name | `projects/4066494508265032545` |
| Project ID | `4066494508265032545` |
| Project title | PackSendGo - Phase 1A Concepts |
| Project type | `PROJECT_DESIGN` |
| Origin | `STITCH` |
| Visibility | `PUBLIC` |
| Created | `2026-08-01T12:22:04.435309Z` |
| Last updated | `2026-08-01T14:43:54.825872Z` |
| Project thumbnail file | `projects/4066494508265032545/files/860af2f798c2429eaaae83fa8ff2299e` |

## 4. Exact surviving homepage screen reference

After Product Owner deletion of rejected concepts, `list_screens` returns **three** screens. The sole surviving homepage design is identified unambiguously:

| Field | Value |
| --- | --- |
| Screen resource name | `projects/4066494508265032545/screens/f850fd8d653d41c8b8958f00ddaea79f` |
| Screen ID | `f850fd8d653d41c8b8958f00ddaea79f` |
| Title | PackSendGo — Final Desktop Master V3 |
| Device type | `DESKTOP` |
| Dimensions | 2560 × 13304 px |
| Identification basis | Only desktop full-page homepage composition remaining; title confirms final master revision |

### Other surviving screens (not homepage)

| Screen ID | Title | Role |
| --- | --- | --- |
| `d7229de0d31345ecb11e475ae8a1020b` | Three.js | Separate warehouse hero asset |
| `89383fcba01d44c4999016678e664b5d` | PackSendGo Logo with Parcel Mark | Logo reference asset |

All other historical concept screens remain in project metadata as hidden instances but are **not** returned by `list_screens` and must not be implemented.

## 5. Exact Three.js asset reference

| Field | Value |
| --- | --- |
| Screen resource name | `projects/4066494508265032545/screens/d7229de0d31345ecb11e475ae8a1020b` |
| Screen ID | `d7229de0d31345ecb11e475ae8a1020b` |
| Title | Three.js |
| Dimensions | 512 × 512 px (canvas source); project instance resized to 768 × 1024 |
| HTML file resource | `projects/4066494508265032545/files/2e747688aeb642538e58bf730639337a` |
| MIME type | `text/html` |
| Screenshot | Not exposed in current retrieval |

**Implementation note:** This asset is a standalone Three.js warehouse scene. It is **not** part of the homepage Stitch crop. Cursor must integrate it as the full-screen hero background behind headline and CTAs.

## 6. Exact Dark Industrial Elegance palette reference

| Field | Value |
| --- | --- |
| Design system resource name | `assets/de64b70122504dc6b5c12ce0795dddb6` |
| Display name | Dark Industrial Elegance |
| Version | `1` |
| Project instance type | `DESIGN_SYSTEM_INSTANCE` |
| Colour mode | `DARK` |
| Colour variant | `FIDELITY` |
| Headline font | Playfair Display (`PLAYFAIR_DISPLAY`) |
| Body font | Geist (`GEIST`) |
| Label font | Geist (`GEIST`) |

### Override colour roles (authoritative)

| Role | Hex |
| --- | --- |
| Primary / midnight graphite | `#121417` |
| Neutral / deep charcoal | `#1c1f24` |
| Secondary / electric cobalt | `#2e5bff` |
| Tertiary / signal lime | `#d1ff26` |
| Background surface | `#101418` |
| On-surface (warm ivory equivalent) | `#e1e2e9` |
| On-surface variant (muted steel equivalent) | `#c6c6ca` |
| Secondary container (cobalt emphasis) | `#0043eb` |
| Tertiary fixed (signal lime bright) | `#c6f311` |

### Spacing tokens

| Token | Value |
| --- | --- |
| `container-max` | 1280px |
| `gutter` | 32px |
| `margin-desktop` | 80px |
| `margin-mobile` | 24px |
| `section-gap` | 160px (80px mobile per design system guidance) |
| `stack-sm` | 8px |
| `stack-md` | 16px |
| `stack-lg` | 24px |

The design system also carries embedded `designMd` YAML with full colour, typography and spacing definitions. Project-level `designTheme` mirrors this palette on the Stitch project record.

## 7. Available image, HTML and preview references

### Homepage (`f850fd8d653d41c8b8958f00ddaea79f`)

| Asset type | Resource name | Notes |
| --- | --- | --- |
| Screenshot | `projects/4066494508265032545/screens/f850fd8d653d41c8b8958f00ddaea79f/fileEntries/screenshot` | FIFE preview URL available via Stitch MCP |
| HTML export | `projects/4066494508265032545/screens/f850fd8d653d41c8b8958f00ddaea79f/fileEntries/html` | `text/html`; download URL available via Stitch MCP |

### Three.js (`d7229de0d31345ecb11e475ae8a1020b`)

| Asset type | Resource name | Notes |
| --- | --- | --- |
| HTML export | `projects/4066494508265032545/files/2e747688aeb642538e58bf730639337a` | `text/html`; contains Three.js scene source |
| Screenshot | Not returned | Use HTML retrieval or export during implementation phase |

### Logo (`89383fcba01d44c4999016678e664b5d`)

| Asset type | Resource name | Notes |
| --- | --- | --- |
| Screenshot | `projects/4066494508265032545/screens/89383fcba01d44c4999016678e664b5d/fileEntries/screenshot` | 1024 × 1024 reference |
| HTML export | Not exposed | Production SVG or component required |

### Design system (`assets/de64b70122504dc6b5c12ce0795dddb6`)

| Asset type | Notes |
| --- | --- |
| Theme tokens | Full `namedColors`, `typography`, `spacing` and `designMd` available via Stitch MCP |
| Style guidelines | Component, elevation, shape and layout guidance embedded in design system record |

**Retrieval policy:** Download URLs are time-limited Stitch MCP references. Re-fetch via Stitch MCP during implementation; do not commit raw HTML exports without Product Owner approval.

## 8. Locked brand direction

- Premium **Dark Industrial Elegance**
- Apple-grade restraint and hierarchy
- Midnight graphite and deep charcoal surfaces
- Warm ivory primary text
- Muted steel secondary text
- Electric cobalt route and focus accents
- Signal lime for primary quotation CTAs and selected states
- Mostly sharp geometry with restrained small radii where helpful
- Calm, operational, premium — not a generic logistics template or SaaS dashboard

## 9. Locked typography

| Use | Family | Key styles |
| --- | --- | --- |
| Editorial headings | Playfair Display | `headline-xl` 72/84px −0.02em; `headline-xl-mobile` 40/48px; `headline-lg` 48/56px; `headline-md` 32/40px |
| Body, navigation, controls | Geist | `body-lg` 18/32px; `body-md` 16/28px |
| Labels and buttons | Geist | `label-caps` 12/16px 0.1em tracking; `button-text` 14/20px 600 |

## 10. Locked colour roles

| Role | Application |
| --- | --- |
| Midnight graphite `#121417` | Primary page canvas |
| Deep charcoal `#1c1f24` | Secondary surfaces, cards |
| Warm ivory `#e1e2e9` / `#F5F5F0` | Primary text |
| Muted steel `#c6c6ca` / `#94A3B8` | Secondary text, dividers |
| Electric cobalt `#2e5bff` | Route lines, focus rings, technical accents |
| Signal lime `#d1ff26` | Primary CTA fill, critical path accents |
| Tonal layering | Depth via surface tiers, not soft shadows |

Signal lime must not dominate the interface.

## 11. Logo variant and parcel-mark requirements

Production must prepare:

| Variant | Use |
| --- | --- |
| Lime PackSendGo wordmark | Preferred default where contrast remains excellent |
| White PackSendGo wordmark | Dark backgrounds |
| Black PackSendGo wordmark | Light backgrounds |

**Parcel mark:** Small refined 2D or pseudo-3D parcel mark above and to the right of the final `o` in `Go`.

Reference screen: `89383fcba01d44c4999016678e664b5d` (PackSendGo Logo with Parcel Mark).

**Motion:** Parcel mark may rotate subtly on load, hover or focus. Must respect `prefers-reduced-motion`.

## 12. Theme requirements

The production site must support:

| Mode | Behaviour |
| --- | --- |
| System | Default — follows OS preference |
| Light | Visitor override |
| Dark | Visitor override |

Visitor preference must persist across sessions.

Stitch design system is dark-led. Light theme must be derived from the same token roles without inventing a separate visual direction.

## 13. Approved homepage order

1. Header
2. Full-screen Three.js hero
3. Core Capabilities
4. How PackSendGo Works
5. Virtual Warehouse Tour
6. Built Around the Way You Sell
7. Built for Brands at Every Stage
8. Your Fulfilment Plan, Clearly Defined
9. Final Tailored Quote CTA
10. Footer

**Removed:** The duplicate service rail beneath the hero is **not** part of the approved composition.

## 14. Section-by-section design requirements

### Header (`SiteHeader`)

- Minimal navigation: Home, Services, How It Works, Our Warehouse, About, Get a Quote
- `PackSendGoLogo` with parcel mark
- `ThemeMenu` for system / light / dark
- Sticky or elevated treatment per Stitch crop

### Full-screen Three.js hero (`Hero` + `WarehouseHeroScene`)

See §15.

### Core Capabilities (`CoreCapabilities`)

Interactive editorial showcase with one active panel:

1. Ecommerce fulfilment
2. Warehousing and storage
3. Pick and pack
4. Parcel dispatch
5. Returns processing

- Desktop: auto-rotate every 6–8 seconds; pause after user interaction
- Mobile: swipeable or manually controlled single-panel experience
- No unnecessary numbering

### How PackSendGo Works (`HowItWorks`)

Compact five-stage process block — all five visible in one desktop composition:

1. Plan your setup
2. Send us your stock
3. We receive and store
4. We pick and pack
5. We dispatch

- Mobile: compact accordion or swipe stepper
- Do not claim native store integration

### Virtual Warehouse Tour (`WarehouseTour`)

- One full-colour cinematic media frame
- Reserved for future real warehouse photography, guided video, Matterport or 360-degree walkthrough
- Chapters: Goods in, Storage, Picking, Packing, Dispatch, Returns
- Do not use black-and-white imagery with colour hover
- Do not present generated warehouse imagery as the real PackSendGo facility

### Built Around the Way You Sell (`SalesChannels`)

High-contrast treatments for: Shopify, WooCommerce, Amazon, eBay, TikTok Shop, Etsy.

Required disclaimer:

> Channel connectivity is confirmed during onboarding. Displaying a platform does not imply a direct native integration.

Linnworks and similar back-office software are not part of V1 website implementation.

### Built for Brands at Every Stage (`CustomerCategories`)

Include:

- Launching and growing ecommerce brands
- Marketplace and multichannel sellers
- Subscription and repeat-order businesses
- Importers, wholesalers and established retailers

### Your Fulfilment Plan, Clearly Defined (`OperationalCommitments`)

Use operational commitment areas:

- Storage plan
- Dispatch cut-off
- Accuracy controls
- Delivery coverage
- Security
- Insurance

Coverage authority:

- UK is the primary delivery market
- European delivery may be arranged
- Do not claim global delivery

Do not invent statistics, guarantees or capacities.

### Final Tailored Quote CTA (`QuoteCallToAction`)

Copy:

> Tell us what you need. We'll build the fulfilment plan around your business.

Include:

> No account required. No instant or binding pricing.

### Footer (`SiteFooter`)

Legal links, structural contact placeholders until Product Owner supplies confirmed details.

## 15. Three.js hero behaviour

The `WarehouseHeroScene` must:

| Requirement | Detail |
| --- | --- |
| Coverage | Full hero background behind headline and CTAs |
| Readability | Graphite gradient and vignette over scene |
| Warehouse character | Realistic human-operated warehouse; no robotic or futuristic styling |
| Route accent | Sharp signal-lime fulfilment route |
| Parcel motion | Small lime parcel box moving along route |
| Camera | No constant whole-scene rotation |
| Performance | Pause or reduce work when off-screen |
| Accessibility | Respect `prefers-reduced-motion` |
| Mobile fallback | Video or poster fallback for weaker devices |
| Content | All essential text outside the canvas |

**Hero copy:** `From shelf to doorstep, handled.`

**Primary CTA:** `Get a tailored quote`

**Secondary CTA:** `Tour our warehouse`

**What Stitch shows:** Homepage crop may include a hero placeholder or partial visual treatment.

**What Cursor must add:** Embed the separate Three.js screen (`d7229de0d31345ecb11e475ae8a1020b`) as the live full-screen hero background, with gradient overlay, fallbacks and performance controls.

## 16. Desktop interaction requirements

- Primary CTA visible without scrolling
- Core Capabilities panel rotation 6–8s with interaction pause
- How It Works: all five stages visible in compact composition
- Hover depth restrained; no scroll hijacking
- Keyboard-accessible navigation and controls
- Visible focus states using cobalt accent

## 17. Mobile behaviour

- Conversion CTA visible early in viewport
- Text before heavy media loads
- Three.js replaced by poster or lightweight video on constrained devices
- Core Capabilities: swipe or manual panel control
- How It Works: accordion or swipe stepper
- Minimum 44px touch targets
- No horizontal overflow
- Section gaps reduced per design system (80px vs 160px desktop)

## 18. Accessibility and reduced-motion requirements

- Target WCAG 2.1 AA colour contrast
- Semantic heading hierarchy
- All essential copy in HTML outside canvas
- `prefers-reduced-motion`: disable or replace parcel rotation, panel auto-rotation and intensive 3D rendering
- Poster and still-image fallbacks when WebGL unavailable
- Keyboard operability for theme menu, navigation, capability panels and CTAs

## 19. Content restrictions

- No lorem ipsum in production
- No fabricated statistics, testimonials or customer logos
- No placeholder contact details presented as real
- No instant or binding pricing promises
- Approved working copy subject to final Product Owner approval
- Operational facts marked `PENDING OPERATIONAL CONFIRMATION` until confirmed

## 20. Unsupported-claim restrictions

Do not claim or imply:

- Native ecommerce platform API integrations
- Global delivery coverage
- Live inventory, tracking or carrier integrations
- Automatic or binding quotation pricing
- Customer accounts, dashboards or portals
- AI quotation or chatbot features in V1

Platform names are display labels only unless separately confirmed.

## 21. Approved implementation deviations from the Stitch crop

| Item | Stitch shows | Cursor must implement |
| --- | --- | --- |
| Hero 3D | Placeholder or partial treatment in homepage HTML | Full-screen Three.js from separate asset screen |
| Hero service rail | May appear in crop beneath hero | **Remove** — not in approved order |
| Mobile homepage | No dedicated mobile screen in surviving set | Responsive implementation from desktop authority + mobile rules in this document |
| Logo | Reference screenshot only | Production SVG/component with three colour variants |
| Warehouse tour media | Placeholder frame | Reserved structure; real media pending |
| Theme switcher | May not appear in Stitch crop | System / light / dark with persistence |
| Light theme | Not fully designed in Stitch | Token-derived from Dark Industrial Elegance palette |
| Spline (authority doc) | `docs/02` references Spline as preferred V1 tech | **Product Owner override:** Three.js hero per this handoff takes precedence for homepage hero |

## 22. Assets still required

| Asset | Status |
| --- | --- |
| Production logo SVGs (lime, white, black) with parcel mark | Pending export from Stitch reference |
| Three.js scene production bundle | Pending extraction from Stitch HTML asset |
| Mobile homepage Stitch screen | Not in surviving set — implement from rules |
| Real warehouse photography and video | Pending operational capture |
| Matterport or 360 tour | Pending |
| Confirmed contact details | Pending Product Owner input |
| Legal page content | Pending |
| Favicon and OG image set | Pending |
| Hero poster and mobile video fallback | Pending generation from Three.js scene |

## 23. Product Owner acceptance status

| Item | Status |
| --- | --- |
| Phase 1A concept selection recorded in scorecard | `PENDING PRODUCT OWNER INPUT` |
| Phase 1B design system acceptance | `PENDING PRODUCT OWNER INPUT` |
| This handoff document acceptance | `PENDING PRODUCT OWNER INPUT` |
| Acceptance date | `PENDING PRODUCT OWNER INPUT` |

Implementation existence does not equal acceptance.

## 24. Stitch-to-Cursor implementation authority

Cursor must:

1. Implement homepage layout and section composition from `f850fd8d653d41c8b8958f00ddaea79f`
2. Apply tokens from `assets/de64b70122504dc6b5c12ce0795dddb6`
3. Integrate Three.js from `d7229de0d31345ecb11e475ae8a1020b` as full-screen hero background
4. Build logo from `89383fcba01d44c4999016678e664b5d` reference
5. Follow approved homepage order and deviations in §21
6. Not reinterpret the visual direction without Product Owner authority

Cursor must not:

- Run Git commands
- Claim phase acceptance on behalf of the Product Owner
- Introduce unsupported integrations or operational claims
- Embed duplicate hero service rail
- Present generated warehouse imagery as real PackSendGo facilities

---

**Document created:** 1 August 2026  
**Stitch retrieval date:** 1 August 2026  
**Branch context:** `feature/frontend-foundation`
