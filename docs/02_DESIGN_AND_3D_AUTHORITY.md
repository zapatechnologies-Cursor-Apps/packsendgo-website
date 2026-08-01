# PackSendGo Design and 3D Authority

## 1. Design objective

Create an original, premium and high-converting visual identity for PackSendGo.

The visual experience should make warehouse fulfilment feel modern, controlled, elegant and easy to understand.

It should not imitate any single reference website.

## 2. Visual character

Approved visual characteristics:

- Dark-led
- Precise
- Spacious
- Dimensional
- High trust
- Technically advanced
- Operational
- Calm
- Premium
- Human where real photography is used

## 3. Working palette

The exact colour values are approved via the **Dark Industrial Elegance** design system (`assets/de64b70122504dc6b5c12ce0795dddb6`) and recorded in `design/stitch/03_SELECTED_DESIGN_HANDOFF.md`.

Working colour roles:

- Midnight graphite: primary background
- Deep charcoal: secondary surface
- Warm ivory: primary text
- Muted steel: secondary text
- Electric cobalt: interaction and technology accent
- Signal lime: restrained conversion and operational accent
- Soft grey: borders and dividers

Signal lime must not dominate the interface.

## 4. Typography

The design shall use:

- A modern sans-serif family
- Strong editorial headings
- Readable body text
- Clear numerical display styles
- Restrained weight variation
- Generous line spacing
- Strong mobile legibility

Approved typefaces (Product Owner accepted 1 August 2026):

- **Playfair Display** — editorial headings
- **Geist** — body text, navigation, labels and controls

Candidate alternatives remain available for non-homepage pages only if separately approved.

## 5. Layout principles

The interface shall use:

- Generous spacing
- Clear content hierarchy
- Large visual moments
- Restrained card usage
- Clear conversion paths
- Strong section separation
- Responsive layouts
- Consistent grids
- Minimal navigation
- Simple form progression

The design shall avoid:

- Crowded service grids
- Excessive badges
- Excessive pills
- Excessive glassmorphism
- Multiple competing CTAs
- Unnecessary carousels
- Small text
- Generic stock-photo hero layouts

## 6. Motion principles

Motion must explain, orient or confirm.

Approved motion includes:

- Subtle text and section reveals
- Process-line progression
- Warehouse-stage transitions
- Button feedback
- Form-step transitions
- Restrained hover depth
- Parcel route movement
- Slow ambient 3D motion

Disallowed motion includes:

- Constant decorative movement
- Fast parallax
- Scroll hijacking
- Excessive cursor effects
- Autoplay audio
- Motion that hides content
- Animation that blocks form use
- Animation that causes layout instability

## 7. Homepage hero authority

The selected Stitch homepage screen **PackSendGo — Final Desktop Master V3** (`projects/4066494508265032545/screens/f850fd8d653d41c8b8958f00ddaea79f`) is the sole **layout and visual-composition authority** for the homepage.

The separate Stitch Three.js asset (`projects/4066494508265032545/screens/d7229de0d31345ecb11e475ae8a1020b`) is **not** embedded in that crop. Cursor must embed and adapt that asset as the **full hero background** during implementation.

**Three.js** is the approved technology for the PackSendGo homepage hero (Product Owner accepted 1 August 2026). This decision supersedes any earlier homepage-hero reference to Spline in this document or `docs/00_PROJECT_AUTHORITY.md`.

The hero should include:

- Clear PackSendGo proposition
- Concise supporting copy
- Primary quotation CTA (`Get a tailored quote`)
- Secondary warehouse-tour CTA (`Tour our warehouse`)
- Full-screen Three.js warehouse scene as background
- Graphite readability gradient and vignette over the scene
- Immediate loading fallback (poster or lightweight video)
- Visible trust cue
- Responsive mobile composition

Essential hero copy and CTAs must remain **HTML outside the canvas** for accessibility, SEO and non-WebGL fallback.

The hero must not depend on the 3D scene to communicate the service.

The duplicate service strip immediately below the hero in earlier concepts is **not** part of the approved composition and must not be implemented.

No generated warehouse imagery may be presented as PackSendGo's real facility.

## 8. Stylised 3D warehouse

### 8.1 Homepage hero — Three.js (approved)

The homepage hero uses **Three.js**, not Spline.

The separate Stitch Three.js asset is the **interaction and visual-behaviour reference** for the hero scene. Cursor must adapt it for production; do not iframe Stitch URLs.

The scene must:

- Cover the **complete hero background** behind headline and CTAs
- Present a realistic human-operated warehouse environment
- Include a sharp **signal-lime route line**
- Include a small **signal-lime parcel box** moving along that route
- Restrain whole-scene rotation — no constant spinning
- Respect `prefers-reduced-motion`
- Pause or reduce rendering when the hero is outside the viewport
- Provide a simplified scene, video or poster fallback on mobile and weaker devices
- Preserve hero readability and conversion when WebGL is unavailable

