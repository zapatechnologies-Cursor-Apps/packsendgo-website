# Phase 2B Homepage Implementation Report

## 1. Objective

Implement the complete responsive PackSendGo homepage from the locked Stitch composition (`PackSendGo — Final Desktop Master V3`), embed and adapt the separate Stitch Three.js warehouse scene as the full hero background, apply the Dark Industrial Elegance design system, and preserve the accepted Phase 2A Next.js foundation.

## 2. Authority reviewed

| Document | Purpose |
| --- | --- |
| `docs/00_PROJECT_AUTHORITY.md` | Project scope and stack |
| `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md` | V1 exclusions and claim controls |
| `docs/02_DESIGN_AND_3D_AUTHORITY.md` | Three.js hero authority |
| `docs/03_TECHNICAL_ARCHITECTURE.md` | Application structure |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Phase gates |
| `design/stitch/03_SELECTED_DESIGN_HANDOFF.md` | Selected homepage composition |
| `design/stitch/04_FRONTEND_FOUNDATION_PREFLIGHT_AUDIT.md` | Preflight recommendations |
| `docs/phase-reports/PHASE_2A_FRONTEND_FOUNDATION_REPORT.md` | Accepted foundation baseline |
| `.cursor/rules/00-packsendgo-api-saving-governance.mdc` | Cursor governance |

## 3. Stitch resources retrieved

| Resource | Identifier | Status |
| --- | --- | --- |
| Project | `4066494508265032545` | Retrieved |
| Selected homepage | `f850fd8d653d41c8b8958f00ddaea79f` — PackSendGo — Final Desktop Master V3 | Retrieved (HTML source) |
| Separate Three.js asset | `d7229de0d31345ecb11e475ae8a1020b` | Retrieved (HTML source) |
| Dark Industrial Elegance design system | `assets/de64b70122504dc6b5c12ce0795dddb6` | Referenced from accepted handoff |
| Logo reference | `89383fcba01d44c4999016678e664b5d` | Referenced from accepted handoff |

## 4. Retrieval method

One controlled authenticated HTTP retrieval pass via Stitch MCP at `https://stitch.googleapis.com/mcp` (configuration in `.cursor/mcp.json`). Homepage and Three.js screen HTML were retrieved. No Stitch screens were generated, edited, duplicated or deleted. No rejected concepts were accessed. API credentials were not exposed in this report.

## 5. Files created

| File | Purpose |
| --- | --- |
| `src/lib/homepage-data.ts` | Section copy and structured homepage data |
| `public/brand/packsendgo-logo-lime.svg` | Lime wordmark with parcel mark |
| `public/brand/packsendgo-logo-white.svg` | White wordmark for dark surfaces |
| `public/brand/packsendgo-logo-black.svg` | Black wordmark for light surfaces |
| `public/brand/packsendgo-mark-box.svg` | Standalone parcel mark |
| `src/components/ui/SectionHeading.tsx` | Shared editorial section heading |
| `src/components/three/WarehouseSceneContent.tsx` | R3F warehouse scene, lime route, moving parcel |
| `src/components/layout/MobileNavigation.tsx` | Accessible mobile navigation drawer |
| `src/components/sections/Hero.tsx` | Full-screen hero with HTML copy and CTAs |
| `src/components/sections/CoreCapabilities.tsx` | Interactive editorial capabilities showcase |
| `src/components/sections/HowItWorks.tsx` | Compact five-stage process section |
| `src/components/sections/WarehouseTour.tsx` | Virtual warehouse tour placeholder |
| `src/components/sections/SalesChannels.tsx` | Sales channel section with disclaimer |
| `src/components/sections/CustomerCategories.tsx` | Brand-stage audience section |
| `src/components/sections/OperationalCommitments.tsx` | Editorial operational commitments |
| `src/components/sections/QuoteCallToAction.tsx` | Final tailored quote CTA |
| `docs/phase-reports/PHASE_2B_HOMEPAGE_IMPLEMENTATION_REPORT.md` | This report |

