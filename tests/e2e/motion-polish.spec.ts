import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 768, 1024, 1440]) {
  test(`motion and native rails remain usable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/en");
    if (width <= 1100) {
      await expect(
        page.getByRole("button", { name: "Open navigation", exact: true }),
      ).toBeVisible();
    } else {
      await expect(page.locator(".desktop-nav")).toBeVisible();
    }
    await page.locator(".hero-scroll-link").click();
    await expect(page).toHaveURL(/#selected-work$/);
    const showcase = page.locator(".project-exhibits");
    const rail = showcase.locator(".showcase-rail");
    const progress = showcase.locator(".showcase-progress > span");
    await rail.focus();
    await page.keyboard.press("Home");
    const start = await progress.evaluate(
      (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m11,
    );
    await page.keyboard.press("End");
    await expect
      .poll(() =>
        progress.evaluate(
          (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m11,
        ),
      )
      .toBeGreaterThan(start);
    await expect(
      showcase.locator(".showcase-controls button").last(),
    ).toBeDisabled();
    await rail.locator("article").last().locator(".exhibit-desktop a").focus();
    await expect(
      rail.locator("article").last().locator(".exhibit-desktop"),
    ).toHaveCSS("transform", "none");
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    // Keyboard navigation can start a neighbouring caption's reveal. Check
    // final reading contrast after those entrances finish, not mid-fade.
    await expect
      .poll(() =>
        showcase.evaluate((root) =>
          [...root.querySelectorAll("[data-reveal-entered]")].every(
            (node) => getComputedStyle(node).opacity === "1",
          ),
        ),
      )
      .toBe(true);
    const scan = await new AxeBuilder({ page })
      .include(".project-exhibits")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `tmp/motion-polish/rail-${width}.png` });
  });
}

test("reduced motion can be enabled while the page is open", async ({
  page,
}) => {
  await page.goto("/en");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const selector of [
    ".hero-introduction",
    ".hero-statement",
    ".hero-actions",
    ".scroll-arrow",
  ]) {
    await expect(page.locator(selector)).toHaveCSS("animation-name", "none");
  }
  await page.locator(".exhibit-stage").first().scrollIntoViewIfNeeded();
  for (const selector of [
    ".hero-photo-print",
    ".personal-hero-copy",
    ".exhibit-desktop",
    ".exhibit-phone",
  ]) {
    await expect(page.locator(selector).first()).toHaveCSS("transform", "none");
  }
});

test("mobile menu scrolls on short screens and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/en");
  const trigger = page.getByRole("button", {
    name: "Open navigation",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  const contact = dialog.getByRole("link", { name: "Contact", exact: true });
  await contact.focus();
  await expect(contact).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
