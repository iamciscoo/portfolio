import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { PageHeading } from "@/components/common/page-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import { ContactBand } from "@/components/common/contact-band";
import { pageMetadata } from "@/lib/metadata";
import { StudioInvitation } from "@/components/projects/studio-invitation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(
    isLocale(locale) ? locale : "en",
    "projects",
    "/projects",
  );
}
export default async function Projects({
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
        label={t("nav.projects")}
        title={t("pages.projects")}
        description={t("pages.projectsIntro")}
      />
      <section className="page-content wrap full-project-grid">
        <ProjectFilter
          items={projects.map((project, i) => ({
            id: project.slug,
            category: project.category,
            content: (
              <ProjectCard project={project} locale={locale} index={i} />
            ),
          }))}
        />
      </section>
      <StudioInvitation />
      <ContactBand />
    </>
  );
}
