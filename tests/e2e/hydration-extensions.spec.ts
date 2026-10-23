import { test, expect } from "./fixtures";

for (const extension of [false, true]) {
  test(`home hydrates with extension attributes: ${extension}`, async ({
    page,
  }) => {
    const warnings: string[] = [];
    page.on("console", (message) => {
      if (/hydrat|server rendered HTML/i.test(message.text()))
        warnings.push(message.text());
    });
    await page.addInitScript((inject) => {
      localStorage.setItem("cisco-theme", "light");
      if (!inject) return;
      const observer = new MutationObserver(() => {
        if (!document.body) return;
        document.body.setAttribute("data-new-gr-c-s-check-loaded", "14.1341.0");
        document.body.setAttribute("data-gr-ext-installed", "");
        observer.disconnect();
      });
      observer.observe(document, { childList: true, subtree: true });
    }, extension);
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    if (extension)
      await expect(page.locator("body")).toHaveAttribute(
        "data-gr-ext-installed",
        "",
      );
    await page.getByRole("button", { name: "Change color theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(warnings).toEqual([]);
  });
}

test("nested hydration mismatches remain detectable", async ({ page }) => {
  const warnings: string[] = [];
  page.on("console", (message) => {
    if (/hydrat|server rendered HTML/i.test(message.text()))
      warnings.push(message.text());
  });
  await page.addInitScript(() => {
    const observer = new MutationObserver(() => {
      const heading = document.querySelector("h1");
      if (!heading) return;
      heading.setAttribute("data-hydration-probe", "nested");
      observer.disconnect();
    });
    observer.observe(document, { childList: true, subtree: true });
  });
  await page.goto("/en");
  await page.getByRole("button", { name: "Change color theme" }).click();
  expect(
    warnings.some((warning) => warning.includes("data-hydration-probe")),
  ).toBe(true);
});
