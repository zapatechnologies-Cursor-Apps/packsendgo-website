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

The exact colour values remain subject to Stitch exploration and Product Owner approval.

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

Candidate typefaces may include:

- Geist
- Manrope
- Inter
- Plus Jakarta Sans

The final choice requires Product Owner approval.

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

The hero should include:

- Clear PackSendGo proposition
- Concise supporting copy
- Primary quotation CTA
- Secondary warehouse-tour CTA
- Stylised warehouse visual
- Immediate loading fallback
- Visible trust cue
- Responsive mobile composition

The hero must not depend on the 3D scene to communicate the service.

## 8. Stylised 3D warehouse

Spline is the preferred V1 implementation technology.

The scene should present an elegant warehouse cutaway or controlled isometric environment.

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

Google Stitch shall be used for design exploration and approved interface generation.

The initial Stitch phase shall produce:

- Three distinct homepage directions
- Desktop compositions
- Mobile compositions
- Quote-flow concept
- Warehouse-page concept
- Core design system
- Component direction

Only one approved direction shall progress into full-page design.

Stitch output is a design source, not automatic production authority.

## 13. Stitch-to-Cursor handoff

Before implementation, preserve:

- Stitch project reference
- Approved screenshots
- Mobile screenshots
- Exported design files
- Design tokens
- Colour values
- Typography
- Spacing
- Component list
- Motion notes
- Asset register
- `DESIGN.md`
- Acceptance record

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
