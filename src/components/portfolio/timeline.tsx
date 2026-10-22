"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { milestones } from "@/content/experience";
import { text } from "@/lib/localize";
import type { Locale } from "@/i18n/routing";
export function Timeline() {
  const [filter, setFilter] = useState("all");
  const locale = useLocale() as Locale;
  const t = useTranslations("about");
  return (
    <>
      <div
        className="timeline-controls"
        role="group"
        aria-label={t("allMilestones")}
      >
        {[
          ["all", "allMilestones"],
          ["experience", "experience"],
          ["education", "education"],
        ].map(([value, key]) => (
          <button
            key={value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {t(key)}
          </button>
        ))}
      </div>
      <div className="timeline" aria-live="polite">
        {milestones
          .filter((m) => filter === "all" || m.type === filter)
          .map((m) => (
            <article className="timeline-entry" key={m.id}>
              <time>{text(m.date, locale)}</time>
              <div>
                <h2>{text(m.title, locale)}</h2>
                <h3>{text(m.place, locale)}</h3>
                <p>{text(m.body, locale)}</p>
              </div>
            </article>
          ))}
      </div>
    </>
  );
}
