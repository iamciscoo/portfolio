import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { formatUsdPrice } from "@/content/pricing";

export async function HostingCosts({ locale }: { locale: Locale }) {
  const t = await getTranslations("pricing");
  return (
    <section className="pricing-hosting" aria-labelledby="hosting-title">
      <div className="pricing-section-heading">
        <div>
          <span className="eyebrow">{t("hostingLabel")}</span>
          <h2 id="hosting-title">{t("hosting")}</h2>
        </div>
        <p>{t("hostingIntro")}</p>
      </div>
      <div className="pricing-hosting-grid">
        <div>
          <h3>{t("resourcesTitle")}</h3>
          <dl className="pricing-resources">
            <div>
              <dt>{t("transfer")}</dt>
              <dd>
                1 TB<span>{t("perMonth")}</span>
              </dd>
            </div>
            <div>
              <dt>{t("requests")}</dt>
              <dd>
                1,000,000<span>{t("perMonth")}</span>
              </dd>
            </div>
            <div>
              <dt>{t("compute")}</dt>
              <dd>
                {formatUsdPrice(20, locale)}
                <span>{t("usageCredit")}</span>
              </dd>
            </div>
            <div>
              <dt>{t("delivery")}</dt>
              <dd>HTTPS</dd>
            </div>
          </dl>
          <p className="pricing-resource-note">{t("allocation")}</p>
        </div>
        <aside className="pricing-hosting-notice">
          <h3>{t("upgradeTitle")}</h3>
          <div className="pricing-hosting-price">
            {formatUsdPrice(20, locale)}
            <span>{t("perMonth")}</span>
          </div>
          <p>{t("upgradeBody")}</p>
          <p>{t("overages", { monthly: formatUsdPrice(20, locale) })}</p>
        </aside>
      </div>
    </section>
  );
}
