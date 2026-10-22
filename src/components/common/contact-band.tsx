import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { profile } from "@/content/profile";
export async function ContactBand() {
  const t = await getTranslations();
  return (
    <section
      className="contact-band personal-contact wrap"
      data-sc-act="contact"
    >
      <div className="contact-person">
        <Image
          src={profile.photos.headshot.src}
          alt={profile.shortName}
          width={128}
          height={128}
          sizes="64px"
        />
        <p>
          Francis Mwambene<small>{t("footer.based")}</small>
        </p>
      </div>
      <span className="eyebrow">{t("home.contactLabel")}</span>
      <div>
        <h2 data-sc-cue>{t("home.contactTitle")}</h2>
        <Link
          href="/contact"
          className="round-link"
          aria-label={t("common.start")}
        >
          <ArrowUpRight />
        </Link>
      </div>
      <p>{t("home.contactBody")}</p>
    </section>
  );
}
