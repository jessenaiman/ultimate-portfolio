# Project Plan: React/Design to Astro + shadcn Migration

## Project Overview
Migration of components from the reactbits React/Design system to a modern Astro-based architecture using shadcn UI and TypeScript.

## Technical Stack
- **Framework**: Astro v5+
- **UI Library**: shadcn UI
- **Styling**: Tailwind CSS v4.1+ (CSS-based)
- **Animation**: GSAP (where needed)
- **Language**: TypeScript

## Migration Guidelines

### 1. Code Organization
- **Source Directory**: `/src/components/React/reactbits/`
- **Target Directories**: 
  - `/src/components/Astro/` for Astro components
  - `/src/components/React/` for React components
- **Assets**: Move to `/public/assets/` with organized subdirectories

### 2. Component Conversion Rules
- **Use Astro (`.astro`)** for:
  - Static content
  - Simple interactive components
  - Page layouts and routing
- **Use React (`.tsx`)** for:
  - Complex interactive components
  - Stateful UI
  - Components with heavy client-side logic

### 3. Styling Standards
- Primary: shadcn UI components
- Secondary: Tailwind utility classes
- Avoid: Custom CSS unless absolutely necessary
- Process:
  1. Replace daisyUI with shadcn components
  2. Use Tailwind utilities for customizations
  3. Only add custom CSS for complex cases

### 4. TypeScript Requirements
- All client-side code must be TypeScript
- Use `<script lang="ts">` in Astro components
- Define proper types and interfaces
- Enable strict type checking

### 5. Animation & Interactivity
- Use GSAP for complex animations
- For simple transitions, prefer CSS transitions
- Ensure animations are performant and accessible

## Migration Process

### Phase 1: Preparation
1. Set up shadcn UI components
2. Create necessary utility functions
3. Establish testing patterns

### Phase 2: Component Migration
1. Start with high-priority components
2. Convert one component at a time
3. Test thoroughly before moving to the next

### Phase 3: Integration
1. Update imports and references
2. Test component interactions
3. Optimize performance

### Phase 4: Cleanup
1. Remove legacy code (after user approval)
2. Update documentation
3. Final testing

## Progress Tracking

### Landing Components (`src/components/React/reactbits/components/landing/`)

| Component       | Status         | Notes                                                                                 |
|-----------------|----------------|---------------------------------------------------------------------------------------|
| `Hero`          | ✅ Done        | Converted to `Hero.astro` with GSAP SplitText/fade; integrated. Source retained.      |

## Important Notes
- **DO NOT** delete original files until user confirms the migration is successful
- **DO NOT** downgrade Astro or Tailwind versions
- **DO** maintain existing animations and interactions
- **DO** ask for clarification if requirements are unclear

## Support
For questions or issues, consult:
- Astro Documentation: https://docs.astro.build
- shadcn UI Documentation: https://ui.shadcn.com
- Tailwind CSS v4 Docs: https://tailwindcss.com/blog/tailwindcss-v4
| `FeatureCards`  | 🟡 In Progress | `FeatureCards.astro` created & integrated; asset mapping updated; keep JSX until OK.  |
| `DisplayHeader` | ❌ Not Started |                                                                                       |
| `Footer`        | ❌ Not Started |                                                                                       |
| `PlasmaWave`    | ❌ Not Started |                                                                                       |
| `StartBuilding` | ❌ Not Started |                                                                                       |
| `Testimonials`  | ❌ Not Started |                                                                                       |

## Design Pages (`src/pages/design/`)

| Page                    | Status         | Notes                                  |
|-------------------------|----------------|----------------------------------------|
| `animation.astro`       | ❌ Not Started | Convert to shadcn/Tailwind 4 patterns  |
| `design-layouts.astro`  | ❌ Not Started | Replace daisyUI with shadcn equivalents |
| `effects.astro`         | ❌ Not Started |                                         |
| `mobile.astro`          | ❌ Not Started |                                         |
| `three.astro`           | ❌ Not Started |                                         |
| `transitions.astro`     | ❌ Not Started |                                         |

---
**Legend:**
- ✅ Done: Component fully converted and integrated; original files retained until user confirms.
- 🟡 In Progress: Conversion started; pending verification or cleanup.
- ❌ Not Started: Conversion has not yet begun.
