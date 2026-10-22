"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { text } from "@/lib/localize";
import { DemoInquiry } from "../shared/demo-inquiry";
import { tours as c, trips } from "./content";
export function TourJourneys({ locale }: { locale: Locale }) {
  const t = useTranslations("demo");
  const [filter, setFilter] = useState("all");
  const categories = [
    ...new Set(trips.map((trip) => text(trip.category, locale))),
  ];
  return (
    <section className="safiri-journeys demo-wrap" id="journeys">
      <span className="demo-label">{text(c.explore, locale)}</span>
      <h2>{text(c.journeys, locale)}</h2>
      <div className="collection-filters" role="group" aria-label={t("filter")}>
        {["all", ...categories].map((category) => (
          <button
            key={category}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category === "all" ? t("all") : category}
          </button>
        ))}
      </div>
      <div className="safiri-trips">
        {trips
          .filter(
            (trip) =>
              filter === "all" || text(trip.category, locale) === filter,
          )
          .map((trip) => (
            <article key={trip.id}>
              <div className="safiri-duration">
                <strong>{trip.days}</strong>
                <span>{text(c.days, locale)}</span>
              </div>
              <div>
                <span className="demo-label">
                  {text(trip.category, locale)}
                </span>
                <h3>{text(trip.title, locale)}</h3>
                <p>{text(trip.body, locale)}</p>
                <details>
                  <summary>
                    {text(c.itinerary, locale)}
                    <Plus size={18} />
                  </summary>
                  <p>{text(trip.itinerary, locale)}</p>
                </details>
              </div>
              <DemoInquiry
                kind="book"
                label={text(c.plan, locale)}
                initialMessage={text(trip.title, locale)}
              />
            </article>
          ))}
      </div>
    </section>
  );
}
