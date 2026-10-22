import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { text } from "@/lib/localize";
import { fashion as c, shoots } from "./content";
import { Collection } from "../shared/collection";
import { DemoInquiry } from "../shared/demo-inquiry";
import "./style.css";
export async function FashionSite({ locale }: { locale: Locale }) {
  const t = await getTranslations("demo");
  return (
    <div className="demo-site fashion-site">
      <header className="demo-nav demo-wrap">
        <a href="#fashion-top">A / N</a>
        <nav>
          <a href="#portfolio">{t("portfolio")}</a>
          <a href="#about">{t("about")}</a>
          <a href="#campaign">{t("projects")}</a>
          <a href="#representation">{t("contact")}</a>
        </nav>
        <DemoInquiry kind="book" />
      </header>
      <div>
        <section id="fashion-top" className="fashion-hero">
          <div className="fashion-hero-image">
            <Image
              src="/images/demos/fashion.webp"
              alt="Illustrative editorial portrait for a fictional model portfolio"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 650px) 100vw, 65vw"
            />
          </div>
          <div className="fashion-hero-copy">
            <span className="demo-label">{text(c.eyebrow, locale)}</span>
            <h1>{text(c.title, locale)}</h1>
            <p>{text(c.intro, locale)}</p>
            <a href="#portfolio" className="fashion-explore">
              {t("portfolio")} ↓
            </a>
          </div>
          <div className="fashion-name" aria-hidden="true">
            AMARA<span>NKOSI</span>
          </div>
          <span className="fashion-edition">VOL. 01 / CONCEPT PORTFOLIO</span>
        </section>
        <section id="portfolio" className="fashion-work demo-wrap">
          <div className="fashion-section-heading">
            <span className="demo-label">01 / {t("portfolio")}</span>
            <h2>{text(c.portfolio, locale)}</h2>
          </div>
          <Collection
            mode="fashion"
            items={shoots.map((s) => ({
              id: s.id,
              title: text(s.title, locale),
              category: text(s.category, locale),
              image: s.image,
              description: text(s.description, locale),
            }))}
          />
        </section>
        <section id="about" className="fashion-about">
          <div className="demo-wrap fashion-about-grid">
            <div>
              <span className="demo-label">02 / {t("about")}</span>
              <h2>{text(c.aboutTitle, locale)}</h2>
            </div>
            <div>
              <p>{text(c.about, locale)}</p>
              <h3>{text(c.highlights, locale)}</h3>
              <div className="fashion-highlight">
                <span>2026</span>
                <p>{text(c.campaign, locale)}</p>
              </div>
              <div className="fashion-highlight">
                <span>2025</span>
                <p>
                  {text(shoots[1].title, locale)} /{" "}
                  {text(shoots[1].category, locale)}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="campaign" className="fashion-campaign demo-wrap">
          <div className="demo-image">
            <Image
              src="/images/demos/fashion3.webp"
              alt={text(c.campaign, locale)}
              fill
              sizes="(max-width: 650px) 90vw, 50vw"
            />
          </div>
          <div>
            <span className="demo-label">03 / {t("projects")}</span>
            <h2>{text(c.campaign, locale)}</h2>
            <p>{text(c.campaignBody, locale)}</p>
            <DemoInquiry kind="book" />
          </div>
        </section>
        <section id="representation" className="fashion-contact demo-wrap">
          <div>
            <span className="demo-label">{text(c.representation, locale)}</span>
            <p>{text(c.agency, locale)}</p>
          </div>
          <div>
            <h2>{text(c.contact, locale)}</h2>
            <DemoInquiry kind="book" />
          </div>
        </section>
      </div>
      <footer className="demo-footer demo-wrap">
        <span>AMARA NKOSI / CONCEPT</span>
        <p>{t("notice")}</p>
        <Link href="/studio">{t("back")} ↗</Link>
      </footer>
    </div>
  );
}
