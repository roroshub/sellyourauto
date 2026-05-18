import { test, expect } from '@playwright/test'

test.describe('Vehicle Appraisal Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('#appraisal')
  })

  test('renders step 1 by default', async ({ page }) => {
    await page.locator('#appraisal').scrollIntoViewIfNeeded()
    await expect(page.getByText('Tell Us About Your Vehicle')).toBeVisible()
  })

  test('shows validation errors on empty step 1 submit', async ({ page }) => {
    await page.locator('#appraisal').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: /Continue to Contact Info/i }).click()
    await expect(page.getByText('Year is required')).toBeVisible()
    await expect(page.getByText('Make is required')).toBeVisible()
  })

  test('advances to step 2 with valid vehicle data', async ({ page }) => {
    await page.locator('#appraisal').scrollIntoViewIfNeeded()

    await page.locator('select').nth(0).selectOption('2020')
    await page.locator('select').nth(1).selectOption('Toyota')
    await page.locator('select').nth(2).selectOption('Camry')
    await page.locator('input[placeholder*="mileage"], input[placeholder*="85,000"]').fill('85000')
    await page.getByRole('button', { name: 'Good' }).click()
    await page.getByRole('button', { name: /Continue to Contact Info/i }).click()

    await expect(page.getByText('Where Should We Send Your Offer')).toBeVisible()
  })

  test('shows contact validation errors', async ({ page }) => {
    await page.locator('#appraisal').scrollIntoViewIfNeeded()

    await page.locator('select').nth(0).selectOption('2020')
    await page.locator('select').nth(1).selectOption('Toyota')
    await page.locator('select').nth(2).selectOption('Camry')
    await page.locator('input[placeholder*="85,000"]').fill('50000')
    await page.getByRole('button', { name: 'Good' }).click()
    await page.getByRole('button', { name: /Continue to Contact Info/i }).click()
    await page.getByRole('button', { name: /Get My Free Offer/i }).click()

    await expect(page.getByText('First name is required')).toBeVisible()
  })

  test('completes full form submission', async ({ page }) => {
    await page.locator('#appraisal').scrollIntoViewIfNeeded()

    await page.locator('select').nth(0).selectOption('2020')
    await page.locator('select').nth(1).selectOption('Toyota')
    await page.locator('select').nth(2).selectOption('Camry')
    await page.locator('input[placeholder*="85,000"]').fill('50000')
    await page.getByRole('button', { name: 'Good' }).click()
    await page.getByRole('button', { name: /Continue to Contact Info/i }).click()

    await page.getByPlaceholder('Jane').fill('John')
    await page.getByPlaceholder('Doe').fill('Smith')
    await page.getByPlaceholder('jane@example.com').fill('john@example.com')
    await page.getByPlaceholder('+1 (416) 000-0000').fill('416-555-0100')
    await page.getByRole('button', { name: /Get My Free Offer/i }).click()

    await expect(page.getByText('Submission Received!')).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Navigation', () => {
  test('navbar is present and links scroll to sections', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
    await page.getByRole('link', { name: /How It Works/i }).first().click()
    await expect(page.locator('#how-it-works')).toBeInViewport()
  })
})
