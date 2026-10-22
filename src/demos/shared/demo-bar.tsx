import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { showcase } from "@/content/showcase";
import { text } from "@/lib/localize";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
export async function DemoBar() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  return (
    <>
      <a href="#demo-main" className="skip-link">
        {t("nav.skip")}
      </a>
      <div className="demo-bar">
        <Link href="/studio">
          <ArrowLeft size={14} />
          {t("demo.back")}
        </Link>
        <span>{t("demo.label")}</span>
        <div>
          <LocaleSwitcher />
          <Link href="/contact?service=business">
            {text(showcase.build, locale)}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
