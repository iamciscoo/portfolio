import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { profile } from "@/content/profile";
import { PageHeading } from "@/components/common/page-heading";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { pageMetadata } from "@/lib/metadata";
import "./contact.css";
import Image from "next/image";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "contact", "/contact");
}
export default async function Contact({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const { service } = await searchParams;
  return (
    <>
      <PageHeading
        label={t("nav.contact")}
        title={t("pages.contact")}
        description={t("pages.contactIntro")}
      />
      <section className="wrap contact-layout page-content">
        <aside>
          <div className="contact-portrait">
            <Image
              src={profile.photos.headshot.src}
              alt={profile.shortName}
              fill
              sizes="(max-width: 700px) 130px, 280px"
            />
          </div>
          <span className="eyebrow">{t("form.direct")}</span>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email} ↗
          </a>
          <p>{t("footer.based")}</p>
          <div className="contact-aside-mark">
            Let’s
            <br />
            build<span>.</span>
          </div>
        </aside>
        <InquiryForm initialService={service} />
      </section>
    </>
  );
}
