import { test, expect } from '@playwright/test';

/**
 * Smoke tests for critical functionality
 * These tests run quickly and catch major issues
 */

test.describe('Smoke Tests - Critical Functionality', () => {
  test('homepage loads and is interactive', async ({ page }) => {
    await page.goto('/');
    
    // Page should load with correct title
    await expect(page).toHaveTitle(/Jesse Naiman/);
    
    // Navbar should be present
    await expect(page.locator('.navbar')).toBeVisible();
    
    // Theme controller should be clickable
    const themeButton = page.locator('.navbar-end .dropdown .btn');
    await expect(themeButton).toBeVisible();
    await themeButton.click();
    
    // Theme dropdown should open
    await expect(page.locator('.dropdown-content')).toBeVisible();
  });

  test('navigation works between key pages', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to a few key pages
    const testRoutes = ['/about', '/resume', '/portfolio'];
    
    for (const route of testRoutes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      
      // Should not have any major layout shift or errors
      await expect(page.locator('.navbar')).toBeVisible();
      await expect(page.locator('main, .main-content, [role="main"]')).toBeVisible();
    }
  });

  test('theme switching works', async ({ page }) => {
    await page.goto('/');
    
    // Open theme controller
    await page.locator('.navbar-end .dropdown .btn').click();
    
    // Click on dark theme
    await page.locator('.theme-controller[value="dark"]').click();
    
    // Verify theme changed
    await page.waitForFunction(() => 
      document.documentElement.getAttribute('data-theme') === 'dark'
    );
    
    const theme = await page.getAttribute('html', 'data-theme');
    expect(theme).toBe('dark');
  });

  test('mobile responsive layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobile menu button should be visible
    const mobileMenu = page.locator('.btn.btn-ghost.lg\\:hidden');
    await expect(mobileMenu).toBeVisible();
    
    // Desktop menu should be hidden
    const desktopMenu = page.locator('.navbar-center');
    await expect(desktopMenu).not.toBeVisible();
  });
});

test.describe('Performance and Accessibility', () => {
  test('pages load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds (generous for CI)
    expect(loadTime).toBeLessThan(5000);
  });

  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should not have any console errors
    expect(errors).toHaveLength(0);
  });

  test('basic accessibility checks', async ({ page }) => {
    await page.goto('/');
    
    // Should have proper heading structure
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Should have alt text for images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });
});
