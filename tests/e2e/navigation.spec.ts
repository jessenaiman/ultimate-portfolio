/**
 * End-to-End Navigation Tests
 * 
 * This file contains E2E tests that verify the core navigation and interactive
 * features of our application. We use Playwright, a powerful E2E testing
 * framework that can control browsers programmatically.
 * 
 * Key concepts:
 * - Each test runs in isolation with a fresh browser context
 * - Tests use page.goto() to navigate to pages
 * - We use role-based selectors (getByRole) for better accessibility
 * - Assertions use async/await because browser interactions are asynchronous
 */

import { test, expect } from '@playwright/test';

/**
 * Tests the main navigation flow through the application
 * 
 * This test:
 * 1. Verifies the initial page load and title
 * 2. Finds all navigation links on the page
 * 3. Clicks each internal link (non-http) and verifies navigation
 * 
 * @example
 * A link to /about should:
 * - Be clickable
 * - Navigate to the correct URL
 * - Not throw any errors
 */
test.describe('Navigation', () => {
  test('should navigate through main sections', async ({ page }) => {
    await page.goto('/');
    
    // First, verify we're on the right page
    await expect(page).toHaveTitle(/Ultimate Astro Template/);

    // Get all links and test each internal one
    const links = await page.getByRole('link').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      // Only test internal links (not external http(s) links)
      if (href && !href.startsWith('http')) {
        await link.click();
        // Verify the navigation worked
        await expect(page).toHaveURL(href);
      }
    }
  });

  /**
   * Tests the theme toggle functionality
   * 
   * This test verifies that:
   * 1. The theme toggle button is present
   * 2. Clicking it changes the theme
   * 3. The theme change is reflected in the DOM
   * 
   * Note: We use a checkbox role because the theme toggle
   * is implemented as a hidden checkbox for accessibility
   */
  test('should toggle theme', async ({ page }) => {
    await page.goto('/');
    
    // Find the theme toggle using ARIA role
    const themeToggle = await page.getByRole('checkbox', { name: '' });
    await themeToggle.click();

    // Verify theme changed in the DOM
    // We look for the data-theme attribute on the html element
    const html = await page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  /**
   * Tests the mobile menu functionality
   * 
   * This test:
   * 1. Sets a mobile viewport size
   * 2. Verifies the mobile menu toggle is present
   * 3. Opens the mobile menu
   * 4. Verifies the menu is visible
   * 
   * Note: Mobile testing is crucial for responsive design.
   * We use a specific mobile viewport size to simulate a real device.
   */
  test('should handle mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Set mobile viewport size (iPhone SE dimensions)
    await page.setViewportSize({ width: 375, height: 667 });

    // The mobile menu toggle is the second checkbox on the page
    // (first is theme toggle)
    const menuToggle = await page.getByRole('checkbox').nth(1);
    await menuToggle.click();

    // Verify the menu is now visible
    // We use the menu-lg class which is specific to the mobile menu
    const mobileMenu = await page.locator('.menu-lg');
    await expect(mobileMenu).toBeVisible();
  });
});
