import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { text } from "@/lib/localize";
import {
  consulting as c,
  advisoryServices,
  challenges,
  sampleCases,
  advisors,
  insights,
} from "./content";
import { Collection } from "../shared/collection";
import { DemoInquiry } from "../shared/demo-inquiry";
import "./style.css";
export async function ConsultingSite({ locale }: { locale: Locale }) {
  const t = await getTranslations("demo");
  return (
    <div className="demo-site consulting-site">
      <div className="consulting-top">
        <header className="demo-nav demo-wrap">
          <a href="#consulting-top">
            N<span className="northline-slash">/</span>NORTHLINE
          </a>
          <nav>
            <a href="#expertise">{t("services")}</a>
            <a href="#perspective">{t("about")}</a>
            <a href="#people">{t("team")}</a>
            <a href="#insights">{t("insights")}</a>
          </nav>
          <DemoInquiry kind="consult" />
        </header>
        <div>
          <section id="consulting-top" className="consulting-hero demo-wrap">
            <div>
              <span className="demo-label">{text(c.label, locale)}</span>
              <h1>{text(c.title, locale)}</h1>
              <p>{text(c.intro, locale)}</p>
              <DemoInquiry kind="consult" />
            </div>
            <div className="consulting-hero-visual">
              <div className="consulting-compass" aria-hidden="true">
                N<span>↗</span>
              </div>
              <div className="demo-image">
                <Image
                  src="/images/demos/consulting.webp"
                  alt="Illustrative workspace - fictional advisory firm"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 650px) 90vw, 40vw"
                />
              </div>
              <span>AN INDEPENDENT PERSPECTIVE / 01</span>
            </div>
          </section>
        </div>
      </div>
      <section id="perspective" className="consulting-perspective demo-wrap">
        <span className="demo-label">01 / {t("about")}</span>
        <div>
          <h2>{text(c.perspective, locale)}</h2>
          <p>{text(c.perspectiveBody, locale)}</p>
        </div>
      </section>
      <section id="expertise" className="consulting-services demo-wrap">
        <div className="consulting-section-heading">
          <span className="demo-label">02 / {t("services")}</span>
          <h2>{text(c.services, locale)}</h2>
        </div>
        <div>
          {advisoryServices.map((s, i) => (
            <article key={i}>
              <span>0{i + 1}</span>
              <h3>{text(s.name, locale)}</h3>
              <p>{text(s.body, locale)}</p>
              <DemoInquiry kind="consult" className="consulting-service-link" />
            </article>
          ))}
        </div>
        <p className="consulting-industries">{text(c.industries, locale)}</p>
      </section>
      <section className="consulting-challenges">
        <div className="demo-wrap">
          <h2>{text(c.challenges, locale)}</h2>
          <div>
            {challenges.map((challenge, i) => (
              <details key={i} open={i === 0}>
                <summary>
                  {text(challenge.title, locale)}
                  <span>+</span>
                </summary>
                <p>{text(challenge.body, locale)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="consulting-work demo-wrap">
        <span className="demo-label">03 / {t("projects")}</span>
        <h2>{text(c.work, locale)}</h2>
        <Collection
          items={sampleCases.map((item) => ({
            id: item.id,
            title: text(item.title, locale),
            category: text(item.category, locale),
            image: item.image,
            description: text(item.description, locale),
            detail: text(item.detail, locale),
          }))}
        />
      </section>
      <section id="people" className="consulting-people demo-wrap">
        <div className="consulting-section-heading">
          <span className="demo-label">04 / {t("team")}</span>
          <h2>{text(c.people, locale)}</h2>
        </div>
        <div>
          {advisors.map((person, i) => (
            <article key={person.name}>
              <span className={`advisor-monogram advisor-${i}`}>
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
      <section id="insights" className="consulting-insights">
        <div className="demo-wrap">
          <span className="demo-label">05 / {t("insights")}</span>
          <h2>{text(c.insights, locale)}</h2>
          <Collection
            mode="article"
            items={insights.map((item) => ({
              id: item.id,
              title: text(item.title, locale),
              category: text(item.category, locale),
              image: item.image,
              description: text(item.description, locale),
              detail: text(item.detail, locale),
            }))}
          />
        </div>
      </section>
      <section className="consulting-contact demo-wrap">
        <h2>{text(c.contact, locale)}</h2>
        <DemoInquiry kind="consult" />
      </section>
      <footer className="demo-footer demo-wrap">
        <strong>N / NORTHLINE</strong>
        <p>{t("notice")}</p>
        <Link href="/studio">{t("back")} ↗</Link>
      </footer>
    </div>
  );
}
