# PackSendGo Frontend Foundation Preflight Audit

## 1. Current repository state

| Attribute | Value |
| --- | --- |
| Repository | `packsendgo-website` |
| Current branch | `feature/frontend-foundation` (per task context) |
| Phase (README) | Phase 0 — Project foundation and design authority |
| Git governance | Product Owner controls all Git operations; Cursor prohibited |
| Application code | None present |
| Package manifests | None present |
| Lockfiles | None present |

The repository contains authority documentation, Stitch design briefs, one Phase 1A desktop export image and foundation configuration files only.

## 2. Whether a Next.js application already exists

**No.**

There is no `package.json`, no `app/` or `pages/` directory, no `next.config` file and no TypeScript application configuration.

Next.js initialisation has not begun.

## 3. Existing directories and documents relevant to implementation

| Path | Relevance |
| --- | --- |
| `docs/00_PROJECT_AUTHORITY.md` | Primary project authority |
| `docs/01_V1_SCOPE_AND_DEFERRED_FEATURES.md` | V1 page and feature scope |
| `docs/02_DESIGN_AND_3D_AUTHORITY.md` | Design and 3D strategy (note Three.js hero override in handoff) |
| `docs/03_TECHNICAL_ARCHITECTURE.md` | Approved stack and structure guide |
| `docs/04_BUILD_PHASE_CHECKLIST.md` | Phase gates; Phase 2 not started |
| `docs/05_CONTENT_AND_ASSET_REGISTER.md` | Content and asset tracking |
| `docs/06_QUOTATION_FORM_SPEC.md` | Quotation form specification |
| `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md` | Deployment constraints |
| `design/stitch/00_STITCH_CONCEPT_BRIEF.md` | Phase 1A brief |
| `design/stitch/01_STITCH_PROMPT_PACK.md` | Stitch prompt reference |
| `design/stitch/02_CONCEPT_REVIEW_SCORECARD.md` | Scorecard — selection pending |
| `design/stitch/03_SELECTED_DESIGN_HANDOFF.md` | Approved design handoff (this phase) |
| `design/exports/phase-1a/direction-one-precision-warehouse-desktop.png` | Single desktop export |
| `.cursor/rules/00-packsendgo-api-saving-governance.mdc` | Cursor governance |
| `.gitignore`, `.gitattributes`, `.editorconfig` | Foundation config |
| `README.md` | Project overview |

## 4. Whether package manifests or lockfiles exist

**No.**

No `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` or `bun.lockb` found.

## 5. Whether application source files exist

**No.**

No `app/`, `src/`, `components/`, `lib/`, `prisma/`, `public/` (application assets), or route handlers exist.

## 6. Whether any implementation has already begun

**No application implementation.**

Documentation phases 0A and 0B are complete per build checklist. Phase 1A Stitch exploration produced surviving Stitch resources. Phase 1B handoff documentation is now recorded. Phase 2 Next.js foundation has not started.

## 7. Hostinger compatibility constraints

Per `docs/03_TECHNICAL_ARCHITECTURE.md` and `docs/07_HOSTINGER_DEPLOYMENT_PLAN.md`:

| Constraint | Implication |
| --- | --- |
| Hostinger Cloud Startup | Node.js application hosting target |
| MySQL | Database; no PostgreSQL |
| No Redis | No caching layer dependency in V1 |
| No WebSockets | No real-time server features |
| No Vercel-only APIs | Avoid Edge-only runtime assumptions |
| External email | Transactional provider required |
| External 3D/media | Three.js client-side; Matterport/video external |
| Environment variables | Secrets in Hostinger config only |
| Supported Node.js | Must verify against Hostinger at Phase 2 init |

## 8. Recommended Next.js foundation approach

| Decision | Recommendation |
| --- | --- |
| Router | Next.js App Router |
| Language | TypeScript strict |
| Styling | Tailwind CSS aligned to Dark Industrial Elegance tokens |
| Rendering | SSG/SSR for marketing pages; server actions or route handlers for quotation |
| Package manager | npm (simplest Hostinger compatibility unless PO prefers otherwise) |
| Init command | `create-next-app` with TypeScript, Tailwind, ESLint, App Router, `src/` optional — prefer flat `app/` per architecture doc |
| Build output | Standard Node.js `next start`; verify Hostinger Node version before locking |

## 9. Recommended Node.js target policy

- Target the **current LTS Node.js release supported by Hostinger Cloud Startup** at Phase 2 initialisation time
- Record the verified version in `.nvmrc` or `engines` field after Hostinger confirmation
- Do not lock an unverified exact version in this audit
- Re-verify compatibility when selecting the Next.js release

