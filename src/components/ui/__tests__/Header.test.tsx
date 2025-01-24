import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header Component', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
    expect(screen.getByText('Svelte')).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    render(<Header />);
    const themeButton = screen.getByLabelText('Toggle theme');
    
    fireEvent.click(themeButton);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /Toggle menu/i });
    
    fireEvent.click(menuButton);
    
    // Mobile menu should be visible
    expect(screen.getByRole('navigation')).toBeVisible();
  });
});
