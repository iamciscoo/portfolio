import { test, expect } from "./fixtures";

test("mobile hero keeps its title color when scrolling down and back", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const title = page.locator(".hero-statement");
  await expect(title).toHaveCSS("color", "rgb(247, 248, 250)");
  for (const top of [120, 220, 0]) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), top);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(top);
    await expect(page.locator(".cinematic-hero h1")).toHaveAttribute(
      "data-reveal-entered",
      "true",
    );
    if (top > 0) {
      await expect(page.locator(".cinematic-hero h1")).toHaveAttribute(
        "data-reveal-pending",
        "",
      );
    }
    await expect(title).toHaveCSS("color", "rgb(247, 248, 250)");
  }
});
