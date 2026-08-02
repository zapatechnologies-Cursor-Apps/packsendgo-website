# Phase 1B, 3 and 7 Light Mode Launch Correction Report

**Date:** 2026-08-02
**Mode:** API Saving Mode — Batch 2 controlled visual implementation
**Repository:** `D:\Projects\packsendgo-website`
**Branch:** `launch/final-completion`
**Product Owner acceptance:** Colour system accepted; final mobile density refinement complete — **PENDING MANUAL VISUAL REVIEW**
**Batch 2 verdict:** READY FOR PRODUCT OWNER REVIEW

---

## 1. Objective

Correct Light-mode readability across the homepage, header, theme menu, quotation form and shared components while preserving approved Dark-mode presentation.

## 2. Parent programme phases

- Phase 1B — Approved visual system
- Phase 3 — Homepage implementation
- Phase 7 — Quotation form and MySQL (presentation only)

## 3. Audit evidence

- `docs/phase-reports/PACKSENDGO_FINAL_COMPLETION_GAP_AUDIT.md`
- `docs/02_DESIGN_AND_3D_AUTHORITY.md`
- `docs/04_BUILD_PHASE_CHECKLIST.md`

## 4. Original Light-mode defects

`.light` retained dark values for `--deep-charcoal` and `--midnight-graphite` while `--on-surface` switched to dark text. Components using dark surface backgrounds with `text-on-surface` rendered dark text on dark panels. Error states used dark-mode red tints unreadable on light backgrounds.

## 5. Theme-token root cause

Surface brand colours (`deep-charcoal`, `midnight-graphite`) were reused as both ink colours (on lime buttons) and panel backgrounds. Light mode changed text tokens but not panel tokens coherently.

## 6. Files created

- `docs/phase-reports/PHASE_1B_3_7_LIGHT_MODE_LAUNCH_CORRECTION_REPORT.md`

## 7. Files modified (Light-mode correction)

- `src/app/globals.css`
- `src/components/sections/CoreCapabilities.tsx`
- `src/components/sections/CustomerCategories.tsx`
- `src/components/sections/WarehouseTour.tsx`
- `src/components/sections/QuoteCallToAction.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/HowItWorks.tsx`
- `src/components/three/WarehouseHeroBoundary.tsx`
- `src/components/layout/SiteHeader.tsx`
- `src/components/layout/MobileNavigation.tsx`
- `src/components/theme/ThemeMenu.tsx`
- `src/components/forms/Field.tsx`
- `src/components/quote/QuoteSubmissionError.tsx`
- `src/components/quote/QuoteStepReview.tsx`
- `src/components/quote/QuoteProgress.tsx`
- `src/components/quote/QuoteSuccess.tsx`
- `src/components/ui/Button.tsx`
- `docs/04_BUILD_PHASE_CHECKLIST.md`

## 7b. Files modified (mobile density refinement — 2026-08-02)

- `src/app/globals.css`
- `src/components/sections/Hero.tsx`
- `src/components/sections/CoreCapabilities.tsx`
- `src/components/sections/HowItWorks.tsx`
- `src/components/sections/WarehouseTour.tsx`
- `src/components/sections/SalesChannels.tsx`
- `src/components/sections/CustomerCategories.tsx`
- `src/components/sections/OperationalCommitments.tsx`
- `src/components/ui/SectionHeading.tsx`
- `docs/phase-reports/PHASE_1B_3_7_LIGHT_MODE_LAUNCH_CORRECTION_REPORT.md`
- `docs/04_BUILD_PHASE_CHECKLIST.md`

## 8. Token changes

Added theme-aware tokens in `globals.css`:

- `--surface-panel`, `--surface-promo`, `--surface-overlay`
- `--on-surface-promo`, `--on-surface-promo-variant`
- `--on-lime` (always dark ink on lime buttons)
- `--input-background`, `--input-border`
- `--error-foreground`, `--error-title`, `--error-background`, `--error-border`
- `--shadow-elevated` (light mode only)
- Light-mode remaps for `--deep-charcoal` (white panels) while keeping `--midnight-graphite` as ink
- Light-mode hero fallback gradient

## 9. Header corrections

Sticky header retains backdrop blur; added `shadow-elevated` in Light mode. Navigation and logo readable. CTA uses `text-on-lime`.

## 10. Hero corrections

Stronger Light-mode gradient overlays via `dark:` variant split in `WarehouseHeroBoundary.tsx`. Hero typography and CTAs remain readable without relighting Three.js scene.

## 11. Core Capabilities corrections

Active panel uses `bg-surface-panel` with white background and dark text in Light mode. Image gradient uses `--surface-overlay`. Subtle card shadow applied.

## 12. Process-section corrections

How It Works section already used theme surfaces; active step uses `text-on-lime` on lime badge. No regression observed.

## 13. Warehouse Tour corrections

