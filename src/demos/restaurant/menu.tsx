"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { text } from "@/lib/localize";
import { menu } from "./content";
export function RestaurantMenu() {
  const [active, setActive] = useState("starters");
  const locale = useLocale() as Locale;
  const t = useTranslations("demo");
  const selected = menu.find((m) => m.id === active)!;
  return (
    <>
      <div className="menu-tabs" role="group" aria-label={t("menu")}>
        {menu.map((category) => (
          <button
            key={category.id}
            aria-pressed={active === category.id}
            onClick={() => setActive(category.id)}
          >
            {text(category.title, locale)}
          </button>
        ))}
      </div>
      <div className="dish-list" aria-live="polite">
        {selected.dishes.map((dish, i) => (
          <article key={dish.name.en}>
            <span className="dish-index">0{i + 1}</span>
            <div>
              <h3>{text(dish.name, locale)}</h3>
              <p>{text(dish.description, locale)}</p>
            </div>
            <span className="dish-price">{dish.price}</span>
          </article>
        ))}
      </div>
    </>
  );
}
