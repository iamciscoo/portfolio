import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { profile } from "@/content/profile";
import { personalStory } from "@/content/refinement";
import { homeNotes } from "@/content/home-notes";
import { text } from "@/lib/localize";
import { HeroScene } from "./scroll-scenes";

export async function PersonalHero({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  return (
    <HeroScene
      top={
        <div className="personal-hero-top">
          <span>{text(personalStory.greeting, locale)}</span>
          <span>{t("home.location")}</span>
        </div>
      }
      copy={
        <>
          <span className="personal-kicker">{t("home.eyebrow")}</span>
          <h1 data-sc-cue>{text(homeNotes.title, locale)}</h1>
          <p>{text(homeNotes.intro, locale)}</p>
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
          <p className="hero-person-note">
            {text(personalStory.heroNote, locale)}
          </p>
        </>
      }
      photo={
        <Image
          src={profile.photos.hero.src}
          alt="Illustrated postcard of the journey from Tanzania to Russia along the 39°E meridian"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 700px) 85vw, 38vw"
        />
      }
      caption={
        <>
          <span>Francis Jacob Mwambene</span>
          <strong>
            <em>Cisco.</em>
          </strong>
          <span>{t("home.location")}</span>
        </>
      }
    />
  );
}
