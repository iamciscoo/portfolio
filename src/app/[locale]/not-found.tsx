import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
export default async function NotFound() {
  const t = await getTranslations();
  return (
    <main className="wrap error-shell">
      <span className="eyebrow">404 / CISCO</span>
      <h1>{t("pages.notFound")}</h1>
      <p>{t("pages.notFoundBody")}</p>
      <Link href="/" className="button primary">
        {t("nav.home")} ↗
      </Link>
    </main>
  );
}
