import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  expect(page.locator('nav')).toBeDefined()
  await page
    .getByRole('link', { name: 'Avocado photo Maluma Hass Avocado $ 1.15' })
    .click()

  await page.waitForURL('**/product/**')

  await page.locator('h2').click()

  expect(
    await page.getByRole('heading', {
      name: 'About this avocado',
    })
  ).toBeDefined()
})
