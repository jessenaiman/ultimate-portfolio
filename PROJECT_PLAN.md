# Design / Preview System Migration Plan (Astro + shadcn/ui)

This document tracks ONLY the Design Preview system migration. It intentionally excludes unrelated landing, resume, or multi-framework demo components. Status labels are factual; completion is NOT assumed anywhere.

---

## 1. Scope

Migrate the legacy React “Preview” / “reactbits” demo + control system into an Astro + shadcn/ui architecture:
- Provide interactive property controls (inputs, selects, sliders, switches).
- Dynamically apply style/state changes to demo content.
- Support reset, customization panels, and transition demos.
- Establish a reliable abstraction for future design pages.

NOT in scope (for this phase):
- Full site-wide design system documentation.
- Non-preview marketing components.
- Cross-framework parity (Vue/Svelte/Solid versions).
- Production theming system beyond minimal Tailwind + shadcn usage.

---
## 1a. Directory Layout (Post-Restructure)

| Layer | Directory | Contents | Notes |
|-------|-----------|----------|-------|
| Astro presentation components | `src/components/astro/` | All `.astro` files including `Preview*.astro`, layout, marketing, utility shells | Separated to avoid name collisions with React + keeps SSR-friendly pieces isolated |
| React interactive components | `src/components/react/` | All `.tsx` including `preview/PreviewWrapper.tsx` and other interactive demos | Houses stateful / client logic; must not duplicate names with Astro counterparts |
| Preview React subfolder | `src/components/react/preview/` | `PreviewWrapper.tsx`, `DemoBox.tsx`, control components | Target location for config/state/StyleInjector artifacts |
| Third‑party (shadcn/radix) primitives | `src/components/ui/` | Generated shadcn/ui primitives (`button.tsx`, `input.tsx`, etc.) | DO NOT EDIT (treat as vendor) |
| Legacy (frozen) | `.legacy/` | Original reactbits / deprecated sources | Reference only; do not re-import |
| Config / global | root + `astro.config.mjs` | Build and integration config | Add rationale comment for exclusions |

Primary integration page in scope: `src/pages/design/transitions.astro`. Other design pages are explicitly out of scope for this migration phase.

Path assumptions in the rest of this plan reflect this separation.

## 2. Current Status Overview (Factual)

Infrastructure established; redundant Astro control shells removed (only React control components retained). Functional interactivity is PARTIAL:
- Controls render.
- State wiring is incomplete.
- No dynamic CSS injection pipeline implemented yet.
- No prop typing standardization.
- No test coverage.
- No GSAP integration.
- PreviewWrapper currently acts as a thin pass-through rather than an orchestration layer.

---

## 3. Component Inventory & Status

| File | Role | Status (Factual) | Missing / Gaps |
|------|------|------------------|----------------|
| `src/components/astro/Preview.astro` | Top-level container (layout + slots) | Structural only | No conditional regions; no error boundaries |
| `src/components/react/preview/PreviewWrapper.tsx` | React coordination layer | Partial | No central schema/context; no CSS var injection; no batching |
| `src/components/astro/BackgroundDemoContent.astro` | Static background demo area | Present | Not parameterized |
| `src/components/astro/Customize.astro` | Control panel container | Present | No prop contract doc |
| `src/components/react/preview/Customize.tsx` | Grouped controls wrapper | Present | Not config-driven |
| `src/components/astro/PreviewInput.astro` | Input shell (removed) | Removed | N/A (duplicate eliminated; React version authoritative) |
| `src/components/react/preview/PreviewInput.tsx` | Input control logic | Present | Missing type-safe mapping; debounce |
| `src/components/astro/PreviewSelect.astro` | Select shell (removed) | Removed | N/A (duplicate eliminated; React version authoritative) |
| `src/components/react/preview/PreviewSelect.tsx` | Select control | Present | No option typing / disabled logic |
| `src/components/astro/PreviewSlider.astro` | Slider shell (removed) | Removed | N/A (duplicate eliminated; React version authoritative) |
| `src/components/react/preview/PreviewSlider.tsx` | Slider control | Present | Lacks clamping + a11y labels |
| `src/components/astro/PreviewSwitch.astro` | Switch shell (removed) | Removed | N/A (duplicate eliminated; React version authoritative) |
| `src/components/react/preview/PreviewSwitch.tsx` | Switch control | Present | Keyboard handling unverified |
| `src/components/astro/PropTable.astro` | Static prop table | Present | Not data-driven |
| `src/components/astro/RefreshButton.astro` | Button wrapper | Present | No loading/disabled handling |
| `src/components/react/preview/RefreshButton.tsx` | Reset logic | Present | Local only; no scoped/global modes |
| `src/components/react/preview/DemoBox.tsx` | Demo content wrapper | Present | No variant system; not reading CSS vars |
| `src/components/react/preview/TransitionsDemo.tsx` | Transition example | Present | Not under unified control schema |
| `src/pages/design/transitions.astro` | Integration page (sole focus) | Present | Single scenario only |
| `astro.config.mjs` | Build config | Updated | Needs rationale comment for legacy exclusion |
| `src/components/ui/*` | Third‑party primitives (shadcn) | Vendor | Do not modify directly |

