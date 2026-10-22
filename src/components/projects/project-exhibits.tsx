import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { text } from "@/lib/localize";
import { ProjectScene } from "@/components/portfolio/scroll-scenes";
import { HorizontalShowcase } from "@/components/common/horizontal-showcase";
import { showcase } from "@/content/showcase";

export async function ProjectExhibits({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  return (
    <HorizontalShowcase
      className="project-exhibits"
      label={text(showcase.projects, locale)}
      previous={text(showcase.previous, locale)}
      next={text(showcase.next, locale)}
    >
      {projects.map((project) => (
        <ProjectScene
          key={project.slug}
          desktop={
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`${project.name} - ${t("common.view")}`}
            >
              <div className="browser-bar">
                <i />
                <i />
                <i />
                <span>{new URL(project.url).hostname}</span>
              </div>
              <Image
                src={project.cover}
                alt={`${project.name} - ${t("projects.desktop")}`}
                width={1440}
                height={1000}
                sizes="(max-width: 700px) 72vw, (max-width: 1000px) 70vw, 684px"
              />
            </Link>
          }
          phone={
            <Image
              src={project.mobile}
              alt={`${project.name} - ${t("projects.mobile")}`}
              width={390}
              height={844}
              sizes="(max-width: 700px) 20vw, 167px"
            />
          }
        >
          <div>
            <span className="personal-kicker">
              {text(project.role, locale)}
            </span>
            <h3 data-sc-cue>{project.name}</h3>
            <p>{text(project.intro, locale)}</p>
          </div>
          <div className="exhibit-actions">
            <Link className="text-link" href={`/projects/${project.slug}`}>
              {t("common.view")}
              <ArrowUpRight size={17} />
            </Link>
            <Link className="text-link" href="/contact?service=business">
              {text(showcase.build, locale)}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </ProjectScene>
      ))}
    </HorizontalShowcase>
  );
}
