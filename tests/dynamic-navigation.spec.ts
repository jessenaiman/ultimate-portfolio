/**
 * Dynamic Navigation Tests
 * 
 * This file contains tests that validate all navigation links by using the
 * shared navigation data from src/data/navigation.ts. This ensures tests are
 * always in sync with the actual navigation structure of the site.
 * 
 * Every link in navigation.ts is tested - no exceptions.
 */

import { test, expect } from '@playwright/test';
import { navigationItems } from '../src/data/navigation';
import type { NavigationItem } from '../src/data/navigation';

/**
 * Get all unique paths from navigation items
 * @param items Navigation items to process
 * @returns Array of unique paths
 */
function getAllPaths(items: NavigationItem[]): string[] {
  const paths: string[] = [];
  
  function processItem(item: NavigationItem) {
    if (item.path && item.path !== '#') {
      paths.push(item.path);
    }
    if (item.children) {
      item.children.forEach(processItem);
    }
  }
  
  items.forEach(processItem);
  return [...new Set(paths)];
}

// Get all navigation paths from the centralized navigation data
const allNavigationPaths = getAllPaths(navigationItems);

// Store test results for reporting
type TestResult = {
  path: string;
  status: number | null;
  success: boolean;
  error?: string;
};

const testResults: TestResult[] = [];

// Simple test configuration
test.describe.configure({
  retries: 1,
  timeout: 30000 // 30 seconds per test
});

// After all tests complete, display a summary table of results
test.afterAll(() => {
  console.log('\n\n=== Navigation Test Results Summary ===');
  
  // Group results by status for better readability
  const successful = testResults.filter(r => r.success);
  const failed = testResults.filter(r => !r.success);
  const notFound = testResults.filter(r => r.status === 404);
  const serverErrors = testResults.filter(r => r.status && r.status >= 500);
  const otherErrors = failed.filter(r => r.status !== 404 && (!r.status || r.status < 500));
  
  // Display results in a table format
  console.log('\n✅ SUCCESSFUL PATHS:');
  console.log('--------------------------------------------------');
  console.log('| PATH                      | STATUS | RESULT    |');
  console.log('--------------------------------------------------');
  successful.forEach(result => {
    const path = result.path.padEnd(25, ' ');
    const status = `${result.status || 'N/A'}`.padEnd(6, ' ');
    console.log(`| ${path} | ${status} | ✓ Success |`);
  });
  console.log('--------------------------------------------------');
  
  // DEVELOPMENT TEAM REPORT SECTION
  console.log('\n\n🚨 DEVELOPMENT TEAM REPORT 🚨');
  console.log('==================================================');
  
  if (notFound.length > 0) {
    console.log('\n📄 MISSING PAGES (404):');
    console.log('--------------------------------------------------');
    console.log('| PATH                      | STATUS | PRIORITY  |');
    console.log('--------------------------------------------------');
    notFound.forEach(result => {
      const path = result.path.padEnd(25, ' ');
      const priority = path === '/' ? 'CRITICAL' : 'HIGH     ';
      console.log(`| ${path} | 404    | ${priority} |`);
    });
    console.log('--------------------------------------------------');
  }
  
  if (serverErrors.length > 0) {
    console.log('\n🔥 SERVER ERRORS (500+):');
    console.log('--------------------------------------------------');
    console.log('| PATH                      | STATUS | ERROR     |');
    console.log('--------------------------------------------------');
    serverErrors.forEach(result => {
      const path = result.path.padEnd(25, ' ');
      const status = `${result.status}`.padEnd(6, ' ');
      const error = (result.error || 'Server error').substring(0, 30);
      console.log(`| ${path} | ${status} | ${error} |`);
    });
    console.log('--------------------------------------------------');
  }
  
  if (otherErrors.length > 0) {
    console.log('\n⚠️ OTHER ISSUES:');
    console.log('--------------------------------------------------');
    console.log('| PATH                      | STATUS | ERROR     |');
    console.log('--------------------------------------------------');
    otherErrors.forEach(result => {
      const path = result.path.padEnd(25, ' ');
      const status = `${result.status || 'N/A'}`.padEnd(6, ' ');
      const error = (result.error || 'Unknown').substring(0, 30);
      console.log(`| ${path} | ${status} | ${error} |`);
    });
    console.log('--------------------------------------------------');
  }
  
  // Display coverage information
  console.log('\n📊 COVERAGE SUMMARY:');
  console.log(`Total navigation paths: ${allNavigationPaths.length}`);
  console.log(`Paths tested: ${testResults.length}`);
  console.log(`Success rate: ${((successful.length / testResults.length) * 100).toFixed(1)}%`);
  console.log(`Pages with errors: ${failed.length}`);
  console.log(`Missing pages (404): ${notFound.length}`);
  
  console.log('\n=========================================\n');
  
  // Generate a report file for the development team
  const fs = require('fs');
  const reportPath = './navigation-error-report.md';
  
  try {
    let report = '# Navigation Error Report\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;
    report += `## Summary\n\n`;
    report += `- Total navigation paths: ${allNavigationPaths.length}\n`;
    report += `- Paths tested: ${testResults.length}\n`;
    report += `- Success rate: ${((successful.length / testResults.length) * 100).toFixed(1)}%\n`;
    report += `- Pages with errors: ${failed.length}\n`;
    report += `- Missing pages (404): ${notFound.length}\n\n`;
    
    if (notFound.length > 0) {
      report += `## Missing Pages (404)\n\n`;
      report += `| Path | Priority | Recommendation |\n`;
      report += `|------|----------|----------------|\n`;
      notFound.forEach(result => {
        const priority = result.path === '/' ? 'CRITICAL' : 'HIGH';
        const recommendation = 'Create page following project conventions';
        report += `| ${result.path} | ${priority} | ${recommendation} |\n`;
      });
      report += '\n';
    }
    
    if (serverErrors.length > 0) {
      report += `## Server Errors (500+)\n\n`;
      report += `| Path | Status | Error | Recommendation |\n`;
      report += `|------|--------|-------|----------------|\n`;
      serverErrors.forEach(result => {
        const recommendation = 'Check server logs and fix internal error';
        report += `| ${result.path} | ${result.status} | ${result.error || 'Server error'} | ${recommendation} |\n`;
      });
      report += '\n';
    }
    
    if (otherErrors.length > 0) {
      report += `## Other Issues\n\n`;
      report += `| Path | Status | Error | Recommendation |\n`;
      report += `|------|--------|-------|----------------|\n`;
      otherErrors.forEach(result => {
        const recommendation = 'Review page implementation';
        report += `| ${result.path} | ${result.status || 'N/A'} | ${result.error || 'Unknown'} | ${recommendation} |\n`;
      });
      report += '\n';
    }
    
    report += `## All Successful Pages\n\n`;
    report += `| Path | Status |\n`;
    report += `|------|--------|\n`;
    successful.forEach(result => {
      report += `| ${result.path} | ${result.status} |\n`;
    });
    
    fs.writeFileSync(reportPath, report);
    console.log(`\n📋 Report saved to: ${reportPath}`);
  } catch (error) {
    console.error(`Failed to write report: ${error}`);
  }
});