---

## 4. Recent Edits (Most Recent First)

Order is based on this assistance session; only the project plan has been modified in this iteration. Source component code NOT altered in this pass.

1. `PROJECT_PLAN.md` (current rewrite to remove completion claims; inserted factual audit).
2. Prior (before this audit): Creation/import of Preview component files (exact timestamps not enumerated here—would require `git log` review).
3. Legacy relocation: Movement of original `reactbits` into `.legacy/` (not edited here; assumed pre-existing).

If a precise chronological diff is needed: action item to run `git log --name-status` filtering on `src/components/react/preview/`.

---

## 5. Active Work Items (Immediate, Blocking)

| Priority | Task | Target File(s) | Notes |
|----------|------|----------------|-------|
| P0 | Define canonical control schema | `PreviewWrapper.tsx`, all control React files | Single source-of-truth object for controls |
| P0 | Implement runtime state propagation → style | `PreviewWrapper.tsx`, `DemoBox.tsx` | Decide CSS vars vs inline style vs data attributes |
| P0 | Add reset strategy (scoped + global) | `RefreshButton.tsx`, `PreviewWrapper.tsx` | Provide idempotent initial state builder |
| P1 | Type definitions for control config | `types/preview.d.ts` (to create) | Strong typing to prevent drift |
| P1 | Accessibility pass on controls | Control React files | ARIA roles, labels |
| P2 | Add GSAP integration stub | `TransitionsDemo.tsx` | Abstract animation triggers |
| P2 | Draft prop documentation generator | `PropTable.astro` | Accept JSON contract |

---

## 6. Technical Gaps (Unresolved)

| Area | Gap Description | Proposed Approach |
|------|-----------------|-------------------|
| State Model | Each control manages isolated local state; no aggregated model | Introduce `const controlsConfig = { ... }` and derive state via reducer or `useState` map |
| Dynamic Styles | No mechanism to convert state → visual changes | Generate a `<style>` block with CSS variables on container |
| Namespacing | Collisions possible on multiple Preview instances | Use instance id (UUID or incremental) prefix for vars: `--pv-[id]-[token]` |
| Reset Logic | Hard-coded initial values scattered | Centralize initial snapshot in config; deep clone on reset |
| Validation | No guard rails for slider ranges and select option integrity | Pre-validate config at component mount (throw or warn) |
| Documentation | PropTable static | Autogenerate from control config (name, type, default, description) |
| Animation Integration | GSAP absent | Provide adapter function `registerAnimation(controlsState)` |
| Error Handling | No boundary around interactive tree | Add React Error Boundary wrapper around `PreviewWrapper` |
| Testing | No unit or interaction tests | Start with vitest + react-testing-library for core control loop |
| Theme | No dark/light sync | Use `data-theme` + CSS variable pivot later |
| Performance | Re-renders per keystroke | Debounce expensive derivations (only style commit) |

---

## 7. Implementation Tasks Backlog (Prioritized Buckets)

### Configuration & State
- [ ] Create `controlsConfig` object (defines: id, label, type, default, options, transform?)
- [ ] Generate initial state and derived view model in `PreviewWrapper.tsx`
- [ ] Add context provider (React) exporting state + dispatch

### Dynamic Styling
- [ ] Decide mapping strategy (CSS vars vs inline)
- [ ] Implement style injection component
- [ ] Support transform functions (e.g. slider 0–100 → `0ms–2000ms`)

### Controls
- [ ] Refactor each control to consume context
- [ ] Add disabled/loading states placeholder
- [ ] Add accessibility audits (tab / space / enter)

### Reset & Lifecycle
- [ ] Full reset (global)
- [ ] Partial reset (single control future)
- [ ] Persist last state (optional flag, phase later)

### Documentation
- [ ] Emit JSON contract from `controlsConfig`
- [ ] Render rows in `PropTable.astro`
- [ ] Add description + category fields to config

### Animation Layer
- [ ] Insert optional GSAP hook file `previewAnimations.ts`
- [ ] Provide registration stub in `TransitionsDemo.tsx`

