import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { skillGroups } from "@/content/skills";
import { milestones } from "@/content/experience";
import { ProjectExhibits } from "@/components/projects/project-exhibits";
import { PersonalHero } from "@/components/portfolio/personal-hero";
import { SoftwareSupport } from "@/components/portfolio/software-support";
import { StudioGrid } from "@/components/portfolio/studio-grid";
import { ContactBand } from "@/components/common/contact-band";
import { Reveal } from "@/components/common/reveal";
import { pageMetadata } from "@/lib/metadata";
import { text } from "@/lib/localize";
import { showcase } from "@/content/showcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "home");
}
export default async function Home({
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
      <PersonalHero locale={locale} />
      <section id="selected-work" className="work-section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("common.work")}</span>
            <h2>{t("home.workTitle")}</h2>
          </div>
          <div>
            <p>{t("home.workNote")}</p>
            <Link href="/projects" className="text-link">
              {t("common.all")}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <ProjectExhibits locale={locale} />
        <div className="showcase-offer">
          <p>{text(showcase.offer, locale)}</p>
          <Link className="text-link" href="/contact?service=business">
            {text(showcase.build, locale)}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <Reveal>
        <section className="studio-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <span className="eyebrow">{t("common.studio")}</span>
                <h2>{t("home.studioTitle")}</h2>
              </div>
              <div>
                <p>{t("home.studioBody")}</p>
                <Link href="/studio" className="text-link">
                  {t("common.studio")}
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <StudioGrid locale={locale} compact />
          </div>
        </section>
      </Reveal>
      <section className="expertise-section wrap">
        <span className="eyebrow">{t("home.expertise")}</span>
        <h2>{t("home.expertiseTitle")}</h2>
        <div className="expertise-grid">
          {skillGroups.map((group, i) => (
            <div key={i}>
              <h3>{text(group.title, locale)}</h3>
              <p>
                {group.skills.map((skill) => text(skill, locale)).join(" / ")}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="journey-preview wrap">
        <div>
          <span className="eyebrow">{t("nav.journey")}</span>
          <h2>{t("home.journeyTitle")}</h2>
          <Link href="/journey" className="text-link">
            {t("nav.journey")}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div>
          {milestones
            .filter((m) => m.type === "experience")
            .map((m) => (
              <div className="mini-milestone" key={m.id}>
                <span>{text(m.date, locale)}</span>
                <h3>{text(m.title, locale)}</h3>
                <p>{text(m.place, locale)}</p>
              </div>
            ))}
        </div>
      </section>
      <section className="services-preview wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("nav.services")}</span>
            <h2>{t("home.servicesTitle")}</h2>
          </div>
          <Link href="/services" className="text-link">
            {t("nav.services")}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        {services.slice(0, 4).map((s, i) => (
          <Link
            className="service-row"
            href={`/contact?service=${s.id}`}
            key={s.id}
          >
            <span className="small-number">0{i + 1}</span>
            <h3>{text(s.title, locale)}</h3>
            <ArrowUpRight />
          </Link>
        ))}
      </section>
      <SoftwareSupport locale={locale} />
      <ContactBand />
    </>
  );
}
