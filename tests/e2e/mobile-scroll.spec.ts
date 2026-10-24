import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 390]) {
  test(`touch scrolling reverses text without hiding it at ${width}px`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    try {
      await page.goto("http://127.0.0.1:3000/en");
      const copy = page.locator("#selected-work .section-heading");
      const title = copy.locator("h2");
      await expect(title).toHaveAttribute("data-reveal-entered", "true");
      const state = () =>
        title.evaluate((node) => ({
          opacity: Number(getComputedStyle(node).opacity),
          y: new DOMMatrixReadOnly(getComputedStyle(node).transform).m42,
        }));
      const initial = await state();
      expect(initial.opacity).toBeGreaterThanOrEqual(0.65);
      expect(initial.y).toBeGreaterThanOrEqual(0);
      const contrast = await new AxeBuilder({ page })
        .include("#selected-work .section-heading")
        .withRules(["color-contrast"])
        .analyze();
      expect(contrast.violations.map((violation) => violation.id)).toEqual([]);
      const paragraph = await copy.locator("p").boundingBox();
      const link = await copy.locator("a").boundingBox();
      expect(paragraph!.y + paragraph!.height).toBeLessThan(link!.y);
      const hero = await page.locator(".cinematic-hero").boundingBox();
      expect(hero!.height).toBeLessThan(width <= 360 ? 510 : 460);
      await page.screenshot({ path: `tmp/touch-motion/before-${width}.png` });
      const cdp = await context.newCDPSession(page);
      async function swipe(from: number, to: number) {
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchStart",
          touchPoints: [{ x: width / 2, y: from }],
        });
        const step = to > from ? 20 : -20;
        for (let y = from + step; step > 0 ? y <= to : y >= to; y += step) {
          await cdp.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [{ x: width / 2, y }],
          });
          await page.evaluate(() => new Promise(requestAnimationFrame));
        }
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchEnd",
          touchPoints: [],
        });
      }
      await swipe(650, 110);
      await expect.poll(async () => (await state()).y).toBeLessThan(0);
      expect((await state()).opacity).toBeGreaterThanOrEqual(0.65);
      await swipe(110, 650);
      await expect.poll(async () => (await state()).y).toBeGreaterThanOrEqual(0);
      expect((await state()).opacity).toBeGreaterThanOrEqual(0.65);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    } finally {
      await context.close();
    }
  });
}

test("phone text stays readable through motion preferences and rotation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const title = page.locator("#selected-work h2");
  await expect(title).toHaveAttribute("data-reveal-entered", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(title).toHaveCSS("opacity", "1");
  await expect(title).toHaveCSS("transform", "none");
  await expect(title).not.toHaveAttribute("data-reveal-pending");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(title).toHaveAttribute("data-reveal-entered", "true");
  await page.setViewportSize({ width: 844, height: 390 });
  await title.evaluate((node) =>
    node.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await expect(title).toHaveCSS("opacity", "1");
});

for (const width of [320, 390, 600]) {
  test(`mobile cards fill the rail without page overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/en");
    for (const selector of [".project-exhibits", ".studio-showcase"]) {
      const showcase = page.locator(selector);
      const rail = showcase.locator(".showcase-rail");
      const dimensions = await rail.evaluate((node) => ({
        rail: node.clientWidth,
        card: node.firstElementChild!.getBoundingClientRect().width,
      }));
      expect(dimensions.rail - dimensions.card).toBeLessThanOrEqual(5);
      await rail.focus();
      await page.keyboard.press("End");
      await expect(
        showcase.locator(".showcase-controls button").last(),
      ).toBeDisabled();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
    await page.screenshot({ path: `tmp/mobile-fit/cards-${width}.png` });
  });
}
