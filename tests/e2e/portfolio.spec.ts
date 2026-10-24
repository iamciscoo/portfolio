import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
const locales = ["en", "ru", "sw", "fr", "es"];
test("metadata endpoints bypass locale redirects", async ({ request }) => {
  for (const [path, type] of [
    ["/sitemap.xml", "application/xml"],
    ["/robots.txt", "text/plain"],
    ["/opengraph-image", "image/png"],
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain(type);
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  }
});
const routes = [
  "",
  "/about",
  "/journey",
  "/projects",
  "/projects/globoexpats",
  "/projects/iphone-service-tz",
  "/studio",
  "/services",
  "/contact",
  "/studio/restaurant",
  "/studio/fashion",
  "/studio/construction",
  "/studio/consulting",
  "/studio/shop",
  "/studio/tours",
];
for (const locale of locales)
  test(`all ${locale} routes render with localized metadata`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(`/${locale}${route}`);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(`/${locale}${route}$`),
      );
      await expect(page.locator("body")).not.toContainText("MISSING_MESSAGE");
    }
    expect(errors).toEqual([]);
  });
for (const width of [320, 390, 768, 1280, 1440])
  test(`responsive pages fit ${width}px`, async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 950 });
    for (const locale of locales) {
      for (const route of [
        "",
        "/contact",
        "/projects/globoexpats",
        "/studio/restaurant",
        "/studio/fashion",
        "/studio/construction",
        "/studio/consulting",
        "/studio/shop",
        "/studio/tours",
      ]) {
        await page.goto(`/${locale}${route}`);
        await expect(page.locator("main")).toBeVisible();
        await page.evaluate(() => document.fonts.ready.then(() => undefined));
        const size = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          viewport: innerWidth,
        }));
        expect(size.scroll, `${locale}${route}`).toBeLessThanOrEqual(
          size.viewport + 1,
        );
      }
    }
  });
test("language switching preserves case-study and demo routes", async ({
  page,
}) => {
  await page.goto("/en/projects/globoexpats");
  await page.getByRole("button", { name: "Language", exact: true }).click();
  await page
    .getByRole("menuitemradio", { name: "Русский", exact: true })
    .click();
  await expect(page).toHaveURL(/\/ru\/projects\/globoexpats$/);
  await page.goto("/sw/studio/restaurant");
  await page.getByRole("button", { name: "Lugha", exact: true }).click();
  await page
    .getByRole("menuitemradio", { name: "English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/studio\/restaurant$/);
  await page.goto("/en/contact?service=redesign");
  await page.getByRole("button", { name: "Language", exact: true }).click();
  await page
    .getByRole("menuitemradio", { name: "Kiswahili", exact: true })
    .click();
  await expect(page).toHaveURL(/\/sw\/contact\?service=redesign$/);
  await expect(page.locator("#service")).toHaveValue("redesign");
});
test("project and timeline filters update their collections", async ({
  page,
}) => {
  await page.goto("/en/projects");
  await page.getByRole("button", { name: "Marketplace", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("GloboExpats");
  await page.goto("/en/journey");
  await page.getByRole("button", { name: "Education", exact: true }).click();
  await expect(page.locator(".timeline-entry")).toHaveCount(4);
  await page.getByRole("button", { name: "Experience", exact: true }).click();
  await expect(page.locator(".timeline-entry")).toHaveCount(3);
});
test("contact validates and does not claim unconfigured delivery", async ({
  page,
}) => {
  await page.goto("/en/contact?service=redesign");
  await expect(page.locator("#service")).toHaveValue("redesign");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
  await page.locator("#name").fill("Portfolio QA");
  await page.locator("#email").fill("qa@example.com");
  await page
    .locator("#description")
    .fill(
      "A sample inquiry used only for testing the unconfigured local contact endpoint.",
    );
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".form-status")).toContainText(
    "Email delivery isn't configured",
  );
  await expect(page.locator(".form-success")).toHaveCount(0);
});
test("mobile menu closes and theme persists", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Change color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
test("restaurant menu and reservation preview work without sending", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await page.goto("/en/studio/restaurant");
  await page
    .getByRole("button", { name: "The main event", exact: true })
    .click();
  await expect(page.locator(".dish-list")).toContainText(
    "Catch of the evening",
  );
  await page
    .getByRole("button", { name: "Reserve a table", exact: true })
    .first()
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Your name").fill("Demo Visitor");
  await dialog.getByLabel("Email address").fill("visitor@example.com");
  await dialog.getByLabel("Preferred date").fill("2099-10-22");
  await dialog.getByRole("button", { name: "Preview request" }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "Nothing was sent or booked",
  );
  expect(posts).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});
test("fashion gallery, construction detail and consulting insights open", async ({
  page,
}) => {
  for (const [slug, filter] of [
    ["fashion", "Portrait"],
    ["construction", "Residential"],
    ["consulting", "Strategy"],
  ]) {
    await page.goto(`/en/studio/${slug}`);
    await page.getByRole("button", { name: filter, exact: true }).click();
    await page.locator(".collection-open").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
  await page.goto("/en/studio/consulting#insights");
  await page.getByRole("button", { name: /Read article: Strategy/ }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "A strategy becomes useful",
  );
});
test("every concept inquiry validates and previews locally", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  for (const [slug, label] of [
    ["fashion", "Booking inquiry"],
    ["construction", "Request a quote"],
    ["consulting", "Book a consultation"],
  ]) {
    await page.goto(`/en/studio/${slug}`);
    await page
      .getByRole("button", { name: label, exact: true })
      .first()
      .click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "Preview request" }).click();
    await expect(dialog.getByRole("alert")).toContainText(
      "Complete the required fields",
    );
    await dialog.getByLabel("Your name").fill("Demo Visitor");
    await dialog.getByLabel("Email address").fill("visitor@example.com");
    await dialog.getByLabel("Preferred date").fill("2099-10-22");
    await dialog.getByRole("button", { name: "Preview request" }).click();
    await expect(dialog.getByRole("status")).toContainText(
      "Nothing was sent or booked",
    );
    await page.keyboard.press("Escape");
  }
  expect(posts).toEqual([]);
});
test("reduced motion and keyboard gallery access", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/projects/globoexpats");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  const trigger = page
    .getByRole("button", { name: /Gallery: GloboExpats/ })
    .first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
for (const route of [
  "",
  "/contact",
  "/studio/restaurant",
  "/studio/fashion",
  "/studio/construction",
  "/studio/consulting",
  "/studio/shop",
  "/studio/tours",
])
  test(`accessibility scan ${route || "home"}`, async ({ page }) => {
    await page.goto(`/en${route}`);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
test("unknown projects and demos return 404", async ({ page }) => {
  for (const route of ["/en/projects/unknown", "/en/studio/unknown"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "A small detour." }),
    ).toBeVisible();
  }
});
