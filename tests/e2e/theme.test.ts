import { test, expect } from '@playwright/test';

test.describe('Theme System', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.addInitScript(() => {
      localStorage.clear();
    });
    
    // Set a consistent system theme preference for all tests
    await page.emulateMedia({ colorScheme: 'light' });
  });

  test('should initialize with system preference', async ({ page }) => {
    // Mock system dark mode preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if dark theme is applied
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Mock system light mode preference
    await page.emulateMedia({ colorScheme: 'light' });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if light theme is applied
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('should toggle theme when clicking theme button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Ensure we start with light theme
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    
    // Click theme toggle and wait for the change
    await page.click('#theme-toggle');
    await page.waitForTimeout(100); // Wait for the theme change animation
    
    // Check if theme changed to dark
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Icons should update
    await expect(page.locator('#theme-toggle-dark-icon')).toHaveClass(/hidden/);
    await expect(page.locator('#theme-toggle-light-icon')).not.toHaveClass(/hidden/);
    
    // Toggle back to light
    await page.click('#theme-toggle');
    await page.waitForTimeout(100);
    
    // Check if theme changed back to light
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    
    // Icons should update
    await expect(page.locator('#theme-toggle-light-icon')).toHaveClass(/hidden/);
    await expect(page.locator('#theme-toggle-dark-icon')).not.toHaveClass(/hidden/);
  });

  // test('should persist theme across page reloads', async ({ page }) => {
  //   await page.goto('/');
  //   await page.waitForLoadState('networkidle');
    
  //   // Ensure we start with light theme
  //   await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    
  //   // Set theme to dark
  //   await page.click('#theme-toggle');
  //   await page.waitForTimeout(100);
    
  //   // Verify dark theme is set
  //   await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
  //   // Reload page and wait for it to be ready
  //   await page.reload();
  //   await page.waitForLoadState('networkidle');
    
  //   // Check if dark theme persisted
  //   await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  // });

  test('should persist theme across navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Ensure we start with light theme
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    
    // Set theme to dark
    await page.click('#theme-toggle');
    await page.waitForTimeout(100);
    
    // Verify dark theme is set
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Navigate to another page and wait for it to be ready
    await page.click('a:has-text("Chat with AI")');
    await page.waitForLoadState('networkidle');
    
    // Check if dark theme persisted
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});
