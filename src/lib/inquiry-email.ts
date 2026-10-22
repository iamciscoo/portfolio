import type { ContactInput } from "./contact-schema";
import { services } from "@/content/services";
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
}
function inquiryRows(input: ContactInput) {
  return [
    ["Name", input.name],
    ["Email", input.email],
    ...(input.phone ? [["Phone", input.phone]] : []),
    ["Company", input.company || "-"],
    [
      "Service",
      services.find((s) => s.id === input.service)?.title.en || input.service,
    ],
    ["Budget", input.budget || "discuss"],
    ["Timeline", input.timeline || "discuss"],
    ["Language", input.locale],
    [
      "Consent",
      "Granted to respond to this inquiry using the supplied contact details",
    ],
  ];
}
export function inquiryText(input: ContactInput) {
  return (
    inquiryRows(input)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n") + `\n\nInquiry details\n${input.description}`
  );
}
export function inquiryEmail(input: ContactInput) {
  const rows = inquiryRows(input);
  return `<!doctype html><html lang="en"><body style="margin:0;background:#f0f0ed;font-family:Arial,sans-serif;color:#222"><main style="max-width:620px;margin:32px auto;background:white;padding:36px"><p style="font-weight:bold;letter-spacing:3px">CISCO / NEW INQUIRY</p><h1 style="font-size:28px">A new service inquiry.</h1><table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><th style="text-align:left;padding:12px 0;border-bottom:1px solid #ddd;font-size:12px">${label}</th><td style="padding:12px;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`).join("")}</table><h2 style="font-size:18px;margin-top:30px">Inquiry details</h2><p style="line-height:1.7;white-space:pre-wrap">${escapeHtml(input.description)}</p><p style="font-size:12px;color:#666">Reply to this email to respond to the client. Handle their details only for this inquiry.</p></main></body></html>`;
}
