/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.test.{js,ts,jsx,tsx}'],
    exclude: ['tests/**/*.spec.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/setup.ts',
        'tests/fixtures/',
        '**/*.d.ts',
      ],
    },
    deps: {
      inline: [/astro/, /@astrojs\//],
    },
  },
  resolve: {
    alias: {
      '@components': 'src/components',
      '@layouts': 'src/layouts',
      '@utils': 'src/utils',
    },
  },
});
