import { test, expect } from "./fixtures";
import fs from "node:fs/promises";
import { inquiryEmail } from "@/lib/inquiry-email";
import { emailPreviewInquiry } from "../fixtures/inquiry";

test("inquiry email preview fits desktop and phones", async ({ page }) => {
  const html = inquiryEmail(emailPreviewInquiry);
  await fs.mkdir("tmp/message-qa", { recursive: true });
  await fs.writeFile("tmp/message-qa/inquiry-email.html", html);
  for (const width of [320, 390, 900]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.setContent(html);
    await expect(
      page.getByRole("heading", {
        name: "A message from Email Preview Visitor",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Reply by email", exact: true }),
    ).toHaveAttribute("href", /^mailto:preview%40example.com/);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.screenshot({
      path: `tmp/message-qa/email-${width}.png`,
      fullPage: true,
    });
  }
});
