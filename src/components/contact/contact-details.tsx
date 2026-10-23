import { useTranslations } from "next-intl";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ReactNode } from "react";
import type { ContactInput } from "@/lib/contact-schema";

export function ContactDetails({
  register,
  errors,
  error,
}: {
  register: UseFormRegister<ContactInput>;
  errors: FieldErrors<ContactInput>;
  error: (key: keyof ContactInput) => ReactNode;
}) {
  const t = useTranslations("form");
  const common = useTranslations("common");
  return (
    <>
      <div className="form-field">
        <label htmlFor="name">{t("name")} *</label>
        <input
          id="name"
          autoComplete="name"
          maxLength={100}
          placeholder={t("namePlaceholder")}
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {error("name")}
      </div>
      <div className="form-field">
        <label htmlFor="email">{common("email")} *</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder="you@company.com"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {error("email")}
      </div>
      <div className="form-field">
        <label htmlFor="phone">
          {t("phone")} <span>({common("optional")})</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          maxLength={40}
          placeholder={t("phonePlaceholder")}
          {...register("phone")}
          aria-invalid={!!errors.phone}
          aria-describedby={
            errors.phone ? "phone-help phone-error" : "phone-help"
          }
        />
        <small id="phone-help" className="sr-only">
          {t("phoneHelp")}
        </small>
        {error("phone")}
      </div>
    </>
  );
}
