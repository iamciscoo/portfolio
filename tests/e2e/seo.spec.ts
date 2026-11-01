import { test, expect } from "./fixtures";

const verification = "G4HB_bkaBI7rxhEaAqt7vM7g9_2KZ0p3A4_tA4H-yNI";
const locales = ["en", "sw", "ru", "fr", "es"];

test("verification and structured data work without JavaScript in every language", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    for (const locale of locales) {
      for (const path of [
        "",
        "/services",
        "/pricing",
        "/projects/globoexpats",
      ]) {
        const response = await page.goto(
          `http://127.0.0.1:3000/${locale}${path}`,
        );
        expect(response?.status()).toBe(200);
        await expect(
          page.locator('head meta[name="google-site-verification"]'),
        ).toHaveAttribute("content", verification);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          new RegExp(`/${locale}${path}$`),
        );
        await expect(
          page.locator('link[hreflang="x-default"]'),
        ).toHaveAttribute("href", new RegExp(`/en${path}$`));
        await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
          "content",
          new RegExp(`/${locale}${path}$`),
        );
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
          "content",
          /\S.{50,}/,
        );
        const graph = JSON.parse(
          await page.locator("#person-schema").innerText(),
        )["@graph"];
        expect(
          graph.find(
            (entity: { "@type": string }) => entity["@type"] === "Person",
          ).name,
        ).toBe("Francis Jacob Mwambene");
        expect(
          graph.find(
            (entity: { "@type": string }) => entity["@type"] === "WebSite",
          ).inLanguage,
        ).toHaveLength(5);
        if (path.startsWith("/projects/")) {
          const project = JSON.parse(
            await page.locator("#project-schema-globoexpats").innerText(),
          );
          expect(project["@type"]).toBe("CreativeWork");
          expect(project.author["@id"]).toMatch(/\/#person$/);
        }
      }
    }
    const root = await page.goto("http://127.0.0.1:3000/");
    expect(root?.status()).toBe(200);
    await expect(
      page.locator('head meta[name="google-site-verification"]'),
    ).toHaveAttribute("content", verification);
  } finally {
    await context.close();
  }
});

test("sitemap advertises all languages and concept demos stay noindex", async ({
  page,
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)).toHaveLength(50);
  expect(xml.match(/hreflang="x-default"/g)).toHaveLength(50);
  expect(xml).not.toContain("/studio/restaurant");
  await page.goto("/en/studio/restaurant");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("/sitemap.xml");
});
