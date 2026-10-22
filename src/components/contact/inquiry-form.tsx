"use client";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  contactSchema,
  serviceIds,
  type ContactInput,
} from "@/lib/contact-schema";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { text } from "@/lib/localize";
import { ContactDetails } from "./contact-details";
import { InquiryTemplates } from "./inquiry-templates";
import "./inquiry-templates.css";
export function InquiryForm({ initialService }: { initialService?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("form");
  const common = useTranslations("common");
  const [status, setStatus] = useState("");
  const requestId = useRef<string | null>(null);
  const busy = useRef(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: serviceIds.find((s) => s === initialService) || "business",
      budget: "discuss",
      timeline: "discuss",
      description: "",
      locale,
      consent: false,
      website: "",
      requestId: "00000000-0000-4000-8000-000000000000",
    },
  });
  const description = useWatch({ control, name: "description" });
  const error = (key: keyof ContactInput) =>
    errors[key] ? (
      <span role="alert" className="field-error" id={`${key}-error`}>
        {t(
          [
            "invalidEmail",
            "invalidPhone",
            "descriptionError",
            "consentError",
          ].includes(errors[key]?.message || "")
            ? errors[key]!.message!
            : "required",
        )}
      </span>
    ) : null;
  async function submit(data: ContactInput) {
    if (busy.current) return;
    busy.current = true;
    setStatus("");
    requestId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, requestId: requestId.current }),
        signal: AbortSignal.timeout(20000),
      });
      const result = (await response.json()) as { code: string };
      setStatus(
        response.ok && result.code === "success"
          ? "success"
          : ["unavailable", "rate"].includes(result.code)
            ? result.code
            : "error",
      );
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }
  if (status === "success")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={36} />
        <h2>{t("success")}</h2>
      </div>
    );
  return (
    <form
      className="inquiry-form"
      onSubmit={(event) => void handleSubmit(submit)(event)}
      noValidate
    >
      <span className="eyebrow">{t("step")}</span>
      <p>{t("detail")}</p>
      <div className="form-grid">
        <ContactDetails register={register} errors={errors} error={error} />
        <div className="form-field full">
          <label htmlFor="service">{t("service")} *</label>
          <select id="service" {...register("service")}>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {text(service.title, locale)}
              </option>
            ))}
          </select>
          {error("service")}
        </div>
        <div className="form-field">
          <label htmlFor="budget">{t("budget")}</label>
          <select id="budget" {...register("budget")}>
            {["discuss", "short", "medium", "large"].map((v) => (
              <option value={v} key={v}>
                {t(v === "discuss" ? "unsure" : v)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="timeline">{t("timeline")}</label>
          <select id="timeline" {...register("timeline")}>
            {["discuss", "soon", "quarter", "flexible"].map((v) => (
              <option value={v} key={v}>
                {t(v === "discuss" ? "unsure" : v)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field full inquiry-brief">
          <label htmlFor="description">{t("description")} *</label>
          <InquiryTemplates
            hasBrief={!!description.trim()}
            onApply={(service, brief) => {
              setValue("service", service, { shouldDirty: true });
              setValue("description", brief, {
                shouldDirty: true,
                shouldValidate: true,
              });
              setFocus("description");
            }}
          />
          <textarea
            id="description"
            rows={5}
            placeholder={t("descriptionPlaceholder")}
            {...register("description")}
            aria-invalid={!!errors.description}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
          {error("description")}
        </div>
        <div className="form-field full">
          <label htmlFor="language">{t("language")}</label>
          <select
            id="language"
            {...register("locale")}
            onChange={(e) => setValue("locale", e.target.value as Locale)}
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="sw">Kiswahili</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">
            Website
            <input
              id="website"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </label>
        </div>
        <div className="full">
          <label className="consent-label">
            <input
              type="checkbox"
              {...register("consent")}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>{t("consent")} *</span>
          </label>
          {error("consent")}
          <p className="privacy-note">{t("privacy")}</p>
        </div>
      </div>
      {status && (
        <p className="form-status" role="alert">
          {t(status)}
        </p>
      )}
      <button className="button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("sending") : common("send")}
        <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
