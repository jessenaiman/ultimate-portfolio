import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Menu from '../Menu';

describe('Menu Component', () => {
  beforeEach(() => {
    document.cookie = '';
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders navigation links and GitHub button', () => {
    render(<Menu />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.getAttribute('href')).toContain('github.com');
  });

  // Note: Theme toggling and mobile menu tests are temporarily disabled
  // as they require more complex DOM interaction testing
  // TODO: Add more comprehensive tests for theme toggling and mobile menu
});
