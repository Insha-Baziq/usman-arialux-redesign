# Sobha Homepage Clone Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a pixel-perfect clone of `https://sobharealty.com/` homepage at `src/app/page.tsx` inside `my-clone`.

**Architecture:** Keep the existing template structure and replace only the placeholder homepage. Extract the live page into auditable docs, wire the global Sobha design foundation into the app, then implement focused homepage sections and assemble them into a single route.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui, browser automation, Node.js scripts for asset download.

---

### Task 1: Safe Workspace Setup

**Files:**
- Modify: `.gitignore`
- Create: `.worktrees/sobha-homepage-clone/` via `git worktree`

**Step 1: Verify project-local worktree path is ignored**

Run: `git check-ignore -q .worktrees`
Expected: success exit code.

**Step 2: Create isolated worktree**

Run: `git worktree add .worktrees/sobha-homepage-clone -b sobha-homepage-clone`
Expected: new branch and worktree created.

**Step 3: Verify baseline in worktree**

Run: `npm run check`
Expected: lint, typecheck, and build pass before clone work starts.

### Task 2: Reconnaissance Artifacts

**Files:**
- Create: `docs/design-references/sobha-home-desktop.png`
- Create: `docs/design-references/sobha-home-mobile.png`
- Create: `docs/research/BEHAVIORS.md`
- Create: `docs/research/PAGE_TOPOLOGY.md`
- Create: `docs/research/DESIGN_TOKENS.md`

**Step 1: Capture desktop and mobile screenshots**

Use browser tooling to save full-page reference images at 1440px and 390px widths.

**Step 2: Record behavior sweep**

Document header behavior, scroll effects, hover changes, media playback, and responsive shifts in `docs/research/BEHAVIORS.md`.

**Step 3: Record page topology**

Map the homepage sections top-to-bottom in `docs/research/PAGE_TOPOLOGY.md`.

**Step 4: Record design tokens**

Extract fonts, colors, spacing patterns, border radii, shadows, and breakpoint observations into `docs/research/DESIGN_TOKENS.md`.

### Task 3: Global Foundation

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/components/icons.tsx`
- Create: `src/types/sobha.ts`
- Create: `scripts/download-assets.mjs`
- Create/modify: files under `public/images/`, `public/videos/`, `public/seo/`

**Step 1: Update metadata and fonts**

Wire the Sobha font stack and baseline metadata in `src/app/layout.tsx`.

**Step 2: Update global tokens**

Replace template defaults in `src/app/globals.css` with Sobha color and typography tokens plus page-wide utility styles needed for fidelity.

**Step 3: Add shared types and icons**

Create minimal interfaces and extracted icon components used across the homepage.

**Step 4: Download source assets**

Implement `scripts/download-assets.mjs`, run it, and place the required source assets under `public/` with meaningful names.

**Step 5: Verify foundation**

Run: `npm run build`
Expected: clean production build after foundation changes.

### Task 4: Homepage Sections

**Files:**
- Create: `src/components/SobhaHeader.tsx`
- Create: `src/components/SobhaHero.tsx`
- Create: additional section components as determined by topology
- Modify: `src/app/page.tsx`

**Step 1: Implement sections in page order**

Create focused components using extracted content, exact token values, and real assets.

**Step 2: Assemble homepage**

Import the sections into `src/app/page.tsx` and match the source page order and spacing.

**Step 3: Add interaction behavior**

Implement the specific lightweight interactions required for fidelity, such as header state shifts, sliders, or reveal motion, without broad over-engineering.

**Step 4: Verify route render**

Run: `npm run build`
Expected: homepage compiles cleanly in the app router.

### Task 5: Verification And QA

**Files:**
- Update: `docs/research/BEHAVIORS.md` if implementation differences are discovered
- Update: `docs/research/PAGE_TOPOLOGY.md` if section boundaries change during build

**Step 1: Run full repo verification**

Run: `npm run check`
Expected: all checks pass.

**Step 2: Compare against source**

Use browser tooling to compare the implemented homepage against Sobha at desktop and mobile widths.

**Step 3: Close fidelity gaps**

Tighten spacing, typography, asset choice, and interaction timing until the most visible differences are resolved.

**Step 4: Summarize remaining gaps**

Document any intentional approximations or unresolved issues before moving on to the AriaLux adaptation phase.
