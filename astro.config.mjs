// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite"
import astroExpressiveCode from 'astro-expressive-code';
import node from '@astrojs/node';
import mdx from "@astrojs/mdx";
import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio.omega-spiral.com/",
  output: "server",
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    icon({
      include: {
        mdi: ['*'],
        logos: ['*']
      }
    }), 
    react({
      include: [
        "**/components/ui/**/*.{jsx,tsx}",
        "**/components/react/**/*.{tsx}"
      ],
      exclude: [
        "**/components/react/reactbits/**"
      ]
    }), 
    svelte({
      include: ["**/svelte/**/*.svelte"],
    }), 
    vue({
      include: ["**/*.vue", "**/Vue/**/*.{jsx,tsx}"],
    }), 
    solidJs({
      include: ["**/solid/**/*.{jsx,tsx}"],
    }), 
    sitemap(), 
    astroExpressiveCode({
      themes: ['dracula', 'github-light'],
      styleOverrides: {
        borderRadius: '0.5rem',
        frames: {
          shadowColor: '#124',
        },
      }
    }), 
    mdx()
  ],
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
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
      ],
    },
  },
});