Container uses `bg-surface-panel`. Image overlay uses `--surface-overlay` with `--on-surface-promo` text for readable copy on photography. Chapter badges retain lime/dark ink pairing.

## 14. Customer-category corrections

Cards use `bg-surface-panel` with white backgrounds, dark headings and body text, subtle elevation shadow.

## 15. Final CTA corrections

Section uses deliberate navy `--surface-promo` with `--on-surface-promo` heading and body text. Lime CTA retains dark ink. Severe Light-mode contrast failure resolved.

## 16. Footer corrections

Footer already used `bg-surface-container`; readable in Light mode without change. Logo resolves to black variant in Light mode via existing `PackSendGoLogo` logic.

## 17. Quotation-form corrections

Progress steps, review panel, consent fieldsets and page header readable in Light mode. Review summary panel uses `shadow-elevated`.

## 18. Form-field corrections

Inputs use `--input-background` (white in Light mode). Labels and optional markers use `--on-surface-variant`. Placeholder styling added in base CSS.

## 19. Error-state corrections

`QuoteSubmissionError`, `QuoteStepReview` submission errors and `FieldError` use semantic error tokens with readable Light-mode rose palette.

## 20. Desktop Light-mode validation

1440×900: homepage, Core Capabilities, final CTA, quotation step 1 and review step validated. Readable contrast throughout.

## 21. Mobile Light-mode validation

390×844: homepage hero, mobile navigation controls, quotation form step 1 and review step validated. No horizontal overflow (`scrollWidth === innerWidth`).

## 22. Tablet validation

768px spot-check via responsive grid behaviour on homepage sections; no overflow detected at mobile breakpoint transition.

## 23. Dark-mode regression

Dark desktop and mobile homepage validated. Three.js hero, dark panels, lime CTAs and navigation remain visually equivalent to approved Dark mode.

## 24. Accessibility

Focus rings remain cobalt. Error text readable in Light mode. Active tabs/steps indicated by border and background beyond colour alone. Muted text uses `#45474a` on light surfaces.

## 25. Responsive behaviour

No horizontal overflow at 390px. Mobile menu panel uses elevated shadow. Capability tabs and CTA sections stack correctly.

## 26. Lint

PASS — zero errors (one pre-existing React Hook Form warning).

## 27. Typecheck

PASS

## 28. Build

PASS — `next build` succeeded.

## 29. Browser console

Pre-existing Next.js ThemeProvider hydration dev overlay observed; unrelated to Light-mode token changes. No theme-related runtime errors.

## 30. Known warnings

- React Hook Form compiler warning in `QuoteForm.tsx` (pre-existing)
- ThemeProvider hydration notice in development overlay (pre-existing)

## 31. Screenshots

Previous repository screenshot folder was deleted per Product Owner direction. No screenshots are stored inside the repository. Temporary review captures may be kept outside the repository only.

## 32. Mobile density refinement (2026-08-02)

Product Owner accepted the corrected Light-mode colour system and requested final mobile density refinement before Batch 2 commit.

### Mobile hero height

Mobile hero reduced from `min(92vh, 56rem)` to `min(72svh, 28rem)` with tighter vertical padding (`py-10`). Desktop hero unchanged at `min(92vh, 56rem)`.

### Core Capabilities mobile selector

Replaced tall vertical mobile list with a single responsive horizontal scroll row using CSS scroll snapping (~2–3 pills visible). Selected state uses signal-lime background, dark text, ring and font weight. Desktop retains vertical left-border selector at `lg` breakpoint.

### Mobile section spacing

Reduced `--section-gap-mobile` from 80px to 56px. Tightened `SectionHeading` bottom margin on mobile. Reduced internal card padding and grid gaps on mobile homepage sections.

### Sales-channel heading

Renamed to **Built for how you sell** in `SalesChannels.tsx`.

### Validation after refinement

- Light mobile 390×844: PASS — compact hero, horizontal capability selector, readable heading
- Dark mobile 390×844: PASS — no regression
- Light desktop 1440×900: PASS — vertical capability selector preserved
- Dark desktop 1440×900: PASS — no regression
- Capability selector updates content: PASS
- Horizontal page overflow: PASS

## 33. Remaining visual work

- Public pages Light mode (Batch 3 scope)
- Product Owner manual visual sign-off
- Optional fine-tuning of hero Light-mode overlay strength after PO review

## 34. Verdict

**Batch 2 verdict: READY FOR PRODUCT OWNER REVIEW**

Light-mode token system corrected centrally. Homepage sections, final CTA, header, theme menu and quotation form are readable in Light mode. Dark-mode regression checks pass.

## 35. Product Owner acceptance status

**Product Owner acceptance: PENDING FINAL VISUAL REVIEW**

Product Owner accepted the corrected Light-mode colour system. Final mobile density refinement was implemented locally; hosted and manual sign-off remain pending.
