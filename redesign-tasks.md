# Website Redesign Tasks

## Theme & Layout
- [ ] **Menu & Theme Controller**
  - [ ] Remove old dropdown markup from [Menu.astro](cci:7://file:///home/adam/Dev/UltimateAstroTemplate/src/components/ui/Menu.astro:0:0-0:0)
  - [ ] Insert `<ThemeController themes={themes} />` in navbar
  - [ ] Verify theme persistence across page reloads

- [ ] **Code Blocks**
  - [ ] Replace all `mockup-code` wrappers in [daisyui.astro](cci:7://file:///home/adam/Dev/UltimateAstroTemplate/src/pages/daisyui.astro:0:0-0:0) with `<Code>` component
  - [ ] Ensure Expressive Code styles are properly applied
  - [ ] Remove any conflicting CSS overrides

- [ ] **Layout Consistency**
  - [ ] Wrap main content sections in `article.card` on all pages
  - [ ] Ensure content boundaries align with navbar
  - [ ] Verify responsive behavior

## Website Stack Unification
- [ ] **New Styleguide Page**
  - [ ] Create `src/pages/styleguide.astro` with tabbed interface
  - [ ] Tabs: "Astro", "Tailwind CSS", "DaisyUI", "Style Guide"
  - [ ] Each tab loads content from respective markdown files
  - [ ] Maintain existing `article.card` layout for content

- [ ] **Cleanup**
  - [ ] Remove standalone pages: `astrojs.astro`, [tailwind.astro](cci:7://file:///home/adam/Dev/UltimateAstroTemplate/src/pages/tailwind.astro:0:0-0:0), [daisyui.astro](cci:7://file:///home/adam/Dev/UltimateAstroTemplate/src/pages/daisyui.astro:0:0-0:0)
  - [ ] Update navigation to point to new styleguide tabs
  - [ ] Ensure all internal links are updated

## Theme Polish
- [ ] **Theme Controller**
  - [ ] Themes don't work or follow daisyUI documentation

## Testing
- **You better check the terminal for errors every time you make a change**

## Documentation
- [ ] Update README with new structure
- [ ] Document theme customization process
- [ ] Add comments for future maintainers