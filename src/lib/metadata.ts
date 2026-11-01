import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";
const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const siteUrl = deploymentHost
  ? `https://${deploymentHost}`
  : "http://127.0.0.1:3000";
export const siteName = "Cisco · Francis Mwambene";
const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  sw: "sw_TZ",
  fr: "fr_FR",
  es: "es_ES",
};
export async function pageMetadata(
  locale: Locale,
  page: string,
  path = "",
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });
  return localizedMetadata(
    locale,
    t(`${page}.title`),
    t(`${page}.description`),
    path,
  );
}

export function localizedMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
  image = { url: "/opengraph-image", width: 1200, height: 630, alt: siteName },
): Metadata {
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
      siteName,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((lang) => lang !== locale)
        .map((lang) => openGraphLocales[lang]),
      type: "website",
      url: `/${locale}${path}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
