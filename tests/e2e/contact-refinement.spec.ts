import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";

for (const width of [320, 390, 768, 1440]) {
  test(`compact contact preserves optional details at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    for (const locale of ["en", "ru", "sw", "fr", "es"]) {
      await page.goto(`/${locale}/contact?service=windows`);
      const options = page.locator(".inquiry-options");
      await expect(options).not.toHaveAttribute("open", "");
      await expect(page.locator("#company")).toBeHidden();
      await expect(page.locator("#phone")).toBeVisible();
      await page.locator("#name").fill("Portfolio Visitor");
      await page.locator("#email").fill("visitor@example.com");
      await page
        .locator("#description")
        .fill(
          "Please help me reinstall Windows on my laptop and configure my applications.",
        );
      await options.locator("summary").click();
      await page.locator("#company").fill("Visitor Studio");
      await page.locator("#budget").selectOption("medium");
      await expect(page.locator("#language")).toHaveValue(locale);
      await options.locator("summary").click();
      await options.locator("summary").click();
      await expect(page.locator("#company")).toHaveValue("Visitor Studio");
      await expect(page.locator("#budget")).toHaveValue("medium");
      await options.locator("summary").click();
      await page.getByRole("checkbox").check();
      const request = page.waitForRequest(
        (r) => r.url().endsWith("/api/contact") && r.method() === "POST",
      );
      await page.locator('button[type="submit"]').click();
      expect((await request).postDataJSON()).toMatchObject({
        company: "Visitor Studio",
        budget: "medium",
        locale,
        phone: "",
        service: "windows",
      });
      await expect(page.locator(".form-status")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
    }
    await page.goto("/en/contact");
    await fs.mkdir("tmp/portrait-contact-qa", { recursive: true });
    await page.screenshot({
      path: `tmp/portrait-contact-qa/contact-${width}.png`,
      fullPage: true,
    });
    if (width === 390 || width === 1440) {
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(scan.violations.map((v) => v.id)).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("About displays all four owner-selected Instagram images and edited expressions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/about");
  await expect(page.locator(".about-photo-intro img")).toHaveAttribute(
    "src",
    /cisco-boat-smile/,
  );
  await expect(page.locator(".story-photo img")).toHaveAttribute(
    "src",
    /cisco-candid-smile/,
  );
  const gallery = page.locator(".photo-collection-grid");
  for (const name of [
    "headphones",
    "campus",
    "basketball",
    "family-celebration",
  ]) {
    const trigger = gallery.locator(
      `.gallery-trigger:has(img[src*="cisco-${name}"])`,
    );
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await expect(page.getByRole("dialog").locator("img")).toHaveAttribute(
      "src",
      new RegExp(`cisco-${name}`),
    );
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
  await gallery.scrollIntoViewIfNeeded();
  await page.screenshot({
    path: "tmp/portrait-contact-qa/about-mobile.png",
    fullPage: true,
  });
  await gallery.screenshot({
    path: "tmp/portrait-contact-qa/gallery-mobile.png",
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/about");
  await gallery.scrollIntoViewIfNeeded();
  await gallery.screenshot({
    path: "tmp/portrait-contact-qa/gallery-desktop.png",
  });
});
