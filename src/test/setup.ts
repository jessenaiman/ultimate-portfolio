/**
 * Vitest Setup Configuration
 * 
 * This file configures the test environment for Astro components
 * using jsdom and necessary test utilities.
 */

import { beforeAll, afterAll, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom/vitest';

// Create a mock DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
});

// Add DOM globals
global.window = dom.window as any;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Mock Astro globals
vi.mock('astro', () => ({
  Astro: {
    url: new URL('http://localhost'),
    site: new URL('http://localhost'),
    generator: 'Astro v3.0',
    slots: {},
    props: {},
  },
}));

// Mock content collections
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
  getEntryBySlug: vi.fn(),
}));

// Cleanup after tests
afterAll(() => {
  dom.window.close();
});
