import { Resend } from "resend";
import { createHash } from "node:crypto";
import { after } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { inquiryEmail, inquiryText } from "@/lib/inquiry-email";
import { notifyInquiryWhatsApp } from "@/lib/inquiry-whatsapp";
import { allowInquiry } from "@/lib/rate-limit";
import { services } from "@/content/services";
export const runtime = "nodejs";
export const maxDuration = 30;
const maxBytes = 16384;
const reply = (code: string, status: number) =>
  Response.json(
    { code },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(status === 429 ? { "Retry-After": "600" } : {}),
      },
    },
  );
async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > maxBytes)
    throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RangeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body));
}
export async function POST(request: Request) {
  const url = new URL(request.url);
  // Next dev can normalize request.url to localhost even when opened at 127.0.0.1.
  const expectedOrigin = `${url.protocol}//${request.headers.get("host") || url.host}`;
  if (
    request.headers.get("origin") !== expectedOrigin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return reply("error", 403);
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return reply("error", 415);
  let body: unknown;
  try {
    body = await readBody(request);
  } catch (error) {
    return reply("error", error instanceof RangeError ? 413 : 400);
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return reply("required", 400);
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = "Cisco Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) return reply("unavailable", 503);
  try {
    // Vercel overwrites forwarded IP headers. Other deployments must use a trusted proxy.
    const ip = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for") ||
        request.headers.get("x-forwarded-for") ||
        "unknown"
      : "local";
    if (!(await allowInquiry(ip.split(",")[0].trim())))
      return reply("rate", 429);
    const input = parsed.data;
    const service = services.find((item) => item.id === input.service)!;
    const idempotencyKey = createHash("sha256")
      .update(`${input.requestId}:${JSON.stringify(input)}`)
      .digest("hex");
    const result = await new Resend(apiKey).emails.send(
      {
        from,
        to,
        replyTo: input.email,
        subject: `Website request: ${service.title.en} | ${input.name}`,
        html: inquiryEmail(input),
        text: inquiryText(input),
      },
      { idempotencyKey },
    );
    if (result.error || !result.data?.id) return reply("error", 502);
    try {
      after(() => notifyInquiryWhatsApp(input, idempotencyKey));
    } catch {
      // Email was accepted. Never ask the visitor to resubmit a delivered enquiry.
      console.warn("WhatsApp inquiry notification failed", {
        reason: "scheduling",
      });
    }
    return reply("success", 200);
  } catch {
    return reply("error", 503);
  }
}
