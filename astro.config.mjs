// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite"
import expressiveCode from 'astro-expressive-code';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio.omega-spiral.com/",
  output: "static",
  integrations: [icon({
    include: {
      mdi: ['*'],
      logos: ['*']
        }
      }), react({
    include: ["**/React/**/*.{jsx,tsx}"],
  }), svelte({
    include: ["**/Svelte/**/*.svelte"],
  }), vue({
    jsx: true,
    include: ["**/*.vue", "**/Vue/**/*.{jsx,tsx}"],
  }), solidJs({
    include: ["**/Solid/**/*.{jsx,tsx}"],
  }), sitemap(), expressiveCode({
    frames: {
      showFileNames: true,
    }
  }), mdx()],
  build: {
    // Enable modern browser builds for better performance
    format: 'file',
    inlineStylesheets: 'auto',
  },

  // Improved Vite configuration
  vite: {
    plugins: [tailwindcss()],
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
  },
});