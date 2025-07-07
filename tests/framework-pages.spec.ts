import { test, expect } from '@playwright/test';

test.describe('Framework Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the index page
    await page.goto('http://localhost:4321');
  });

  test('TailwindCSS page loads correctly', async ({ page }) => {
    // Navigate to the TailwindCSS page
    await page.getByRole('link', { name: /tailwindcss/i }).click();
    
    // Check that the page has loaded
    await expect(page).toHaveTitle(/TailwindCSS Showcase/);
    
    // Verify hero section is visible
    await expect(page.getByRole('heading', { name: /tailwindcss/i })).toBeVisible();
    
    // Verify features section is present
    await expect(page.getByRole('heading', { name: /key features/i })).toBeVisible();
    
    // Verify interactive demo is present
    await expect(page.getByRole('heading', { name: /interactive playground/i })).toBeVisible();
    
    // Take a screenshot for visual regression testing
    await expect(page).toHaveScreenshot('tailwind-page.png', {
      maxDiffPixelRatio: 0.05, // Allow 5% difference for dynamic content
    });
  });

  test('Interactive demo updates preview', async ({ page }) => {
    // Navigate to the TailwindCSS page
    await page.goto('http://localhost:4321/tailwind');
    
    // Find the code editor and update its content
    const editor = page.locator('#editable-code');
    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(
      '<button class="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">\n  New Button\n</button>'
    );
    
    // Verify the preview was updated
    const preview = page.locator('#preview button');
    await expect(preview).toHaveText('New Button');
    await expect(preview).toHaveClass(/bg-green-500/);
    
    // Test the reset button
    await page.getByRole('button', { name: /reset/i }).click();
    await expect(page.locator('#preview button')).toHaveText('Click me');
  });
});
