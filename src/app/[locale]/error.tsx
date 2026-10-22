"use client";
import { useTranslations } from "next-intl";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations();
  return (
    <main className="wrap error-shell">
      <span className="eyebrow">CISCO</span>
      <h1>{t("pages.notFound")}</h1>
      <p>{t("form.error")}</p>
      <button className="button" onClick={reset}>
        {t("common.back")}
      </button>
    </main>
  );
}
