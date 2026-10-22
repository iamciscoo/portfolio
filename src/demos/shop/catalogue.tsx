"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingBag, Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { text } from "@/lib/localize";
import { products, shop as c } from "./content";

export function ShopCatalogue({ locale }: { locale: Locale }) {
  const t = useTranslations("demo");
  const [filter, setFilter] = useState("all");
  const [bag, setBag] = useState<Record<string, number>>({});
  const [added, setAdded] = useState("");
  const categories = [
    ...new Set(products.map((p) => text(p.category, locale))),
  ];
  const count = Object.values(bag).reduce((sum, n) => sum + n, 0);
  const money = (price: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "TZS",
      maximumFractionDigits: 0,
    }).format(price);
  function update(id: string, quantity: number) {
    setBag((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(10, quantity)),
    }));
  }
  return (
    <section id="collection" className="pace-catalogue demo-wrap">
      <div className="pace-heading">
        <h2>{text(c.collection, locale)}</h2>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="demo-button pace-bag">
              <ShoppingBag size={18} />
              {text(c.bag, locale)} ({count})
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="dialog-content pace-bag-dialog">
              <Dialog.Title>
                {text(c.bag, locale)} ({count})
              </Dialog.Title>
              <Dialog.Description>{text(c.note, locale)}</Dialog.Description>
              <Dialog.Close
                className="icon-button dialog-close"
                aria-label={t("close")}
              >
                <X />
              </Dialog.Close>
              {count === 0 ? (
                <p className="pace-empty">{text(c.empty, locale)}</p>
              ) : (
                <>
                  <ul>
                    {products
                      .filter((p) => bag[p.id] > 0)
                      .map((p) => (
                        <li key={p.id}>
                          <div>
                            <strong>{text(p.name, locale)}</strong>
                            <p>{money(p.price)}</p>
                          </div>
                          <label>
                            {text(c.quantity, locale)}
                            <select
                              aria-label={`${text(c.quantity, locale)}: ${text(p.name, locale)}`}
                              value={bag[p.id]}
                              onChange={(e) =>
                                update(p.id, Number(e.target.value))
                              }
                            >
                              {Array.from({ length: 10 }, (_, i) => (
                                <option key={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                          </label>
                          <button
                            className="pace-remove"
                            aria-label={`${text(c.remove, locale)}: ${text(p.name, locale)}`}
                            onClick={() => update(p.id, 0)}
                          >
                            {text(c.remove, locale)}
                          </button>
                        </li>
                      ))}
                  </ul>
                  <p className="pace-total">
                    {text(c.total, locale)}
                    <strong>
                      {money(
                        products.reduce(
                          (sum, p) => sum + p.price * (bag[p.id] || 0),
                          0,
                        ),
                      )}
                    </strong>
                  </p>
                </>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
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
      <div className="pace-products">
        {products
          .filter(
            (p) => filter === "all" || text(p.category, locale) === filter,
          )
          .map((p) => (
            <article key={p.id}>
              <div>
                <h3>{text(p.name, locale)}</h3>
                <p>{text(p.description, locale)}</p>
              </div>
              <span>{money(p.price)}</span>
              <button
                className="demo-button"
                aria-label={`${text(c.add, locale)}: ${text(p.name, locale)}`}
                disabled={(bag[p.id] || 0) >= 10}
                onClick={() => {
                  setBag((current) => ({
                    ...current,
                    [p.id]: Math.min(10, (current[p.id] || 0) + 1),
                  }));
                  setAdded(text(p.name, locale));
                }}
              >
                <Plus size={16} />
                {text(c.add, locale)}
              </button>
            </article>
          ))}
      </div>
      <p className="pace-added" role="status">
        {added && `${added} · ${text(c.bag, locale)} (${count})`}
      </p>
      <p className="pace-note">{text(c.note, locale)}</p>
    </section>
  );
}
