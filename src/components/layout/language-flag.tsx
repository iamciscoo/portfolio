import { useId } from "react";
import type { Locale } from "@/i18n/routing";

export function LanguageFlag({ locale }: { locale: Locale }) {
  const id = useId();
  return (
    <svg
      className="language-flag"
      viewBox="0 0 30 20"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={id}>
          <rect width="30" height="20" rx="2" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        {locale === "en" ? (
          <>
            <path fill="#16336f" d="M0 0h30v20H0z" />
            <path stroke="#fff" strokeWidth="5" d="m0 0 30 20M30 0 0 20" />
            <path stroke="#c9233e" strokeWidth="2" d="m0 0 30 20M30 0 0 20" />
            <path stroke="#fff" strokeWidth="7" d="M15 0v20M0 10h30" />
            <path stroke="#c9233e" strokeWidth="4" d="M15 0v20M0 10h30" />
          </>
        ) : locale === "ru" ? (
          <>
            <path fill="#fff" d="M0 0h30v20H0z" />
            <path fill="#1948a3" d="M0 6.67h30v6.67H0z" />
            <path fill="#d52c32" d="M0 13.33h30V20H0z" />
          </>
        ) : locale === "fr" ? (
          <>
            <path fill="#fff" d="M0 0h30v20H0z" />
            <path fill="#153c91" d="M0 0h10v20H0z" />
            <path fill="#e53b43" d="M20 0h10v20H20z" />
          </>
        ) : locale === "es" ? (
          <>
            <path fill="#b51e35" d="M0 0h30v20H0z" />
            <path fill="#ffcf43" d="M0 5h30v10H0z" />
            <path fill="#b51e35" d="M8 8h3v5H8z" />
          </>
        ) : (
          <>
            <path fill="#22a95c" d="M0 0h30v20H0z" />
            <path fill="#159acb" d="M0 20 30 0v20z" />
            <path stroke="#f7d633" strokeWidth="10" d="M-3 22 33-2" />
            <path stroke="#151515" strokeWidth="6" d="M-3 22 33-2" />
          </>
        )}
      </g>
    </svg>
  );
}
