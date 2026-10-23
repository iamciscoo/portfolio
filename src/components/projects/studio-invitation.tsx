import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { demos } from "@/content/demos";
import { CaseVisual } from "@/components/portfolio/scroll-scenes";
import { Reveal } from "@/components/common/reveal";
import "./studio-invitation.css";

export async function StudioInvitation() {
  const t = await getTranslations();
  return (
    <section
      className="studio-invitation wrap"
      aria-labelledby="studio-invitation-title"
    >
      <Reveal>
        <h2 id="studio-invitation-title">{t("projects.conceptsTitle")}</h2>
        <p>{t("projects.conceptsBody")}</p>
        <Link className="button primary" href="/studio">
          {t("projects.conceptsLink")}
          <ArrowUpRight size={18} />
        </Link>
        <small>{t("projects.conceptsNote")}</small>
      </Reveal>
      <CaseVisual>
        <div className="studio-invitation-previews">
          {demos.slice(0, 2).map((demo) => (
            <Link
              key={demo.slug}
              href={`/studio/${demo.slug}`}
              aria-label={`${demo.name}: ${t(`studio.${demo.category}`)}`}
            >
              <Image
                src={demo.image}
                width={960}
                height={600}
                sizes="(max-width: 700px) 44vw, 24vw"
                alt={`${demo.name}: ${t(`studio.${demo.category}`)}`}
              />
              <span>
                {t(`studio.${demo.category}`)}
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </CaseVisual>
    </section>
  );
}
