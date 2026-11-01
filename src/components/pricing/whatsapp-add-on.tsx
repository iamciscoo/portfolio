import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { formatUsdPrice, whatsappMonthlyUsd } from "@/content/pricing";
import "./whatsapp-add-on.css";

export async function WhatsAppAddOn({ locale }: { locale: Locale }) {
  const t = await getTranslations("pricing");
  return (
    <section
      className="pricing-aftercare pricing-whatsapp-addon"
      aria-labelledby="whatsapp-addon-title"
    >
      <div>
        <span className="eyebrow">{t("whatsappAddOnLabel")}</span>
        <h2 id="whatsapp-addon-title">{t("whatsappAddOnTitle")}</h2>
        <p>{t("whatsappAddOnBody")}</p>
      </div>
      <div className="pricing-aftercare-price">
        <strong>{formatUsdPrice(whatsappMonthlyUsd, locale)}</strong>
        <span>{t("whatsappAddOnPeriod")}</span>
      </div>
    </section>
  );
}
