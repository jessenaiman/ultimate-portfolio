import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark themes', async ({ page }) => {
    // Start with a fresh session
    await page.goto('/');
    
    // Get the theme toggle button
    const themeToggle = await page.locator('#theme-toggle');
    
    // Get the theme icons
    const darkIcon = await page.locator('#theme-toggle-dark-icon');
    const lightIcon = await page.locator('#theme-toggle-light-icon');
    
    // Initial state check (we start in light mode)
    await expect(darkIcon).toBeVisible();
    await expect(lightIcon).toBeHidden();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    
    // Click the toggle
    await themeToggle.click();
    
    // Check dark mode
    await expect(darkIcon).toBeHidden();
    await expect(lightIcon).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Click again to go back to light mode
    await themeToggle.click();
    
    // Check light mode
    await expect(darkIcon).toBeVisible();
    await expect(lightIcon).toBeHidden();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('should persist theme across page reloads', async ({ page }) => {
    // Start with a fresh session
    await page.goto('/');
    
    // Get the theme toggle and switch to dark mode
    const themeToggle = await page.locator('#theme-toggle');
    await themeToggle.click();
    
    // Verify we're in dark mode
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Reload the page
    await page.reload();
    
    // Verify dark mode persisted
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});
