import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { demos } from "@/content/demos";
import type { Locale } from "@/i18n/routing";
import { text } from "@/lib/localize";
import { HorizontalShowcase } from "@/components/common/horizontal-showcase";
import { showcase } from "@/content/showcase";
export async function StudioGrid({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const t = await getTranslations();
  const tiles = (
    <>
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
    </>
  );
  return compact ? (
    <HorizontalShowcase
      className="studio-grid studio-showcase"
      label={text(showcase.concepts, locale)}
      previous={text(showcase.previous, locale)}
      next={text(showcase.next, locale)}
    >
      {tiles}
    </HorizontalShowcase>
  ) : (
    <div className="studio-grid" data-sc-act="studio">
      {tiles}
    </div>
  );
}
