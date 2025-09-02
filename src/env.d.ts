/// <reference types="astro/client" />

interface Window {
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}
