import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
export async function ContactBand() {
  const t = await getTranslations();
  return (
    <section className="contact-band wrap">
      <span className="eyebrow">{t("home.contactLabel")}</span>
      <div>
        <h2>{t("home.contactTitle")}</h2>
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
