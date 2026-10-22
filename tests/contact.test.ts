import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/contact-schema";
import { escapeHtml, inquiryEmail, inquiryText } from "@/lib/inquiry-email";
import { services } from "@/content/services";
import { serviceIds } from "@/lib/contact-schema";
import { inquiryPresets } from "@/content/inquiry-presets";
export const validInquiry = {
  name: "A Client",
  email: "client@example.com",
  company: "Example",
  service: "business",
  budget: "discuss",
  timeline: "flexible",
  description:
    "A business website that explains our services and supports inquiries.",
  locale: "en",
  consent: true,
  website: "",
  requestId: "05a8fb59-89ef-4987-afd0-604a5d642dd9",
} as const;
describe("inquiry boundary", () => {
  it.each([
    undefined,
    "",
    "+255 712 345 678",
    "+7 (900) 123-45-67",
    "0712345678",
  ])("accepts optional or formatted phone %s", (phone) => {
    expect(contactSchema.safeParse({ ...validInquiry, phone }).success).toBe(
      true,
    );
  });
  it.each([
    "123",
    "call me",
    "+255\r\nBcc: target@example.com",
    "1".repeat(16),
    "<script>123456789</script>",
    "+".repeat(50),
  ])("rejects malformed phone %s", (phone) => {
    expect(contactSchema.safeParse({ ...validInquiry, phone }).success).toBe(
      false,
    );
  });
  it("includes phone in both email formats only when supplied", () => {
    const input = {
      ...validInquiry,
      phone: "+255 712 345 678",
      service: "windows" as const,
    };
    expect(inquiryEmail(input)).toContain(input.phone);
    expect(inquiryText(input)).toContain(`Phone: ${input.phone}`);
    expect(inquiryText(input)).toContain("Windows installation");
    expect(inquiryText(validInquiry)).not.toContain("Phone:");
  });
  it("keeps all service choices and localized brief templates valid", () => {
    expect(services.map((service) => service.id).sort()).toEqual(
      [...serviceIds].sort(),
    );
    for (const preset of inquiryPresets)
      for (const locale of ["en", "ru", "sw"] as const) {
        expect(
          contactSchema.safeParse({
            ...validInquiry,
            service: preset.service,
            description: preset.brief[locale],
            locale,
          }).success,
        ).toBe(true);
      }
  });
  it("accepts a complete request", () =>
    expect(contactSchema.safeParse(validInquiry).success).toBe(true));
  it.each([
    { email: "broken" },
    { name: "A" },
    { consent: false },
    { description: "Too short" },
    { description: "x".repeat(5001) },
    { website: "https://spam.example" },
    { locale: "xx" },
    { service: "arbitrary" },
    { name: "A\r\nB" },
    { requestId: "123" },
  ])("rejects malformed fields %o", (change) =>
    expect(
      contactSchema.safeParse({ ...validInquiry, ...change }).success,
    ).toBe(false),
  );
  it("rejects unknown payload fields", () =>
    expect(
      contactSchema.safeParse({ ...validInquiry, from: "attacker@example.com" })
        .success,
    ).toBe(false));
  it("encodes user input in email HTML", () => {
    const html = inquiryEmail({
      ...validInquiry,
      name: "<script>alert(1)</script>",
    });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(escapeHtml('"A&B"')).toBe("&quot;A&amp;B&quot;");
  });
});
