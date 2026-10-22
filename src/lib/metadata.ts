import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000";
export async function pageMetadata(
  locale: Locale,
  page: string,
  path = "",
): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const title =
    page === "home"
      ? t("pages.metadata")
      : `${t(`nav.${page}`)} · Francis Mwambene`;
  const description =
    page === "home" ? t("home.intro") : t(`pages.${page}Intro`);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(locales.map((lang) => [lang, `/${lang}${path}`])),
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      locale,
      type: "website",
      url: `/${locale}${path}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
