import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { personalStory } from "@/content/refinement";
import { profile } from "@/content/profile";
import { text } from "@/lib/localize";
import { Reveal } from "@/components/common/reveal";

export async function PersonalStory({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  return (
    <section id="intro" className="personal-story wrap" data-sc-act="story">
      <div className="story-heading">
        <span className="personal-kicker">{t("nav.about")}</span>
        <h2 data-sc-cue>{text(personalStory.title, locale)}</h2>
      </div>
      <div className="story-layout">
        <figure className="story-photo">
          <div>
            <Image
              src={profile.photos.headshot.src}
              alt="Francis in a white T-shirt, photographed indoors"
              fill
              sizes="(max-width: 700px) 85vw, 34vw"
            />
          </div>
          <figcaption>
            {text(personalStory.photoCaption, locale)}
            <span>— Cisco</span>
          </figcaption>
        </figure>
        <div className="story-chapters">
          {personalStory.chapters.map((chapter, index) => (
            <Reveal key={index}>
              <article className="story-chapter">
                <h3 data-sc-cue>{text(chapter.title, locale)}</h3>
                <p>{text(chapter.body, locale)}</p>
                {index === 2 && (
                  <Link href="/projects" className="text-link">
                    {t("nav.projects")}
                    <ArrowUpRight size={16} />
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
