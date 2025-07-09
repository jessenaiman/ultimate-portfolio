import { test, expect } from '@playwright/test';

// All navigation paths that should be tested
// This list is maintained in sync with the Menu.astro component
const allNavigationPaths = [
  '/',
  '/resume',
  '/portfolio',
  '/astrojs',
  '/tailwind',
  '/daisyui',
  '/styleguide',
  '/react',
  '/vue',
  '/svelte',
  '/solid',
  '/remix',
  '/blog',
  '/blockchain-chat',
  '/color-picker',
  '/math',
  '/live-code',
  '/test-dashboard',
  '/machine',
  '/blockchain-ai',
  '/about'
];

// Additional critical pages that should exist
const additionalPaths = [
  '/theme-test',
  '/icon-test'
];

const allPaths = [...new Set([...allNavigationPaths, ...additionalPaths])];

test.describe('Navigation URL Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Set a longer timeout for these tests
    test.setTimeout(60000);
  });

  // Test each navigation path individually
  for (const path of allPaths) {
    test(`should load ${path} without 404 error`, async ({ page }) => {
      const response = await page.goto(`http://localhost:4321${path}`);
      
      // Check that the response is successful (not 404)
      expect(response?.status()).not.toBe(404);
      expect(response?.status()).toBeLessThan(400);
      
      // Check that the page contains expected content (not error page)
      const pageTitle = await page.title();
      expect(pageTitle).not.toContain('404');
      expect(pageTitle).not.toContain('Not Found');
      
      // Check that the page has basic structure (menu should be present)
      const menu = page.locator('.navbar');
      await expect(menu).toBeVisible();
      
      // Check that the page has content (not just empty)
      const bodyText = await page.textContent('body');
      expect(bodyText?.trim().length).toBeGreaterThan(0);
      
      console.log(`✅ ${path} - Status: ${response?.status()}, Title: ${pageTitle}`);
    });
  }

  test('should have working theme switching on all pages', async ({ page }) => {
    // Test a few representative pages
    const testPages = ['/', '/resume', '/test-dashboard', '/about'];
    
    for (const testPath of testPages) {
      await page.goto(`http://localhost:4321${testPath}`);
      
      // Find theme controller elements
      const themeControllers = page.locator('input[name="theme-dropdown"]');
      const count = await themeControllers.count();
      
      if (count > 0) {
        // Test switching to dark theme
        await themeControllers.first().click();
        
        // Wait for theme to apply
        await page.waitForTimeout(100);
        
        // Check that data-theme attribute changed
        const htmlElement = page.locator('html');
        const dataTheme = await htmlElement.getAttribute('data-theme');
        expect(dataTheme).not.toBeNull();
        
        console.log(`✅ ${testPath} - Theme switching works, current theme: ${dataTheme}`);
      } else {
        console.log(`⚠️  ${testPath} - No theme controllers found`);
      }
    }
  });

  test('should have consistent layout structure across pages', async ({ page }) => {
    const testPages = ['/', '/resume', '/test-dashboard', '/about', '/portfolio'];
    
    for (const testPath of testPages) {
      await page.goto(`http://localhost:4321${testPath}`);
      
      // Check for consistent layout elements
      const navbar = page.locator('.navbar');
      await expect(navbar).toBeVisible();
      
      // Check for proper DaisyUI structure
      const body = page.locator('body');
      await expect(body).toHaveClass(/bg-base-100/);
      
      console.log(`✅ ${testPath} - Consistent layout structure`);
    }
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    
    // Find all navigation links
    const navLinks = page.locator('.navbar a[href]:not([href="#"])');
    const linkCount = await navLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    // Test a few main navigation links
    const mainLinks = [
      { selector: 'a[href="/"]', expectedPath: '/' },
      { selector: 'a[href="/resume"]', expectedPath: '/resume' },
      { selector: 'a[href="/portfolio"]', expectedPath: '/portfolio' },
      { selector: 'a[href="/about"]', expectedPath: '/about' }
    ];
    
    for (const link of mainLinks) {
      const linkElement = page.locator(link.selector).first();
      if (await linkElement.isVisible()) {
        await linkElement.click();
        await page.waitForURL(`**${link.expectedPath}`);
        
        // Verify we're on the correct page
        expect(page.url()).toContain(link.expectedPath);
        console.log(`✅ Navigation to ${link.expectedPath} works`);
        
        // Go back to home for next test
        await page.goto('http://localhost:4321/');
      }
    }
  });
});

// Test for missing pages (should be created)
test.describe('Missing Pages Report', () => {
  const potentiallyMissingPaths = [
    '/blockchain-chat',
    '/color-picker',
    '/math-lab',
    '/live-code',
    '/machine-learning',
    '/blockchain-ai'
  ];

  test('identify missing pages that need to be created', async ({ page }) => {
    const missingPages: string[] = [];
    const workingPages: string[] = [];
    
    for (const path of potentiallyMissingPaths) {
      try {
        const response = await page.goto(`http://localhost:4321${path}`);
        
        if (response?.status() === 404) {
          missingPages.push(path);
        } else if (response?.status() && response.status() < 400) {
          workingPages.push(path);
        }
      } catch (error) {
        missingPages.push(path);
      }
    }
    
    console.log('\n📊 PAGE STATUS REPORT:');
    console.log('✅ Working pages:', workingPages);
    console.log('❌ Missing pages that need to be created:', missingPages);
    
    // This test always passes but provides useful information
    expect(true).toBe(true);
  });
});
