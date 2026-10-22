import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { text } from "@/lib/localize";
export async function ProjectCard({
  project,
  locale,
  index = 0,
}: {
  project: (typeof projects)[number];
  locale: Locale;
  index?: number;
}) {
  const t = await getTranslations();
  return (
    <article className="project-card">
      <Link
        href={`/projects/${project.slug}`}
        className={`project-visual project-${project.slug}`}
        aria-label={`${project.name} — ${t("common.view")}`}
      >
        <div className="project-browser">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>{new URL(project.url).hostname}</span>
          </div>
          <Image
            src={project.cover}
            alt={`${project.name} — ${t("projects.desktop")}`}
            width={1440}
            height={1000}
            sizes="(max-width: 700px) 92vw, 46vw"
          />
        </div>
        <span className="project-open">
          <ArrowUpRight />
        </span>
      </Link>
      <div className="project-caption">
        <div>
          <span className="eyebrow">
            0{index + 1} / {t(`projects.${project.category}`)}
          </span>
          <h3>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </h3>
          <p>{text(project.tagline, locale)}</p>
        </div>
        <ArrowUpRight size={25} />
      </div>
    </article>
  );
}
