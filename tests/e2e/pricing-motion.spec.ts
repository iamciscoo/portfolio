import { test, expect } from "./fixtures";

for (const width of [390, 1440]) {
  test(`pricing scroll motion reverses smoothly and respects focus at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/en/pricing");
    const title = page.locator("#hosting-title");
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
      expect(new Set(frames.slice(4).map((frame) => frame.scroll)).size).toBe(
        1,
      );
      expect(
        new Set(frames.slice(4).map((frame) => frame.y.toFixed(2))).size,
      ).toBeGreaterThan(2);
      expect(
        Math.min(...frames.map((frame) => frame.opacity)),
      ).toBeGreaterThanOrEqual(0.65);
      const travel = frames.at(-1)!.y - frames[0].y;
      expect(top === 0 ? travel : -travel).toBeGreaterThan(1);
    }

    // The comparison stays steady while a user chooses a package, without
    // disabling scroll decoration in the other sections of the page.
    await page.locator(".pricing-select").first().focus();
    await expect(page.locator(".pricing-package h2").first()).toHaveCSS(
      "transform",
      "none",
    );
    await expect(title).not.toHaveCSS("transform", "none");
    for (const amount of await page.locator(".pricing-amount").all()) {
      await expect(amount).toHaveCSS("transform", "none");
      await expect(amount).toHaveCSS("opacity", "1");
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const heading of await page
      .locator(".pricing-page h1, .pricing-page h2")
      .all()) {
      await expect(heading).toHaveCSS("transform", "none");
      await expect(heading).toHaveCSS("opacity", "1");
    }
    expect(errors).toEqual([]);
  });
}
