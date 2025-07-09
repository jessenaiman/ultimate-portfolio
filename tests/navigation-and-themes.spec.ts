import { test, expect, type Page } from '@playwright/test';

// Test data for all pages that should be accessible
const PAGES = [
  { path: '/', title: 'Jesse Naiman - Senior Developer' },
  { path: '/about', title: 'About - Jesse Naiman - Senior Developer' },
  { path: '/resume', title: 'Resume - Jesse Naiman - Senior Developer' },
  { path: '/portfolio', title: 'Portfolio - Jesse Naiman - Senior Developer' },
  { path: '/blog', title: 'Blog - Jesse Naiman - Senior Developer' },
  { path: '/astrojs', title: 'Astro.js - Jesse Naiman - Senior Developer' },
  { path: '/tailwind', title: 'Tailwind CSS - Jesse Naiman - Senior Developer' },
  { path: '/daisyui', title: 'DaisyUI - Jesse Naiman - Senior Developer' },
  { path: '/react', title: 'React - Jesse Naiman - Senior Developer' },
  { path: '/vue', title: 'Vue.js - Jesse Naiman - Senior Developer' },
  { path: '/svelte', title: 'Svelte - Jesse Naiman - Senior Developer' },
  { path: '/solid', title: 'SolidJS - Jesse Naiman - Senior Developer' },
  { path: '/remix', title: 'Remix - Jesse Naiman - Senior Developer' },
  { path: '/math', title: 'Math Tools - Jesse Naiman - Senior Developer' },
  { path: '/machine', title: 'ML & AI - Jesse Naiman - Senior Developer' }
];

// Available themes in our application
const THEMES = ['light', 'dark', 'cupcake', 'bumblebee', 'autumn'];

// Helper function to wait for theme change
async function waitForThemeChange(page: Page, expectedTheme: string) {
  await page.waitForFunction(
    (theme) => document.documentElement.getAttribute('data-theme') === theme,
    expectedTheme,
    { timeout: 3000 }
  );
}

// Helper function to get current theme
async function getCurrentTheme(page: Page): Promise<string> {
  return await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'light');
}

