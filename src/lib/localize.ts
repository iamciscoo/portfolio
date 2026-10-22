import type { Locale } from "@/i18n/routing";
export type Localized = Record<Locale, string>;
export const l = (
  en: string,
  ru: string,
  sw: string,
  fr: string,
  es: string,
): Localized => ({
  en,
  ru,
  sw,
  fr,
  es,
});
export const text = (value: Localized, locale: Locale) =>
  value[locale] || value.en;
