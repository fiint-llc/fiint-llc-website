import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact')
    // Wait for the form to be visible
    await page.waitForSelector('form')
  })

  test('should display contact form with all fields', async ({ page }) => {
    // Check all form fields are present
    await expect(page.locator('input[name="name"]').first()).toBeVisible()
    await expect(page.locator('input[name="email"]').first()).toBeVisible()
    await expect(page.locator('textarea[name="message"]').first()).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should require fields for submission', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]')
    const nameInput = page.locator('input[name="name"]').first()

    // Try to submit empty form
    await submitButton.click()

    // Check that form didn't submit (either native validation or custom)
    // The name field should either have :invalid pseudo-class or aria-invalid
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => {
      return !el.validity.valid || el.getAttribute('aria-invalid') === 'true'
    })

    expect(isInvalid).toBeTruthy()
  })

  test('should fill form correctly', async ({ page }) => {
    // Fill in all fields
    await page.locator('input[name="name"]').first().fill('Test User')
    await page.locator('input[name="email"]').first().fill('test@example.com')
    await page
      .locator('textarea[name="message"]')
      .first()
      .fill('This is a test message for the contact form.')

    // Verify fields are filled
    await expect(page.locator('input[name="name"]').first()).toHaveValue('Test User')
    await expect(page.locator('input[name="email"]').first()).toHaveValue('test@example.com')
  })
})

test.describe('Contact Form Submission', () => {
  test('should submit form successfully with valid data', async ({ page }) => {
    await page.goto('/#contact')
    await page.waitForSelector('form')

    // Wait a bit to pass the anti-spam timing check
    await page.waitForTimeout(4000)

    // Fill form
    await page.locator('input[name="name"]').first().fill('Test User')
    await page.locator('input[name="email"]').first().fill('test@example.com')
    await page
      .locator('textarea[name="message"]')
      .first()
      .fill('This is a test message for the contact form submission test.')

    // Mock the API response
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    })

    // Submit form
    await page.click('button[type="submit"]')

    // Wait for success state
    await page.waitForTimeout(1000)

    // Check for success message
    const successIndicator = page.locator('text=/sent|success|thank/i').first()
    await expect(successIndicator).toBeVisible({ timeout: 5000 })
  })
})
