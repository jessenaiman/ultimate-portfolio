import { test, expect } from '@playwright/test';

test('Vue page loads correctly', async ({ page }) => {
  // Navigate to the Vue page
  await page.goto('/new-vue');
  
  // Check the page title
  await expect(page).toHaveTitle(/Vue.js Demo/);
  
  // Verify hero component renders
  await expect(page.locator('.hero h1')).toBeVisible();
  await expect(page.locator('.hero h1')).toContainText('Vue.js + DaisyUI');
  
  // Verify features section renders
  await expect(page.locator('#features')).toBeVisible();
  
  // Verify interactive demos render - using more specific selectors
  await expect(page.locator('section:has(h2:has-text("Interactive Demos")) .theme-switcher-demo').first()).toBeVisible();
  await expect(page.locator('section:has(h2:has-text("Interactive Demos")) .typewriter-demo').first()).toBeVisible();
  await expect(page.locator('section:has(h2:has-text("Interactive Demos")) .counter-demo').first()).toBeVisible();
  
  // Test theme switcher functionality - using more specific selectors
  const themeSection = page.locator('section:has(h2:has-text(\"Interactive Demos\"))');
  const themeButton = themeSection.locator('.dropdown button').first();
  
  // Ensure the button is visible and clickable
  await themeButton.scrollIntoViewIfNeeded();
  await themeButton.waitFor({ state: 'visible' });
  await themeButton.click();
  
  // Wait for dropdown to be visible and select the dark theme
  const darkThemeOption = themeSection.locator('.dropdown-content input[value="dark"]');
  await darkThemeOption.waitFor({ state: 'visible' });
  await darkThemeOption.click();
  
  // Verify theme changed (checking for data-theme attribute)
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  
  // No console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  // Take screenshot for visual verification
  await page.screenshot({ path: 'vue-page-test.png' });
  
  // Verify no console errors occurred
  expect(errors.length).toBe(0);
});
