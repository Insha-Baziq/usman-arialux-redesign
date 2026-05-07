# Sobha Homepage Clone Design

**Goal:** Clone `https://sobharealty.com/` homepage into the `my-clone` template with pixel-perfect fidelity as the phase-1 baseline for later AriaLux adaptation.

## Scope
- In scope: homepage only, including visible layout, typography, colors, imagery, responsive behavior, and key interactions.
- Out of scope for this phase: inner pages, CMS integration, AriaLux rebranding, deployment, and SEO hardening beyond carrying over the source metadata needed for fidelity.

## Chosen Approach
- Use the existing `my-clone` repo exactly as intended by the template.
- Replace the placeholder homepage in `src/app/page.tsx` with an assembled Sobha homepage.
- Keep extracted artifacts in `docs/research/` and `docs/design-references/`.
- Update global foundation files (`src/app/layout.tsx`, `src/app/globals.css`) only as needed to match Sobha's shared tokens and assets.
- Perform work in a project-local git worktree under `.worktrees/` so the base repo stays clean.

## Architecture
- `src/app/page.tsx` becomes the top-level homepage composition.
- Page sections live in `src/components/` as focused React components sized to the template's component-spec workflow.
- Shared icons and reusable primitives are extracted into `src/components/icons.tsx` and existing UI helpers where needed.
- Global design tokens, font wiring, and page-wide behaviors live in `src/app/globals.css` and `src/app/layout.tsx`.
- Research artifacts document the clone source of truth before or alongside implementation.

## Workflow
1. Set up a safe local worktree and verify the template baseline builds.
2. Inspect the live Sobha homepage with browser tooling at desktop and mobile sizes.
3. Capture screenshots, topology, behaviors, and design tokens in `docs/research/`.
4. Build the global foundation: fonts, metadata, colors, base styles, and downloaded assets.
5. Implement the homepage section-by-section in the template app.
6. Run `npm run check` and compare the result visually against Sobha.

## Success Criteria
- `my-clone` renders a recognizable Sobha homepage clone at `/`.
- Desktop and mobile layouts follow the source structure closely.
- Real source content and assets are used wherever practical.
- The app passes `npm run check` after implementation.

## Risks
- The repo uses Next.js 16 and must be treated according to the local docs, not assumptions from older versions.
- The clone skill expects browser automation; if browser tooling fails, extraction speed and fidelity will drop.
- Sobha may use animation or media patterns that need selective approximation to keep the implementation maintainable while preserving the visual result.