/**
 * Main Navigation Test Suite
 * 
 * Tests that all navigation paths load correctly and contain
 * expected page elements. Uses CSS selectors and class names
 * rather than text content for more reliable testing.
 */
test.describe('Navigation Tests', () => {
  /**
   * Setup error handling for each test
   * Captures and logs console errors and page errors
   */
  test.beforeEach(async ({ page }) => {
    // Configure page error handling
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`[${page.url()}] Console Error: ${msg.text()}`);
      }
    });

    page.on('pageerror', error => {
      console.error(`[${page.url()}] Page Error: ${error.message}`);
    });
  });

  /**
   * Dynamic path testing
   * Tests EVERY path from navigation.ts - no exceptions
   */
  allNavigationPaths.forEach(path => {
    test(`should load ${path}`, async ({ page }) => {
      // Store the result object for this test
      const result: TestResult = {
        path,
        status: null,
        success: true
      };
      
      try {
        // Navigate to the page with a reasonable timeout
        const response = await page.goto(`http://localhost:4321${path}`, {
          waitUntil: 'domcontentloaded',
          timeout: 10000 // 10 seconds
        });
        
        // Store the status code
        result.status = response?.status() || null;
        
        // Basic response validation
        expect.soft(response?.status(), `Expected successful response for ${path}`).toBe(200);
        
        // Basic content validation
        await expect.soft(page.locator('body'), `Page should have content (${path})`)
          .not.toBeEmpty({ timeout: 5000 });
        
        // Navigation menu should be visible
        await expect.soft(
          page.locator('.navbar'),
          'Navigation menu should be visible'
        ).toBeVisible();
        
        // Log success with path and status
        console.log(`✅ ${path} - Status: ${result.status}`);
      } catch (error) {
        // Store error information
        result.success = false;
        result.error = error instanceof Error ? error.message : String(error);
        
        // Log error with path
        console.error(`❌ ${path} - Error: ${result.error}`);
        throw error;
      } finally {
        // Always add the result to our collection
        testResults.push(result);
      }
    });
  });

  /**
   * Theme switching test
   * Verifies that the theme controller works and applies themes correctly
   */
  test('should switch themes', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    
    const themeController = page.locator('input[name="theme-dropdown"]').first();
    await expect(themeController).toBeVisible();
    
    // Test theme switching
    await themeController.click();
    await page.waitForTimeout(300); // Allow theme to apply
    
    const currentTheme = await page.locator('html').getAttribute('data-theme');
    expect(currentTheme, 'Theme should be applied').toBeTruthy();
  });
});
