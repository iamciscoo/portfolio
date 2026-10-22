import { test as base } from "@playwright/test";

// Scroll Craft's Windows verification safeguard: no native cursor capture.
export const test = base.extend({
  page: async ({ page }, runWithPage) => {
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
