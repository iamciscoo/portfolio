import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 390]) {
  test(`mobile hierarchy stays readable and concise at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const locale of ["en", "ru", "sw", "fr", "es"]) {
      await page.goto(`/${locale}`);
      const hero = page.locator(".cinematic-hero");
      await expect(hero.locator(".personal-kicker")).toBeHidden();
      await expect(hero.locator(".cinematic-top > span").first()).toBeHidden();
      await expect(hero.locator(".hero-actions a")).toHaveCount(2);
      for (const action of await hero.locator(".hero-actions a").all())
        await expect(action).toBeVisible();
      const type = await hero
        .locator(".personal-hero-copy > p")
        .evaluate((el) => ({
          font: parseFloat(getComputedStyle(el).fontSize),
          leading: parseFloat(getComputedStyle(el).lineHeight),
        }));
      expect(type.font).toBeGreaterThanOrEqual(16);
      expect(type.leading).toBeGreaterThanOrEqual(26);
      expect((await hero.boundingBox())!.height).toBeLessThan(760);
      const section = await page.locator("#selected-work").boundingBox();
      const display = await page
        .locator(".exhibit-stage")
        .first()
        .boundingBox();
      expect(display!.y - section!.y).toBeLessThan(480);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      expect(await page.locator("body").innerText()).not.toContain(
        String.fromCodePoint(8212),
      );
    }
  });
}

test("templates sit with the brief and apply without losing contact details", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const locale of ["en", "ru", "sw", "fr", "es"]) {
    await page.goto(`/${locale}/contact?service=windows`);
    await page.locator("#name").fill("Template Visitor");
    await page
      .locator("#description")
      .fill("Keep my existing brief until I choose a template.");
    const picker = page.locator("#inquiry-template");
    await picker.scrollIntoViewIfNeeded();
    const label = await page.locator('label[for="description"]').boundingBox();
    const select = await picker.boundingBox();
    const textarea = await page.locator("#description").boundingBox();
    expect(select!.width).toBeGreaterThanOrEqual(textarea!.width - 1);
    expect(select!.y).toBeGreaterThan(label!.y);
    expect(select!.y + select!.height).toBeLessThan(textarea!.y);
    expect(
      (await page.locator(".inquiry-templates").boundingBox())!.height,
    ).toBeLessThan(150);
    await picker.selectOption("windows");
    await expect(page.locator("#description")).not.toHaveValue(
      /^Keep my existing/,
    );
    await expect(page.locator(".template-preview")).toHaveCount(0);
    await expect(page.locator("#name")).toHaveValue("Template Visitor");
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(321);
  }
});

test("mobile scroll leaves copy stable and limits background travel", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const photo = page.locator(".hero-photo-print");
  await expect
    .poll(() =>
      photo.evaluate(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m11,
      ),
    )
    .toBeLessThanOrEqual(1.101);
  await page
    .locator(".cinematic-hero")
    .evaluate((hero) =>
      scrollTo({ top: hero.clientHeight * 0.6, behavior: "instant" }),
    );
  await expect
    .poll(() =>
      photo.evaluate(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
      ),
    )
    .toBeGreaterThan(24);
  expect(
    await photo.evaluate(
      (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
    ),
  ).toBeLessThanOrEqual(56);
  expect(
    await page
      .locator(".personal-hero-copy")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() => photo.evaluate((el) => getComputedStyle(el).transform))
    .toBe("none");
});

test("mobile homepage keeps accessible controls when labels are condensed", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/en");
  await expect(
    page.getByRole("link", { name: "Explore the work below", exact: true }),
  ).toBeVisible();
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    scan.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});
