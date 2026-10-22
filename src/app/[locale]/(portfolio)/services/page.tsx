import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { text } from "@/lib/localize";
import { PageHeading } from "@/components/common/page-heading";
import { ContactBand } from "@/components/common/contact-band";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(
    isLocale(locale) ? locale : "en",
    "services",
    "/services",
  );
}
export default async function Services({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageHeading
        label={t("nav.services")}
        title={t("pages.services")}
        description={t("pages.servicesIntro")}
      />
      <section className="page-content wrap">
        {services.map((service, i) => (
          <article className="service-detail" key={service.id}>
            <span className="small-number">0{i + 1}</span>
            <h2>{text(service.title, locale)}</h2>
            <div>
              <p>{text(service.body, locale)}</p>
              <div className="service-deliverables">
                {text(service.deliverables, locale)}
              </div>
              <Link
                className="text-link"
                href={`/contact?service=${service.id}`}
              >
                {t("common.start")} ↗
              </Link>
            </div>
          </article>
        ))}
      </section>
      <ContactBand />
    </>
  );
}
