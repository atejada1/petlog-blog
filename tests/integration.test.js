
// tests/integration.test.js - Integration tests using Playwright
import { test, expect } from '@playwright/test';

test.describe('Pet Log Website Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display main navigation', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('a[href="#home"]')).toContainText('Home');
    await expect(page.locator('a[href="#pets"]')).toContainText('My Pets');
  });

  test('should show hero section', async ({ page }) => {
    await expect(page.locator('.hero h1')).toContainText('Track Your Pets');
    await expect(page.locator('.cta-button')).toBeVisible();
  });

  test('should handle search functionality', async ({ page }) => {
    // Navigate to pets section
    await page.click('a[href="#pets"]');
    
    // Test search input
    const searchInput = page.locator('#searchInput');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('test pet');
    
    // Verify search input value
    await expect(searchInput).toHaveValue('test pet');
  });

  test('should handle filter functionality', async ({ page }) => {
    // Navigate to pets section
    await page.click('a[href="#pets"]');
    
    // Test filter dropdown
    const filterSelect = page.locator('#filterSelect');
    await expect(filterSelect).toBeVisible();
    await filterSelect.selectOption('dog');
    
    // Verify selection
    await expect(filterSelect).toHaveValue('dog');
  });

  test('should be accessible', async ({ page }) => {
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for alt attributes on images
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.hero')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('.container')).toBeVisible();
  });
});