# PackSendGo Website Project Authority

## 1. Document purpose

This document is the primary authority for the PackSendGo public website project.

It defines the approved business objective, first-release scope, architecture, responsibilities, design direction and implementation controls.

No design or implementation agent may introduce material features, technologies, services or scope that conflict with this authority without explicit Product Owner approval.

## 2. Project identity

**Project name:** PackSendGo Public Website  
**Primary domain:** packsendgo.com  
**Business type:** Ecommerce fulfilment, warehousing, pick-and-pack and dispatch  
**Ownership:** Joint venture  
**Primary release:** PackSendGo Website V1  
**Hosting:** Hostinger Cloud Startup  
**Source authority:** GitHub repository  
**Production branch:** `main`

## 3. Product objective

Build a premium, modern and highly converting public website for PackSendGo.

The website must clearly explain that PackSendGo stores products, receives ecommerce orders, picks and packs items, dispatches orders and manages related fulfilment services.

The first release must remain deliberately simple and informative.

Its primary business purpose is to generate qualified quotation enquiries.

## 4. Approved positioning

PackSendGo should be positioned as a modern fulfilment partner for growing ecommerce brands.

The experience must feel:

- Premium
- Modern
- Trustworthy
- Operationally competent
- Technically advanced
- Easy to understand
- Visually distinctive
- Calm rather than crowded

The website must not feel like a generic courier comparison site, template logistics website or complicated software platform.

## 5. Primary proposition

Approved working proposition:

> From shelf to doorstep, handled.

Approved supporting proposition:

> Flexible ecommerce fulfilment, warehousing, pick and pack, and dispatch for growing brands.

Approved supporting brand line:

> Store. Pack. Send. Grow.

All copy remains subject to final Product Owner approval.

## 6. Primary conversion actions

The website must prioritise two actions:

1. **Get a tailored quote**
2. **Tour our warehouse**

The quotation action is the primary conversion.

The warehouse tour is the primary trust-building action.

## 7. Approved V1 pages

The initial public website shall include:

1. Home
2. Services
3. How It Works
4. Our Warehouse
5. About PackSendGo
6. Get a Quote
7. Privacy Policy
8. Cookie Policy
9. Website Terms

Additional service landing pages may be introduced later for search optimisation, but they are not required for the first launch.

## 8. Approved homepage sections

The homepage should include:

1. Header and navigation
2. Premium hero
3. Interactive or animated warehouse visual
4. Primary quotation CTA
5. Trust and capability strip
6. Core services
7. How fulfilment works
8. Warehouse experience
9. Ecommerce platform compatibility
10. Customer categories
11. Operational evidence
12. Quotation CTA
13. Footer

The homepage must communicate the PackSendGo offer within approximately thirty seconds.

## 9. Approved V1 services

The public website may describe:

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
- Additional operational services approved by the Product Owner

No capability may be described as operational unless PackSendGo genuinely provides it or has an approved delivery partner.

## 10. Approved quotation workflow

The first-release quotation workflow shall:

1. Capture customer and company details.
2. Capture structured fulfilment requirements.
3. Validate the submission server-side.
4. Apply spam and rate-limit protection.
5. Store the quotation enquiry in MySQL.
6. Notify PackSendGo by transactional email.
7. Send a professional confirmation to the customer.
8. Record the submission and notification result.
9. Allow the PackSendGo team to respond manually.

V1 shall not automatically calculate or issue binding prices.

## 11. Approved future AI direction

A future release may introduce OpenAI-assisted quotation preparation.

The approved model is:

1. The customer supplies structured and unstructured information.
2. OpenAI interprets and normalises the information.
3. A deterministic PackSendGo pricing engine calculates charges.
4. OpenAI explains the calculated quotation in clear language.
5. A PackSendGo administrator reviews and approves the quotation.
6. The approved quotation is delivered to the customer.

OpenAI must not invent, infer or independently determine PackSendGo pricing.

## 12. Approved visual direction

The website shall use:

- A premium dark or dark-led visual identity
- Graphite or midnight surfaces
- Warm white typography
- Restrained electric blue accents
- Restrained signal-lime accents
- Generous spacing
- Strong editorial typography
- Refined motion
- High-quality real warehouse imagery
- Original 3D warehouse elements
- Clear conversion controls

The website shall avoid:

- Generic logistics templates
- Cartoon warehouse illustrations
- Excessive gradients
- Excessive glass effects
- Decorative animation without purpose
- Crowded navigation
- Fabricated statistics
- Fabricated testimonials
- Unauthorised platform or courier logos
- Copied third-party website layouts
- Visual effects that harm performance or accessibility

## 13. Approved 3D strategy

PackSendGo shall use a layered visual strategy.

### 13.1 Stylised warehouse experience

Spline is the preferred V1 technology for the stylised interactive warehouse.

The visual may show:

- Goods in
- Inspection
- Storage
- Picking
- Packing
- Dispatch
- Returns

The interactive experience must remain optional and must not contain essential information unavailable elsewhere on the page.

### 13.2 Real warehouse evidence

The Warehouse page may include:

