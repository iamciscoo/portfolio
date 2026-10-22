import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { text } from "@/lib/localize";
import { restaurant as c } from "./content";
import { RestaurantMenu } from "./menu";
import { DemoInquiry } from "../shared/demo-inquiry";
import { ImageGallery } from "@/components/common/image-gallery";
import "./style.css";
export async function RestaurantSite({ locale }: { locale: Locale }) {
  const t = await getTranslations("demo");
  return (
    <div className="demo-site restaurant-site">
      <div className="restaurant-hero">
        <Image
          src="/images/demos/restaurant.webp"
          alt={text(c.eyebrow, locale)}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="demo-wrap">
          <header className="demo-nav">
            <a href="#restaurant-top" className="restaurant-logo">
              SAVOUR<span>THE SEASON</span>
            </a>
            <nav>
              <a href="#story">{t("story")}</a>
              <a href="#menu">{t("menu")}</a>
              <a href="#gallery">{t("portfolio")}</a>
              <a href="#visit">{t("location")}</a>
            </nav>
            <DemoInquiry kind="reserve" />
          </header>
          <div>
            <section id="restaurant-top" className="restaurant-hero-copy">
              <span className="demo-label">{text(c.eyebrow, locale)}</span>
              <h1>{text(c.title, locale)}</h1>
              <p>{text(c.intro, locale)}</p>
              <div className="demo-hero-actions">
                <DemoInquiry kind="reserve" />
                <a href="#menu">{t("menu")} ↓</a>
              </div>
            </section>
          </div>
          <div className="restaurant-hero-foot">
            <span>DAR ES SALAAM · CONCEPT 01</span>
            <span>GOOD FOOD / GOOD COMPANY</span>
          </div>
        </div>
      </div>
      <section id="story" className="restaurant-story demo-wrap">
        <span className="demo-label">01 / {t("story")}</span>
        <div>
          <h2>{text(c.storyTitle, locale)}</h2>
          <p>{text(c.story, locale)}</p>
        </div>
      </section>
      <section id="menu" className="restaurant-menu">
        <div className="demo-wrap">
          <div className="restaurant-section-title">
            <span className="demo-label">02 / {t("menu")}</span>
            <h2>{text(c.menuTitle, locale)}</h2>
            <p>{text(c.menuNote, locale)}</p>
          </div>
          <RestaurantMenu />
        </div>
      </section>
      <section id="gallery" className="restaurant-gallery demo-wrap">
        <div>
          <span className="demo-label">03 / {t("portfolio")}</span>
          <h2>{text(c.featured, locale)}</h2>
          <p>{text(c.featuredBody, locale)}</p>
          <DemoInquiry kind="reserve" />
        </div>
        <div className="restaurant-gallery-images">
          <ImageGallery
            src="/images/demos/food.webp"
            alt={text(c.menuTitle, locale)}
            width={1200}
            height={800}
          />
          <ImageGallery
            src="/images/demos/restaurant.webp"
            alt="SAVOUR — concept dining"
            width={1200}
            height={800}
          />
        </div>
      </section>
      <section id="visit" className="restaurant-visit demo-wrap">
        <h2>{text(c.visit, locale)}</h2>
        <div className="restaurant-visit-info">
          <div>
            <span className="demo-label">{t("location")}</span>
            <p>{text(c.location, locale)}</p>
          </div>
          <div>
            <span className="demo-label">{t("hours")}</span>
            <p>{text(c.hours, locale)}</p>
          </div>
          <DemoInquiry kind="reserve" />
        </div>
        <div className="concept-map" aria-label={t("location")}>
          <span className="map-water">INDIAN OCEAN</span>
          <span className="map-pin">SAVOUR · CONCEPT</span>
          <span className="map-city">DAR ES SALAAM</span>
        </div>
      </section>
      <footer className="demo-footer demo-wrap">
        <a href="#restaurant-top">SAVOUR</a>
        <p>{t("notice")}</p>
        <Link href="/studio">{t("back")} ↗</Link>
      </footer>
    </div>
  );
}
