"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { inquiryPresets } from "@/content/inquiry-presets";
import type { Locale } from "@/i18n/routing";
import type { ContactInput } from "@/lib/contact-schema";
import { text } from "@/lib/localize";

export function InquiryTemplates({
  onApply,
  hasBrief,
}: {
  onApply: (service: ContactInput["service"], brief: string) => void;
  hasBrief: boolean;
}) {
  const [selected, setSelected] = useState("");
  const locale = useLocale() as Locale;
  const t = useTranslations("form");
  const preset = inquiryPresets.find((item) => item.id === selected);
  return (
    <div className="inquiry-templates">
      <div className="template-picker">
        <label htmlFor="inquiry-template">{t("templateLabel")}</label>
        <p id="template-help" className="sr-only">
          {t("templateHelp")}
        </p>
        <select
          id="inquiry-template"
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
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
      {preset && (
        <div className="template-preview">
          <p>{text(preset.brief, locale)}</p>
          <button
            className="text-link"
            type="button"
            onClick={() => onApply(preset.service, text(preset.brief, locale))}
          >
            {t(hasBrief ? "replaceBrief" : "useTemplate")}
            <ArrowDown size={15} />
          </button>
          <small>{t("templateNotice")}</small>
        </div>
      )}
    </div>
  );
}
