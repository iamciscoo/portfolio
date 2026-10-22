import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowDown, ArrowUpRight, Globe2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { skillGroups } from "@/content/skills";
import { milestones } from "@/content/experience";
import { ProjectCard } from "@/components/projects/project-card";
import { StudioGrid } from "@/components/portfolio/studio-grid";
import { ContactBand } from "@/components/common/contact-band";
import { Reveal } from "@/components/common/reveal";
import { pageMetadata } from "@/lib/metadata";
import { text } from "@/lib/localize";

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
      <section className="hero wrap">
        <div className="hero-top">
          <span className="eyebrow">
            <span className="blue-dot" />
            {t("home.eyebrow")}
          </span>
          <span className="location">
            <Globe2 size={14} />
            {t("home.location")}
          </span>
        </div>
        <div className="hero-main">
          <div className="hero-copy">
            <h1>
              {t("home.line1")}
              <br />
              {t("home.line2")}
              <br />
              <span>{t("home.line3")}</span>
            </h1>
            <p>{t("home.intro")}</p>
            <div className="hero-actions">
              <Link href="/projects" className="button primary">
                {t("common.explore")}
                <ArrowUpRight size={18} />
              </Link>
              <Link href="/contact" className="text-link">
                {t("common.start")}
                <ArrowUpRight size={17} />
              </Link>
            </div>
            {profile.cvUrl && (
              <a className="text-link cv-link" href={profile.cvUrl} download>
                {t("common.download")} ↓
              </a>
            )}
          </div>
          <div
            className={`portrait-frame ${profile.photos.hero.confirmed ? "has-photo" : ""}`}
          >
            <Image
              src={profile.photos.hero.src}
              alt={
                profile.photos.hero.confirmed
                  ? profile.name
                  : t("home.portraitNote")
              }
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 700px) 92vw, 36vw"
            />
            <div className="portrait-axis" />
            <div className="portrait-caption">
              <span>01 — {profile.shortName}</span>
              <span>{profile.alias}</span>
            </div>
            {!profile.photos.hero.confirmed && (
              <div className="portrait-placeholder">
                <span>
                  F<span className="outline-letter">M</span>
                </span>
                <p>{t("home.portrait")}</p>
                <small>{t("home.portraitNote")}</small>
              </div>
            )}
            <div className="portrait-sticker">
              <span>
                FROM
                <br />
                TZ / RU
              </span>
              <ArrowUpRight />
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span>DEVELOPMENT / PRODUCT / DESIGN</span>
          <a href="#intro">
            {t("home.scroll")}
            <ArrowDown size={16} />
          </a>
          <span>PORTFOLIO — 2026</span>
        </div>
      </section>
      <Reveal>
        <section id="intro" className="intro-section wrap">
          <span className="eyebrow">01 / {t("home.introLabel")}</span>
          <div>
            <h2>{t("home.introTitle")}</h2>
            <p>{t("home.introBody")}</p>
            <Link href="/about" className="text-link">
              {t("nav.about")}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </Reveal>
      <section className="work-section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / {t("common.work")}</span>
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
        <div className="project-grid">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              index={i}
            />
          ))}
        </div>
      </section>
      <Reveal>
        <section className="studio-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <span className="eyebrow">03 / {t("common.studio")}</span>
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
            <StudioGrid locale={locale} />
          </div>
        </section>
      </Reveal>
      <section className="expertise-section wrap">
        <span className="eyebrow">04 / {t("home.expertise")}</span>
        <h2>{t("home.expertiseTitle")}</h2>
        <div className="expertise-grid">
          {skillGroups.map((group, i) => (
            <div key={i}>
              <span className="small-number">0{i + 1}</span>
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
          <span className="eyebrow">05 / {t("nav.journey")}</span>
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
            <span className="eyebrow">06 / {t("nav.services")}</span>
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
      <ContactBand />
    </>
  );
}