- Real warehouse photography
- A guided warehouse film
- A Matterport walkthrough
- A 360-degree walkthrough
- Operational section hotspots

Large walkthrough content must load only after deliberate user interaction.

### 13.3 Mobile and accessibility fallbacks

The site must provide:

- A static poster displayed before 3D loads
- A lightweight video fallback where appropriate
- A still-image fallback for weak devices
- Reduced-motion support
- Normal HTML content outside the 3D canvas
- Accessible controls for changing warehouse stages

## 14. Approved technology

The approved V1 stack is:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js
- Prisma
- MySQL
- Hostinger Cloud Startup
- GitHub
- Spline
- Matterport or approved video platform
- Transactional email provider
- Cloudflare Turnstile or equivalent spam protection

The application shall target a Node.js version supported by Hostinger and the selected Next.js release.

## 15. Development tools

Approved development tools include:

- Google Stitch for interface design
- Stitch MCP for approved design retrieval
- Cursor for implementation
- Spline for interactive 3D
- Figma where additional design refinement is needed
- GitHub for source control
- Hostinger for deployment

Development tools do not replace the project authority or Product Owner approval.

## 16. Roles and responsibilities

### Product Owner

The Product Owner:

- Approves scope
- Approves design
- Approves copy
- Approves assets
- Approves service claims
- Approves integrations
- Approves production release
- Runs or explicitly authorises Git actions

### ChatGPT

ChatGPT acts as:

- Programme architect
- Scope controller
- Documentation authority
- Design-review assistant
- Technical-review assistant
- Cursor prompt author
- Acceptance assistant

### Cursor

Cursor acts as the implementation agent.

Cursor may:

- Analyse the repository
- Create and edit approved files
- Implement approved designs
- Run approved local checks
- Produce implementation reports

Cursor must not:

- Run Git commands
- Push or deploy code
- Change scope
- Invent services
- Replace approved architecture
- Add packages without justification
- Redesign approved screens without authority
- Introduce customer accounts or portals
- Introduce automatic pricing
- Introduce AI features during V1
- Claim work is accepted on behalf of the Product Owner

## 17. Git governance

The Product Owner controls Git.

Cursor must not run:

- `git add`
- `git commit`
- `git push`
- `git merge`
- `git rebase`
- `git tag`
- Destructive Git commands

Work shall use scoped branches.

Suggested branch sequence:

- `docs/project-foundation`
- `design/stitch-design-authority`
- `feature/frontend-foundation`
- `feature/homepage`
- `feature/public-pages`
- `feature/warehouse-experience`
- `feature/quotation-form`
- `feature/email-and-lead-storage`
- `release/v1-launch`

Every implementation phase requires:

1. Approved authority
2. Scoped implementation
3. Automated validation
4. Browser validation
5. Product Owner acceptance
6. Product Owner-controlled commit and push

## 18. V1 exclusions

The following are not part of V1:

- Customer registration
- Customer login
- Customer dashboard
- Live inventory
- Shipment tracking
- Carrier APIs
- Ecommerce-platform API integrations
- Automatic price calculation
- Automatic binding quotations
- Online payments
- AI chatbot
- AI pricing
- Mobile application
- Customer file uploads
- Live WebSocket features
- Redis
- Background worker infrastructure
- Self-hosted AI
- Fully explorable custom WebGL warehouse
- Large content-management system
- Multi-tenant functionality

These items require separate authority and planning.

## 19. Hosting authority

The website shall be deployed to Hostinger Cloud Startup.

The architecture shall therefore:

- Use MySQL
- Use a supported Node.js runtime
- Avoid Hostinger-hosted incoming WebSocket requirements
- Avoid Redis dependencies
- Avoid PostgreSQL dependencies
- Avoid Vercel-only runtime features
- Use external transactional email
- Use external object storage if uploads are later introduced
- Treat Spline and Matterport as external visual services
- Optimise media and 3D assets for browser delivery

## 20. Quality requirements

The launch must satisfy:

- Responsive desktop and mobile presentation
- Strong accessibility fundamentals
- Keyboard-accessible controls
- Reduced-motion support
- Server-side form validation
- Spam protection
- Secure environment-variable handling
- Meaningful loading states
- Useful error states
- Search metadata
- Sitemap
- Structured data where applicable
- Security headers
- Privacy compliance
- Optimised images and media
- No dummy content
- No lorem ipsum
- No broken links
- No fabricated claims
- No visible template residue

## 21. Acceptance rule

No phase is complete merely because implementation exists.

A phase is complete only when:

1. Its approved scope has been implemented.
2. Required checks pass.
3. Browser validation is complete.
4. Mobile validation is complete.
5. Material defects are resolved or explicitly deferred.
6. Documentation is updated.
7. The Product Owner explicitly accepts the phase.

## 22. Authority precedence

Where instructions conflict, use this order:

1. Latest explicit Product Owner decision
2. This project authority
3. Approved phase specification
4. Approved design authority
5. Approved technical architecture
6. Approved implementation prompt
7. Existing code
8. Implementation-agent inference

Implementation-agent inference has the lowest authority.
