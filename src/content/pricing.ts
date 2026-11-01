import type { Locale } from "@/i18n/routing";

// Owner's build prices are denominated in TZS. Conversions are estimates,
// deliberately snapshotted so viewing a quote never depends on a currency API.
// Source: https://open.er-api.com/v6/latest/USD (2026-10-31).
export const exchangeRates = {
  date: "2026-10-31",
  tzsPerUsd: 2638.183013,
  rubPerUsd: 80.408916,
  source: "https://www.exchangerate-api.com",
} as const;

export const pricingPackages = [
  { id: "landing", tzs: 450000 },
  { id: "email", tzs: 650000 },
  { id: "whatsapp", tzs: 900000 },
  { id: "portal", tzs: 1400000 },
] as const;

export const pricingFeatures = [
  { id: "design", minimumTier: 0 },
  { id: "seo", minimumTier: 0 },
  { id: "domain", minimumTier: 0 },
  { id: "socials", minimumTier: 0 },
  { id: "form", minimumTier: 1 },
  { id: "email", minimumTier: 1 },
  { id: "whatsapp", minimumTier: 2 },
  { id: "destinations", minimumTier: 2 },
  { id: "admin", minimumTier: 3 },
  { id: "resources", minimumTier: 3 },
] as const;

export const whatsappMonthlyUsd = 15;

export function pricingCurrency(locale: Locale) {
  return locale === "sw" ? "TZS" : locale === "ru" ? "RUB" : "USD";
}

export function pricingCurrencySymbol(locale: Locale) {
  const currency = pricingCurrency(locale);
  return currency === "RUB" ? "₽" : currency === "USD" ? "$" : "TZS";
}

export function formatPrice(tzs: number, locale: Locale, roundUsdTo = 1) {
  const currency = pricingCurrency(locale);
  const value =
    currency === "TZS"
      ? tzs
      : (tzs / exchangeRates.tzsPerUsd) *
        (currency === "RUB" ? exchangeRates.rubPerUsd : 1);
  const increment =
    currency === "RUB" ? 100 : currency === "TZS" ? 1000 : roundUsdTo;
  const number = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.round(value / increment) * increment);
  if (currency === "RUB") return `${number}\u00a0₽`;
  return currency === "USD" ? `$${number}` : `TZS ${number}`;
}

export function formatPackagePrice(tzs: number, locale: Locale) {
  return formatPrice(tzs, locale, 10);
}

export function formatUsdPrice(usd: number, locale: Locale) {
  return formatPrice(usd * exchangeRates.tzsPerUsd, locale);
}

export function formatUpdateRange(locale: Locale) {
  return `${formatPrice(25000, locale, 10)} – ${formatPrice(200000, locale, 10)}`;
}
