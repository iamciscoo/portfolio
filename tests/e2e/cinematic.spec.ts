import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test("navigation responds to hover and the reading indicator follows scroll", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");
  const about = page.locator('.desktop-nav a[href="/en/about"]');
  await about.hover();
  await expect(about.locator(".nav-hover-pill")).toBeVisible();
  const progress = page.locator(".reading-progress");
  const start = await progress.evaluate((el) => getComputedStyle(el).transform);
  await page.locator(".exhibit-stage").first().scrollIntoViewIfNeeded();
  await expect
    .poll(() => progress.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(start);
  await about.click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator(".work-notes")).toHaveCount(1);
  await expect(page.locator(".about-moments")).toHaveCount(1);
});

for (const [locale, name, label] of [
  ["fr", "Français", "J’ai besoin"],
  ["es", "Español", "Necesito ayuda"],
]) {
  test(`${name} switching preserves the inquiry route and supplies a translated template`, async ({
    page,
  }) => {
    await page.goto("/en/contact?service=software#main");
    await page.getByRole("button", { name: "Language", exact: true }).click();
    await page.getByRole("menuitemradio", { name, exact: true }).click();
    await expect(page).toHaveURL(
      new RegExp(`/${locale}/contact\\?service=software#main$`),
    );
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("#service")).toHaveValue("software");
    await page.locator("#inquiry-template").selectOption("windows");
    await expect(page.locator("#description")).toHaveValue(new RegExp(label));
    await expect(page.locator("#language")).toHaveValue(locale);
    await expect(page.locator('link[hreflang="fr"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="es"]')).toHaveCount(1);
  });
}

test("the personal About story is accessible in both themes", async ({
  page,
}) => {
  await page.goto("/en/about");
  for (const theme of ["dark", "light"]) {
    if (theme === "light")
      await page.getByRole("button", { name: "Change color theme" }).click();
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});
