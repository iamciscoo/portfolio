import Image from "next/image";
import { ArrowUpRight, Compass } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { text } from "@/lib/localize";
import { tours as c } from "./content";
import { TourJourneys } from "./journeys";
import { DemoInquiry } from "../shared/demo-inquiry";
import "./style.css";
export async function ToursSite({ locale }: { locale: Locale }) {
  const t = await getTranslations("demo");
  return (
    <div className="demo-site safiri-site">
      <header className="demo-nav demo-wrap">
        <a href="#safiri-top">
          <Compass size={24} /> SAFIRI
        </a>
        <nav>
          <a href="#journeys">{text(c.explore, locale)}</a>
          <a href="#safiri-about">{t("about")}</a>
        </nav>
        <DemoInquiry kind="book" />
      </header>
      <section className="safiri-hero" id="safiri-top">
        <Image
          src="/images/demos/tours.webp"
          alt={text(c.image, locale)}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="safiri-hero-shade" />
        <div className="safiri-hero-copy demo-wrap">
          <span className="demo-label">{text(c.label, locale)}</span>
          <h1>{text(c.title, locale)}</h1>
          <p>{text(c.body, locale)}</p>
          <a className="demo-button" href="#journeys">
            {text(c.explore, locale)}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <TourJourneys locale={locale} />
      <section id="safiri-about" className="safiri-about demo-wrap">
        <Compass size={38} />
        <div>
          <h2>{text(c.approach, locale)}</h2>
          <p>{text(c.approachBody, locale)}</p>
          <DemoInquiry kind="book" />
        </div>
      </section>
      <p className="safiri-notice demo-wrap">{text(c.notice, locale)}</p>
      <footer className="demo-footer demo-wrap">
        <strong>SAFIRI</strong>
        <p>{t("notice")}</p>
        <Link href="/studio">{t("back")} ↗</Link>
      </footer>
    </div>
  );
}
