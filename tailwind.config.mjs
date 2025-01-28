/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cal: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#7c3aed',
          secondary: '#f59e0b',
          accent: '#10b981',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#8b5cf6',
          secondary: '#fbbf24',
          accent: '#34d399',
        },
      },
    ],
    darkTheme: 'dark',
  },
}