## 10. Recommended Three.js integration boundary

| Layer | Responsibility |
| --- | --- |
| `WarehouseHeroScene` | Client-only dynamic import; owns WebGL canvas, animation loop, resize handling |
| `Hero` | HTML headline, CTAs, gradient overlay, poster fallback; no essential text in canvas |
| Scene source | Extract and adapt from Stitch HTML asset `d7229de0d31345ecb11e475ae8a1020b`; do not iframe Stitch URLs in production |
| Performance | `IntersectionObserver` pause; `prefers-reduced-motion` static poster |
| Mobile | Poster image or lightweight video; skip WebGL init on constrained devices |
| Dependencies | `three` (+ optional `@react-three/fiber` / `@react-three/drei` if team prefers React binding — justify at install time) |

Keep Three.js isolated from shared layout and non-hero pages.

## 11. Recommended theme architecture

| Element | Approach |
| --- | --- |
| Token source | `assets/de64b70122504dc6b5c12ce0795dddb6` mapped to CSS variables |
| Tailwind | Extend theme with graphite, charcoal, ivory, steel, cobalt, lime roles |
| Fonts | `next/font` for Playfair Display and Geist |
| Theme modes | `next-themes` or equivalent minimal provider |
| Default | System |
| Persistence | `localStorage` via theme provider |
| Light mode | Derive from same token roles; test contrast independently |

Component: `ThemeMenu` in header.

## 12. Recommended component boundaries

| Component | Scope |
| --- | --- |
| `SiteHeader` | Logo, nav, theme menu, mobile menu |
| `PackSendGoLogo` | Wordmark variants + parcel mark with reduced-motion-aware motion |
| `ThemeMenu` | System / light / dark selector |
| `Hero` | Hero shell, copy, CTAs, gradient overlay |
| `WarehouseHeroScene` | Three.js canvas, lazy-loaded, client-only |
| `CoreCapabilities` | Five-service editorial showcase with interaction pause |
| `HowItWorks` | Five-stage compact process |
| `WarehouseTour` | Cinematic media frame with chapter structure |
| `SalesChannels` | Platform labels + required disclaimer |
| `CustomerCategories` | Audience type cards or list |
| `OperationalCommitments` | Commitment areas without fabricated stats |
| `QuoteCallToAction` | Final conversion band |
| `SiteFooter` | Legal links, contact placeholders |

Shared primitives (buttons, section headings, containers) should live under `components/ui/` once foundation is created.

## 13. Proposed route structure

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services |
| `/how-it-works` | How It Works |
| `/warehouse` | Our Warehouse |
| `/about` | About PackSendGo |
| `/get-a-quote` | Get a Quote |
| `/privacy-policy` | Privacy Policy |
| `/cookie-policy` | Cookie Policy |
| `/terms` | Website Terms |
| `/api/quote` or server action | Quotation submission (Phase 7) |

## 14. Proposed application directory structure

Per `docs/03_TECHNICAL_ARCHITECTURE.md` — to be created in Phase 2 only:

```
app/                    # App Router pages and layouts
components/             # Shared UI and homepage sections
  ui/                   # Primitives
  layout/               # Header, footer, logo, theme
  home/                 # Homepage section components
features/quotes/        # Quotation form logic (later phase)
lib/                    # Utilities, validation, theme tokens
prisma/                 # Schema (Phase 7)
public/                 # Static assets, posters, favicons
styles/                 # Global CSS, Tailwind entry
```

## 15. Proposed first implementation phase

**Phase 2 — Next.js foundation** (per `docs/04_BUILD_PHASE_CHECKLIST.md`):

1. Initialise Next.js App Router with TypeScript and Tailwind
2. Configure ESLint and formatting
3. Create `.env.example` without secrets
4. Root layout with fonts, theme provider and metadata shell
5. `SiteHeader` and `SiteFooter` shells
6. Verify `next build` succeeds locally
7. Document verified Node.js version for Hostinger

Homepage section implementation follows in Phase 3 after foundation acceptance.

## 16. Required dependencies by purpose (not installed)

| Purpose | Packages |
| --- | --- |
| Framework | `next`, `react`, `react-dom` |
| Language | `typescript`, `@types/react`, `@types/node` |
| Styling | `tailwindcss`, `postcss`, `autoprefixer` |
| Linting | `eslint`, `eslint-config-next` |
| Theme | `next-themes` (or minimal equivalent) |
| Three.js hero | `three` (+ optional `@react-three/fiber`, `@react-three/drei`) |
| Forms (Phase 7) | Validation library TBD (e.g. `zod`) |
| Database (Phase 7) | `prisma`, `@prisma/client` |
| Spam protection (Phase 7) | Cloudflare Turnstile client/server packages |
| Email (Phase 8) | Provider SDK TBD |

