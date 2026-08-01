# Phase 3 — Homepage Media Refinement Report

**Date:** 2026-08-01
**Branch:** feature/phase-3-homepage-media-refinement
**Base commit:** 5545bf1
**Product Owner acceptance:** ACCEPTED WITH CONDITIONS — 2026-08-01

---

## 1. Objective

Improve the homepage before first Hostinger preview deployment by brightening the Three.js warehouse hero, inserting licensed stock photographs for Core Capabilities and Tour our warehouse, using local assets with documented sources, and preserving quotation, navigation, themes and homepage content.

## 2. Tracker alignment

- Phase 3 — Homepage implementation refinement
- Phase 6 — Temporary media preparation only (stock placeholders; not final Phase 6 acceptance)

## 3. Authority reviewed

- `docs/00_PROJECT_AUTHORITY.md`
- `docs/04_BUILD_PHASE_CHECKLIST.md`
- `docs/05_CONTENT_AND_ASSET_REGISTER.md`
- `docs/phase-reports/PHASE_2B_HOMEPAGE_IMPLEMENTATION_REPORT.md`
- Existing homepage components, Three.js hero scene, theme tokens and governance rule

## 4. Original visual problems

- Three.js hero too dark: shelving, cartons and aisles merged into background
- Core Capabilities relied on abstract SVG diagrams in dark panels
- Tour our warehouse used an obvious SVG placeholder with fake play control

## 5. Files created

| File | Purpose |
| --- | --- |
| `public/images/homepage/capability-ecommerce-fulfilment.jpg` | Ecommerce fulfilment capability photo |
| `public/images/homepage/capability-warehousing-storage.jpg` | Warehousing and storage capability photo |
| `public/images/homepage/capability-pick-and-pack.jpg` | Pick and pack capability photo |
| `public/images/homepage/capability-parcel-dispatch.jpg` | Parcel dispatch capability photo |
| `public/images/homepage/capability-returns-processing.jpg` | Returns processing capability photo |
| `public/images/homepage/warehouse-tour-placeholder.jpg` | Tour our warehouse stock placeholder |
| `docs/phase-reports/PHASE_3_HOMEPAGE_MEDIA_REFINEMENT_REPORT.md` | This report |

## 6. Existing files modified

| File | Change |
| --- | --- |
| `src/lib/homepage-data.ts` | Added image paths, alt text, object-position; warehouse tour image config |
| `src/components/sections/CoreCapabilities.tsx` | Replaced SVG diagrams with `next/image` photographic treatment |
| `src/components/sections/WarehouseTour.tsx` | Replaced SVG placeholder with warehouse photograph |
| `src/components/three/WarehouseSceneContent.tsx` | Improved lighting, materials, floor and grid visibility |
| `src/components/three/WarehouseHeroScene.tsx` | Added ACES tone mapping and exposure |
| `src/components/three/WarehouseHeroBoundary.tsx` | Reduced overlay opacity for clearer scene |
| `docs/05_CONTENT_AND_ASSET_REGISTER.md` | Added §8.1 stock placeholder register; updated storage paths |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Added Phase 3 media refinement checklist entries |

## 7. Image-source register

See `docs/05_CONTENT_AND_ASSET_REGISTER.md` §8.1 for full register.

## 8. Photographer and licence evidence

All six images downloaded from authorised Pexels source pages on 2026-08-01. JPEG binaries confirmed valid (FF D8 header). Pexels presents all photos as free to use under the Pexels licence shown on each source page. Automated photographer name retrieval returned HTTP 403 (Cloudflare); photographer recorded as "See source page" in asset register. No ownership claimed.

## 9. Local image filenames

- `public/images/homepage/capability-ecommerce-fulfilment.jpg`
- `public/images/homepage/capability-warehousing-storage.jpg`
- `public/images/homepage/capability-pick-and-pack.jpg`
- `public/images/homepage/capability-parcel-dispatch.jpg`
- `public/images/homepage/capability-returns-processing.jpg`
- `public/images/homepage/warehouse-tour-placeholder.jpg`

## 10. Image dimensions

| File | Dimensions |
| --- | --- |
| capability-ecommerce-fulfilment.jpg | 1600 × 1067 |
| capability-warehousing-storage.jpg | 1600 × 1200 (4:3 landscape crop) |
| capability-pick-and-pack.jpg | 1600 × 1200 (4:3 landscape crop) |
| capability-parcel-dispatch.jpg | 1600 × 1067 |
| capability-returns-processing.jpg | 1600 × 1067 |
| warehouse-tour-placeholder.jpg | 1920 × 1080 (16:9 landscape crop) |

## 11. Image file sizes

