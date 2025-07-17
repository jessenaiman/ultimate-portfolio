// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import tailwindPlugin from "@tailwindcss/vite";

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio.omega-spiral.com/",
  output: "static",
  integrations: [ 
    icon({
      include: {
        mdi: ['*']
          }
        }), 
    react({
      include: ["**/React/**/*.{jsx,tsx}"],
    }),
    svelte({
      include: ["**/Svelte/**/*.{jsx,tsx}"],
    }), 
    vue({
      include: ["**/Vue/**/*.{jsx,tsx}"],
    }), 
    solidJs({
      include: ["**/Solid/**/*.{jsx,tsx}"],
    }),
    sitemap(), 
    expressiveCode()],
  build: {
    // Enable modern browser builds for better performance
    format: 'file',
    inlineStylesheets: 'auto',
  },

  // Improved Vite configuration
  vite: {
    plugins: [tailwindPlugin()],
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