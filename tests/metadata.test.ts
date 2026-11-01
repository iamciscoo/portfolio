import { describe, expect, it, vi } from "vitest";
import { createTranslator } from "next-intl";
import { locales } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { localizedMetadata, pageMetadata, siteUrl } from "@/lib/metadata";
import sitemap from "@/app/sitemap";

vi.mock("next-intl/server", () => ({
  getTranslations: async ({
    locale,
    namespace,
  }: {
    locale: string;
    namespace: string;
  }) => {
    const { default: messages } = await import(
      `../src/messages/${locale}.json`
    );
    return createTranslator({ locale, messages, namespace });
  },
}));

describe("search metadata", () => {
  it.each(locales)(
    "provides distinct translated titles and descriptions in %s",
    async (locale) => {
      const pages = [
        "home",
        "about",
        "journey",
        "projects",
        "studio",
        "services",
        "pricing",
        "contact",
      ];
      const titles = new Set();
      for (const page of pages) {
        const path = page === "home" ? "" : `/${page}`;
        const metadata = await pageMetadata(locale, page, path);
        titles.add(metadata.title);
        expect(metadata.description?.length).toBeGreaterThan(90);
        expect(metadata.description).not.toMatch(/MISSING_MESSAGE|seo\./);
        expect(metadata.alternates?.canonical).toBe(`/${locale}${path}`);
        expect(metadata.alternates?.languages).toEqual({
          ...Object.fromEntries(
            locales.map((lang) => [lang, `/${lang}${path}`]),
          ),
          "x-default": `/en${path}`,
        });
      }
      expect(titles.size).toBe(pages.length);
    },
  );

  it("shares the case study's title, URL and image across social previews", () => {
    const metadata = localizedMetadata(
      "ru",
      "Project",
      "Project description",
      "/projects/example",
      {
        url: "/images/example.webp",
        width: 1440,
        height: 1000,
        alt: "Example project",
      },
    );
    expect(metadata.openGraph).toMatchObject({
      title: "Project",
      url: "/ru/projects/example",
      locale: "ru_RU",
      alternateLocale: ["en_US", "sw_TZ", "fr_FR", "es_ES"],
      images: [{ url: "/images/example.webp", alt: "Example project" }],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Project",
      images: [{ url: "/images/example.webp" }],
    });
  });

  it("lists every indexable localized route and omits noindex demo pages", () => {
    const entries = sitemap();
    expect(entries).toHaveLength((8 + projects.length) * locales.length);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(
      entries.length,
    );
    for (const entry of entries) {
      expect(entry.url.startsWith(`${siteUrl}/`)).toBe(true);
      expect(entry.url).not.toMatch(/\/studio\//);
      expect(Object.keys(entry.alternates?.languages ?? {})).toHaveLength(
        locales.length + 1,
      );
    }
  });
});
