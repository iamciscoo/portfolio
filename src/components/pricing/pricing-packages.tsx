import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { profile } from "@/content/profile";
import { HorizontalShowcase } from "@/components/common/horizontal-showcase";
import {
  formatPackagePrice,
  pricingCurrency,
  pricingFeatures,
  pricingPackages,
} from "@/content/pricing";

export async function PricingPackages({ locale }: { locale: Locale }) {
  const t = await getTranslations("pricing");
  return (
    <section
      id="packages"
      className="pricing-packages-section"
      aria-label={t("packages")}
    >
      <HorizontalShowcase
        className="pricing-showcase"
        label={t("swipe")}
        previous={t("previousPackage")}
        next={t("nextPackage")}
      >
        {pricingPackages.map((plan, index) => {
          const price = formatPackagePrice(plan.tzs, locale);
          return (
            <article
              key={plan.id}
              className={`pricing-package${plan.id === "whatsapp" ? " pricing-package-accent" : ""}`}
            >
              <div className="pricing-package-top">
                <span>0{index + 1}</span>
                <span>{t(`${plan.id}.label`)}</span>
              </div>
              <h2>{t(`${plan.id}.name`)}</h2>
              <p className="pricing-package-description">
                {t(`${plan.id}.description`)}
              </p>
              <div
                className="pricing-amount"
                data-currency={pricingCurrency(locale)}
              >
                {price}
              </div>
              <p className="pricing-amount-note">{t("starting")}</p>
              <a
                className="button pricing-select"
                href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(t("inquiry", { package: t(`${plan.id}.name`), price }))}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("choose", { package: t(`${plan.id}.name`) })}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <ul className="pricing-features" aria-label={t("featureList")}>
                {pricingFeatures.map((feature) => {
                  const included = index >= feature.minimumTier;
                  const Icon = included ? Check : X;
                  return (
                    <li key={feature.id} data-included={included}>
                      <Icon
                        size={17}
                        strokeWidth={included ? 2.2 : 1.7}
                        aria-hidden="true"
                      />
                      <span className="sr-only">
                        {t(included ? "included" : "notIncluded")}:{" "}
                      </span>
                      <span>{t(`features.${feature.id}`)}</span>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </HorizontalShowcase>
    </section>
  );
}
