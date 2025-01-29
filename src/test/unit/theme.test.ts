import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isValidTheme, getInitialTheme, setTheme, toggleTheme, type Theme } from '../../utils/theme';

describe('Theme Utilities', () => {
  beforeEach(() => {
    // Clear localStorage and document before each test
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  describe('isValidTheme', () => {
    it('should validate correct theme values', () => {
      expect(isValidTheme('light')).toBe(true);
      expect(isValidTheme('dark')).toBe(true);
    });

    it('should reject invalid theme values', () => {
      expect(isValidTheme('invalid')).toBe(false);
      expect(isValidTheme('')).toBe(false);
      expect(isValidTheme(null)).toBe(false);
      expect(isValidTheme(undefined)).toBe(false);
    });
  });

  describe('getInitialTheme', () => {
    it('should return saved theme from localStorage', () => {
      localStorage.setItem('theme', 'dark');
      expect(getInitialTheme()).toBe('dark');
    });

    it('should handle invalid localStorage value', () => {
      localStorage.setItem('theme', 'invalid');
      expect(getInitialTheme()).toBe('light');
    });

    it('should respect system preference when no saved theme', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
        })),
      });

      expect(getInitialTheme()).toBe('dark');
    });
  });

  describe('setTheme', () => {
    it('should set theme in localStorage and DOM', () => {
      setTheme('dark');
      
      expect(localStorage.getItem('theme')).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark', () => {
      const newTheme = toggleTheme('light');
      
      expect(newTheme).toBe('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      const newTheme = toggleTheme('dark');
      
      expect(newTheme).toBe('light');
      expect(localStorage.getItem('theme')).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });
});
