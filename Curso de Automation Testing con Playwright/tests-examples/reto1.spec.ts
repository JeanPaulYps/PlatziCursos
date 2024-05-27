import { test, expect } from "@playwright/test";

test("Shopping cart test", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  // Locate link to access the product 
  await page.locator(".features_items .choose a").first().click();

  // Click to skip ads 
  await page.mouse.click(0, 0);

  // Add 3 products
  await page.locator("#quantity").fill("3");

  // Add to the cart
  await page.locator(".product-information button").click();

  // Click on the button to keep navigating 
  await page.locator(".modal button").click();

  // Expect that the modal is closed once is clicked 
  await expect(page.locator(".modal")).not.toBeVisible();
});
