import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";

test("home keeps one progress indicator and stationary copy", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(page.locator(".hero-bottom-line")).toHaveCount(0);
  await expect(page.locator(".reading-progress")).toHaveCount(1);
  await page.evaluate(() => scrollTo({ top: 240, behavior: "instant" }));
  expect(
    await page
      .locator(".personal-hero-copy")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
});

test("Work offers concept sites after the real websites in every language", async ({
  page,
}) => {
  for (const locale of ["en", "ru", "sw", "fr", "es"]) {
    await page.goto(`/${locale}/projects`);
    const bridge = page.locator(".studio-invitation");
    await expect(bridge.getByRole("heading", { level: 2 })).toBeVisible();
    const websites = await page.locator(".full-project-grid").boundingBox();
    expect((await bridge.boundingBox())!.y).toBeGreaterThanOrEqual(
      websites!.y + websites!.height,
    );
    await expect(bridge.locator('a[href$="/studio/shop"]')).toHaveCount(1);
    await expect(bridge.locator('a[href$="/studio/tours"]')).toHaveCount(1);
    await bridge.locator("a.button").click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/studio$`));
  }
});

for (const width of [320, 390, 1440]) {
  test(`scroll composition and photo zoom stay usable at ${width}px`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en");
    const frame = page.locator(".exhibit-desktop").first();
    const stage = page.locator(".exhibit-stage").first();
    await page.evaluate(() => {
      const node = document.querySelector(".exhibit-stage")!;
      scrollTo({
        top: node.getBoundingClientRect().top + scrollY - innerHeight * 0.3,
        behavior: "instant",
      });
    });
    await expect
      .poll(() =>
        frame.evaluate(
          (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m11,
        ),
      )
      .toBeGreaterThan(0.999);
    const outer = (await stage.boundingBox())!;
    const display = (await frame.boundingBox())!;
    expect(display.y + display.height).toBeLessThanOrEqual(
      outer.y + outer.height + 1,
    );
    await page.goto("/en/projects");
    await page.locator(".studio-invitation").scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
    await fs.mkdir("tmp/scroll-zoom-qa", { recursive: true });
    await page.screenshot({
      path: `tmp/scroll-zoom-qa/work-${width}.png`,
      fullPage: true,
    });
    await page.goto("/ru/about");
    const photo = page.locator(".about-photo-intro .gallery-trigger");
    await photo.click();
    const dialog = page.getByRole("dialog");
    const viewport = dialog.locator(".gallery-viewport");
    const zoom = dialog.locator(".gallery-zoom-button");
    await expect(zoom).toHaveAttribute("aria-pressed", "false");
    await zoom.click();
    await expect(zoom).toHaveAttribute("aria-pressed", "true");
    const dimensions = await viewport.evaluate((el) => ({
      width: el.clientWidth,
      height: el.clientHeight,
      scrollWidth: el.scrollWidth,
      scrollHeight: el.scrollHeight,
    }));
    expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.width * 1.9);
    expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.height * 1.9);
    const box = (await dialog.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
    expect(box.height).toBeLessThan(900 * 0.9);
    await viewport.focus();
    await page.keyboard.press("0");
    await expect(zoom).toHaveAttribute("aria-pressed", "false");
    await page.keyboard.press("+");
    await expect(zoom).toHaveAttribute("aria-pressed", "true");
    await page.screenshot({ path: `tmp/scroll-zoom-qa/zoom-${width}.png` });
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(photo).toBeFocused();
    await photo.click();
    await expect(dialog.locator(".gallery-zoom-button")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    await page.keyboard.press("Escape");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    expect(await frame.evaluate((el) => getComputedStyle(el).transform)).toBe(
      "none",
    );
    await expect(page.locator(".hero-photo-print")).toHaveCSS(
      "transform",
      "none",
    );
    expect(errors).toEqual([]);
  });
}

test("concept invitation and photo controls support all five translations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  for (const locale of ["en", "ru", "sw", "fr", "es"]) {
    await page.goto(`/${locale}/projects`);
    const bridge = page.locator(".studio-invitation");
    await bridge.scrollIntoViewIfNeeded();
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(scan.violations.map((v) => v.id)).toEqual([]);
    await page.goto(`/${locale}/about`);
    await page.locator(".story-photo .gallery-trigger").click();
    await page.getByRole("dialog").locator(".gallery-zoom-button").click();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
    await page.keyboard.press("Escape");
  }
});

test("concept images follow the native rail and become still for keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const rail = page.locator(".studio-showcase .showcase-rail");
  await rail.scrollIntoViewIfNeeded();
  const preview = rail
    .locator(".studio-tile")
    .nth(1)
    .locator(".studio-image > img");
  const supported = await page.evaluate(() =>
    CSS.supports("animation-timeline", "view(inline)"),
  );
  if (supported) {
    const initial = await preview.evaluate(
      (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m11,
    );
    await rail.evaluate((el) =>
      el.scrollTo({
        left:
          el.children[1].getBoundingClientRect().left -
          el.getBoundingClientRect().left +
          el.scrollLeft,
        behavior: "instant",
      }),
    );
    await expect
      .poll(() =>
        preview.evaluate(
          (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m11,
        ),
      )
      .toBeLessThan(initial);
  }
  await rail.locator(".studio-tile").nth(1).locator(".studio-image").focus();
  await expect(preview).toHaveCSS("animation-name", "none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(preview).toHaveCSS("animation-name", "none");
});

test("photo controls remain visible on a short landscape screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/fr/about");
  await page.locator(".about-photo-intro .gallery-trigger").click();
  const dialog = page.getByRole("dialog");
  await dialog.locator(".gallery-zoom-button").click();
  const bounds = (await dialog.boundingBox())!;
  const controls = (await dialog.locator(".gallery-toolbar").boundingBox())!;
  const help = (await dialog.locator(".gallery-zoom-help").boundingBox())!;
  expect(bounds.height).toBeLessThanOrEqual(390 * 0.9);
  expect(controls.y).toBeGreaterThanOrEqual(0);
  expect(help.y + help.height).toBeLessThanOrEqual(bounds.y + bounds.height);
  await page.keyboard.press("Escape");
});
