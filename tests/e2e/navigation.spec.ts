import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate through main sections', async ({ page }) => {
    // Check initial page load
    await expect(page).toHaveTitle(/Ultimate Astro Template/);

    // Check navigation to different sections
    const links = await page.getByRole('link').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        await link.click();
        await expect(page).toHaveURL(href);
      }
    }
  });

  test('should toggle theme', async ({ page }) => {
    // Find and click theme toggle
    const themeToggle = await page.getByRole('checkbox', { name: '' });
    await themeToggle.click();

    // Verify theme change
    const html = await page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('should handle mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Find and click mobile menu toggle
    const menuToggle = await page.getByRole('checkbox').nth(1);
    await menuToggle.click();

    // Verify mobile menu is visible
    const mobileMenu = await page.locator('.menu-lg');
    await expect(mobileMenu).toBeVisible();
  });
});
