import { z } from "zod";
export const serviceIds = [
  "business",
  "personal",
  "application",
  "marketplace",
  "redesign",
  "integration",
  "consultation",
  "windows",
  "software",
  "gaming",
] as const;
const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine(
      (value) => !/[\r\n\x00-\x08\x0b\x0c\x0e-\x1f]/.test(value),
      "required",
    );
export const contactSchema = z
  .object({
    name: singleLine(100).pipe(z.string().min(2, "required")),
    email: z.email("invalidEmail").max(254),
    company: singleLine(150).optional(),
    phone: z
      .string()
      .trim()
      .max(40, "invalidPhone")
      .refine(
        (value) =>
          value === "" ||
          (/^\+?[0-9 ().-]+$/.test(value) &&
            value.replace(/\D/g, "").length >= 7 &&
            value.replace(/\D/g, "").length <= 15),
        "invalidPhone",
      )
      .optional(),
    service: z.enum(serviceIds),
    budget: z.enum(["discuss", "short", "medium", "large"]).optional(),
    timeline: z.enum(["discuss", "soon", "quarter", "flexible"]).optional(),
    description: z
      .string()
      .trim()
      .min(30, "descriptionError")
      .max(5000, "descriptionError"),
    locale: z.enum(["en", "ru", "sw"]),
    consent: z.boolean().refine((value) => value, "consentError"),
    website: z.string().max(0),
    requestId: z.uuid(),
  })
  .strict();
export type ContactInput = z.infer<typeof contactSchema>;
