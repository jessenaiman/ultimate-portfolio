---
trigger: always_on
---

# Project Guidelines

---

## Core Development Principles

1. **Latest Stable Versions**: This project uses the latest stable versions of all frameworks. Use context7, web searches, from your mcp tools to verify with official documentation before suggesting solutions. 

2. **Astro-First Architecture**: 
   - Only use framework-specific components (React, Svelte, etc.) when explicitly needed for client-side interactivity

3. **Styling Guidelines - Strict Priority Order**:
   - **Step 1:** Use shadcn component classes (`card`, `btn`, `alert`) for all UI elements
   - **Step 2:** Apply Tailwind CSS utility classes (`mt-4`, `p-2`, `flex-col`) for customization
   - **Step 3:** Custom CSS in `<style>` blocks is prohibited unless absolutely necessary

---

## Project Structure

### Astro.js Architecture

- **File-Based Routing**: All pages are in `src/pages/` directory; file path determines URL route
- **Components**: Reusable UI elements are in `src/components/`
  - For framework components (React, Svelte, etc.), apply appropriate `client:*` directive
  - Default to Astro components unless interactivity is required

### File Organization

```
src/
├── components/  # Reusable UI components
│   ├── astro/   # Astro-specific components
│   ├── react/   # React components
│   ├── svelte/  # Svelte components
│   ├── solid/   # Solid components
│   ├── vue/     # Vue components
│   └── ui/      # Shared UI components
├── layouts/     # Page layout templates
├── pages/       # Route-based page components
└── styles/      # Global CSS files
    └── global.css  # Primary CSS file with Tailwind config
```

---

## Styling System

shadcn is integrated as a Tailwind CSS plugin that provides pre-styled component classes.

```css
/* From src/styles/global.css */
@import "tailwindcss";
```
- **DO NOT** use arbitrary Tailwind color utilities like `bg-blue-500` as they bypass the theme system
- **Component Structure**: Follow shadcn documentation
#### Examples:

```html
<!-- Button with variants -->
<button class="btn btn-primary btn-outline">Primary Button</button>

<!-- Card component -->
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card content goes here</p>
  </div>
</div>
```

### Tailwind CSS Utility Layer

Tailwind CSS provides utility classes for all custom styling needs beyond shadcn components.

- **Primary Use Cases**:
  - Layout (Flexbox, Grid): `flex`, `grid`, `grid-cols-3`
  - Spacing: `p-4`, `m-2`, `gap-6`
  - Typography: `text-lg`, `font-bold`, `italic`
  - Responsive design: `md:flex-row`, `lg:w-1/2`
  - Customizing daisyUI components: `btn hover:scale-105`

- **CSS Configuration**: The project uses TailwindCSS 4+ with the new CSS-based configuration
  - There is **NO** `tailwind.config.mjs` file
  - Configuration is in `src/styles/global.css` and `astro.config.mjs`
  - Uses `@tailwindcss/vite` plugin for integration


## 🔍 Additional Guidelines

### Framework-Specific Components

- Each framework (react, svelte, solid, vue) has its own folder in `src/components/`
- Use appropriate file extensions (`.tsx`, `.svelte`, `.vue`) 
- Always add appropriate client directives (`client:load`, `client:visible`, etc.)

### Responsive Design

- Follow a mobile-first approach
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- Test layouts across multiple viewport sizes

### Accessibility

- Use semantic HTML elements
- Maintain proper color contrast with daisyUI's content-paired colors
- Include proper ARIA attributes when needed
- Ensure keyboard navigation works for interactive elements

---

## Reference Documentation

- [Astro Documentation](https://docs.astro.build/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Project Styleguide](/src/content/info/styleguide.md)