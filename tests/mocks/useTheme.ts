/**
 * Mock Theme Hook
 * 
 * This file provides a mock implementation of the useTheme hook
 * for testing purposes.
 */

import { vi } from 'vitest';

export const mockTheme = {
  theme: 'light',
  setTheme: vi.fn(),
};

vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => mockTheme,
}));
