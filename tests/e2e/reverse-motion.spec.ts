import { test, expect } from "./fixtures";

for (const width of [390, 1440]) {
  test(`scroll motion settles smoothly in both directions at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en");
    const title = page.locator("#selected-work h2");
    await expect(title).toHaveAttribute("data-reveal-entered", "true");
    const destination = await title.evaluate(
      (node) => node.getBoundingClientRect().top + scrollY - 80,
    );
    for (const top of [destination, 0]) {
      const frames = await title.evaluate(async (node, top) => {
        scrollTo({ top, behavior: "instant" });
        const frames = [];
        for (let i = 0; i < 24; i++) {
          await new Promise(requestAnimationFrame);
          const style = getComputedStyle(node);
          frames.push({
            scroll: scrollY,
            y: new DOMMatrixReadOnly(style.transform).m42,
            opacity: Number(style.opacity),
          });
        }
        return frames;
      }, top);
      // Once native scrolling stops, the decoration should gently settle,
      // rather than snapping to its end position in a single update.
      const settledScroll = frames.slice(4);
      expect(new Set(settledScroll.map((frame) => frame.scroll)).size).toBe(1);
      expect(
        new Set(settledScroll.map((frame) => frame.y.toFixed(2))).size,
      ).toBeGreaterThan(2);
      expect(
        Math.min(...frames.map((frame) => frame.opacity)),
      ).toBeGreaterThanOrEqual(0.65);
      const travel = frames.at(-1)!.y - frames[0].y;
      expect(top === 0 ? travel : -travel).toBeGreaterThan(1);
    }
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await expect(page.locator(".hero-actions a").first()).toBeInViewport();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(title).toHaveCSS("transform", "none");
    await expect(title).toHaveCSS("opacity", "1");
  });
}
