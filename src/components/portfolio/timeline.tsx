"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { milestones } from "@/content/experience";
import { text } from "@/lib/localize";
import type { Locale } from "@/i18n/routing";
export function Timeline() {
  const [filter, setFilter] = useState("all");
  const locale = useLocale() as Locale;
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 65%"],
  });
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
      <div
        className="timeline"
        ref={ref}
        aria-live="polite"
        data-sc-act="timeline"
      >
        <motion.div
          className="timeline-progress"
          aria-hidden="true"
          style={{ scaleY: scrollYProgress }}
        />
        {milestones
          .filter((m) => filter === "all" || m.type === filter)
          .map((m) => (
            <motion.article
              initial={false}
              whileInView={reduced ? {} : { opacity: [0.8, 1], y: [12, 0] }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="timeline-entry"
              key={m.id}
            >
              <time>{text(m.date, locale)}</time>
              <div>
                <h2>{text(m.title, locale)}</h2>
                <h3>{text(m.place, locale)}</h3>
                <p>{text(m.body, locale)}</p>
              </div>
            </motion.article>
          ))}
      </div>
    </>
  );
}
