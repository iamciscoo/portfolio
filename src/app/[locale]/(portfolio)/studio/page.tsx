import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageHeading } from "@/components/common/page-heading";
import { StudioGrid } from "@/components/portfolio/studio-grid";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "studio", "/studio");
}
export default async function Studio({
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
        label={t("nav.studio")}
        title={t("pages.studio")}
        description={t("pages.studioIntro")}
      />
      <section className="wrap page-content">
        <div className="studio-notice">
          <span className="eyebrow">{t("studio.notice")}</span>
          <p>{t("studio.noticeBody")}</p>
        </div>
        <StudioGrid locale={locale} />
        <div className="studio-more">
          <h2>{t("studio.more")}</h2>
          <p>{t("studio.moreBody")}</p>
          <Link href="/contact" className="button primary">
            {t("common.start")} ↗
          </Link>
        </div>
      </section>
    </>
  );
}
