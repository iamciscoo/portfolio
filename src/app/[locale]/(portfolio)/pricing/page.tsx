import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { isLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";
import {
  exchangeRates,
  formatUpdateRange,
  pricingCurrencySymbol,
} from "@/content/pricing";
import { PricingPackages } from "@/components/pricing/pricing-packages";
import { HostingCosts } from "@/components/pricing/hosting-costs";
import { WhatsAppAddOn } from "@/components/pricing/whatsapp-add-on";
import { Reveal } from "@/components/common/reveal";
import "./pricing.css";
import "./pricing-responsive.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "pricing", "/pricing");
}

export default async function Pricing({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("pricing");
  const date = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${exchangeRates.date}T00:00:00Z`));

  return (
    <div className="pricing-page wrap">
      <Reveal>
        <section className="pricing-intro" aria-labelledby="pricing-title">
          <div className="eyebrow">
            <span className="blue-dot" />
            {t("eyebrow")}
          </div>
          <div className="pricing-intro-grid">
            <h1 id="pricing-title">{t("title")}</h1>
            <div>
              <p>{t("intro")}</p>
              <div className="pricing-intro-actions">
                <a className="text-link" href="#packages">
                  {t("explore")}
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a
                  className="button pricing-download"
                  href={`/pricing/cisco-pricing-${locale}.pdf`}
                  download
                >
                  <Download size={17} aria-hidden="true" />
                  {t("downloadPdf")}
                </a>
              </div>
            </div>
          </div>
          <div className="pricing-meta">
            <span>{t("oneTime")}</span>
            <span>{t("domainIncluded")}</span>
            <span>
              {t("currency", { currency: pricingCurrencySymbol(locale) })}
            </span>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <PricingPackages locale={locale} />
        <p className="pricing-estimate">
          {t("estimate")} {t("conversion", { date })}{" "}
          <a
            href={exchangeRates.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("rates")}
          </a>
        </p>
      </Reveal>
      <Reveal>
        <HostingCosts locale={locale} />
      </Reveal>
      <Reveal>
        <WhatsAppAddOn locale={locale} />
      </Reveal>

      <Reveal>
        <section
          className="pricing-aftercare"
          aria-labelledby="aftercare-title"
        >
          <div>
            <span className="eyebrow">{t("aftercareLabel")}</span>
            <h2 id="aftercare-title">{t("aftercare")}</h2>
            <p>{t("aftercareBody")}</p>
          </div>
          <div className="pricing-aftercare-price">
            <strong>{formatUpdateRange(locale)}</strong>
            <span>{t("perUpdate")}</span>
          </div>
        </section>
        <section className="pricing-terms" aria-label={t("details")}>
          <details>
            <summary>{t("domainQuestion")}</summary>
            <p>{t("domainAnswer")}</p>
          </details>
          <details>
            <summary>{t("providersQuestion")}</summary>
            <p>{t("providersAnswer")}</p>
          </details>
        </section>
      </Reveal>
      <Reveal>
        <section className="pricing-next">
          <h2>{t("unsure")}</h2>
          <p>{t("unsureBody")}</p>
          <Link href="/contact?service=business" className="button">
            {t("talk")}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
