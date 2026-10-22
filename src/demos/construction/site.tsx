import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { text } from "@/lib/localize";
import { construction as c, capabilities, builds, team } from "./content";
import { Collection } from "../shared/collection";
import { DemoInquiry } from "../shared/demo-inquiry";
import "./style.css";
export async function ConstructionSite({ locale }: { locale: Locale }) {
  const t = await getTranslations("demo");
  return (
    <div className="demo-site construction-site">
      <header className="demo-nav demo-wrap">
        <a href="#construction-top">
          <span className="formwork-mark" />
          FORMWORK<span className="formwork-period">.</span>
        </a>
        <nav>
          <a href="#capabilities">{t("services")}</a>
          <a href="#projects">{t("projects")}</a>
          <a href="#company">{t("about")}</a>
          <a href="#quality">{t("quality")}</a>
        </nav>
        <DemoInquiry kind="quote" />
      </header>
      <div>
        <section id="construction-top" className="construction-hero demo-wrap">
          <div>
            <span className="demo-label">{text(c.label, locale)}</span>
            <h1>{text(c.title, locale)}</h1>
            <p>{text(c.intro, locale)}</p>
            <div className="demo-hero-actions">
              <DemoInquiry kind="quote" />
              <a href="#projects">{t("projects")} ↓</a>
            </div>
          </div>
          <div className="construction-hero-photo">
            <Image
              src="/images/demos/construction.webp"
              alt={text(c.sample, locale)}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 650px) 90vw, 48vw"
            />
            <span>01 / STRUCTURE & PURPOSE</span>
          </div>
        </section>
        <div className="construction-strap">
          <div className="demo-wrap">
            <span>↗</span>
            <p>{text(c.strap, locale)}</p>
            <span>FW / 01</span>
          </div>
        </div>
        <section id="capabilities" className="construction-services demo-wrap">
          <div>
            <span className="demo-label">01 / {t("services")}</span>
            <h2>{text(c.capabilities, locale)}</h2>
          </div>
          <div>
            {capabilities.map((s, i) => (
              <article key={i}>
                <span>0{i + 1}</span>
                <h3>{text(s.title, locale)}</h3>
                <p>{text(s.body, locale)}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="projects" className="construction-work">
          <div className="demo-wrap">
            <span className="demo-label">02 / {t("projects")}</span>
            <h2>{text(c.work, locale)}</h2>
            <p className="construction-sample-note">{text(c.sample, locale)}</p>
            <Collection
              items={builds.map((b) => ({
                id: b.id,
                title: text(b.title, locale),
                category: text(b.category, locale),
                image: b.image,
                description: text(b.description, locale),
                detail: text(b.detail, locale),
              }))}
            />
          </div>
        </section>
        <section id="company" className="construction-company demo-wrap">
          <div className="demo-image">
            <Image
              src="/images/demos/architecture.webp"
              alt={text(c.sample, locale)}
              fill
              sizes="(max-width: 650px) 90vw, 50vw"
            />
          </div>
          <div>
            <span className="demo-label">03 / {t("about")}</span>
            <h2>{text(c.aboutTitle, locale)}</h2>
            <p>{text(c.about, locale)}</p>
          </div>
        </section>
        <section id="quality" className="construction-quality">
          <div className="demo-wrap">
            <span className="demo-label">04 / {t("quality")}</span>
            <h2>{text(c.qualityTitle, locale)}</h2>
            <p>{text(c.quality, locale)}</p>
          </div>
        </section>
        <section className="construction-team demo-wrap">
          <span className="demo-label">05 / {t("team")}</span>
          <div>
            {team.map((person) => (
              <article key={person.name}>
                <span>
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <h3>{person.name}</h3>
                <p>{text(person.role, locale)}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="construction-contact demo-wrap">
          <h2>{text(c.contact, locale)}</h2>
          <DemoInquiry kind="quote" />
        </section>
      </div>
      <footer className="demo-footer demo-wrap">
        <strong>FORMWORK.</strong>
        <p>{t("notice")}</p>
        <Link href="/studio">{t("back")} ↗</Link>
      </footer>
    </div>
  );
}
