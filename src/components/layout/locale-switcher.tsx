"use client";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import * as Menu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { LanguageFlag } from "./language-flag";

const languages = [
  { locale: "en", name: "English", code: "EN" },
  { locale: "ru", name: "Русский", code: "RU" },
  { locale: "sw", name: "Kiswahili", code: "SW" },
] as const;

export function LocaleSwitcher({
  expanded = false,
  onSwitch,
}: {
  expanded?: boolean;
  onSwitch?: () => void;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");
  const [pending, startTransition] = useTransition();
  const current = languages.find((language) => language.locale === locale)!;
  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        className={`locale-trigger${expanded ? " expanded" : ""}`}
        aria-label={t("language")}
        disabled={pending}
      >
        <LanguageFlag locale={locale} />
        <span>{expanded ? current.name : current.code}</span>
        <ChevronDown size={13} aria-hidden="true" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          className="locale-menu"
          sideOffset={8}
          align="end"
          collisionPadding={12}
        >
          <Menu.Label className="locale-menu-label">{t("language")}</Menu.Label>
          <Menu.RadioGroup
            value={locale}
            onValueChange={(value) => {
              if (value === locale) return;
              startTransition(() => {
                router.replace(
                  `${pathname}${window.location.search}${window.location.hash}`,
                  { locale: value as Locale },
                );
                onSwitch?.();
              });
            }}
          >
            {languages.map((language) => (
              <Menu.RadioItem
                className="locale-option"
                key={language.locale}
                value={language.locale}
                aria-label={language.name}
              >
                <LanguageFlag locale={language.locale} />
                <span lang={language.locale}>{language.name}</span>
                <small>{language.code}</small>
                <Menu.ItemIndicator>
                  <Check size={15} aria-hidden="true" />
                </Menu.ItemIndicator>
              </Menu.RadioItem>
            ))}
          </Menu.RadioGroup>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
