import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 1440]) {
  test(`text entrance keeps its contrast in both themes at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const theme of ["dark", "light"]) {
      await page.goto("/en/projects");
      await page.evaluate(
        (value) => document.documentElement.setAttribute("data-theme", value),
        theme,
      );
      const block = page.locator(".studio-invitation .text-reveal");
      await block.scrollIntoViewIfNeeded();
      await expect(block).toHaveAttribute("data-entered", "true");
      await expect(block.locator("h2")).toHaveCSS("opacity", "1");
      await expect(block.locator("p")).toHaveCSS("opacity", "1");
      const scan = await new AxeBuilder({ page })
        .include(".studio-invitation")
        .withRules(["color-contrast"])
        .analyze();
      expect(
        scan.violations.map((item) => ({
          id: item.id,
          targets: item.nodes.map((node) => node.target),
        })),
      ).toEqual([]);
    }
  });

  for (const tag of ["h2", "p"])
    test(`individual ${tag} enters once and remains readable at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/en");
      const block = page.locator(".studio-section .section-heading.text-reveal");
      const heading = block.locator(tag);
      await expect(heading).toHaveCSS("opacity", "1");
      const sample = () =>
        heading.evaluate(
          (node) =>
            new Promise<{ opacity: number; y: number }[]>((resolve) => {
              const frames: { opacity: number; y: number }[] = [];
              const start = performance.now();
              const tick = () => {
                const style = getComputedStyle(node);
                frames.push({
                  opacity: Number(style.opacity),
                  y: new DOMMatrixReadOnly(style.transform).m42,
                });
                if (performance.now() - start < 1250)
                  requestAnimationFrame(tick);
                else resolve(frames);
              };
              requestAnimationFrame(tick);
              scrollTo({
                top:
                  node.getBoundingClientRect().top + scrollY - innerHeight / 2,
                behavior: "instant",
              });
            }),
        );
      const frames = await sample();
      expect(Math.min(...frames.map((frame) => frame.opacity))).toBeLessThan(
        0.2,
      );
      expect(frames.some((frame) => frame.opacity < 0.99 && frame.y > 0)).toBe(
        true,
      );
      expect(Math.max(...frames.map((frame) => frame.y))).toBeGreaterThan(24);
      expect(Math.max(...frames.map((frame) => frame.y))).toBeLessThanOrEqual(
        32,
      );
      await expect(heading).toHaveCSS("opacity", "1");
      expect(
        await heading.evaluate(
          (node) =>
            new DOMMatrixReadOnly(getComputedStyle(node).transform).isIdentity,
        ),
      ).toBe(true);
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await expect(heading).not.toBeInViewport();
      expect(
        (await sample()).every((frame) => frame.opacity === 1 && frame.y === 0),
      ).toBe(true);
      const link = block.locator("a");
      await link.focus();
      await expect(heading).toHaveCSS("transform", "none");
      await link.click();
      await expect(page).toHaveURL(/\/en\/studio$/);
    });
}

test("reduced motion keeps section text still and fully visible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/en", "/fr/projects", "/es/about"]) {
    await page.goto(path);
    const blocks = page.locator(".text-reveal");
    expect(await blocks.count()).toBeGreaterThan(0);
    for (const block of await blocks.all()) {
      await block.scrollIntoViewIfNeeded();
      await expect(block).toHaveCSS("opacity", "1");
      await expect(block).toHaveCSS("transform", "none");
      for (const title of await block.locator("h2").all()) {
        await expect(title).toHaveCSS("animation-name", "none");
        await expect(title).toHaveCSS("opacity", "1");
      }
    }
  }
});

test("text and concept navigation work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:3000/en");
    for (const block of await page.locator(".text-reveal").all()) {
      await expect(block).toHaveCSS("opacity", "1");
      await expect(block).toHaveCSS("transform", "none");
    }
    await page.goto("http://127.0.0.1:3000/en/projects");
    await page.locator(".studio-invitation a.button").click();
    await expect(page).toHaveURL(/\/en\/studio$/);
  } finally {
    await context.close();
  }
});