| File | Size |
| --- | --- |
| capability-ecommerce-fulfilment.jpg | 254 KB |
| capability-warehousing-storage.jpg | 296 KB |
| capability-pick-and-pack.jpg | 203 KB |
| capability-parcel-dispatch.jpg | 210 KB |
| capability-returns-processing.jpg | 93 KB |
| warehouse-tour-placeholder.jpg | 529 KB |
| **Total** | **1585.6 KB** |

## 12. Image optimisation decisions

- Downloaded from Pexels CDN at 1600–2000px width with compression parameters
- Portrait source images (pick-and-pack, warehousing-storage) centre-cropped to 4:3 landscape
- Tour image centre-cropped to 16:9 at 1920px width, JPEG quality 78
- Retained JPEG (no WebP conversion tooling available without package install)
- All images under per-image size targets except tour at 529 KB (within 800 KB limit)

## 13. Three.js lighting changes

- Background: `#151920` → `#1a2028`
- Ambient light: 0.72 → 0.9, colour `#9aa8ba`
- Hemisphere light: sky `#5c7090`, ground `#181c24`, intensity 0.55 → 0.68
- Primary directional: intensity 1.1 → 1.35
- Added fill directional at `[-6, 10, -4]`, intensity 0.42
- Blue point light: 1.4 → 1.15; grey point light: 0.45 → 0.62
- Spot light: 0.9 → 1.05

## 14. Three.js material changes

- Rack pillars: `#3a424d` → `#4d5866`
- Rack shelves: `#343b46` → `#434c59`
- Cartons: `#5c6775` → `#6d7888`
- Floor: `#1c222b` → `#262e38`
- Grid lines: `#2a313b` → `#3d4856`, opacity 0.55 → 0.68
- Aisle lines: `#3d4654` → `#4f5a68`, opacity 0.7 → 0.82

## 15. Overlay and text-legibility changes

- Horizontal gradient: `via-background/58` → `via-background/48`
- Vertical gradient: `from-background/28` → `from-background/20`, `to-background/82` → `to-background/72`
- ACES filmic tone mapping with exposure 1.12 on renderer

## 16. Core Capabilities implementation

- Removed abstract SVG `CapabilityDiagram` component
- Active capability displays assigned photograph via stacked `next/image` with opacity transition
- First image eager-loaded; others lazy-loaded
- Light gradient overlay at bottom for text panel separation
- Tab interaction, auto-rotation, keyboard and mobile dot controls preserved

## 17. Per-capability image mapping

| Capability | Image | Source |
| --- | --- | --- |
| Ecommerce fulfilment | capability-ecommerce-fulfilment.jpg | Pexels 4481260 |
| Warehousing and storage | capability-warehousing-storage.jpg | Pexels 4481327 |
| Pick and pack | capability-pick-and-pack.jpg | Pexels 30824343 |
| Parcel dispatch | capability-parcel-dispatch.jpg | Pexels 4487513 |
| Returns processing | capability-returns-processing.jpg | Pexels 6170405 |

## 18. Tour our warehouse implementation

- Replaced SVG placeholder with `warehouse-tour-placeholder.jpg`
- Removed fake play button and "Placeholder media" badge
- Disabled "Enter the virtual tour" CTA preserved
- Overlay copy states stock imagery and future walkthrough; no PackSendGo facility claim
- Chapter buttons preserved

## 19. Media-truth safeguards

- Alt text uses neutral operational descriptions only
- Tour overlay explicitly states licensed stock imagery, not a specific facility
- Asset register marked TEMPORARY LICENSED STOCK PLACEHOLDER
- No PackSendGo warehouse, employee or equipment claims in public copy

## 20. Accessibility

- All six photographs have descriptive alt text
- Capability tabs remain keyboard-operable with `aria-selected`
- Image transitions do not steal focus
- Selected capability communicated via border, background and `aria-selected`
- Text overlays use restrained gradients for contrast
- Reduced-motion respected (existing hero fallback unchanged)
- No autoplay media introduced

## 21. Responsive behaviour

- Desktop (~1905px): hero readable, capability photo balanced beside copy, tour wide composition strong
- Mobile (390×844): hero text readable, capability tabs usable, images crop via `object-cover`, no horizontal overflow detected
- Tablet mid-width: existing grid breakpoints preserved

## 22. Theme behaviour

- Dark theme: PASSED — 2026-08-01 (Product Owner). Warehouse details visible, premium atmosphere retained, text legible.
- Light theme: DEFERRED — contrast corrections required before public launch. Observed defects: insufficient text contrast in active Core Capabilities panel, “Built for brands at every stage” cards, final quotation CTA section, and warehouse-tour overlay; dark content surfaces not adapting coherently to light page background.
- Theme switch did not cause renderer remount or console errors.

## 23. Reduced-motion behaviour

- Existing `useReducedMotion` fallback preserved; static gradient shown when preferred

## 24. Performance

