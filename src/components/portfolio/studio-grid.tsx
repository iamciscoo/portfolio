import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { demos } from "@/content/demos";
import type { Locale } from "@/i18n/routing";
import { text } from "@/lib/localize";
export async function StudioGrid({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  return (
    <div className="studio-grid">
      {demos.map((demo, index) => (
        <article className={`studio-tile tile-${demo.slug}`} key={demo.slug}>
          <Link href={`/studio/${demo.slug}`} className="studio-image">
            <Image
              src={demo.image}
              fill
              sizes="(max-width: 700px) 92vw, 46vw"
              alt={`${demo.name} — ${t(`studio.${demo.category}`)}`}
            />
            <span className="concept-tag">{t("common.concept")}</span>
            <div className="studio-brand">
              <span>
                0{index + 1} / {t(`studio.${demo.category}`)}
              </span>
              <h3>
                {demo.name}
                <ArrowUpRight />
              </h3>
            </div>
          </Link>
          <div className="studio-caption">
            <p>{text(demo.body, locale)}</p>
            <Link href={`/studio/${demo.slug}`}>
              {t("common.demo")}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
