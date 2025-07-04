// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ultimate-astro-template.vercel.app/",
  output: "static",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    react({
      include: ["**/React|Remix/**/*.{jsx,tsx}"],
    }),
    svelte({
      // Explicitly set the compiler options for Svelte 4
      compilerOptions: {
        hydratable: true,
      },
    }),
    vue({
      // Vue 3 specific options
      template: {
        compilerOptions: {
          // Enable reactivity transform
          reactivityTransform: true,
        },
      },
    }),
    solidJs({
      include: ["**/Solid/**/*.{jsx,tsx}"],
    }),
    sitemap(),
  ],

  build: {
    // Enable modern browser builds for better performance
    format: 'file',
    inlineStylesheets: 'auto',
  },

  // Improved Vite configuration
  vite: {
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'solid-js',
        'svelte',
        'vue',
      ],
      exclude: [
        '@astrojs/solid-js/client.js',
        '@astrojs/svelte/client.js',
      ],
    },
    ssr: {
      noExternal: [
        '@astrojs/*',
        'daisyui',
      ],
    },
    // Add build optimizations
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: true,
    },
  },
});