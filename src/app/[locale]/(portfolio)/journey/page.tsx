import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { PageHeading } from "@/components/common/page-heading";
import { Timeline } from "@/components/portfolio/timeline";
import { ContactBand } from "@/components/common/contact-band";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "journey", "/journey");
}
export default async function Journey({
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
        label={t("nav.journey")}
        title={t("pages.journey")}
        description={t("pages.journeyIntro")}
      />
      <section className="page-content wrap">
        <Timeline />
      </section>
      <ContactBand />
    </>
  );
}