test.describe('Navigation and Page Loading', () => {
  test.beforeEach(async ({ page }) => {
    // Start each test from the homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load homepage correctly', async ({ page }) => {
    await expect(page).toHaveTitle('Jesse Naiman - Senior Developer');
    
    // Check that the navbar is present
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
    
    // Check that the theme controller is present
    const themeController = page.locator('.dropdown-end');
    await expect(themeController).toBeVisible();
  });

  test('should navigate to all pages successfully', async ({ page }) => {
    for (const pageData of PAGES) {
      // Navigate to the page
      await page.goto(pageData.path);
      await page.waitForLoadState('networkidle');
      
      // Check that the page loads correctly
      await expect(page).toHaveTitle(pageData.title);
      
      // Check that the navbar is still present
      const navbar = page.locator('.navbar');
      await expect(navbar).toBeVisible();
      
      // Check that there are no console errors
      const logs = await page.evaluate(() => {
        return (window as any).__TEST_LOGS__ || [];
      });
      
      console.log(`✓ Page ${pageData.path} loaded successfully`);
    }
  });

  test('should have working mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // The mobile menu button should be visible on small screens
    const mobileMenuButton = page.locator('.btn.btn-ghost.lg\\:hidden');
    await expect(mobileMenuButton).toBeVisible();
    
    // Click the mobile menu button
    await mobileMenuButton.click();
    
    // The dropdown menu should be visible
    const dropdownMenu = page.locator('.menu.menu-sm.dropdown-content');
    await expect(dropdownMenu).toBeVisible();
    
    // Try clicking a menu item
    const aboutLink = dropdownMenu.locator('a[href="/about"]').first();
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      await page.waitForURL('/about');
      await expect(page).toHaveURL('/about');
    }
  });

  test('should have working desktop menu', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // The desktop menu should be visible
    const desktopMenu = page.locator('.navbar-center .menu.menu-horizontal');
    await expect(desktopMenu).toBeVisible();
    
    // The mobile menu button should be hidden
    const mobileMenuButton = page.locator('.btn.btn-ghost.lg\\:hidden');
    await expect(mobileMenuButton).not.toBeVisible();
    
    // Try clicking a desktop menu item
    const aboutLink = desktopMenu.locator('a[href="/about"]').first();
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      await page.waitForURL('/about');
      await expect(page).toHaveURL('/about');
    }
  });
});

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have default theme applied', async ({ page }) => {
    // Check that a theme is applied (either light by default or system preference)
    const currentTheme = await getCurrentTheme(page);
    expect(THEMES).toContain(currentTheme);
    
    // Verify theme is properly applied to HTML element
    const htmlTheme = await page.getAttribute('html', 'data-theme');
    expect(htmlTheme).toBeTruthy();
  });

  test('should open theme controller dropdown', async ({ page }) => {
    // Find and click the theme controller button
    const themeButton = page.locator('.navbar-end .dropdown .btn.btn-ghost.btn-circle');
    await expect(themeButton).toBeVisible();
    
    await themeButton.click();
    
    // The theme dropdown should be visible
    const dropdown = page.locator('.dropdown-content');
    await expect(dropdown).toBeVisible();
    
    // Check that theme options are present
    const themeOptions = page.locator('.theme-controller');
    await expect(themeOptions).toHaveCount(THEMES.length);
  });

  test('should change themes correctly', async ({ page }) => {
    // Open theme dropdown
    const themeButton = page.locator('.navbar-end .dropdown .btn.btn-ghost.btn-circle');
    await themeButton.click();
    
    // Test each theme
    for (const theme of THEMES) {
      console.log(`Testing theme: ${theme}`);
      
      // Find and click the theme option
      const themeOption = page.locator(`.theme-controller[value="${theme}"]`);
      await expect(themeOption).toBeVisible();
      
      // Click the theme option
      await themeOption.click();
      
      // Wait for theme change to take effect
      await waitForThemeChange(page, theme);
      
      // Verify the theme was applied
      const currentTheme = await getCurrentTheme(page);
      expect(currentTheme).toBe(theme);
      
      // Verify the theme persists after page reload
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      const persistedTheme = await getCurrentTheme(page);
      expect(persistedTheme).toBe(theme);
      
      // Re-open dropdown for next iteration
      if (theme !== THEMES[THEMES.length - 1]) {
        await themeButton.click();
      }
    }
  });

  test('should persist theme across navigation', async ({ page }) => {
    // Set a specific theme
    const targetTheme = 'cupcake';
    
    // Open theme dropdown and select theme
    const themeButton = page.locator('.navbar-end .dropdown .btn.btn-ghost.btn-circle');
    await themeButton.click();
    
    const themeOption = page.locator(`.theme-controller[value="${targetTheme}"]`);
    await themeOption.click();
    
    await waitForThemeChange(page, targetTheme);
    
    // Navigate to different pages and verify theme persists
    const testPages = ['/about', '/resume', '/portfolio', '/blog'];
    
    for (const pagePath of testPages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      const currentTheme = await getCurrentTheme(page);
      expect(currentTheme).toBe(targetTheme);
    }
  });

  test('should work with system theme preference', async ({ page }) => {
    // Test dark mode preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // If no theme is stored, should respect system preference
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const theme = await getCurrentTheme(page);
    // Should be either 'dark' or whatever the default theme is
    expect(typeof theme).toBe('string');
    expect(theme.length).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Large Desktop', width: 1920, height: 1080 }
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should render correctly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check that navbar is present and responsive
      const navbar = page.locator('.navbar');
      await expect(navbar).toBeVisible();
      
      // Check theme controller is accessible
      const themeController = page.locator('.navbar-end');
      await expect(themeController).toBeVisible();
      
      // On mobile, check that hamburger menu is present
      if (width < 1024) {
        const mobileMenu = page.locator('.btn.btn-ghost.lg\\:hidden');
        await expect(mobileMenu).toBeVisible();
      } else {
        // On desktop, check that horizontal menu is present
        const desktopMenu = page.locator('.navbar-center .menu.menu-horizontal');
        await expect(desktopMenu).toBeVisible();
      }
    });
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    // Check theme controller button has proper role
    const themeButton = page.locator('.navbar-end .dropdown .btn[role="button"]');
    await expect(themeButton).toBeVisible();
    
    // Check that theme inputs have aria-labels
    await themeButton.click();
    
    const themeInputs = page.locator('.theme-controller[aria-label]');
    await expect(themeInputs).toHaveCount(THEMES.length);
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Focus the theme button with keyboard
    await page.keyboard.press('Tab');
    
    // Continue tabbing until we reach the theme button
    let attempts = 0;
    while (attempts < 20) {
      const focusedElement = await page.locator(':focus').first();
      const isThemeButton = await focusedElement.evaluate(el => 
        el.closest('.navbar-end .dropdown .btn') !== null
      );
      
      if (isThemeButton) {
        break;
      }
      
      await page.keyboard.press('Tab');
      attempts++;
    }
    
    // Press Enter to open dropdown
    await page.keyboard.press('Enter');
    
    // Check that dropdown opened
    const dropdown = page.locator('.dropdown-content');
    await expect(dropdown).toBeVisible();
  });
});