### Typing
- [ ] Add `ControlType` union
- [ ] Add `ControlConfig` interface
- [ ] Add `ControlValueMap` inference

### Testing (Deferred until base stable)
- [ ] Unit for config → initial state
- [ ] Interaction test: input updates style var
- [ ] Reset restores defaults

---

## 8. File Ownership / Next Action (Proposed)

| File | Next Action |
|------|-------------|
| `src/components/react/preview/PreviewWrapper.tsx` | Implement config-driven state + context provider |
| `src/components/react/preview/PreviewInput.tsx` | Refactor to use context; add typing |
| `src/components/react/preview/PreviewSelect.tsx` | Add context usage; validate options length > 0 |
| `src/components/react/preview/PreviewSlider.tsx` | Add clamping + aria attributes |
| `src/components/react/preview/PreviewSwitch.tsx` | Verify keyboard toggle logic |
| `src/components/react/preview/DemoBox.tsx` | Consume injected CSS vars and apply classes |
| `src/components/react/preview/RefreshButton.tsx` | Hook into new reset dispatcher |
| `src/components/astro/PropTable.astro` | Accept generated JSON data prop |
| `src/components/react/preview/TransitionsDemo.tsx` | Integrate GSAP hook stub (deferred) |

---

## 9. Risk Log

| Risk | Impact | Mitigation |
|------|--------|------------|
| Ad-hoc state growth | Harder to refactor later | Lock config pattern early |
| CSS collision | Multiple previews break | Namespace vars per instance |
| Over-coupling to React | Harder future cross-framework adoption | Keep config & transforms framework-agnostic |
| Missing accessibility | Exclusion for users | Audit before feature expansion |
| Scope creep (docs, themes) | Delays core functionality | Gate via backlog ordering |

---

## 10. Architectural Pattern (Target)

High-level flow (target):
```
controlsConfig -> buildInitialState() -> PreviewWrapper (context provider)
   |-> Control components (consume + dispatch updates)
   |-> State derivation: deriveCSSVariables(state)
   |-> StyleInjector component adds <style> with namespaced vars
   |-> DemoBox reads vars via CSS (no prop drilling)
   |-> RefreshButton triggers reset(dispatch)
```

Key principle: DO NOT push presentation computations into each control; centralize in wrapper.

---

## 11. Immediate Concrete Next Steps (Actionable Sequence)

1. Define `controlsConfig` skeleton in `PreviewWrapper.tsx`.
2. Implement `buildInitialState(config)`.
3. Add React context (state + update function).
4. Refactor one control (`PreviewInput.tsx`) as reference implementation.
5. Add `StyleInjector` that maps state → CSS variables on a container element.
6. Wire `RefreshButton.tsx` to call reset from context.
7. Verify end-to-end: changing input updates CSS var reflected in `DemoBox.tsx`.
8. Generalize refactor to other controls.
9. Generate lightweight JSON for `PropTable.astro`.
10. Log gaps for animation integration (defer until stable).

---

## 12. Verification Criteria (When You Validate, Not Auto-Claimed)

A baseline interactive preview is considered “functionally established” ONLY IF:
- All controls read from centralized state.
- Updating any control updates a CSS variable visible in dev tools.
- Reset fully restores defaults deterministically.
- No console errors or React warnings.
- PropTable renders rows sourced from config (even if minimal).

(These are *criteria*, not yet met.)

---

## 13. Required New Artifacts (To Create)

| Path (Proposed) | Purpose |
|-----------------|---------|
| `src/types/preview.d.ts` | Central types |
| `src/components/react/preview/controlsConfig.ts` | Control schema definition (separate file; keeps wrapper lean) |
| `src/components/react/preview/StyleInjector.tsx` | Style/CSS variable injection component |
| `src/components/react/preview/previewAnimations.ts` | GSAP hook stub (later) |
| (Note) `src/components/ui/*` | Remains vendor; do not place custom logic here |

---

## 14. Open Questions (Need Explicit Decisions Later)

| Question | Placeholder Options |
|----------|---------------------|
| Persist state across page nav? | localStorage / session / no persistence |
| CSS variables naming convention? | `--pv-[id]-[controlId]` |
| Support multiple preview instances per page? | Yes (namespace required) |
| Animation trigger model? | Derived on state change vs explicit invoke |

---

## 15. Summary (Neutral)

All structural files exist. Functional layer (state orchestration, CSS variable injection, prop documentation, animation, tests, typing depth) remains incomplete. This plan enumerates specific gaps and the exact next file-level actions required.
