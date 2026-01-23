import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should load homepage and display logo', async ({ page }) => {
    await page.goto('/')

    // Check logo is visible
    const logo = page.locator('a[href="/"] svg').first()
    await expect(logo).toBeVisible()

    // Check page title
    await expect(page).toHaveTitle(/FI Int/)
  })

  test('should navigate to sections via header links', async ({ page }) => {
    await page.goto('/')

    // Click Services link (use first() to avoid multiple matches)
    await page.locator('header a[href="/#services"]').first().click()
    await expect(page.locator('#services')).toBeInViewport()

    // Click Pricing link
    await page.locator('header a[href="/#pricing"]').first().click()
    await expect(page.locator('#pricing')).toBeInViewport()

    // Click Contact link
    await page.locator('header a[href="/#contact"]').first().click()
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('should navigate to careers page', async ({ page }) => {
    await page.goto('/')

    // Scroll to footer and click careers link
    await page.locator('footer').scrollIntoViewIfNeeded()
    await page.click('footer a[href="/careers"]')

    await expect(page).toHaveURL('/careers')
    await expect(page.locator('h1')).toContainText(/Join|Career/i)
  })
})

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark mode', async ({ page }) => {
    await page.goto('/')

    // Find the theme toggle button by its aria-label
    const themeToggle = page
      .locator('button[aria-label*="Switch to"], button[aria-label*="theme" i]')
      .first()
    await expect(themeToggle).toBeVisible()

    // Get initial theme
    const html = page.locator('html')
    const initialClass = (await html.getAttribute('class')) || ''
    const wasDark = initialClass.includes('dark')

    // Click toggle
    await themeToggle.click()

    // Wait for theme change and localStorage update
    await page.waitForTimeout(500)

    // Check theme changed
    const newClass = (await html.getAttribute('class')) || ''
    const isDark = newClass.includes('dark')
    expect(isDark).not.toBe(wasDark)
  })
})

test.describe('Language Switcher', () => {
  test('should switch between English and Ukrainian', async ({ page }) => {
    await page.goto('/')

    // Find language switcher in header
    const langSwitcher = page.locator('header button:has-text("EN")').first()
    await expect(langSwitcher).toBeVisible()

    // Click to open dropdown
    await langSwitcher.click()

    // Click Ukrainian option
    await page
      .locator('button:has-text("Українська"), [role="menuitem"]:has-text("Українська")')
      .first()
      .click()

    // Wait for content to update
    await page.waitForTimeout(500)

    // Check that Ukrainian content appears somewhere on the page
    const pageContent = await page.textContent('body')
    expect(pageContent).toMatch(/Фінансовий|Послуги|Контакт|Головна/)
  })
})

test.describe('Responsive Design', () => {
  test('should show mobile menu on small screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Wait for page to fully load and any overlays to settle
    await page.waitForLoadState('networkidle')

    // Mobile menu button should be visible (has specific aria-label)
    const menuButton = page.locator('button[aria-label="Open menu"]')
    await expect(menuButton).toBeVisible()

    // Scroll to top to ensure header is fully visible
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(100)

    // Click to open menu
    await menuButton.click()

    // Wait for menu animation (max-h transition)
    await page.waitForTimeout(300)

    // Mobile menu links are inside the header, not a dialog
    // Check that the mobile nav link becomes visible after menu opens
    const mobileNavLink = page.locator('header a[href="/#services"]').last()
    await expect(mobileNavLink).toBeVisible({ timeout: 5000 })
  })
})