## 6. Files modified

| File | Change |
| --- | --- |
| `src/components/three/WarehouseHeroScene.tsx` | Dynamic Canvas hero with pause controls |
| `src/components/three/WarehouseHeroBoundary.tsx` | Gradients, vignette and WebGL fallback |
| `src/components/three/index.ts` | Export updates |
| `src/components/brand/PackSendGoLogo.tsx` | Production SVG logo system |
| `src/components/theme/ThemeMenu.tsx` | Compact icon menu (System / Light / Dark) |
| `src/components/layout/SiteHeader.tsx` | Responsive header with mobile nav |
| `src/components/layout/SiteFooter.tsx` | Production footer without pending contact text |
| `src/app/page.tsx` | Full homepage section order |
| `src/app/globals.css` | Hero fallback, parcel-mark animation, utilities |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Phase 2B proven items marked complete |

## 7. Selected homepage implementation summary

Implemented the approved section order:

1. Header (layout)
2. Full-screen Three.js hero
3. Core Capabilities
4. How PackSendGo Works
5. Virtual Warehouse Tour (`#warehouse-tour`)
6. Built Around the Way You Sell
7. Built for Brands at Every Stage
8. Your Fulfilment Plan, Clearly Defined
9. Final Tailored Quote CTA
10. Footer (layout)

The duplicate service strip beneath the hero (`Flexible storage`, `UK-first delivery`, blue separator dots) was excluded. Phase 2A foundation-preview wording was removed. Approved copy was used throughout with no unsupported integration, global-delivery or guarantee claims.

## 8. Three.js source adaptation summary

The separate Stitch Three.js HTML source was adapted to React Three Fiber in `WarehouseSceneContent.tsx`:

- Warehouse racks, floor plane, shelving and cartons preserved
- Static camera at `[10, 8, 12]` with restrained pointer parallax on a scene group (no continuous whole-scene rotation)
- Cobalt accent lighting retained from source atmosphere
- Client-side dynamic Canvas load via `WarehouseHeroScene`
- No iframe, no remote runtime scripts, no Spline

## 9. Lime route implementation

Signal-lime route (`#d1ff26`) implemented with `@react-three/drei` `Line` through the source workflow points:

`(-10, 0.01, 5) → (-2, 0.01, 5) → (-2, 0.01, 0) → (2, 0.01, 0) → (2, 0.01, -5) → (10, 0.01, -5)`

Line width 2, opacity 0.95, sharp and visible against the dark warehouse floor.

## 10. Moving parcel implementation

A small signal-lime parcel cube (`0.4 × 0.3 × 0.4`) moves continuously along the route segments using `useFrame` interpolation. Progress loops smoothly with no bounce or arcade effect. Animation pauses when the hero is off-screen or the document is hidden.

## 11. Scene performance controls

- IntersectionObserver pauses animation when hero leaves viewport
- `visibilitychange` pauses when tab is hidden
- Reduced-motion users receive CSS fallback only (no WebGL canvas)
- Single WebGL canvas on homepage
- Dynamic client-side import boundary for Three.js
- No per-frame React state updates in scene loop

## 12. WebGL and mobile fallback

- `hero-scene-fallback` CSS poster gradient when WebGL unavailable or reduced motion preferred
- Graphite gradient overlays and vignette on hero for copy readability
- Hero headline and CTAs remain HTML outside the canvas
- Mobile layout stacks hero copy and CTAs; simplified scene rendering via lower DPR cap `[1, 1.5]`

## 13. Section implementation summary

