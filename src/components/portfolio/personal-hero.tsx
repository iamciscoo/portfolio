import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { profile } from "@/content/profile";
import { homeNotes } from "@/content/home-notes";
import { text } from "@/lib/localize";
import { HeroScene } from "./scroll-scenes";
import { cinematic } from "@/content/cinematic";

export async function PersonalHero({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  return (
    <HeroScene
      top={
        <div className="cinematic-top">
          <span>{text(cinematic.role, locale)}</span>
        </div>
      }
      copy={
        <>
          <span className="personal-kicker">{profile.name}</span>
          <h1 data-sc-cue>
            <span className="hero-introduction">
              {text(homeNotes.greeting, locale)}{" "}
              <span className="hero-name">{profile.alias}.</span>
            </span>{" "}
            <span className="hero-statement">
              {text(homeNotes.title, locale)}
            </span>
          </h1>
          <p>
            <span className="hero-intro-full">
              {text(homeNotes.intro, locale)}
            </span>
            <span className="hero-intro-compact">
              {text(homeNotes.mobileIntro, locale)}
            </span>
          </p>
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
        </>
      }
      photo={
        <Image
          src={profile.photos.hero.src}
          alt={text(cinematic.alt, locale)}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 900px) 1500px, 100vw"
        />
      }
      caption={
        <>
          <Link className="hero-about-link" href="/about">
            <Image
              src={profile.photos.headshot.src}
              alt=""
              width={44}
              height={44}
            />
            <span>{text(cinematic.meet, locale)}</span>
            <ArrowUpRight size={18} />
          </Link>
          <a
            className="hero-scroll-link"
            href="#selected-work"
            aria-label={text(cinematic.scroll, locale)}
          >
            <span>{text(cinematic.scroll, locale)}</span>
            <span className="scroll-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </>
      }
    />
  );
}
