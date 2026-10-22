import { defineRouting } from "next-intl/routing";
export const locales = ["en", "ru", "sw", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
