import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { PageHeading } from "@/components/common/page-heading";
import { Timeline } from "@/components/portfolio/timeline";
import { ContactBand } from "@/components/common/contact-band";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { personalStory } from "@/content/refinement";
import { text } from "@/lib/localize";
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
        <div className="journey-photo">
          <Image
            src="/images/profile/cisco-timun.webp"
            alt="Francis at Tanzania International Model United Nations in 2025"
            width={478}
            height={638}
            sizes="(max-width: 700px) 110px, 240px"
          />
          <div>
            <span className="personal-kicker">
              {text(personalStory.event, locale)}
            </span>
            <h2>{text(personalStory.chapters[0].title, locale)}</h2>
            <p>{text(personalStory.chapters[0].body, locale)}</p>
          </div>
        </div>
        <Timeline />
      </section>
      <ContactBand />
    </>
  );
}
