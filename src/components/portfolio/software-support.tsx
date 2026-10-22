import { ArrowUpRight, MonitorCog, Gamepad2, AppWindow } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { homeNotes } from "@/content/home-notes";
import { services } from "@/content/services";
import { text } from "@/lib/localize";
import type { Locale } from "@/i18n/routing";

const softwareOptions = [
  { id: "windows", icon: MonitorCog },
  { id: "software", icon: AppWindow },
  { id: "gaming", icon: Gamepad2 },
] as const;

export function SoftwareSupport({ locale }: { locale: Locale }) {
  return (
    <section className="software-support wrap" data-sc-act="software-support">
      <div>
        <span className="personal-kicker">
          {text(homeNotes.supportLabel, locale)}
        </span>
        <h2>{text(homeNotes.supportTitle, locale)}</h2>
        <p>{text(homeNotes.supportBody, locale)}</p>
      </div>
      <div className="software-options">
        {softwareOptions.map(({ id, icon: Icon }) => {
          const service = services.find((item) => item.id === id)!;
          return (
            <Link href={`/contact?service=${id}`} key={id}>
              <Icon size={23} aria-hidden="true" />
              <span>{text(service.title, locale)}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
