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
      await block.evaluate((node) =>
        node.scrollIntoView({ block: "center", behavior: "instant" }),
      );
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

  for (const tag of ["h2", "p"]) {
    test(`individual ${tag} reverses with scrolling at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/en");
      const block = page.locator(
        ".studio-section .section-heading.text-reveal",
      );
      const heading = block.locator(tag);
      await expect(heading).toHaveAttribute("data-reveal-entered", "true");
      const documentTop = await heading.evaluate(
        (node) =>
          node.getBoundingClientRect().top +
          scrollY -
          new DOMMatrixReadOnly(getComputedStyle(node).transform).m42,
      );
      const move = async (position: number) => {
        await page.evaluate(
          ({ top, fraction }) =>
            scrollTo({
              top: top - innerHeight * fraction,
              behavior: "instant",
            }),
          { top: documentTop, fraction: position },
        );
      };
      const state = () =>
        heading.evaluate((node) => ({
          opacity: Number(getComputedStyle(node).opacity),
          y: new DOMMatrixReadOnly(getComputedStyle(node).transform).m42,
        }));
      await move(0.85);
      await expect.poll(async () => (await state()).y).toBeGreaterThan(0);
      const entering = await state();
      expect(entering.opacity).toBeGreaterThanOrEqual(0.65);
      expect(entering.opacity).toBeLessThan(1);
      await move(0.45);
      await expect(heading).toHaveCSS("opacity", "1");
      await expect.poll(async () => (await state()).y).toBe(0);
      await move(0.05);
      await expect.poll(async () => (await state()).y).toBeLessThan(0);
      expect((await state()).opacity).toBeGreaterThanOrEqual(0.65);
      // Reverse upwards through the same range: fully read, then fade towards
      // the lower edge again, without becoming invisible or playing once only.
      await move(0.45);
      await expect(heading).toHaveCSS("opacity", "1");
      await move(0.85);
      await expect.poll(async () => (await state()).y).toBeGreaterThan(0);
      expect((await state()).opacity).toBeCloseTo(entering.opacity, 2);
      const link = block.locator("a");
      await link.focus();
      await expect(heading).toHaveCSS("opacity", "1");
      await expect(heading).toHaveCSS("transform", "none");
      await link.click();
      await expect(page).toHaveURL(/\/en\/studio$/);
    });
  }
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
