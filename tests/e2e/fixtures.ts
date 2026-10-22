import { test as base } from "@playwright/test";

// Scroll Craft's Windows verification safeguard: no native cursor capture.
export const test = base.extend({
  page: async ({ page }, runWithPage) => {
    // Never send real inquiry emails from browser regression tests, even when
    // another local session has configured Resend in the shared dev server.
    await page.route("**/api/contact", async (route) => {
      if (route.request().method() !== "POST") return route.continue();
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ code: "unavailable" }),
      });
    });
    await page.addInitScript(() => {
      Element.prototype.requestPointerLock = () =>
        Promise.reject(
          new Error("Native pointer lock disabled in verification"),
        );
      Element.prototype.setPointerCapture = () => {};
      Element.prototype.releasePointerCapture = () => {};
      Document.prototype.exitPointerLock = () => {};
    });
    await runWithPage(page);
  },
});
export { expect } from "@playwright/test";
