---
trigger: always_on
---

You are absolutely right to point that out. An oversight on my part. `daisyUI` is a key part of the styling strategy and definitely needs to be included in the rules.

Based on your project's configuration, `daisyUI` acts as a plugin for Tailwind CSS, providing a component-based class system (`btn`, `card`, etc.) to speed up development while still allowing for customization with standard Tailwind utility classes.

Here is the updated version of the private Windsurf instructions, now including a dedicated section for `daisyUI`.

-----

### Private Windsurf Instructions (v2)

**File Location:** `.windsurf/rules/PROJECT_CONVENTIONS.md`

```markdown
# 🏄‍♂️ Windsurf Rules for the Ultimate Portfolio Project

These are the guiding principles and conventions for working on this project. They apply to both human developers and AI assistants like Windsurf. Following these rules ensures our codebase remains clean, consistent, and performant.

## 🛠️ Tech Stack & Structure

The project uses a multi-framework approach orchestrated by Astro.

-   **Astro (`.astro`)**: The primary tool for building the site shell. Astro components are used for layouts and static content.
-   **Framework Components (`.tsx`, `.svelte`, `.vue`, `.jsx`)**: React, Svelte, Vue, and Solid are used for islands of interactivity.
    -   Components are located in `src/components/{FrameworkName}/`.
    -   Shared, framework-agnostic UI elements can be found in `src/components/ui/`.
-   **TypeScript**: All new code must be strongly typed. Enable strict mode in your TypeScript settings.
-   **Styling**: A combination of `daisyUI` and `TailwindCSS` is used for all styling.

## 💅 Styling Strategy

All styling is managed through utility classes. Do not write custom CSS files.

-   **`daisyUI` for Components**: Use `daisyUI` component classes (`btn`, `card`, `alert`, etc.) as the base for all UI elements. This ensures a consistent look and feel across the application. The `daisyUI` configuration and theme settings can be found in `tailwind.config.mjs`. Th
-   **`TailwindCSS` for Customization**: Use standard TailwindCSS utility classes to modify or override `daisyUI` component styles. For example, to make a primary button full-width, use `<button class="btn btn-primary w-full">`. This approach provides both speed and flexibility.
-   **Theming**: The site supports multiple themes, which are managed by `daisyUI` in the `tailwind.config.mjs` file. When adding new components, use semantic color classes (`primary`, `secondary`, `accent`, etc.) to ensure they work correctly with all themes.

## 📁 File Naming & Structure Conventions

-   **Directories**: Use `kebab-case` for all new directories.
-   **Component Files**: Use `PascalCase` for component files (e.g., `MyComponent.tsx`, `MyComponent.vue`).
-   **Astro Pages**: Use `kebab-case.astro` for pages in the `src/pages` directory (e.g., `about-us.astro`).
-   **Astro Layouts**: Use `PascalCaseLayout.astro` for layouts in `src/layouts` (e.g., `MainLayout.astro`).

## 🎨 Component Authoring Rules

-   **Hydration is Intentional**: Use Astro's `client:*` directives to hydrate components. Only hydrate when absolutely necessary. Default to static components.
-   **Typed Props**: All components must have typed props. Use TypeScript interfaces for this.
-   **Embrace Each Framework's Strengths**:
    -   **React**: Always use functional components and hooks. Avoid class components.
    -   **Vue**: Always use the Composition API with the `<script setup>` syntax.
    -   **Svelte**: Leverage its reactive statements and minimal boilerplate. Keep component logic concise.
    -   **Solid**: Use signals for all state management.

## ✍️ Content & Data

-   **Astro Content Collections**: All primary content (blog posts, job history, project details) must be managed through Astro's content collections, with schemas defined in `src/content/config.ts`.
-   **Site Data**: Global, site-wide configuration (like navigation links or social media handles) should be stored in the `src/data/` directory.

## ✅ Testing

-   **E2E Tests**: Use Playwright for end-to-end testing. Tests are located in the `tests/` directory.
-   **Test Focus**: Write tests for critical user journeys:
    1.  Page navigation and accessibility.
    2.  Theme switching.
    3.  Interactivity within hydrated framework components (e.g., form submissions, UI updates).
-   **Playwright Configuration**: The primary configuration is in `playwright.config.ts`.

## 🤝 Contribution Workflow

1.  **Follow the Rules**: Adhere to all principles in this document.
2.  **Keep it Consistent**: When adding new code, ensure its style, structure, and naming conventions match the existing codebase.
3.  **Document New Patterns**: If you introduce a new, complex pattern or a helper function, add JSDoc comments to explain its purpose, parameters, and return value.
4.  **One Export Per File**: With the exception of type definitions, each file should have only one default or named export.
```