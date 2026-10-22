import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";

test("templates preserve contacts and require explicit brief replacement", async ({
  page,
}) => {
  await page.goto("/en/contact?service=windows");
  await expect(page.locator("#service")).toHaveValue("windows");
  await page.locator("#name").fill("Template Visitor");
  await page.locator("#email").fill("visitor@example.com");
  await page.locator("#phone").fill("+255 712 345 678");
  await page
    .locator("#description")
    .fill(
      "My own existing project details must stay until I choose to replace them.",
    );
  await page.locator("#inquiry-template").selectOption("gaming");
  await expect(page.locator("#description")).toHaveValue(/^My own existing/);
  await page
    .getByRole("button", {
      name: "Replace my brief with this template",
      exact: true,
    })
    .click();
  await expect(page.locator("#service")).toHaveValue("gaming");
  await expect(page.locator("#description")).toHaveValue(/Game and launcher/);
  await expect(page.locator("#description")).toBeFocused();
  await expect(page.locator("#name")).toHaveValue("Template Visitor");
  await expect(page.locator("#email")).toHaveValue("visitor@example.com");
  await expect(page.locator("#phone")).toHaveValue("+255 712 345 678");
  await page
    .locator("#description")
    .fill(
      "Please help me configure a game that currently fails to launch on my computer.",
    );
  await page.getByRole("checkbox").check();
  const submitted = page.waitForRequest(
    (request) =>
      request.url().endsWith("/api/contact") && request.method() === "POST",
  );
  await page.getByRole("button", { name: "Send inquiry", exact: true }).click();
  const body = (await submitted).postDataJSON();
  expect(body.phone).toBe("+255 712 345 678");
  expect(body.service).toBe("gaming");
  await expect(page.locator(".form-status")).toBeVisible();
});

test("phone is optional and invalid formats are explained", async ({
  page,
}) => {
  await page.goto("/en/contact");
  await page.locator("#phone").fill("not a phone");
  await page.getByRole("button", { name: "Send inquiry", exact: true }).click();
  await expect(page.locator("#phone-error")).toContainText("7–15 digits");
  await page.locator("#phone").fill("");
  await page.getByRole("button", { name: "Send inquiry", exact: true }).click();
  await expect(page.locator("#phone-error")).toHaveCount(0);
});

test("software services and localized templates are available in all locales", async ({
  page,
}) => {
  for (const locale of ["en", "ru", "sw"]) {
    await page.goto(`/${locale}/contact?service=software`);
    await expect(page.locator("#service")).toHaveValue("software");
    await page.locator("#inquiry-template").selectOption("windows");
    await page.locator(".template-preview button").click();
    await expect(page.locator("#service")).toHaveValue("windows");
    await expect(page.locator("#description")).toHaveValue(/Windows/);
    await page.goto(`/${locale}/services`);
    await expect(
      page.locator('a[href$="/contact?service=windows"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('a[href$="/contact?service=gaming"]'),
    ).toHaveCount(1);
  }
});

for (const width of [1440, 1280, 768, 390, 320])
  test(`home and inquiry updates fit ${width}px`, async ({ page }) => {
    test.setTimeout(60000);
    await fs.mkdir("tmp/inquiry-software-qa", { recursive: true });
    const height = width === 1440 ? 630 : 950;
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const locale of ["en", "ru", "sw"]) {
      await page.goto(`/${locale}`);
      await expect(page.locator(".hero-photo-print img")).toHaveAttribute(
        "src",
        /journey-art/,
      );
      if (height === 630) {
        const actions = await page.locator(".hero-actions").boundingBox();
        expect(actions).not.toBeNull();
        expect(actions!.y + actions!.height).toBeLessThanOrEqual(height);
      }
      await page.locator(".work-notes").scrollIntoViewIfNeeded();
      await expect(page.locator(".work-note-photo img")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      await page.locator(".software-support").scrollIntoViewIfNeeded();
      await page
        .locator(`.software-options a[href$="service=windows"]`)
        .click();
      await expect(page.locator("#service")).toHaveValue("windows");
      await page.locator("#inquiry-template").selectOption("windows");
      await page.locator(".template-preview button").click();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      if (locale === "en")
        await page.screenshot({
          path: `tmp/inquiry-software-qa/${width}-contact.png`,
          fullPage: true,
        });
    }
    expect(errors).toEqual([]);
  });

test("expanded contact form passes accessibility checks", async ({ page }) => {
  await page.goto("/en/contact");
  await page.locator("#inquiry-template").selectOption("windows");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations.map((v) => v.id)).toEqual([]);
});
