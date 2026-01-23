import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should load homepage and display logo', async ({ page }) => {
    await page.goto('/');

    // Check logo is visible
    const logo = page.locator('a[href="/"] svg').first();
    await expect(logo).toBeVisible();

    // Check page title
    await expect(page).toHaveTitle(/FI Int/);
  });

  test('should navigate to sections via header links', async ({ page }) => {
    await page.goto('/');

    // Click Services link
    await page.click('a[href="/#services"]');
    await expect(page.locator('#services')).toBeInViewport();

    // Click Pricing link
    await page.click('a[href="/#pricing"]');
    await expect(page.locator('#pricing')).toBeInViewport();

    // Click Contact link
    await page.click('a[href="/#contact"]');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should navigate to careers page', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer and click careers link
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.click('a[href="/careers"]');

    await expect(page).toHaveURL('/careers');
    await expect(page.locator('h1')).toContainText(/Join|Career/i);
  });
});

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark mode', async ({ page }) => {
    await page.goto('/');

    // Find the theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i], button:has(svg.lucide-sun), button:has(svg.lucide-moon)').first();
    await expect(themeToggle).toBeVisible();

    // Get initial theme
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');

    // Click toggle
    await themeToggle.click();

    // Wait for theme change
    await page.waitForTimeout(300);

    // Check theme changed
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });
});

test.describe('Language Switcher', () => {
  test('should switch between English and Ukrainian', async ({ page }) => {
    await page.goto('/');

    // Find language switcher
    const langSwitcher = page.locator('button:has-text("EN")').first();
    await expect(langSwitcher).toBeVisible();

    // Click to open dropdown
    await langSwitcher.click();

    // Click Ukrainian option
    await page.click('button:has-text("Українська")');

    // Wait for content to update
    await page.waitForTimeout(500);

    // Check that Ukrainian content appears
    const heroText = page.locator('section').first();
    await expect(heroText).toContainText(/Фінансовий|Послуги|Контакт/);
  });
});

test.describe('Responsive Design', () => {
  test('should show mobile menu on small screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Desktop nav should be hidden
    const desktopNav = page.locator('nav.hidden.md\\:grid');
    await expect(desktopNav).not.toBeVisible();

    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label*="menu" i]');
    await expect(menuButton).toBeVisible();

    // Click to open menu
    await menuButton.click();

    // Mobile menu should show links
    await expect(page.locator('a[href="/#services"]')).toBeVisible();
  });
});