### 8.2 Other stylised 3D experiences — Spline (conditional)

**Spline is not authorised for the homepage hero.**

Spline may only be considered for a **future non-hero experience** following explicit Product Owner approval. No Spline homepage-hero implementation may proceed under this authority.

Where a future approved non-hero Spline experience is commissioned, the scene should present an elegant warehouse cutaway or controlled isometric environment.

Candidate zones:

1. Goods in
2. Inspection
3. Storage
4. Picking
5. Packing
6. Dispatch
7. Returns

The scene may include:

- Warehouse structure
- Racking
- Pallets
- Cartons
- Packing benches
- Scanners
- Dispatch doors
- Delivery vehicle
- Route indicators
- Parcel movement
- Subtle operational lighting

The scene shall avoid:

- Cartoon characters
- Unrealistic warehouse machinery
- Excessive robotics
- Futuristic science-fiction styling
- Third-party logos
- Fake operational data
- Large texture files
- Unnecessary reflections
- Continuous intensive rendering

## 9. 3D interaction

Normal HTML controls shall operate the scene.

Example controls:

- Goods in
- Store
- Pick
- Pack
- Send

Selecting a control may:

- Move the camera
- Highlight a zone
- Trigger a short animation
- Update an adjacent explanation
- Display a relevant operational benefit

Text must remain outside the canvas for accessibility and search visibility.

## 10. 3D performance requirements

The implementation shall:

- Lazy-load the scene
- Display a poster immediately
- Provide a loading state
- Use reusable models
- Reduce geometry
- Compress textures
- Limit lighting complexity
- Pause or reduce rendering when off-screen
- Provide mobile fallback media
- Respect reduced-motion settings
- Retain working content when JavaScript or WebGL is unavailable

Performance has authority over decorative complexity.

## 11. Real warehouse experience

The Warehouse page should use real evidence.

Approved media types:

- Photography
- Short teaser video
- Guided operational film
- Matterport tour
- 360-degree tour
- Stage-based video chapters

The real warehouse experience should show:

- Goods receipt
- Stock checking
- Storage
- Picking
- Packing
- Dispatch
- Returns
- Security or quality controls where appropriate

Before filming, the warehouse should be:

- Clean
- Organised
- Safely presented
- Properly lit
- Free from exposed customer data
- Free from unauthorised branding
- Free from visible personal information
- Operationally representative

## 12. Stitch authority

Google Stitch was used for Phase 1A design exploration and approved interface generation.

Phase 1A and Phase 1B are **accepted** (1 August 2026). **No further Stitch concept generation or refinement is authorised.**

The surviving Stitch resources are:

| Resource | ID |
| --- | --- |
| Project | `projects/4066494508265032545` |
| Selected homepage | `projects/4066494508265032545/screens/f850fd8d653d41c8b8958f00ddaea79f` |
| Three.js hero asset | `projects/4066494508265032545/screens/d7229de0d31345ecb11e475ae8a1020b` |
| Logo reference | `projects/4066494508265032545/screens/89383fcba01d44c4999016678e664b5d` |
| Design system | `assets/de64b70122504dc6b5c12ce0795dddb6` |

All rejected Stitch concepts have been deleted.

Stitch output is a design source, not automatic production authority. The selected homepage screen is composition authority; remaining responsive, theme, accessibility and interaction refinements will be completed in code.

## 13. Stitch-to-Cursor handoff

The approved handoff is recorded in:

- `design/stitch/03_SELECTED_DESIGN_HANDOFF.md`
- `design/stitch/04_FRONTEND_FOUNDATION_PREFLIGHT_AUDIT.md`
- `design/stitch/02_CONCEPT_REVIEW_SCORECARD.md`

Before implementation, preserve:

- Stitch project and screen references (see §12)
- Approved screenshots and exported design files
- Design tokens from Dark Industrial Elegance
- Colour values, typography and spacing
- Component list and motion notes
- Asset register
- Acceptance record

**Approved implementation deviation:** The selected Stitch crop does not contain the Three.js hero. During implementation, the separate Three.js asset must replace the crop's static hero treatment and become the full hero background.

Cursor must implement against these approved materials.

Cursor must not reinterpret the design direction without authority.

## 14. Reference-image rule

Third-party references may be used to communicate:

- Mood
- Lighting
- Spacing
- Depth
- Composition
- Typography scale
- Interaction style

They must not be copied directly.

PackSendGo must use an original layout, original 3D environment and original visual identity.

## 15. Design acceptance

A design phase is accepted only after:

- Desktop review
- Mobile review
- Content hierarchy review
- Conversion-path review
- Accessibility review
- 3D feasibility review
- Performance-risk review
- Product Owner approval

No implementation may begin solely because Stitch produced a usable screen.
