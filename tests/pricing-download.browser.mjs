import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";

// Run download completion in a fresh browser outside the Playwright worker.
// This machine cancels downloads inside that worker, including fresh contexts.
test(
  "all five pricing PDFs complete native browser downloads",
  { timeout: 45000 },
  async () => {
    const browser = await chromium.launch({
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
        "C:/Program Files/Google/Chrome/Application/chrome.exe",
      headless: true,
    });
    try {
      const page = await browser.newPage({ acceptDownloads: true });
      for (const locale of ["en", "sw", "ru", "fr", "es"]) {
        await page.goto(`http://127.0.0.1:3000/${locale}/pricing`);
        const [download] = await Promise.all([
          page.waitForEvent("download"),
          page.locator(".pricing-download").click(),
        ]);
        assert.equal(
          download.suggestedFilename(),
          `cisco-pricing-${locale}.pdf`,
        );
        assert.equal(
          await download.failure(),
          null,
          `${locale} download must complete`,
        );
        const doc = await PDFDocument.load(
          await readFile(await download.path()),
        );
        assert.equal(doc.getPageCount(), 2);
        assert.equal(doc.getAuthor(), "Francis Mwambene");
      }
    } finally {
      await browser.close();
    }
  },
);
