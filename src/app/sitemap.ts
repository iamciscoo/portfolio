import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
import { locales } from "@/i18n/routing";
import { projects } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/journey",
    "/projects",
    "/studio",
    "/services",
    "/contact",
    ...projects.map((project) => `/projects/${project.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((lang) => [lang, `${siteUrl}/${lang}${path}`]),
        ),
      },
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
