import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { text } from "@/lib/localize";
import { shop as c } from "./content";
import { ShopCatalogue } from "./catalogue";
import "./style.css";
export async function ShopSite({ locale }: { locale: Locale }) {
  const t = await getTranslations("demo");
  return (
    <div className="demo-site pace-site">
      <header className="demo-nav demo-wrap">
        <a href="#pace-top">
          PACE<span>®</span>
        </a>
        <nav>
          <a href="#collection">{text(c.collection, locale)}</a>
          <a href="#pace-approach">{t("about")}</a>
        </nav>
        <a className="pace-nav-link" href="#collection">
          <ArrowUpRight size={22} aria-label={text(c.browse, locale)} />
        </a>
      </header>
      <section id="pace-top" className="pace-hero demo-wrap">
        <div className="pace-hero-copy">
          <span className="demo-label">{text(c.label, locale)}</span>
          <h1>{text(c.title, locale)}</h1>
          <p>{text(c.body, locale)}</p>
          <a className="demo-button" href="#collection">
            {text(c.browse, locale)}
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="pace-hero-image">
          <Image
            src="/images/demos/shop.webp"
            alt={text(c.image, locale)}
            width={1536}
            height={1024}
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 700px) 92vw, 70vw"
          />
        </div>
      </section>
      <ShopCatalogue locale={locale} />
      <section id="pace-approach" className="pace-approach demo-wrap">
        <h2>{text(c.materials, locale)}</h2>
        <p>{text(c.materialsBody, locale)}</p>
      </section>
      <footer className="demo-footer demo-wrap">
        <strong>PACE®</strong>
        <p>{t("notice")}</p>
        <Link href="/studio">{t("back")} ↗</Link>
      </footer>
    </div>
  );
}
