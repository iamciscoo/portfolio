import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test("website showcases have transparent stages and complete browser displays", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en");
    for (const stage of await page.locator(".exhibit-stage").all()) {
      await stage.scrollIntoViewIfNeeded();
      expect(
        await stage.evaluate((el) => getComputedStyle(el).backgroundColor),
      ).toBe("rgba(0, 0, 0, 0)");
      const outer = await stage.boundingBox();
      const display = await stage.locator(".exhibit-desktop").boundingBox();
      expect(display!.y + display!.height).toBeLessThanOrEqual(
        outer!.y + outer!.height + 1,
      );
      await expect(stage.locator(".exhibit-phone img")).toBeVisible();
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
  }
  await page.locator(".exhibit-desktop a").first().click();
  await expect(page).toHaveURL(/\/en\/projects\/globoexpats$/);
});

test("About opens with a new Instagram photo and allows original/enhanced comparison", async ({
  page,
}) => {
  await page.goto("/en/about");
  const photo = page.locator(".about-photo-intro .gallery-trigger");
  await expect(photo.locator("img")).toHaveAttribute(
    "src",
    /cisco-boat-enhanced/,
  );
  await expect(
    page.locator('.photo-collection-grid img[src*="cisco-timun-assembly"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('.photo-collection-grid img[src*="-enhanced"]'),
  ).toHaveCount(2);
  await photo.click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("button", { name: "Enhanced", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await dialog.getByRole("button", { name: "Original", exact: true }).click();
  await expect(dialog.locator("img")).toHaveAttribute(
    "src",
    /cisco-boat-original/,
  );
  await expect(dialog.getByRole("status")).toHaveText("Original photograph.");
  await dialog.getByRole("button", { name: "Enhanced", exact: true }).click();
  await expect(dialog.locator("img")).toHaveAttribute(
    "src",
    /cisco-boat-enhanced/,
  );
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(scan.violations.map((v) => v.id)).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(photo).toBeFocused();
});

test("photo comparison is translated and works on a small phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const [locale, original, enhanced] of [
    ["ru", "Оригинал", "Улучшенная"],
    ["sw", "Asili", "Iliyoboreshwa"],
    ["fr", "Original", "Améliorée"],
    ["es", "Original", "Mejorada"],
  ]) {
    await page.goto(`/${locale}/about`);
    await page.locator(".about-photo-intro .gallery-trigger").click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: original, exact: true }).click();
    await expect(dialog.locator("img")).toHaveAttribute(
      "src",
      /cisco-boat-original/,
    );
    await dialog.getByRole("button", { name: enhanced, exact: true }).click();
    const bounds = await dialog.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(321);
    await page.keyboard.press("Escape");
  }
});
