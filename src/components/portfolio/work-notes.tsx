import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { homeNotes } from "@/content/home-notes";
import { text } from "@/lib/localize";
import type { Locale } from "@/i18n/routing";

export async function WorkNotes({ locale }: { locale: Locale }) {
  const t = await getTranslations("common");
  return (
    <section className="work-notes wrap" data-sc-act="work-notes">
      <figure className="work-note-photo">
        <Image
          src="/images/profile/cisco-work-video-still.webp"
          alt="Francis working at his desk with GloboExpats visible on the monitor"
          width={400}
          height={570}
          sizes="(max-width: 700px) 92vw, 40vw"
        />
        <figcaption>{text(homeNotes.workCaption, locale)}</figcaption>
      </figure>
      <div className="work-note-copy">
        <span className="personal-kicker">
          {text(homeNotes.workLabel, locale)}
        </span>
        <h2 data-sc-cue>{text(homeNotes.workTitle, locale)}</h2>
        <p>{text(homeNotes.workBody, locale)}</p>
        <Link href="/projects/globoexpats" className="text-link">
          GloboExpats · {t("view")}
          <ArrowUpRight size={17} />
        </Link>
        <a
          className="work-video-link"
          href="https://www.instagram.com/just.cisco/p/Dc5gNH_gKNEmMgPZ_0TybTpHbm4GSFgkMcbhEM0/"
          target="_blank"
          rel="noreferrer"
        >
          <Play size={16} aria-hidden="true" />
          {text(homeNotes.watch, locale)}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
