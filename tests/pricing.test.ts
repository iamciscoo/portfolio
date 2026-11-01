import { describe, expect, it } from "vitest";
import {
  formatPrice,
  formatPackagePrice,
  formatUsdPrice,
  formatUpdateRange,
  whatsappMonthlyUsd,
  pricingPackages,
} from "@/content/pricing";

describe("pricing estimates", () => {
  it("preserves the owner's four TZS build prices", () => {
    expect(pricingPackages.map(({ tzs }) => tzs)).toEqual([
      450000, 650000, 900000, 1400000,
    ]);
    expect(formatPrice(450000, "sw")).toMatch(/TZS\s*450,000/);
  });

  it("converts the same base price and monthly budget for each locale", () => {
    expect(formatPrice(450000, "en")).toMatch(/\$171/);
    expect(formatPrice(450000, "ru")).toMatch(/13,700\s*₽/);
    expect(formatPrice(450000, "fr")).toMatch(/\$171/);
    expect(formatPrice(450000, "es")).toMatch(/\$171/);
    expect(formatUsdPrice(20, "sw")).toMatch(/TZS\s*53,000/);
    expect(formatUsdPrice(20, "en")).toMatch(/\$20/);
    expect(formatUsdPrice(20, "ru")).toMatch(/1,600\s*₽/);
  });

  it("rounds USD package estimates to tens", () => {
    expect(
      pricingPackages.map(({ tzs }) => formatPackagePrice(tzs, "en")),
    ).toEqual(["$170", "$250", "$340", "$530"]);
    expect(formatPackagePrice(450000, "fr")).toMatch(/\$170/);
    expect(formatPackagePrice(450000, "es")).toMatch(/\$170/);
    expect(formatPackagePrice(450000, "sw")).toEqual(formatPrice(450000, "sw"));
    expect(formatPackagePrice(450000, "ru")).toEqual(formatPrice(450000, "ru"));
    expect(formatPrice(25000, "en")).toMatch(/\$9/);
    expect(formatUsdPrice(20, "en")).toMatch(/\$20/);
  });

  it("uses comma-grouped ruble symbols and the requested locale rounding", () => {
    expect(
      pricingPackages.map(({ tzs }) => formatPackagePrice(tzs, "ru")),
    ).toEqual([
      "13,700\u00a0₽",
      "19,800\u00a0₽",
      "27,400\u00a0₽",
      "42,700\u00a0₽",
    ]);
    expect(formatPrice(1499, "sw")).toBe("TZS 1,000");
    expect(formatPrice(1500, "sw")).toBe("TZS 2,000");
    expect(formatUpdateRange("ru")).toBe("800\u00a0₽ – 6,100\u00a0₽");
    expect(formatUsdPrice(whatsappMonthlyUsd, "ru")).toBe("1,200\u00a0₽");
  });

  it("quotes updates at USD 10–80 and the WhatsApp add-on at USD 15/month", () => {
    for (const locale of ["en", "fr", "es"] as const) {
      expect(formatUpdateRange(locale)).toMatch(/10/);
      expect(formatUpdateRange(locale)).toMatch(/80/);
      expect(formatUpdateRange(locale)).toContain("$");
    }
    expect(formatUpdateRange("sw")).toMatch(/25,000.*200,000/);
    expect(formatUsdPrice(whatsappMonthlyUsd, "en")).toMatch(/\$15/);
    expect(formatUsdPrice(whatsappMonthlyUsd, "sw")).toMatch(/TZS\s*40,000/);
  });
});
