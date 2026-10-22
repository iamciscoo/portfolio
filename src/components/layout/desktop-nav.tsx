"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export const portfolioLinks = [
  ["about", "/about"],
  ["projects", "/projects"],
  ["studio", "/studio"],
  ["journey", "/journey"],
  ["services", "/services"],
] as const;

export function DesktopNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const current = portfolioLinks.find(([, url]) =>
    pathname.startsWith(url),
  )?.[0];
  return (
    <nav
      className="desktop-nav"
      aria-label={t("menu")}
      onPointerLeave={() => setHovered(null)}
    >
      {portfolioLinks.map(([key, url]) => (
        <Link
          key={key}
          href={url}
          aria-current={current === key ? "page" : undefined}
          onPointerEnter={() => setHovered(key)}
          onFocus={() => setHovered(key)}
          onBlur={() => setHovered(null)}
        >
          {(hovered ?? current) === key && (
            <motion.span
              className="nav-hover-pill"
              layoutId="navigation-pill"
              initial={false}
              transition={{ type: "spring", stiffness: 440, damping: 38 }}
              aria-hidden="true"
            />
          )}
          <span className="nav-label">{t(key)}</span>
          <ArrowUpRight className="nav-arrow" size={12} aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}