| Section | Implementation |
| --- | --- |
| Header | Logo, nav links, compact theme menu, quote CTA, mobile drawer |
| Hero | Three.js background, approved copy, primary and secondary CTAs |
| Core Capabilities | Editorial selector with auto-progression, keyboard access, mobile pagination |
| How It Works | Compact five-stage horizontal route (desktop) / accordion (mobile) |
| Warehouse Tour | Cinematic placeholder with chapter controls and enter-tour CTA |
| Sales Channels | Six platforms with onboarding disclaimer, readable contrast |
| Customer Categories | Two-by-two editorial layout |
| Operational Commitments | Six editorial commitments, no fake metrics |
| Quote CTA | Approved headline, reassurance line, placeholder route |
| Footer | Logo, nav, legal links, copyright without invented contact details |

## 14. Responsive implementation

Homepage sections use mobile-first Tailwind utilities with container margins and section gaps from design tokens. Header collapses to mobile navigation. Core Capabilities and How It Works provide touch-friendly controls. Target breakpoints: 390 × 844, 768px, 1280px, 1440px (code-level; manual browser validation pending).

## 15. Theme implementation

Compact theme button with accessible dropdown: System (default), Light, Dark. Persistent override via `next-themes` with hydration-safe rendering. Light theme uses warm stone/ivory surfaces with graphite text and cobalt accents. Dark theme follows Dark Industrial Elegance. Hero remains visually coherent in both modes via gradient overlays.

## 16. Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav`)
- Logical heading hierarchy per section
- Keyboard-operable navigation, theme menu, capability selector and process controls
- Visible focus states
- `aria-expanded`, `aria-current` and selected-state semantics where appropriate
- Canvas marked `aria-hidden` with non-WebGL fallback content path
- `prefers-reduced-motion` respected for logo parcel animation and hero scene

## 17. Content and claim controls

Excluded or corrected:

- No native-integration claims (sales-channel disclaimer included)
- No global-delivery claims (UK primary, European by arrangement only)
- No fake statistics, capacities, guarantees or dispatch times
- No login, registration, tracking, portal or payment features
- No `Connect your store` copy
- No Linnworks integration
- No generated warehouse media presented as real
- No invented contact details in footer

## 18. Commands run

```text
npm run lint
npm run typecheck
npm run build
npm run dev -- --port 3010
Invoke-WebRequest http://localhost:3010/
Stop-Process (dev server)
```

## 19. Lint result

**PASS** — ESLint completed with zero errors after refactoring camera drift to pointer parallax on scene group.

## 20. Typecheck result

**PASS** — `tsc --noEmit` completed with zero errors.

## 21. Build result

**PASS** — Next.js 16.2.12 production build succeeded. Static prerender of `/` confirmed.

## 22. Runtime smoke-test result

**PASS** — Development server responded on port 3010. Root route returned HTTP 200. Hero copy, tour CTA and quote CTA present in HTML response. Service rail absent. Dev server stopped after test.

## 23. Known warnings

- `npm warn Unknown env config "devdir"` — local npm configuration warning; does not affect build output.
- Logo SVG geometry is a clean approximation of the Stitch reference; final brand artwork remains replaceable without layout changes.

## 24. Deferred assets

The following are accepted deferrals rather than blockers for Phase 2B acceptance. They are **not** complete:

- Real PackSendGo warehouse photography, video, Matterport or 360-degree media
- Quote form and quote-submission workflow
- Legal-page implementation (Privacy, Cookie, Website Terms)
- Confirmed contact and company details
- Production deployment to Hostinger

The current SVG wordmark implementation is accepted for this release and remains replaceable without layout changes if final supplied brand artwork becomes available.

## 25. Manual browser-validation — Product Owner acceptance

**Acceptance date:** 2026-08-01  
**Product Owner acceptance:** ACCEPTED — 2026-08-01

### Desktop acceptance

