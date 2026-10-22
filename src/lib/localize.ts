import type { Locale } from "@/i18n/routing";
export type Localized = { en: string; ru: string; sw: string };
export const l = (en: string, ru: string, sw: string): Localized => ({
  en,
  ru,
  sw,
});
export const text = (value: Localized, locale: Locale) =>
  value[locale] || value.en;
