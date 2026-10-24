import { test, expect } from "./fixtures";

test("nav tap on the current page lifts it back to the top", async ({
  page,
}) => {
  await page.goto("/en/about");
  await page.evaluate(() => scrollTo({ top: 1400, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(1400);
  await page.locator('.desktop-nav a[href="/en/about"]').click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  expect(new URL(page.url()).pathname).toBe("/en/about");
});

test("mobile menu closes and lifts the current page to the top", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/about");
  await page.evaluate(() => scrollTo({ top: 1200, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(1200);
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
