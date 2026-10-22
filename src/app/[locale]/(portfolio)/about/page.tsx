import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import { PageHeading } from "@/components/common/page-heading";
import { ContactBand } from "@/components/common/contact-band";
import { pageMetadata } from "@/lib/metadata";
import { personalStory } from "@/content/refinement";
import { text } from "@/lib/localize";
import { ImageGallery } from "@/components/common/image-gallery";
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
        description={t("pages.aboutIntro")}
      />
      <section className="page-content wrap">
        <div className="about-grid">
          <div>
            <div className="about-portrait">
              <Image
                src={profile.photos.headshot.src}
                alt={
                  profile.photos.headshot.confirmed
                    ? profile.name
                    : t("home.portraitNote")
                }
                fill
                sizes="(max-width: 600px) 90vw, 36vw"
              />
              {!profile.photos.headshot.confirmed && (
                <span className="photo-note">{t("home.portraitNote")}</span>
              )}
            </div>
          </div>
          <div className="about-text">
            <div>
              <span className="eyebrow">{t("about.origin")}</span>
              <h2>
                Francis Jacob
                <br />
                Mwambene.
              </h2>
              <p>{t("about.body")}</p>
            </div>
            <div>
              <h2>{t("about.approach")}</h2>
              <p>{t("about.approachBody")}</p>
            </div>
            <div>
              <h2>{t("about.global")}</h2>
              <p>{t("about.globalBody")}</p>
            </div>
            <div>
              <span className="eyebrow">{t("about.languages")}</span>
              <p>{t("about.languageBody")}</p>
            </div>
            <div>
              <span className="eyebrow">{t("about.education")}</span>
              <h2>{profile.currentEducation.institution}</h2>
              {profile.currentEducation.qualification && (
                <p>{profile.currentEducation.qualification}</p>
              )}
              {profile.currentEducation.start && (
                <p>
                  {profile.currentEducation.start} —{" "}
                  {profile.currentEducation.end || t("about.current")}
                </p>
              )}
              <p>{t("about.educationNote")}</p>
              <Link href="/journey" className="text-link">
                {t("nav.journey")} ↗
              </Link>
            </div>
          </div>
        </div>
        <div className="about-lifestyle">
          <Image
            src={profile.photos.lifestyle.src}
            alt={
              profile.photos.lifestyle.confirmed
                ? `${profile.shortName} outdoors in evening sunlight`
                : t("home.portraitNote")
            }
            fill
            sizes="90vw"
          />
        </div>
        {profile.photos.gallery.length > 0 && (
          <section className="photo-collection">
            <h2>{text(personalStory.galleryTitle, locale)}</h2>
            <div className="photo-collection-grid">
              {profile.photos.gallery.map((photo, index) => (
                <figure key={photo.src}>
                  <ImageGallery
                    src={photo.src}
                    alt={photo.alt}
                    width={index === 0 ? 478 : 810}
                    height={index === 0 ? 638 : 1080}
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
        )}
      </section>
      <ContactBand />
    </>
  );
}
