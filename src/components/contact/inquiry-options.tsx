import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormRegister } from "react-hook-form";
import type { ContactInput } from "@/lib/contact-schema";

export function InquiryOptions({
  register,
}: {
  register: UseFormRegister<ContactInput>;
}) {
  const t = useTranslations("form");
  return (
    <details className="inquiry-options full">
      <summary>
        {t("optionalDetails")} <ChevronDown size={18} aria-hidden="true" />
      </summary>
      <div className="form-grid">
        <div className="form-field full">
          <label htmlFor="company">{t("company")}</label>
          <input
            id="company"
            autoComplete="organization"
            maxLength={150}
            {...register("company")}
          />
        </div>
        <div className="form-field">
          <label htmlFor="budget">{t("budget")}</label>
          <select id="budget" {...register("budget")}>
            {["discuss", "short", "medium", "large"].map((v) => (
              <option value={v} key={v}>
                {t(v === "discuss" ? "unsure" : v)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="timeline">{t("timeline")}</label>
          <select id="timeline" {...register("timeline")}>
            {["discuss", "soon", "quarter", "flexible"].map((v) => (
              <option value={v} key={v}>
                {t(v === "discuss" ? "unsure" : v)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field full">
          <label htmlFor="language">{t("language")}</label>
          <select id="language" {...register("locale")}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="sw">Kiswahili</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </details>
  );
}
