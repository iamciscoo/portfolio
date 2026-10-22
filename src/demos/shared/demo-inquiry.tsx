"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { X, ArrowUpRight, Check } from "lucide-react";
import { z } from "zod";
const base = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  message: z.string().max(2000),
  date: z.iso.date(),
  time: z.enum([
    "09:00",
    "11:00",
    "14:00",
    "16:00",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
  ]),
});
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function DemoInquiry({
  kind,
  label,
  className = "demo-button",
  initialMessage = "",
}: {
  kind: "reserve" | "book" | "quote" | "consult";
  label?: string;
  className?: string;
  initialMessage?: string;
}) {
  const t = useTranslations("demo");
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string[]>([]);
  function changeOpen(value: boolean) {
    setOpen(value);
    if (!value) {
      setDone(false);
      setError("");
      setPreview([]);
    }
  }
  function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form);
    if (
      !base.safeParse(values).success ||
      (kind === "reserve" &&
        !z
          .enum(["1", "2", "3", "4", "5", "6", "7", "8"])
          .safeParse(values.guests).success)
    ) {
      setError(t("required"));
      return;
    }
    const date = String(form.get("date") || "");
    if (date && date < today()) {
      setError(t("pastDate"));
      return;
    }
    setPreview(
      [
        String(form.get("name")),
        date,
        String(form.get("time") || ""),
        kind === "reserve" ? `${form.get("guests")} · ${t("guests")}` : "",
      ].filter(Boolean),
    );
    setDone(true);
    setError("");
  }
  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Trigger asChild>
        <button className={className}>
          {label || t(kind)}
          <ArrowUpRight size={17} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content demo-form-dialog">
          <Dialog.Close
            className="icon-button dialog-close"
            aria-label={t("close")}
          >
            <X />
          </Dialog.Close>
          <Dialog.Title>{t(kind)}</Dialog.Title>
          <Dialog.Description className="dialog-description">
            {t("notice")}
          </Dialog.Description>
          {done ? (
            <div className="demo-success" role="status">
              <Check size={30} />
              <h3>{t("preview")}</h3>
              <p>{preview.join(" / ")}</p>
              <p>{t("success")}</p>
              <Dialog.Close className="button primary">
                {t("close")}
              </Dialog.Close>
            </div>
          ) : (
            <form onSubmit={submit} className="demo-form" noValidate>
              <label>
                {t("name")} *
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                />
              </label>
              <label>
                {t("email")} *
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                />
              </label>
              <div className="demo-form-pair">
                <label>
                  {t("date")} *
                  <input name="date" type="date" min={today()} required />
                </label>
                {kind === "reserve" ? (
                  <label>
                    {t("time")}
                    <select name="time">
                      <option>18:00</option>
                      <option>18:30</option>
                      <option>19:00</option>
                      <option>19:30</option>
                      <option>20:00</option>
                      <option>20:30</option>
                    </select>
                  </label>
                ) : (
                  <label>
                    {t("time")}
                    <select name="time">
                      <option>09:00</option>
                      <option>11:00</option>
                      <option>14:00</option>
                      <option>16:00</option>
                    </select>
                  </label>
                )}
              </div>
              {kind === "reserve" && (
                <label>
                  {t("guests")}
                  <select name="guests">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
              )}
              <label>
                {t("message")}
                <textarea
                  name="message"
                  rows={3}
                  maxLength={2000}
                  defaultValue={initialMessage}
                />
              </label>
              {error && (
                <p role="alert" className="field-error">
                  {error}
                </p>
              )}
              <button type="submit" className="button primary">
                {t("submit")}
                <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
