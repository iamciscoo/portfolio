"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
export function ProjectFilter({
  items,
}: {
  items: { id: string; category: string; content: React.ReactNode }[];
}) {
  const [filter, setFilter] = useState("all");
  const t = useTranslations();
  return (
    <>
      <div
        className="filter-controls"
        role="group"
        aria-label={t("common.filter")}
      >
        {["all", "marketplace", "business"].map((value) => (
          <button
            key={value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {value === "all" ? t("common.all") : t(`projects.${value}`)}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {items
          .filter((item) => filter === "all" || item.category === filter)
          .map((item) => (
            <div key={item.id}>{item.content}</div>
          ))}
      </div>
    </>
  );
}
