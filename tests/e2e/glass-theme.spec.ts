import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 844, 1440]) {
  test(`light default and glass navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator(".site-header")).toHaveCSS(
      "backdrop-filter",
      /blur/,
    );
    await page.screenshot({ path: `tmp/glass-qa/light-${width}.png` });
    for (const theme of ["light", "dark"]) {
      if (theme === "dark")
        await page.getByRole("button", { name: "Change color theme" }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        scan.violations.map((v) => ({
          id: v.id,
          targets: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
      if (width < 1100) {
        await page
          .getByRole("button", { name: "Open navigation", exact: true })
          .click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.screenshot({
          path: `tmp/glass-qa/menu-${theme}-${width}.png`,
        });
        await page.keyboard.press("Escape");
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
    expect(errors).toEqual([]);
  });
}

test("light is readable with scripts disabled or storage blocked", async ({
  browser,
  page,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("http://127.0.0.1:3000/en");
  await expect(staticPage.locator("html")).toHaveAttribute(
    "data-theme",
    "light",
  );
  await expect(staticPage.locator("h1")).toBeVisible();
  await context.close();
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("Storage unavailable");
    };
  });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Change color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
