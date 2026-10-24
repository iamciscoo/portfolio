import { test, expect } from "./fixtures";

for (const width of [360, 390]) {
  test(`touch scroll reveals mobile copy in the reading area at ${width}px`, async ({
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
      await expect(page.locator(".personal-hero-copy h1")).toHaveCSS(
        "opacity",
        "1",
      );
      const copy = page.locator("#selected-work .section-heading");
      // These headings are already near the bottom of a phone's first screen.
      // They must wait for scrolling into the reading area, not finish on load.
      await expect(copy.locator("h2")).toHaveAttribute(
        "data-reveal-pending",
        "true",
      );
      await page.screenshot({ path: `tmp/touch-motion/before-${width}.png` });
      const samples = copy.evaluate(
        (node) =>
          new Promise<{ opacity: number; y: number }[][]>((resolve) => {
            const targets = [...node.querySelectorAll("h2, p")];
            const frames: { opacity: number; y: number }[][] = targets.map(
              () => [],
            );
            const start = performance.now();
            function sample() {
              targets.forEach((target, index) => {
                const style = getComputedStyle(target);
                frames[index].push({
                  opacity: Number(style.opacity),
                  y: new DOMMatrixReadOnly(style.transform).m42,
                });
              });
              if (performance.now() - start < 3200)
                requestAnimationFrame(sample);
              else resolve(frames);
            }
            requestAnimationFrame(sample);
          }),
      );
      const cdp = await context.newCDPSession(page);
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: width / 2, y: 650 }],
      });
      for (let y = 630; y >= 210; y -= 20) {
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
      expect(await page.evaluate(() => scrollY)).toBeGreaterThan(200);
      for (const frames of await samples) {
        expect(
          frames.some(
            (frame) =>
              frame.opacity > 0.05 && frame.opacity < 0.8 && frame.y > 8,
          ),
        ).toBe(true);
        expect(Math.max(...frames.map((frame) => frame.y))).toBeGreaterThan(32);
      }
      await expect(copy.locator("h2")).toHaveCSS("opacity", "1");
      await expect(copy.locator("p")).toHaveCSS("opacity", "1");
      const photo = await page
        .locator(".hero-photo-print")
        .evaluate((element) => {
          const transform = new DOMMatrixReadOnly(
            getComputedStyle(element).transform,
          );
          return { y: transform.m42, scale: transform.m11 };
        });
      expect(photo.y).toBeGreaterThan(24);
      expect(photo.y).toBeLessThanOrEqual(56);
      expect(photo.scale).toBeGreaterThan(1.06);
      expect(photo.scale).toBeLessThanOrEqual(1.1);
      expect(await page.evaluate(() => scrollY)).toBeGreaterThan(200);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await page.screenshot({ path: `tmp/touch-motion/after-${width}.png` });
    } finally {
      await context.close();
    }
  });
}

test("pending phone text stays readable through motion preferences and rotation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const title = page.locator("#selected-work h2");
  await expect(title).toHaveAttribute("data-reveal-pending", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(title).toHaveCSS("opacity", "1");
  await expect(title).toHaveCSS("transform", "none");
  await expect(title).not.toHaveAttribute("data-reveal-pending");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(title).toHaveAttribute("data-reveal-pending", "true");
  await page.setViewportSize({ width: 844, height: 390 });
  await title.evaluate((node) =>
    node.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await expect(title).toHaveAttribute("data-reveal-entered", "true");
  await expect(title).toHaveCSS("opacity", "1");
});
