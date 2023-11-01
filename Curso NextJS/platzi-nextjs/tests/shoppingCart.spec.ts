import { test, expect } from '@playwright/test'

test('When added more than once it should be update the shopping cart quantity', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/')
  //Click on the first link on the page
  await page.locator('main a').first().click()

  //Add quantity of elements
  await page.locator('#quantityInput').click()
  await page.locator('#quantityInput').fill('5')
  await page.locator("button[type='submit']").click()

  //Add quantity of elements
  await page.locator('#quantityInput').click()
  await page.locator('#quantityInput').fill('3')
  await page.locator("button[type='submit']").click()

  //Verify shopping cart new quantity
  const shoppingCart = await page.locator('#shoppingLink')
  await expect(shoppingCart).toContainText(/8/)
})
