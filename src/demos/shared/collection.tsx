"use client";
import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
export type CollectionItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  detail?: string;
};
export function Collection({
  items,
  mode = "project",
}: {
  items: CollectionItem[];
  mode?: "project" | "fashion" | "article";
}) {
  const [filter, setFilter] = useState("all");
  const t = useTranslations("demo");
  const categories = [...new Set(items.map((item) => item.category))];
  return (
    <>
      <div className="collection-filters" role="group" aria-label={t("filter")}>
        <button
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          {t("all")}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={`collection-grid collection-${mode}`} aria-live="polite">
        {items
          .filter((item) => filter === "all" || item.category === filter)
          .map((item) => (
            <Dialog.Root key={item.id}>
              <article className="collection-item">
                <Dialog.Trigger asChild>
                  <button
                    className="collection-open"
                    aria-label={`${mode === "article" ? t("read") : t("details")}: ${item.title}`}
                  >
                    <div className="collection-photo">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 650px) 90vw, 45vw"
                      />
                      <span>
                        <ArrowUpRight size={22} />
                      </span>
                    </div>
                    <div className="collection-caption">
                      <span>{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </button>
                </Dialog.Trigger>
              </article>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content collection-dialog">
                  <Dialog.Close
                    className="icon-button dialog-close"
                    aria-label={t("close")}
                  >
                    <X />
                  </Dialog.Close>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={850}
                    sizes="90vw"
                  />
                  <Dialog.Title>{item.title}</Dialog.Title>
                  <Dialog.Description>{item.description}</Dialog.Description>
                  {item.detail && <p>{item.detail}</p>}
                  <p className="concept-detail">{t("label")}</p>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
      </div>
    </>
  );
}
