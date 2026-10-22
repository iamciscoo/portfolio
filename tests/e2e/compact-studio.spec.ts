import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test("homepage rails are compact and can be browsed with buttons and keyboard", async ({
  page,
}) => {
  await page.goto("/en");
  const showcase = page.locator(".project-exhibits");
  const rail = showcase.locator(".showcase-rail");
  await expect(
    showcase.getByRole("button", { name: "Previous website" }),
  ).toBeDisabled();
  await showcase.getByRole("button", { name: "Next website" }).click();
  await expect
    .poll(() => rail.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(100);
  await expect(
    showcase.getByRole("button", { name: "Next website" }),
  ).toBeDisabled();
  await showcase.getByRole("button", { name: "Previous website" }).click();
  await expect.poll(() => rail.evaluate((el) => el.scrollLeft)).toBeLessThan(2);
  await rail.focus();
  await page.keyboard.press("End");
  await expect
    .poll(() => rail.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(100);
  expect((await rail.boundingBox())!.height).toBeLessThan(850);
  const vertical = await rail.evaluate((el) => ({
    content: el.scrollHeight,
    visible: el.clientHeight,
  }));
  expect(vertical.content).toBeLessThanOrEqual(vertical.visible + 1);
  await expect(page.locator(".studio-showcase .studio-tile")).toHaveCount(6);
  await expect(page.locator(".showcase-offer")).toContainText(
    "I can build a similar experience",
  );
  await page.locator(".showcase-offer a").click();
  await expect(page).toHaveURL(/\/en\/contact\?service=business$/);
});

test("shop filters and sample bag update quantities and totals without requests", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/en/studio/shop");
  await page.getByRole("button", { name: "Wear", exact: true }).click();
  await expect(page.locator(".pace-products article")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Add to bag: Cobalt tee", exact: true })
    .click();
  await page.getByRole("button", { name: "Your bag (1)", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".pace-total")).toContainText("42,000");
  await dialog
    .getByLabel("Quantity: Cobalt tee", { exact: true })
    .selectOption("3");
  await expect(dialog.locator(".pace-total")).toContainText("126,000");
  await dialog.getByRole("button", { name: "Remove: Cobalt tee" }).click();
  await expect(dialog).toContainText("Your bag is empty");
  await page.keyboard.press("Escape");
  expect(posts).toEqual([]);
});

test("tour filters, itinerary and selected trip enquiry preview work locally", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/en/studio/tours");
  await page.getByRole("button", { name: "Coast", exact: true }).click();
  await expect(page.locator(".safiri-trips article")).toHaveCount(1);
  await page.locator(".safiri-trips summary").click();
  await expect(page.locator(".safiri-trips details")).toHaveAttribute(
    "open",
    "",
  );
  await page
    .getByRole("button", { name: "Plan this trip", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("textarea")).toHaveValue("A coastal pause");
  await dialog.getByLabel("Your name").fill("Demo Visitor");
  await dialog.getByLabel("Email address").fill("visitor@example.com");
  await dialog.getByLabel("Preferred date").fill("2099-10-22");
  await dialog.getByRole("button", { name: "Preview request" }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "Nothing was sent or booked",
  );
  expect(posts).toEqual([]);
});

test("small phones show a shorter hero, usable rails and touch feedback", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/en");
  expect(
    (await page.locator(".cinematic-hero").boundingBox())!.height,
  ).toBeLessThan(600);
  expect((await page.locator(".hero-actions").boundingBox())!.y).toBeLessThan(
    600,
  );
  await page
    .locator(".project-exhibits")
    .getByRole("button", { name: "Next website" })
    .tap();
  await expect
    .poll(() =>
      page
        .locator(".project-exhibits .showcase-rail")
        .evaluate((el) => el.scrollLeft),
    )
    .toBeGreaterThan(100);
  expect(
    await page
      .locator(".hero-actions a")
      .first()
      .evaluate((el) =>
        getComputedStyle(el).getPropertyValue("-webkit-tap-highlight-color"),
      ),
  ).not.toBe("rgba(0, 0, 0, 0)");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(391);
  await context.close();
});

for (const slug of ["shop", "tours"]) {
  test(`${slug} mobile modal and commission link are accessible`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto(`/en/studio/${slug}`);
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await page
      .getByRole("button", {
        name: slug === "shop" ? "Your bag (0)" : "Booking inquiry",
        exact: true,
      })
      .first()
      .click();
    const modalScan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(modalScan.violations.map((v) => v.id)).toEqual([]);
    await page.keyboard.press("Escape");
    await page.locator(".demo-commission a").click();
    await expect(page).toHaveURL(/\/en\/contact\?service=business$/);
  });
}
