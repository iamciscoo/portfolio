"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";

const links = [
  ["about", "/about"],
  ["projects", "/projects"],
  ["studio", "/studio"],
  ["journey", "/journey"],
  ["services", "/services"],
] as const;
export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  function toggleTheme() {
    const next =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("cisco-theme", next);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }
  return (
    <>
      <a href="#main" className="skip-link">
        {t("skip")}
      </a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Cisco — Home">
          cisco<span>*</span>
        </Link>
        <nav className="desktop-nav" aria-label={t("menu")}>
          {links.map(([key, url]) => (
            <Link
              key={key}
              href={url}
              aria-current={pathname.startsWith(url) ? "page" : undefined}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LocaleSwitcher />
          <button
            className="icon-button theme-button"
            aria-label={t("theme")}
            onClick={toggleTheme}
          >
            <Moon size={17} className="moon-icon" />
            <Sun size={17} className="sun-icon" />
          </button>
          <Link href="/contact" className="button small header-cta">
            {t("cta")}
            <ArrowUpRight size={16} />
          </Link>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="icon-button mobile-menu"
                aria-label={t("menu")}
              >
                <Menu />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="mobile-panel">
                <Dialog.Title className="sr-only">{t("menu")}</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Cisco portfolio
                </Dialog.Description>
                <Dialog.Close
                  className="icon-button menu-close"
                  aria-label={t("close")}
                >
                  <X />
                </Dialog.Close>
                <nav>
                  {[["home", "/"], ...links, ["contact", "/contact"]].map(
                    ([key, url]) => (
                      <Link href={url} key={key} onClick={() => setOpen(false)}>
                        {t(key)}
                        <ArrowUpRight size={20} />
                      </Link>
                    ),
                  )}
                </nav>
                <div className="mobile-languages">
                  <LocaleSwitcher expanded onSwitch={() => setOpen(false)} />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
    </>
  );
}
