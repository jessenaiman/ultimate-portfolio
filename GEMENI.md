# UltimateAstroTemplate Project Guidelines

This context file provides essential information about the UltimateAstroTemplate project architecture, coding standards, and styling guidelines. Follow these instructions when generating or modifying code for this project.

---

## 🤖 Core Development Principles

1. **Latest Stable Versions**: This project uses the latest stable versions of all frameworks. Always cross-reference with official documentation before suggesting solutions.

2. **Astro-First Architecture**: 
   - All components and pages should be `.astro` files by default
   - Only use framework-specific components (React, Svelte, etc.) when explicitly needed for client-side interactivity

3. **Styling Guidelines - Strict Priority Order**:
   - **Step 1:** Use daisyUI component classes (`card`, `btn`, `alert`) for all UI elements
   - **Step 2:** Apply Tailwind CSS utility classes (`mt-4`, `p-2`, `flex-col`) for customization
   - **Step 3:** Custom CSS in `<style>` blocks is prohibited unless absolutely necessary

---

## 📂 Project Structure

### Astro.js Architecture

- **File-Based Routing**: All pages are in `src/pages/` directory; file path determines URL route
- **Components**: Reusable UI elements are in `src/components/`
- **Server-Side Logic**: Write data-fetching and processing code in component frontmatter (between `---` markers)
- **Client-Side Interactivity**: 
  - Use standard `<script>` tags for lightweight client-side JavaScript
  - For framework components (React, Svelte, etc.), apply appropriate `client:*` directive
  - Default to Astro components unless interactivity is required

### File Organization

```
src/
├── components/  # Reusable UI components
│   ├── Astro/   # Astro-specific components
│   ├── React/   # React components
│   ├── Svelte/  # Svelte components
│   ├── Solid/   # Solid components
│   ├── Vue/     # Vue components
│   └── ui/      # Shared UI components
├── layouts/     # Page layout templates
├── pages/       # Route-based page components
└── styles/      # Global CSS files
    └── global.css  # Primary CSS file with Tailwind/daisyUI config
```

---

## 🎨 Styling System

### daisyUI Component Layer

daisyUI is integrated as a Tailwind CSS plugin that provides pre-styled component classes. It is NOT a separate CSS framework.

```css
/* From src/styles/global.css */
@import "tailwindcss";
@plugin "daisyui" {
  themes: dark --default, light, cupcake, bumblebee, autumn, dracula;
}
```

- **Component-First Approach**: Start building UI elements with daisyUI component classes like `btn`, `card`, `modal`, `drawer`
- **Semantic Colors**: Use daisyUI theme-aware color classes (`bg-primary`, `text-accent`, `border-secondary`)
- **DO NOT** use arbitrary Tailwind color utilities like `bg-blue-500` as they bypass the theme system
- **Component Structure**: Follow daisyUI's component structure (e.g., `card` → `card-body` → `card-title`)

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

Tailwind CSS provides utility classes for all custom styling needs beyond daisyUI components.

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

#### Example of Proper Styling Approach:

```html
<!-- ✅ DO: Layer Tailwind utilities on daisyUI components -->
<div class="card w-full md:w-1/2 lg:w-1/3 mx-auto mt-8">
  <div class="card-body p-6 flex flex-col gap-4">
    <h2 class="card-title text-2xl mb-2">Card Title</h2>
    <p class="text-base-content/80">Content with opacity</p>
    <button class="btn btn-primary w-full sm:w-auto self-end">
      Action
    </button>
  </div>
</div>

<!-- ❌ DON'T: Create custom components when daisyUI provides them -->
<div class="bg-white rounded-lg shadow-lg p-4">
  <h2 class="text-xl font-bold mb-2">Custom Card</h2>
  <p>Content here</p>
  <div class="bg-blue-500 text-white rounded px-4 py-2 mt-4">Button</div>
</div>
```

---

## 🔍 Additional Guidelines

### Framework-Specific Components

- Each framework (React, Svelte, Solid, Vue) has its own folder in `src/components/`
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

## 📚 Reference Documentation

- [Astro Documentation](https://docs.astro.build/)
- [daisyUI Components](https://daisyui.com/components/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Project Styleguide](/src/content/info/styleguide.md)