- All images local under `public/images/homepage/`
- `next/image` with appropriate `sizes`
- Below-fold images lazy-loaded
- Total new image weight: 1585.6 KB (acceptable for six photographs)
- No Three.js geometry increase; no new animation loops

## 25. Commands run

- Image download and crop (PowerShell + Pexels CDN)
- `npm run lint`
- `npm run typecheck`
- `npx prisma generate` — PASS (Product Owner, 2026-08-01)
- `npm run build` — PASS (Product Owner, 2026-08-01; Next.js 16.2.12, Prisma Client 6.19.3)
- `npx next start -p 3456` (runtime smoke test)
- HTTP smoke tests for `/` and `/get-a-quote`
- Browser visual validation (agent: desktop, mobile, light, dark)
- Product Owner visual validation (dark desktop, dark mobile — 2026-08-01)

## 26. Lint result

PASS — 0 errors, 1 pre-existing warning in `QuoteForm.tsx` (React Hook Form memoization)

## 27. Typecheck result

PASS

## 28. Build result

PASS — `npm run build` (Product Owner, 2026-08-01). Prisma generation PASS; Prisma Client 6.19.3; Next.js 16.2.12 production build; TypeScript PASS; `/`, `/get-a-quote`, and `/api/quote` compiled. Prior Windows Prisma EPERM lock: RESOLVED.

## 29. Runtime result

PASS — `/` HTTP 200, `/get-a-quote` HTTP 200, all six local image paths referenced, no Pexels hotlinks at runtime

## 30. Desktop visual result

PASSED — 2026-08-01 (Product Owner, dark mode). Hero shelves/cartons clearer, lime route visible, capability photos on tab change, tour photograph with overlay, no broken images or horizontal overflow.

## 31. Mobile visual result

PASSED — 2026-08-01 (Product Owner, dark mode). Homepage usable at mobile viewport; hero text readable; capability controls and photographs usable; tour media correct; no horizontal overflow.

## 32. Console result

PASS — no red console errors observed; Three.js canvas present (1905×896)

## 33. Quotation regression result

PASS — `/get-a-quote` returns HTTP 200; quotation source files not modified

## 34. Known warnings

- Pre-existing ESLint warning in `QuoteForm.tsx`
- Photographer names not auto-retrievable (Pexels 403); recorded as "See source page"
- Light-mode visual validation: DEFERRED — contrast corrections required before public launch
- Prior Windows Prisma EPERM lock: RESOLVED (Product Owner build validation, 2026-08-01)

## 35. Genuine-media replacement requirements

Replace all six stock placeholders with authorised PackSendGo facility photography/video before final production launch. Phase 6 real-media acceptance remains incomplete.

## 36. Production blockers

- Genuine PackSendGo warehouse media: PENDING
- Light-mode contrast corrections required before public launch
- Public production launch: NOT APPROVED
- Hostinger private preview deployment: APPROVED (unadvertised; search indexing disabled; dark mode accepted presentation)

## 37. Verdict

**Homepage media refinement verdict: APPROVED FOR PRIVATE HOSTINGER PREVIEW**

Implementation and automated validation complete. Product Owner accepted dark desktop and dark mobile validation on 2026-08-01. Light-mode contrast corrections deferred. Not approved for public production launch.

## 38. Product Owner acceptance status

**ACCEPTED WITH CONDITIONS — 2026-08-01**

- Dark desktop validation: PASSED — 2026-08-01
- Dark mobile validation: PASSED — 2026-08-01
- Light-mode validation: DEFERRED — contrast corrections required
- Prisma generation: PASS
- Production build (`npm run build`): PASS
- Private preview deployment approval: APPROVED
- Public production approval: NOT APPROVED
- Genuine PackSendGo facility media: PENDING

## 39. Product Owner review summary (2026-08-01)

### Accepted (dark desktop)

Three.js shelving, cartons and aisles substantially clearer; premium dark atmosphere intact; signal-lime route and moving parcel preserved; five Core Capabilities photographs display correctly; capability selection updates photograph and content; Tour our warehouse uses wide stock photograph; stock media not represented as genuine PackSendGo facility; no broken images or horizontal overflow.

### Accepted (dark mobile)

Homepage layout usable; hero text readable; capability controls and photographs usable; tour media correct; no horizontal overflow; navigation and quotation routes functional.

### Light-mode deferral

Product Owner does not accept current Light-mode presentation. Defects include insufficient text contrast in Core Capabilities active panel, “Built for brands at every stage” cards, final quotation CTA section, and warehouse-tour overlay; dark content surfaces not adapting to light background. Deferred so private Hostinger preview may proceed. Dark mode remains the accepted presentation.

### Deployment decision

Private Hostinger preview deployment: APPROVED (unadvertised; indexing disabled). Public production launch: NOT APPROVED until Light-mode contrast corrected and genuine authorised PackSendGo facility media supplied.
