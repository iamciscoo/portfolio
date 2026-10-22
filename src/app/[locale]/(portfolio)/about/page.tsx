import { Camera, ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import { personalStory } from "@/content/refinement";
import { cinematic } from "@/content/cinematic";
import { PageHeading } from "@/components/common/page-heading";
import { ContactBand } from "@/components/common/contact-band";
import { ImageGallery } from "@/components/common/image-gallery";
import { PersonalStory } from "@/components/portfolio/personal-story";
import { WorkNotes } from "@/components/portfolio/work-notes";
import { Reveal } from "@/components/common/reveal";
import { pageMetadata } from "@/lib/metadata";
import { text } from "@/lib/localize";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "about", "/about");
}
export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageHeading
        label={t("nav.about")}
        title={t("pages.about")}
        description={t("about.body")}
      />
      <PersonalStory locale={locale} />
      <section className="about-facts wrap">
        <Reveal>
          <h2>{t("about.approach")}</h2>
          <p>{t("about.approachBody")}</p>
        </Reveal>
        <div className="about-details">
          <div>
            <h3>{t("about.education")}</h3>
            <p>{profile.currentEducation.institution}</p>
            <p>{t("about.educationNote")}</p>
            <Link href="/journey" className="text-link">
              {t("nav.journey")} <ArrowUpRight size={16} />
            </Link>
          </div>
          <div>
            <h3>{t("about.languages")}</h3>
            <p>{t("about.languageBody")}</p>
          </div>
        </div>
      </section>
      <WorkNotes locale={locale} />
      <section className="about-moments wrap" data-sc-act="moments">
        <div className="moments-intro">
          <h2 data-sc-cue>{text(cinematic.moments, locale)}</h2>
          <p>{text(cinematic.momentsBody, locale)}</p>
          <a
            href={profile.instagram[0]}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            <Camera size={16} /> {text(cinematic.instagram, locale)}{" "}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="photo-collection-grid">
          {profile.photos.gallery.map((photo, index) => (
            <figure key={photo.src}>
              <ImageGallery
                src={photo.src}
                alt={photo.alt}
                width={index === 0 ? 720 : 810}
                height={index === 0 ? 960 : 1080}
              />
              <figcaption>
                {text(
                  index === 0 ? personalStory.event : personalStory.candid,
                  locale,
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
