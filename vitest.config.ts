/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    include: ['src/test/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/setup.ts',
        'src/test/fixtures/',
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