Exact versions to be confirmed at Phase 2 init against Hostinger Node support.

## 17. Known assets and missing assets

### Known

| Asset | Location |
| --- | --- |
| Stitch homepage screen | `f850fd8d653d41c8b8958f00ddaea79f` |
| Three.js scene HTML | `d7229de0d31345ecb11e475ae8a1020b` |
| Logo reference | `89383fcba01d44c4999016678e664b5d` |
| Design system tokens | `assets/de64b70122504dc6b5c12ce0795dddb6` |
| Desktop export PNG | `design/exports/phase-1a/direction-one-precision-warehouse-desktop.png` |

### Missing

| Asset | Notes |
| --- | --- |
| Mobile homepage Stitch screen | Not in surviving set |
| Production logo SVGs | Export from logo reference |
| Three.js optimised production bundle | Extract from Stitch HTML |
| Hero poster and mobile video | Generate during implementation |
| Real warehouse photography and video | Operational capture pending |
| Confirmed business contact details | Product Owner input |
| Legal page content | Product Owner / legal review |
| Favicon and social preview images | Design task |
| Quotation email templates | Phase 8 |

## 18. Risks and blockers

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Stitch MCP not registered in Cursor tool catalogue | Medium | Direct HTTP MCP retrieval works; reconnect `stitch` server in Cursor settings |
| No mobile Stitch screen | Medium | Implement responsive rules from handoff document |
| Three.js performance on mobile | Medium | Poster/video fallback; lazy load; off-screen pause |
| `docs/02` cites Spline; handoff specifies Three.js hero | Low | Product Owner handoff overrides for homepage hero |
| Scorecard selection not formally recorded | Medium | Product Owner to update `02_CONCEPT_REVIEW_SCORECARD.md` |
| Hostinger Node version unverified | Medium | Verify before locking `engines` |
| Real warehouse media unavailable | Low for foundation | Placeholder structure only until Phase 6 |
| Light theme not designed in Stitch | Low | Derive from tokens; validate contrast |

## 19. Deterministic validation plan

After Phase 2 initialisation:

| Check | Command / action |
| --- | --- |
| Install | `npm install` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Type check | `npx tsc --noEmit` if configured |
| Root route | `npm run dev` — confirm `/` renders layout shell |
| No secrets in repo | Scan for `.env` not committed |

## 20. Browser and mobile validation plan

| Checkpoint | Method |
| --- | --- |
| Desktop layout | Chrome current — 1280px and 1440px viewports |
| Mobile layout | Chrome device mode — 390px width |
| Theme persistence | Toggle system/light/dark; reload; confirm persistence |
| Reduced motion | OS `prefers-reduced-motion: reduce` — confirm 3D and parcel mark respect setting |
| Keyboard | Tab through header, theme menu, CTAs |
| Three.js fallback | Disable WebGL or use low-power device — poster visible |
| Touch targets | Mobile — minimum 44px on interactive elements |

## 21. Recommended implementation sequence

1. **Phase 2:** Next.js foundation, tokens, theme, header/footer shell
2. **Phase 3:** Homepage sections per handoff order; Three.js hero integration
3. **Phase 4:** Remaining public pages
4. **Phase 5:** Refine warehouse experience if distinct from homepage hero
5. **Phase 6:** Real warehouse media
6. **Phase 7:** Quotation form and MySQL
7. **Phase 8:** Transactional email
8. **Phase 9:** SEO, accessibility, security, performance
9. **Phase 10:** Hostinger deployment

## 22. Verdict

### **READY WITH CONDITIONS**

The repository is structurally prepared for Next.js initialisation. Authority documentation, technical architecture and the selected Stitch handoff are in place.

**Conditions before Phase 2 implementation:**

1. Product Owner accepts `03_SELECTED_DESIGN_HANDOFF.md`
2. Product Owner records concept selection in `02_CONCEPT_REVIEW_SCORECARD.md`
3. Hostinger Node.js version verified against intended Next.js release
4. Cursor Stitch MCP server reconnected in IDE settings (optional but recommended for future retrievals)
5. Three.js hero approach confirmed as override to Spline reference in `docs/02` for homepage hero only

**Not blocking foundation init:**

- Missing mobile Stitch screen (responsive rules documented)
- Pending real warehouse media (placeholder structure acceptable for Phase 3)
- Pending logo SVG export (can proceed with interim component from reference)

---

**Audit date:** 1 August 2026  
**Auditor:** Cursor implementation agent  
**Branch context:** `feature/frontend-foundation`  
**No repository files modified except authorised outputs**
