import { describe, expect, it } from "vitest";
import { inquiryEmail, inquiryText } from "@/lib/inquiry-email";
import { emailPreviewInquiry as inquiry } from "./fixtures/inquiry";

describe("inquiry email presentation", () => {
  it("puts the message before optional details and provides direct reply links", () => {
    const html = inquiryEmail(inquiry);
    expect(html.indexOf("People should be able")).toBeLessThan(
      html.indexOf("A few more details"),
    );
    expect(html).toContain('href="mailto:preview%40example.com?subject=');
    expect(html).toContain('href="tel:+255712345678"');
    expect(html).toContain("<br />People should");
    const plain = inquiryText(inquiry);
    expect(plain).toContain("Budget: $1,000 to $5,000");
    expect(plain).toContain("Timing: Within a month");
    expect(plain).toContain("Reply in: French");
  });
  it("handles missing optional details without internal enum codes", () => {
    const input = {
      ...inquiry,
      phone: "",
      company: "",
      budget: undefined,
      timeline: undefined,
    };
    const html = inquiryEmail(input);
    expect(html).not.toContain('href="tel:');
    expect(html).not.toContain(">Company</th>");
    const plain = inquiryText(input);
    expect(plain).toContain("Budget: Let's discuss");
    expect(plain).toContain("Timing: Let's discuss");
    expect(plain).not.toContain("Reply in: fr");
  });
  it("escapes names, companies and message content before building HTML", () => {
    const html = inquiryEmail({
      ...inquiry,
      name: '<img src=x onerror="alert(1)">',
      company: "<script>bad()</script>",
      description: '<a href="javascript:alert(1)">click</a>\n& a second line',
    });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain('href="javascript:');
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("<br />&amp; a second line");
  });
});
