import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads and displays key sections', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Jesse Naiman/);
    
    // Check for key sections
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Check for console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg: { type: () => string; text: () => string }) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`${msg.text()}`);
      }
    });
    
    // Wait a moment for any potential errors
    await page.waitForTimeout(500);
    
    // Fail the test if there were any console errors
    if (consoleErrors.length > 0) {
      throw new Error(`Console errors on homepage:\n${consoleErrors.join('\n')}`);
    }
  });

  test('main navigation links work', async ({ page }) => {
    // Define the main navigation paths to test
    const navPaths = [
      { path: '/', name: 'Home' },
      { path: '/resume', name: 'Resume' },
      { path: '/portfolio', name: 'Portfolio' },
      { path: '/styleguide', name: 'Website Stack' },
      { path: '/test-dashboard', name: 'Test Dashboard' }
    ];

    for (const nav of navPaths) {
      await test.step(`Testing navigation to ${nav.name}`, async () => {
        await page.goto(nav.path);
        await expect(page).toHaveURL(nav.path);
        await expect(page.locator('main')).toBeVisible();
        
        // Check for any console errors
        const consoleErrors: string[] = [];
        page.on('console', (msg: { type: () => string; text: () => string }) => {
          if (msg.type() === 'error') {
            consoleErrors.push(`${msg.text()}`);
          }
        });
        
        // Wait a moment for any potential errors
        await page.waitForTimeout(500);
        
        // Fail the test if there were any console errors
        if (consoleErrors.length > 0) {
          throw new Error(`Console errors on ${nav.path}:\n${consoleErrors.join('\n')}`);
        }
      });
    }
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
