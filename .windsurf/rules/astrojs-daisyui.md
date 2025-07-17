---
trigger: always_on
---



## 🛠️ Tech Stack & Structure

This is a portfolio website that demonstrates the use of multiple frameworks as orchestrated by Astro. Each page should be considered an isolated marketing and employment opportunity.

### Core Website Packages:

- **Astro 5+ (`.astro`)**: The primary tool for building the site shell. Astro components are used for layouts and static content.
- **DaisyUI 5+ **: Use @web https://daisyui.com/llms.txt or context7 to confirm and document code changes with links for developers to perform code review
- **Tailwindcss 4+ **: [framework guide](https://tailwindcss.com/docs/installation/framework-guides/astro)

###Layouts:
- Two layouts exist, one for Markdown blog posts (BlogPostLayout.astro) and (Layout.astro)
- These two layouts must inherit from BaseLayout.astro which will contain the unified layout for overall elements

### Menu and Navigation:
- uses daisyui components and themes
- should use a combination of [navbar](https://daisyui.com/components/navbar/) and Menu (https://daisyui.com/components/menu/)

## Header and Footer:
- These should be referenced as components from BaseLayout components 

### Demo Webpages:

- **Framework Components are demo pages to demonstrate to employers (`.tsx`, `.svelte`, `.vue`, `.jsx`)**: React, Svelte, Vue, and Solid are used for islands of interactivity.

### Blog Pages: 

- Guide url: https://docs.astro.build/en/guides/markdown-content/
- Use frontmatter according to the astrojs 5+ documentation and do not deviate  

Example: 

```astro
---
import * as greatPost from './posts/great-post.md';
const posts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));
---

<p>{greatPost.frontmatter.title}</p>
<p>Written by: {greatPost.frontmatter.author}</p>

<p>Post Archive:</p>
<ul>
  {posts.map(post => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}
</ul>
```

## 💅 Styling Strategy
- **Styling**: A combination of `daisyUI` and `TailwindCSS` is used for all styling.
- **Layout**: Use tailwindcss while making sure to adhere to the daisyui documentation. Daisyui provides utility classes and variables, and some basic layout examples which are expected to be referenced in code documents with links
- **Theming**: The site supports multiple themes, which are managed by `daisyUI` through 'global.css' There is a theme-controller that daisyui uses and needs to be referenced for changing themes. 
- **Colors**:
- Do not modify individual themes
- use semantic color utility classes like:

    bg-primary
    bg-secondary
    bg-accent
-

## Editing Rules:
- all new files and revisions must have a link to the proper documentation for code review