import { PDFDocument } from "pdf-lib";
import { test, expect } from "./fixtures";

test("each language downloads its own shareable two-page PDF", async ({
  page,
}) => {
  for (const locale of ["en", "sw", "ru", "fr", "es"]) {
    await page.goto(`/${locale}/pricing`);
    const button = page.locator(".pricing-download");
    await expect(button).toHaveAttribute(
      "href",
      `/pricing/cisco-pricing-${locale}.pdf`,
    );
    await expect(button).toHaveAttribute("download", "");
    const response = await page.request.get(
      (await button.getAttribute("href"))!,
    );
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect(response.headers()["content-disposition"]).toBe("attachment");
    const doc = await PDFDocument.load(await response.body());
    expect(doc.getPageCount()).toBe(2);
    expect(doc.getAuthor()).toBe("Francis Mwambene");
  }
});

test("the hero pricing pill stays to the right of Meet Cisco on mobile and desktop", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["en", "sw", "ru", "fr", "es"]) {
    await page.goto(`/${locale}`);
    for (const width of [320, 390, 700, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      const pill = page.locator(".hero-pricing-pill");
      const meet = page.locator(".hero-about-link");
      await expect(pill).toBeVisible();
      await expect(pill).toHaveAttribute("href", `/${locale}/pricing`);
      const p = (await pill.boundingBox())!;
      const m = (await meet.boundingBox())!;
      expect(
        p.x,
        `${locale} ${width}px horizontal placement`,
      ).toBeGreaterThanOrEqual(m.x + m.width);
      expect(Math.abs(p.y + p.height / 2 - m.y - m.height / 2)).toBeLessThan(2);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.locator(".hero-pricing-pill").click();
  await expect(page).toHaveURL(/\/es\/pricing$/);
});
