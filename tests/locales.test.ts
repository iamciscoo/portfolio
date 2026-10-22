import { describe, it, expect } from "vitest";
import { isLocale, locales, routing } from "@/i18n/routing";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import sw from "@/messages/sw.json";
function keys(value: object, prefix = ""): string[] {
  return Object.entries(value)
    .flatMap(([key, item]) =>
      typeof item === "object"
        ? keys(item, `${prefix}${key}.`)
        : [`${prefix}${key}`],
    )
    .sort();
}
describe("locale contract", () => {
  it("recognizes only supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ru")).toBe(true);
    expect(isLocale("sw")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("../en")).toBe(false);
  });
  it("translates every dictionary key in Russian and Kiswahili", () => {
    expect(keys(ru)).toEqual(keys(en));
    expect(keys(sw)).toEqual(keys(en));
  });
  it("requires an explicit locale prefix and defaults to English", () => {
    expect(routing.defaultLocale).toBe("en");
    expect(routing.localePrefix).toBe("always");
    expect(routing.locales).toEqual(locales);
  });
});
