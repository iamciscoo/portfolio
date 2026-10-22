import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { isLocale } from "@/i18n/routing";
import { demos } from "@/content/demos";
import { text } from "@/lib/localize";
import { DemoBar } from "@/demos/shared/demo-bar";
import { RestaurantSite } from "@/demos/restaurant/site";
import { FashionSite } from "@/demos/fashion/site";
import { ConstructionSite } from "@/demos/construction/site";
import { ConsultingSite } from "@/demos/consulting/site";
import "@/demos/shared/demo.css";
const sites = {
  restaurant: RestaurantSite,
  fashion: FashionSite,
  construction: ConstructionSite,
  consulting: ConsultingSite,
};
export const dynamicParams = false;
export function generateStaticParams() {
  return demos.map((demo) => ({ slug: demo.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const demo = demos.find((d) => d.slug === slug);
  if (!demo || !isLocale(locale)) return {};
  const t = await getTranslations({ locale });
  return {
    title: `${demo.name} · ${t("common.concept")} · Cisco`,
    description: text(demo.body, locale),
    alternates: {
      canonical: `/${locale}/studio/${slug}`,
      languages: Object.fromEntries(
        ["en", "ru", "sw"].map((lang) => [lang, `/${lang}/studio/${slug}`]),
      ),
    },
    openGraph: {
      title: `${demo.name} · Cisco Studio`,
      description: text(demo.body, locale),
      images: [{ url: demo.image, width: 1600, height: 1000 }],
    },
    robots: { index: false, follow: true },
  };
}
export default async function Demo({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const demo = demos.find((d) => d.slug === slug);
  if (!demo) notFound();
  setRequestLocale(locale);
  const Site = sites[demo.slug];
  return (
    <>
      <DemoBar />
      <main id="demo-main">
        <Site locale={locale} />
      </main>
    </>
  );
}
