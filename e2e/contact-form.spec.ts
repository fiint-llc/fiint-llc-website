import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
    // Wait for the form to be visible
    await page.waitForSelector('form');
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Check all form fields are present
    await expect(page.locator('input[name="name"], input[placeholder*="name" i]').first()).toBeVisible();
    await expect(page.locator('input[name="email"], input[type="email"]').first()).toBeVisible();
    await expect(page.locator('textarea, input[name="message"]').first()).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty form submission', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Wait for validation
    await page.waitForTimeout(300);

    // Check for validation error indicators (red border, error text, etc.)
    const hasErrors = await page.locator('[class*="red"], [class*="error"], [aria-invalid="true"]').count();
    expect(hasErrors).toBeGreaterThan(0);
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Fill in name
    await page.locator('input[name="name"], input[placeholder*="name" i]').first().fill('Test User');

    // Fill in invalid email
    await page.locator('input[name="email"], input[type="email"]').first().fill('invalid-email');

    // Fill in message
    await page.locator('textarea').first().fill('This is a test message for the form.');

    // Submit
    await page.click('button[type="submit"]');

    // Wait for validation
    await page.waitForTimeout(300);

    // Check for email validation error
    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    const hasInvalidClass = await emailInput.evaluate((el) => {
      return el.classList.contains('border-red-500') || el.getAttribute('aria-invalid') === 'true';
    });

    expect(hasInvalidClass).toBeTruthy();
  });

  test('should fill form correctly', async ({ page }) => {
    // Fill in all fields
    await page.locator('input[name="name"], input[placeholder*="name" i]').first().fill('Test User');
    await page.locator('input[name="email"], input[type="email"]').first().fill('test@example.com');

    // Company field might be optional
    const companyField = page.locator('input[name="company"], input[placeholder*="company" i]').first();
    if (await companyField.isVisible()) {
      await companyField.fill('Test Company');
    }

    await page.locator('textarea').first().fill('This is a test message for the contact form. It should be long enough to pass validation.');

    // Verify fields are filled
    await expect(page.locator('input[name="name"], input[placeholder*="name" i]').first()).toHaveValue('Test User');
    await expect(page.locator('input[name="email"], input[type="email"]').first()).toHaveValue('test@example.com');
  });
});

test.describe('Contact Form Submission', () => {
  test('should submit form successfully with valid data', async ({ page }) => {
    await page.goto('/#contact');
    await page.waitForSelector('form');

    // Wait a bit to pass the anti-spam timing check
    await page.waitForTimeout(4000);

    // Fill form
    await page.locator('input[name="name"], input[placeholder*="name" i]').first().fill('Test User');
    await page.locator('input[name="email"], input[type="email"]').first().fill('test@example.com');
    await page.locator('textarea').first().fill('This is a test message for the contact form submission test.');

    // Mock the API response
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for success state
    await page.waitForTimeout(1000);

    // Check for success message
    const successIndicator = page.locator('text=/sent|success|thank/i').first();
    await expect(successIndicator).toBeVisible({ timeout: 5000 });
  });
});
