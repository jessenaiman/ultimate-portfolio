/**
 * Test Utilities
 * 
 * This file provides utilities for testing React, Svelte, and Astro components.
 * It's organized into sections for each framework and includes shared utilities.
 */

import React from 'react';
import { render as renderReact } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { vi } from 'vitest';

// ============================================================================
// Shared Utilities
// ============================================================================

/**
 * Mock window.matchMedia for components that use media queries
 */
const mockMatchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});

/**
 * Mock localStorage for components that use it
 */
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

// ============================================================================
// React Testing Utilities
// ============================================================================

/**
 * Render a React component with theme context and necessary mocks
 * @param ui - React component to render
 */
export function renderWithTheme(ui: React.ReactElement) {
  // Setup mocks
  window.matchMedia = window.matchMedia || mockMatchMedia;
  global.localStorage = mockLocalStorage as any;

  return renderReact(ui);
}

/**
 * Create a theme context for testing
 * @param initialTheme - Initial theme value
 */
export function createThemeContext(initialTheme = 'light') {
  return {
    theme: initialTheme,
    setTheme: vi.fn(),
  };
}

// ============================================================================
// Svelte Testing Utilities
// ============================================================================

/**
 * Render a Svelte component with necessary mocks
 * @param component - Svelte component to render
 * @param props - Props to pass to the component
 */
export function renderSvelteComponent(component: any, props = {}) {
  // Setup mocks
  window.matchMedia = window.matchMedia || mockMatchMedia;
  global.localStorage = mockLocalStorage as any;

  return renderSvelte(component, { props });
}

// ============================================================================
// Astro Testing Utilities
// ============================================================================

/**
 * Parse an Astro component's HTML for testing
 * @param html - HTML string from Astro component
 */
export function parseAstroComponent(html: string) {
  const dom = new JSDOM(html);
  return {
    document: dom.window.document,
    window: dom.window,
    getByText: (text: string) => {
      return dom.window.document.evaluate(
        `//*[contains(text(),'${text}')]`,
        dom.window.document,
        null,
        dom.window.XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    },
    getByTestId: (testId: string) => {
      return dom.window.document.querySelector(`[data-testid="${testId}"]`);
    },
    queryByRole: (role: string) => {
      return dom.window.document.querySelector(`[role="${role}"]`);
    },
  };
}

/**
 * Mock Astro component props
 * @param props - Props to include in mock
 */
export function mockAstroProps(props = {}) {
  return {
    ...props,
    'client:load': undefined,
    'client:idle': undefined,
    'client:visible': undefined,
    'client:media': undefined,
    'client:only': undefined,
  };
}

/**
 * Create mock Astro global object
 */
export function createMockAstro() {
  return {
    generator: 'test',
    site: new URL('http://localhost'),
    url: new URL('http://localhost'),
    slots: {},
    props: mockAstroProps(),
  };
}
