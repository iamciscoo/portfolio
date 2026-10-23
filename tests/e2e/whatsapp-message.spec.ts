import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";

for (const width of [320, 390, 1440]) {
  test(`WhatsApp shortcut fits ${width}px and keeps the chat intentional`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const locale of ["en", "ru", "sw", "fr", "es"]) {
      await page.goto(`/${locale}/contact`);
      const chat = page.locator(".whatsapp-link");
      const url = new URL((await chat.getAttribute("href"))!);
      expect(url.hostname).toBe("wa.me");
      expect(url.pathname).toBe("/255693749306");
      expect(url.searchParams.get("text")).toBeTruthy();
      await expect(chat).toHaveAttribute("target", "_blank");
      await expect(chat).toHaveAccessibleName(/WhatsApp/);
      const bounds = (await chat.boundingBox())!;
      expect(bounds.width).toBe(48);
      expect(bounds.height).toBe(48);
      expect(width - bounds.x - bounds.width).toBe(width < 600 ? 16 : 24);
      expect(844 - bounds.y - bounds.height).toBe(24);
      await expect(chat.locator(".whatsapp-hint")).toBeHidden();
      await chat.focus();
      await expect(chat.locator(".whatsapp-hint")).toBeVisible();
      await page.locator("#name").focus();
      await expect(chat.locator(".whatsapp-hint")).toBeHidden();
    }
    await page.goto("/en/contact");
    await page.locator(".whatsapp-link").hover();
    await fs.mkdir("tmp/message-qa", { recursive: true });
    await page.screenshot({
      path: `tmp/message-qa/contact-${width}.png`,
      fullPage: true,
    });
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
}

test("new About photos enlarge without a floating link above the dialog", async ({
  page,
}) => {
  await page.goto("/en/about");
  for (const name of ["skyline", "mountain"]) {
    const photo = page.locator(
      `.photo-collection-grid .gallery-trigger:has(img[src*="cisco-${name}"])`,
    );
    await photo.scrollIntoViewIfNeeded();
    await photo.click();
    await expect(page.getByRole("dialog").locator("img")).toHaveAttribute(
      "src",
      new RegExp(`cisco-${name}`),
    );
    await expect(page.locator(".whatsapp-link")).toBeHidden();
    await page.keyboard.press("Escape");
    await expect(page.locator(".whatsapp-link")).toBeVisible();
  }
  await expect(
    page.locator('link[rel="icon"][type="image/svg+xml"]'),
  ).toHaveAttribute("href", "/icon.svg?v=c");
});
