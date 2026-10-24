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
const budgets = {
  discuss: "Let's discuss",
  short: "Under $1,000",
  medium: "$1,000 to $5,000",
  large: "$5,000+",
};
const timelines = {
  discuss: "Let's discuss",
  soon: "Within a month",
  quarter: "1 to 3 months",
  flexible: "Flexible",
};
const languages = {
  en: "English",
  ru: "Russian",
  sw: "Kiswahili",
  fr: "French",
  es: "Spanish",
};
function serviceName(input: ContactInput) {
  return (
    services.find((service) => service.id === input.service)?.title.en ||
    input.service
  );
}
function projectDetails(input: ContactInput) {
  return [
    ...(input.company ? [["Company", input.company]] : []),
    ["Budget", budgets[input.budget || "discuss"]],
    ["Timing", timelines[input.timeline || "discuss"]],
    ["Reply in", languages[input.locale]],
  ];
}
export function inquiryText(
  input: ContactInput,
  channel: "email" | "whatsapp" = "email",
) {
  return [
    `New message from ${input.name}`,
    `Service: ${serviceName(input)}`,
    "",
    input.description,
    "",
    `Email: ${input.email}`,
    ...(input.phone ? [`Phone: ${input.phone}`] : []),
    ...projectDetails(input).map(([label, value]) => `${label}: ${value}`),
    "",
    channel === "email"
      ? "Reply to this email to contact the sender."
      : "Contact the sender using the email or phone above.",
    "The sender agreed to be contacted about this request.",
  ].join("\n");
}
export function inquiryEmail(input: ContactInput) {
  const name = escapeHtml(input.name);
  const service = escapeHtml(serviceName(input));
  const email = escapeHtml(input.email);
  const reply = escapeHtml(
    `mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(`Re: Your ${serviceName(input).toLowerCase()} request`)}`,
  );
  const phone = input.phone ? escapeHtml(input.phone) : "";
  const telephone = input.phone?.replace(/[^+0-9]/g, "");
  const message = escapeHtml(input.description).replace(/\r?\n/g, "<br />");
  const rows = projectDetails(input)
    .map(
      ([label, value]) =>
        `<tr><th scope="row" align="left" valign="top" style="padding:12px 12px 12px 0;border-bottom:1px solid #e2e4e8;font-size:13px;font-weight:400;color:#59616e;width:100px">${label}</th><td valign="top" style="padding:12px 0;border-bottom:1px solid #e2e4e8;font-size:14px;color:#20242c;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  // Tables and inline styles keep the message usable when an email client strips CSS.
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>New message from ${name}</title></head>
<body style="margin:0;padding:0;background-color:#f1f2f4;color:#20242c;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${name} is asking about ${service}. Reply directly to get in touch.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f1f2f4"><tr><td align="center" style="padding:28px 12px">
<!--[if mso]><table role="presentation" width="600"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden">
<tr><td bgcolor="#171819" style="padding:24px 28px;color:#efefeb"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-size:28px;font-weight:700;letter-spacing:-1px;color:#efefeb">cisco.</td><td align="right" style="font-size:12px;color:#d4d7dc">Website message</td></tr></table></td></tr>
<tr><td style="padding:28px 28px 12px"><p style="margin:0 0 12px;font-size:13px;line-height:1.5;color:#3158cc">${service}</p><h1 style="margin:0;font-size:27px;line-height:1.25;font-weight:600;overflow-wrap:anywhere;word-break:break-word">A message from ${name}</h1></td></tr>
<tr><td style="padding:16px 28px 24px"><p style="margin:0 0 10px;font-size:12px;line-height:1.5;color:#59616e">WHAT THEY NEED</p><div style="font-size:16px;line-height:1.75;color:#20242c;overflow-wrap:anywhere;word-break:break-word">${message}</div></td></tr>
<tr><td style="padding:0 28px 28px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#3158cc" style="border-radius:6px;mso-padding-alt:15px 22px"><a href="${reply}" style="display:inline-block;padding:15px 22px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;line-height:1.4">Reply by email</a></td></tr></table><p style="margin:14px 0 0;font-size:13px;line-height:1.7;overflow-wrap:anywhere;word-break:break-word"><a href="${reply}" style="color:#3158cc;text-decoration:underline">${email}</a>${phone ? `<br /><a href="tel:${telephone}" style="color:#3158cc;text-decoration:underline">${phone}</a>` : ""}</p></td></tr>
<tr><td bgcolor="#f7f8fa" style="padding:16px 28px 24px"><h2 style="margin:0 0 4px;font-size:15px;line-height:1.5;font-weight:600">A few more details</h2><table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table></td></tr>
<tr><td style="padding:20px 28px;font-size:12px;line-height:1.7;color:#59616e">You can also hit Reply in your email app. The sender agreed to be contacted about this request.</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
<p style="max-width:600px;margin:18px 0 0;font-size:11px;line-height:1.6;color:#626b78">Sent from Francis Mwambene’s portfolio.</p>
</td></tr></table></body></html>`;
}
