import { readFile, mkdir, writeFile } from "node:fs/promises";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import {
  exchangeRates,
  pricingPackages,
  pricingFeatures,
  pricingCurrencySymbol,
  formatPackagePrice,
  formatUpdateRange,
  formatUsdPrice,
  whatsappMonthlyUsd,
} from "../src/content/pricing.ts";
import { profileContact } from "../src/content/profile-contact.ts";
import {
  addPage,
  colors,
  contentWidth,
  margin,
  mark,
  rule,
  text,
  wrap,
} from "./pricing-pdf-layout.mjs";

const fontBytes = await readFile(
  new URL("../public/fonts/onest-variable.ttf", import.meta.url),
);
const output = new URL("../public/pricing/", import.meta.url);
await mkdir(output, { recursive: true });

for (const locale of ["en", "sw", "ru", "fr", "es"]) {
  const { pricing: copy } = JSON.parse(
    await readFile(
      new URL(`../src/messages/${locale}.json`, import.meta.url),
      "utf8",
    ),
  );
  const t = (key, values = {}) => {
    let value = key.split(".").reduce((item, part) => item[part], copy);
    for (const [name, replacement] of Object.entries(values))
      value = value.replaceAll(`{${name}}`, replacement);
    return value;
  };
  // PDF prices use a leading symbol; keep the website's locale format separate.
  const pdfPrice = (value) =>
    locale === "ru" ? value.replace(/([\d,]+)\s*₽/g, "₽$1") : value;
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(fontBytes, { subset: true });
  doc.setTitle(`${t("packages")} | Cisco`);
  doc.setAuthor(profileContact.shortName);
  doc.setLanguage(locale);

  const page = addPage(doc, font, profileContact);
  let y = text(page, font, t("packages"), margin, 744, 24);
  y =
    text(
      page,
      font,
      `${t("oneTime")} · ${t("domainIncluded")}`,
      margin,
      y - 8,
      10.5,
      contentWidth,
      colors.muted,
    ) - 20;
  const featureWidth = 225;
  const columnWidth = (contentWidth - featureWidth) / 4;
  const tableTop = y;
  const rows = pricingFeatures.map((feature) => ({
    ...feature,
    label: t(`features.${feature.id}`),
    height: Math.max(
      36,
      wrap(font, t(`features.${feature.id}`), 10, featureWidth - 24).length *
        14 +
        16,
    ),
  }));
  const tableHeight = 74 + rows.reduce((height, row) => height + row.height, 0);
  page.drawRectangle({
    x: margin + featureWidth + columnWidth * 2,
    y: y - tableHeight,
    width: columnWidth,
    height: tableHeight + 12,
    color: colors.tint,
  });
  text(page, font, t("featureList"), margin, y, 10.5, featureWidth - 32);
  for (const [index, plan] of pricingPackages.entries()) {
    const x = margin + featureWidth + index * columnWidth + 5;
    text(page, font, t(`${plan.id}.name`), x, y, 10, columnWidth - 10);
    const price = formatPackagePrice(plan.tzs, locale);
    if (locale === "sw") {
      text(
        page,
        font,
        pricingCurrencySymbol(locale),
        x,
        y - 32,
        8.5,
        columnWidth - 10,
        colors.muted,
      );
      text(
        page,
        font,
        price.replace(pricingCurrencySymbol(locale), "").trim(),
        x,
        y - 49,
        10.5,
        columnWidth - 10,
      );
    } else {
      text(page, font, pdfPrice(price), x, y - 42, 11, columnWidth - 10);
    }
  }
  y = tableTop - 74;
  for (const feature of rows) {
    rule(page, y);
    const rowHeight = feature.height;
    text(page, font, feature.label, margin, y - 18, 10, featureWidth - 24);
    pricingPackages.forEach((_, tier) =>
      mark(
        page,
        margin + featureWidth + columnWidth * (tier + 0.5),
        y - rowHeight / 2,
        tier >= feature.minimumTier,
      ),
    );
    y -= rowHeight;
  }
  rule(page, y);
  y -= 25;
  mark(page, margin + 5, y + 2, true);
  text(page, font, t("included"), margin + 18, y, 9);
  const legendX =
    margin + Math.max(125, font.widthOfTextAtSize(t("included"), 9) + 40);
  mark(page, legendX, y + 2, false);
  text(page, font, t("notIncluded"), legendX + 14, y, 9);
  y = text(
    page,
    font,
    t("estimate"),
    margin,
    y - 35,
    9.5,
    contentWidth,
    colors.muted,
  );
  const date = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${exchangeRates.date}T00:00:00Z`));
  text(
    page,
    font,
    t("conversion", { date }),
    margin,
    y - 8,
    9.5,
    contentWidth,
    colors.muted,
  );

  const details = addPage(doc, font, profileContact);
  y = text(details, font, t("hosting"), margin, 744, 23);
  y =
    text(
      details,
      font,
      t("hostingIntro"),
      margin,
      y - 6,
      10,
      contentWidth,
      colors.muted,
    ) - 12;
  for (const [label, value] of [
    [t("transfer"), `1 TB ${t("perMonth")}`],
    [t("requests"), `1,000,000 ${t("perMonth")}`],
    [t("compute"), `${pdfPrice(formatUsdPrice(20, locale))} ${t("perMonth")}`],
    [t("delivery"), "HTTPS"],
  ]) {
    text(details, font, label, margin, y, 10, 295);
    text(details, font, value, margin + 310, y, 10, contentWidth - 310);
    y -= 22;
  }
  y =
    text(
      details,
      font,
      t("allocation"),
      margin,
      y - 4,
      9,
      contentWidth,
      colors.muted,
    ) - 14;
  y = text(details, font, t("upgradeTitle"), margin, y, 13) - 3;
  y =
    text(
      details,
      font,
      `${pdfPrice(formatUsdPrice(20, locale))} ${t("perMonth")}`,
      margin,
      y,
      18,
    ) - 4;
  y =
    text(
      details,
      font,
      `${t("upgradeBody")} ${t("overages", { monthly: pdfPrice(formatUsdPrice(20, locale)) })}`,
      margin,
      y,
      9.5,
      contentWidth,
      colors.muted,
    ) - 14;
  y = text(details, font, t("whatsappAddOnTitle"), margin, y, 12) - 2;
  y =
    text(
      details,
      font,
      `${pdfPrice(formatUsdPrice(whatsappMonthlyUsd, locale))} ${t("whatsappAddOnPeriod")}`,
      margin,
      y,
      14,
    ) - 3;
  y =
    text(
      details,
      font,
      t("whatsappAddOnBody"),
      margin,
      y,
      9.5,
      contentWidth,
      colors.muted,
    ) - 14;
  rule(details, y + 4);
  y = text(details, font, t("aftercareLabel"), margin, y - 12, 13) - 2;
  y = text(details, font, pdfPrice(formatUpdateRange(locale)), margin, y, 17);
  y =
    text(
      details,
      font,
      t("perUpdate"),
      margin,
      y,
      9,
      contentWidth,
      colors.muted,
    ) - 4;
  y =
    text(
      details,
      font,
      t("aftercareBody"),
      margin,
      y,
      9.5,
      contentWidth,
      colors.muted,
    ) - 14;
  for (const prefix of ["domain", "providers"]) {
    y = text(details, font, t(`${prefix}Question`), margin, y, 11) - 3;
    y =
      text(
        details,
        font,
        t(`${prefix}Answer`),
        margin,
        y,
        9.5,
        contentWidth,
        colors.muted,
      ) - 13;
  }
  doc.getPages().forEach((p, index) =>
    p.drawText(`${index + 1} / ${doc.getPageCount()}`, {
      x: 525,
      y: 30,
      size: 8.5,
      font,
      color: colors.muted,
    }),
  );
  await writeFile(
    new URL(`cisco-pricing-${locale}.pdf`, output),
    await doc.save(),
  );
  console.log(`Pricing PDF: ${locale} (${doc.getPageCount()} pages)`);
}
