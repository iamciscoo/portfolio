import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { profile } from "@/content/profile";
export async function Footer() {
  const t = await getTranslations();
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <div>
          <Link href="/" className="wordmark">
            cisco<span>*</span>
          </Link>
          <p>{t("footer.tagline")}</p>
          <p className="muted">{t("footer.based")}</p>
        </div>
        <div className="footer-nav">
          {[
            "about",
            "projects",
            "studio",
            "journey",
            "services",
            "contact",
          ].map((key) => (
            <Link key={key} href={`/${key}`}>
              {t(`nav.${key}`)}
            </Link>
          ))}
        </div>
        <div className="footer-social">
          <span className="eyebrow">{t("footer.social")}</span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
            <ArrowUpRight size={14} />
          </a>
          {profile.instagram.map((url, i) => (
            <a key={url} href={url} target="_blank" rel="noreferrer">
              {i === 0 ? "just.cisco" : "i.amcisco"}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Francis Mwambene</span>
        <span>{t("footer.rights")}</span>
        <a href="#top">{t("common.top")} ↑</a>
      </div>
    </footer>
  );
}
