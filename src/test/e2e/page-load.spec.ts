import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/math',
  '/react',
  '/remix',
  '/resume',
  '/solid',
  '/svelte',
  '/vue'
];

test.describe('Basic page loads', () => {
  for (const path of pages) {
    test(`${path} should load without errors`, async ({ page }) => {
      const response = await page.goto(path);
      
      // Verify page loaded successfully
      expect(response?.status()).toBe(200);
      
      // Check for common error indicators
      const body = await page.content();
      expect(body).not.toContain('404');
      expect(body).not.toContain('Page Not Found');
      
      // Verify page has basic structure
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  }

  test('404 page handles invalid routes correctly', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    expect(response?.status()).toBe(404);
  });
});
