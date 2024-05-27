import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test.skip("Realizar una busqueda que no tenga resultados", async ({ page }) => {
  await page.getByLabel("Search").click();

  await page.getByPlaceholder("Search docs").click();

  await page.getByPlaceholder("Search docs").fill("hascontent");

  await expect(page.locator(".DocSearch-NoResults p")).toBeVisible();

  await expect(page.getByText(/No results for \"hascontent\"/i)).toBeTruthy();

  //   await expect(page.locator(".DocSearch-NoResults p")).toHaveText(
  //     'No results for "hascontent"'
  //   );
});

test.skip("Limpiar el input de busqueda", async ({ page }) => {
  await page.getByRole("button", { name: "Search" }).click();

  const searchBox = page.getByPlaceholder("Search docs");

  await searchBox.click();

  await searchBox.fill("somerandomtext");

  await expect(searchBox).toHaveValue("somerandomtext");

  await page.getByRole("button", { name: "Clear the query" }).click();

  await expect(searchBox).toHaveValue("");
});

test("Realizar una busqueda que genere al menos tenga un resultado", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Search " }).click();

  const searchBox = page.getByPlaceholder("Search docs");

  await searchBox.click();

  await page.getByPlaceholder("Search docs").fill("havetext");

  expect(searchBox).toHaveValue("havetext");

  // Verity there are sections in the results
  await page
    .locator(".DocSearch-Dropdown-Container section")
    .nth(1)
    .waitFor({ state: "visible" });

  const numberOfResults = await page
    .locator(".DocSearch-Dropdown-Container section")
    .count();
  await expect(numberOfResults).toBeGreaterThan(0);
});
