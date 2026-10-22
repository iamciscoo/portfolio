import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/contact-schema";
import { escapeHtml, inquiryEmail } from "@/lib/inquiry-email";
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
