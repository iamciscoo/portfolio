import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";

const output = "tmp/refinement-qa";
for (const width of [1440, 1280, 768, 390, 320]) {
  test(`photography and scroll compositions at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    await fs.mkdir(output, { recursive: true });
    await page.setViewportSize({ width, height: width < 700 ? 844 : 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/en");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".hero-photo-print img")).toBeVisible();
    const before = await page
      .locator(".hero-photo-print")
      .evaluate((el) => getComputedStyle(el).transform);
    await page.screenshot({ path: `${output}/${width}-opening.png` });
    await page.evaluate(() => scrollTo({ top: 260, behavior: "instant" }));
    await expect
      .poll(() =>
        page
          .locator(".hero-photo-print")
          .evaluate((el) => getComputedStyle(el).transform),
      )
      .not.toBe(before);
    await page.screenshot({ path: `${output}/${width}-hero-middle.png` });
    for (const [name, selector] of [
      ["project-desktop-phone", ".exhibit-stage"],
      ["studio", ".studio-grid"],
      ["contact", ".personal-contact"],
    ]) {
      await page.locator(selector).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${output}/${width}-${name}.png` });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
    }
    for (const route of ["/about", "/journey", "/projects/iphone-service-tz"]) {
      await page.goto(`/en${route}`);
      await page.locator("main").scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
    }
    await page.goto("/en/about");
    await expect(page.locator(".story-chapter")).toHaveCount(3);
    await expect(page.locator(".work-note-photo img")).toBeVisible();
    const photo = page.getByRole("button", {
      name: /Gallery: Francis wearing glasses/,
    });
    await photo.scrollIntoViewIfNeeded();
    await photo.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(photo).toBeFocused();
    expect(errors).toEqual([]);
  });
}

test("language menu supports keyboard, selection, query and hash", async ({
  page,
}) => {
  await page.goto("/en/contact?service=redesign#main");
  const trigger = page.getByRole("button", { name: "Language", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("menuitemradio", { name: "English", exact: true }),
  ).toHaveAttribute("aria-checked", "true");
  await expect(page.getByRole("menu").locator(".language-flag")).toHaveCount(5);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("menuitemradio", { name: "Русский", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/ru\/contact\?service=redesign#main$/);
  await expect(page.locator("#service")).toHaveValue("redesign");
});

test("mobile navigation includes full-name language menu", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/en/projects/iphone-service-tz");
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Language", exact: true })
    .click();
  await page
    .getByRole("menuitemradio", { name: "Kiswahili", exact: true })
    .click();
  await expect(page).toHaveURL(/\/sw\/projects\/iphone-service-tz$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Lugha", exact: true }),
  ).toContainText("SW");
});

test("reduced motion removes decorative travel and sticky holds", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.locator(".personal-hero-copy")).toBeVisible();
  for (const selector of [
    ".hero-photo-print",
    ".personal-hero-copy",
    ".exhibit-desktop",
    ".exhibit-phone",
  ]) {
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((el) => getComputedStyle(el).transform),
    ).toBe("none");
  }
  await page.goto("/en/about");
  expect(
    await page
      .locator(".story-photo")
      .evaluate((el) => getComputedStyle(el).position),
  ).toBe("relative");
  await fs.mkdir(output, { recursive: true });
  await page.screenshot({ path: `${output}/reduced-opening.png` });
  await page.goto("/en");
  await page.locator(".exhibit-stage").first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/reduced-project.png` });
  expect(errors).toEqual([]);
});

test("light theme and open language menu pass accessibility checks", async ({
  page,
}) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "Change color theme" }).click();
  await page.getByRole("button", { name: "Language", exact: true }).click();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});

test("content, project links and photographs remain readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/en");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".hero-photo-print img")).toBeVisible();
  await expect(page.locator(".story-chapter")).toHaveCount(0);
  const project = page
    .locator(".exhibit-copy")
    .first()
    .getByRole("link", { name: "See how I built it", exact: true });
  await project.scrollIntoViewIfNeeded();
  await expect(project).toBeVisible();
  await project.click();
  await expect(page).toHaveURL(/\/en\/projects\/globoexpats$/);
  await page.goto("http://127.0.0.1:3000/en/about");
  await expect(page.locator(".story-chapter")).toHaveCount(3);
  await expect(page.locator(".work-note-photo img")).toBeVisible();
  await context.close();
});
