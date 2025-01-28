import { describe, it, expect } from 'vitest';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import fs from 'fs/promises';
import path from 'path';

describe('CSS Compilation Tests', () => {
  it('should compile global.css without errors', async () => {
    const globalCssPath = path.join(process.cwd(), 'src/styles/global.css');
    const css = await fs.readFile(globalCssPath, 'utf8');
    
    const result = await postcss([
      tailwindcss({
        content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
        theme: {
          extend: {
            colors: {
              accent: 'rgb(var(--accent) / <alpha-value>)',
              background: 'var(--background)',
              foreground: 'var(--foreground)',
              muted: 'var(--muted)',
              'muted-foreground': 'var(--muted-foreground)',
              'accent-foreground': 'var(--accent-foreground)',
              border: 'var(--border)',
            },
          },
        },
      })
    ]).process(css, { from: globalCssPath });

    expect(result.css).toBeTruthy();
    expect(result.warnings()).toHaveLength(0);
  });
});
