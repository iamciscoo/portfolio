import { getTranslations, setRequestLocale } from "next-intl/server";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { ImageGallery } from "@/components/common/image-gallery";
import { ContactBand } from "@/components/common/contact-band";
import { text } from "@/lib/localize";
import { siteUrl } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || !isLocale(locale)) return {};
  const title = `${project.name} · Cisco`;
  const description = text(project.intro, locale);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: Object.fromEntries(
        ["en", "ru", "sw"].map((lang) => [lang, `/${lang}/projects/${slug}`]),
      ),
    },
    openGraph: {
      title,
      description,
      images: [{ url: project.cover, width: 1440, height: 1000 }],
    },
  };
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <article className="wrap">
        <div className="case-header">
          <Link href="/projects" className="text-link">
            <ArrowLeft size={15} />
            {t("nav.projects")}
          </Link>
          <h1>{project.name}</h1>
          <p>{text(project.tagline, locale)}</p>
          <div className="case-meta">
            <div>
              <span className="eyebrow">{t("common.role")}</span>
              <p>{text(project.role, locale)}</p>
            </div>
            <div>
              <span className="eyebrow">
                {t(`projects.${project.category}`)}
              </span>
            </div>
            <a
              href={project.url}
              className="button small"
              target="_blank"
              rel="noreferrer"
            >
              {t("common.live")}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="case-cover">
          <ImageGallery
            src={project.cover}
            eager
            alt={`${project.name} — ${t("projects.screenshots")}`}
          />
        </div>
        <section className="case-section">
          <h2>{t("common.overview")}</h2>
          <p>{text(project.intro, locale)}</p>
        </section>
        <section className="case-section">
          <h2>{t("projects.challenge")}</h2>
          <p>{text(project.problem, locale)}</p>
        </section>
        <section className="case-section">
          <h2>{t("projects.contribution")}</h2>
          <p>{text(project.contributions, locale)}</p>
        </section>
        <section className="case-section">
          <h2>{t("common.approach")}</h2>
          <p>{text(project.approach, locale)}</p>
        </section>
        <section className="case-section">
          <h2>{t("common.features")}</h2>
          <ul className="feature-list">
            {project.features.map((feature, i) => (
              <li key={i}>
                <Check size={17} />
                {text(feature, locale)}
              </li>
            ))}
          </ul>
        </section>
        <section className="case-mobile">
          <div>
            <span className="eyebrow">{t("projects.mobile")}</span>
            <h2>{text(project.tagline, locale)}</h2>
            <p>{t("projects.screenshots")} · 390px</p>
          </div>
          <div className="phone-frame">
            <ImageGallery
              src={project.mobile}
              width={390}
              height={844}
              alt={`${project.name} — ${t("projects.mobile")}`}
            />
          </div>
        </section>
        <section className="case-section">
          <h2>{t("common.stack")}</h2>
          {project.stack.length ? (
            <p>{project.stack.join(" · ")}</p>
          ) : (
            <p>{t("projects.technicalNote")}</p>
          )}
        </section>
        <div className="case-source">
          <p>{t("projects.evidence")}</p>
          <p>
            <a href={project.source} target="_blank" rel="noreferrer">
              {t("common.source")}: {project.name}
            </a>{" "}
            · 22.10.2026
          </p>
        </div>
        <Link href={`/projects/${next.slug}`} className="service-row">
          <span className="eyebrow">{t("common.next")}</span>
          <h3>{next.name}</h3>
          <ArrowUpRight />
        </Link>
      </article>
      <ContactBand />
      <Script
        id={`project-schema-${project.slug}`}
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: text(project.intro, locale),
            url: `${siteUrl}/${locale}/projects/${slug}`,
            author: { "@type": "Person", name: "Francis Jacob Mwambene" },
            sameAs: project.url,
          }).replace(/</g, "\u003c"),
        }}
      />
    </>
  );
}
