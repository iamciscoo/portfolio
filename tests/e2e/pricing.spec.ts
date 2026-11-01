import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test("pricing switches currency with language and keeps the package in a WhatsApp enquiry", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/en/pricing");
  await expect(page.locator(".pricing-package")).toHaveCount(4);
  await expect(page.locator(".pricing-amount").first()).toContainText("$");
  await expect(
    page.locator('[aria-labelledby="aftercare-title"] strong'),
  ).toHaveText(/\$10.*\$80/);
  await expect(page.locator(".pricing-whatsapp-addon strong")).toHaveText(
    /\$15/,
  );
  await expect(page.locator(".pricing-whatsapp-addon p")).toContainText(
    "maximum of 3",
  );
  const url = new URL(
    (await page.locator(".pricing-select").nth(2).getAttribute("href"))!,
  );
  expect(url.hostname).toBe("wa.me");
  expect(url.searchParams.get("text")).toContain("Business");
  expect(url.searchParams.get("text")).toContain("340");
  for (let tier = 0; tier < 4; tier++) {
    const features = page
      .locator(".pricing-package")
      .nth(tier)
      .locator(".pricing-features");
    await expect(features.locator("li")).toHaveCount(10);
    await expect(
      features
        .locator('li[data-included="true"]')
        .filter({ hasText: "Search engine optimization (SEO)" }),
    ).toHaveCount(1);
    await expect(features.locator('[data-included="true"]')).toHaveCount(
      4 + tier * 2,
    );
    await expect(features.locator('[data-included="false"]')).toHaveCount(
      6 - tier * 2,
    );
  }

  await page.getByRole("button", { name: "Language", exact: true }).click();
  await page
    .getByRole("menuitemradio", { name: "Kiswahili", exact: true })
    .click();
  await expect(page).toHaveURL(/\/sw\/pricing$/);
  await expect(page.locator(".pricing-amount").first()).toContainText(
    "TZS 450,000",
  );
  await expect(page.locator(".pricing-hosting-price")).toContainText("53,000");
  await page.getByRole("button", { name: "Lugha", exact: true }).click();
  await page
    .getByRole("menuitemradio", { name: "Русский", exact: true })
    .click();
  await expect(page).toHaveURL(/\/ru\/pricing$/);
  await expect(page.locator(".pricing-amount").first()).toContainText("₽");
  expect(errors).toEqual([]);
});

test("pricing remains readable across screen sizes, themes and all locales", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["en", "sw", "ru", "fr", "es"]) {
    await page.goto(`/${locale}/pricing`);
    await expect(page.locator("body")).not.toContainText(/vercel/i);
    await expect(page.locator('a[href*="vercel.com"]')).toHaveCount(0);
    for (const width of [320, 768, 1024, 1200, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${locale} at ${width}px`,
      ).toBe(true);
      const headerFits = await page
        .locator(".header-actions")
        .evaluate(
          (element) => element.getBoundingClientRect().right <= innerWidth,
        );
      expect(headerFits, `${locale} header at ${width}px`).toBe(true);
      await expect(page.locator("h1")).toBeVisible();
      const resourceEdges = await page
        .locator(".pricing-resources dd")
        .evaluateAll((items) =>
          items.map((item) => {
            const value = document.createRange();
            value.selectNodeContents(item.firstChild!);
            return value.getBoundingClientRect().right;
          }),
        );
      expect(
        Math.max(...resourceEdges) - Math.min(...resourceEdges),
        `${locale} resource value alignment at ${width}px`,
      ).toBeLessThanOrEqual(1.5);
    }
    await expect(page.locator("main a[href*='/contact']")).toHaveAttribute(
      "href",
      `/${locale}/contact?service=business`,
    );
  }
  await page.goto("/en/pricing");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => {
      document.documentElement.dataset.theme = value;
    }, theme);
    const audit = await new AxeBuilder({ page })
      .include("main")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(audit.violations, theme).toEqual([]);
  }
  await page
    .getByText("What does “domain included” cover?", { exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".pricing-terms details").first()).toHaveAttribute(
    "open",
    "",
  );
});

test("mobile packages swipe naturally and support instant keyboard navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/pricing");
  const rail = page.locator(".pricing-showcase .showcase-rail");
  const next = page.getByRole("button", { name: "Next package", exact: true });
  const previous = page.getByRole("button", {
    name: "Previous package",
    exact: true,
  });
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();
  const start = await rail.evaluate((element) => ({
    width: element.clientWidth,
    total: element.scrollWidth,
  }));
  expect(start.total).toBeGreaterThan(start.width * 3);
  await next.click();
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(200);
  await expect(previous).toBeEnabled();
  await rail.focus();
  await page.keyboard.press("End");
  await expect(next).toBeDisabled();
  await page.keyboard.press("Home");
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBe(0);
  await expect(previous).toBeDisabled();

  // Exercise the browser's native touch pipeline rather than synthesizing DOM drag handlers.
  const client = await page.context().newCDPSession(page);
  await rail.evaluate((element) => {
    scrollTo({
      top: element.getBoundingClientRect().top + scrollY - 160,
      behavior: "instant",
    });
  });
  await client.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 310, y: 260 }],
  });
  for (const x of [270, 220, 170, 120, 70]) {
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y: 260 }],
    });
  }
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(200);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const audit = await new AxeBuilder({ page })
    .include("main")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await client.detach();
});

test("pricing is reachable from navigation, mobile menu and service discovery", async ({
  page,
}) => {
  await page.goto("/en/services");
  await page
    .locator("main")
    .getByRole("link", { name: /Explore website pricing/ })
    .click();
  await expect(page).toHaveURL(/\/en\/pricing$/);
  await page.setViewportSize({ width: 390, height: 700 });
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Pricing", exact: true })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.goto("/en");
  await expect(
    page.locator(".pricing-preview a[href='/en/pricing']"),
  ).toBeVisible();
  await expect(page.locator("footer a[href='/en/pricing']")).toBeVisible();
});