- [x] Approved homepage section order
- [x] Coherent PackSendGo wordmark with parcel mark above the final `o`
- [x] Full hero Three.js warehouse background with visible shelving, cartons, aisle structure and scene depth
- [x] Sharp signal-lime route and small signal-lime parcel travelling along the route
- [x] Hero text and CTAs readable
- [x] Compact production theme menu
- [x] Duplicate service rail absent
- [x] Interactive Core Capabilities with distinct abstract operational diagram per service
- [x] Compact five-stage process section
- [x] Deliberate Virtual Warehouse Tour placeholder
- [x] Sales-channel names readable
- [x] Customer-category and operational-commitment sections readable
- [x] Final tailored-quote CTA and footer rendered correctly
- [x] No Phase 2A placeholder content
- [x] No red browser-console errors

### Mobile acceptance (approximately 390 × 844)

- [x] Compact mobile header and navigation
- [x] Coherent logo
- [x] Readable hero content with visible Three.js warehouse, lime route and moving parcel
- [x] Correctly stacked CTAs
- [x] Interactive Core Capabilities controls and diagrams
- [x] Compact process accordion
- [x] Intentional warehouse-tour placeholder
- [x] Readable sales-channel section
- [x] Single-column customer-category and operational-commitment layouts
- [x] Readable final CTA and footer
- [x] No horizontal overflow
- [x] No red browser-console errors

### Interaction and theme acceptance

- [x] Moving lime parcel follows the route
- [x] Core Capabilities selection changes the visual diagram
- [x] System, Light and Dark themes remain readable with persistent preference
- [x] Hero tour CTA scrolls to the warehouse-tour section
- [x] Keyboard-visible interaction and reduced-motion support remain implemented

## 26. Risks or blockers

- Quote CTA links to placeholder route; quote form not yet implemented (accepted deferral).
- Real warehouse media pending (accepted deferral).

## 27. Verdict

**ACCEPTED**

Phase 2B responsive homepage and Three.js hero implementation accepted by Product Owner following successful desktop and mobile browser validation on 2026-08-01.

## 28. Product Owner acceptance status

**Product Owner acceptance: ACCEPTED — 2026-08-01**

---

## 29. Targeted visual correction pass

**Date:** 2026-08-01  
**Scope:** Four confirmed visual defects only — no section reorder, no Stitch retrieval, no scope expansion.

### Corrections applied

| Defect | Correction |
| --- | --- |
| Split wordmark | Replaced separate `PackSend` / `Go` SVG text nodes with one coherent `PackSendGo` wordmark per colour variant; parcel mark positioned above the final `o` without separating `Go`; inline SVG in `PackSendGoLogo` restores parcel animation |
| Dark Three.js hero | Increased ambient, hemisphere and directional lighting; lighter rack and carton materials; floor grid and aisle lines; dual-layer signal-lime route; larger emissive parcel; reduced left hero gradient opacity so centre/right warehouse remains visible |
| Empty Core Capabilities visual | Added per-service abstract inline-SVG operational diagrams (CSS/SVG only, no photography, no WebGL) |
| Missing warehouse-tour media | Added deliberate aisle-perspective SVG placeholder with play cue, 360° label, route geometry and explicit `Real PackSendGo warehouse media will be added here.` disclosure |

### Files modified

- `public/brand/packsendgo-logo-lime.svg`
- `public/brand/packsendgo-logo-white.svg`
- `public/brand/packsendgo-logo-black.svg`
- `src/components/brand/PackSendGoLogo.tsx`
- `src/components/three/WarehouseSceneContent.tsx`
- `src/components/three/WarehouseHeroBoundary.tsx`
- `src/components/sections/CoreCapabilities.tsx`
- `src/components/sections/WarehouseTour.tsx`
- `src/app/globals.css`
- `docs/phase-reports/PHASE_2B_HOMEPAGE_IMPLEMENTATION_REPORT.md`

### Validation results (correction pass)

| Check | Result |
| --- | --- |
| Lint | PASS |
| Typecheck | PASS |
| Build | PASS |
| Runtime smoke test | PASS — HTTP 200, hero copy present, service rail absent |

**Product Owner acceptance: ACCEPTED — 2026-08-01**

