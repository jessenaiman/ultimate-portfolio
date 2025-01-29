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
      'light',
      'dark'
    ],
    darkTheme: 'dark',
  },
}
