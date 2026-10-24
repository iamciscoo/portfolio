"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { DesktopNav, portfolioLinks } from "./desktop-nav";
import { motion, useScroll, useSpring } from "motion/react";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });
  const [open, setOpen] = useState(false);
  const liftAfterClose = useRef(false);
  // Same-route links have nowhere to navigate; use them as a lift-to-top gesture.
  function returnToTop(event: MouseEvent, url: string) {
    if (pathname !== url) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  // The panel's scroll lock is released after this handler runs, so the lift
  // waits for the close commit instead of being overridden by it.
  useEffect(() => {
    if (open || !liftAfterClose.current) return;
    liftAfterClose.current = false;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [open]);
  function handlePanelLink(event: MouseEvent, url: string) {
    if (pathname === url) {
      event.preventDefault();
      liftAfterClose.current = true;
    }
    setOpen(false);
  }
  function toggleTheme() {
    const next =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.themeTransition = "true";
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
        <Link
          className="wordmark"
          href="/"
          aria-label="Cisco - Home"
          onClick={(event) => returnToTop(event, "/")}
        >
          cisco<span>*</span>
        </Link>
        <DesktopNav />
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
                  {[
                    ["home", "/"],
                    ...portfolioLinks,
                    ["contact", "/contact"],
                  ].map(([key, url]) => (
                    <Link
                      href={url}
                      key={key}
                      onClick={(event) => handlePanelLink(event, url)}
                    >
                      {t(key)}
                      <ArrowUpRight size={20} />
                    </Link>
                  ))}
                </nav>
                <div className="mobile-languages">
                  <LocaleSwitcher expanded onSwitch={() => setOpen(false)} />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <motion.div
          className="reading-progress"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </header>
    </>
  );
}
