"use client";
import { useLocale, useTranslations } from "next-intl";
import { inquiryPresets } from "@/content/inquiry-presets";
import type { Locale } from "@/i18n/routing";
import type { ContactInput } from "@/lib/contact-schema";
import { text } from "@/lib/localize";

export function InquiryTemplates({
  onSelect,
}: {
  onSelect: (service: ContactInput["service"], brief: string) => void;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("form");
  return (
    <div className="inquiry-templates">
      <div className="template-picker">
        <label htmlFor="inquiry-template">{t("templateLabel")}</label>
        <p id="template-help" className="sr-only">
          {t("templateHelp")}
        </p>
        <select
          id="inquiry-template"
          defaultValue=""
          onChange={(event) => {
            const preset = inquiryPresets.find(
              (item) => item.id === event.target.value,
            );
            if (preset) onSelect(preset.service, text(preset.brief, locale));
          }}
          aria-describedby="template-help"
        >
          <option value="">{t("templateChoose")}</option>
          {inquiryPresets.map((item) => (
            <option key={item.id} value={item.id}>
              {text(item.label, locale)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
