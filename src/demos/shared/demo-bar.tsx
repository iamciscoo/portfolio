import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
export async function DemoBar() {
  const t = await getTranslations();
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
          <Link href="/contact">
            {t("common.start")}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
