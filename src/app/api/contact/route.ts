import { Resend } from "resend";
import { createHash } from "node:crypto";
import { contactSchema } from "@/lib/contact-schema";
import { inquiryEmail, inquiryText } from "@/lib/inquiry-email";
import { allowInquiry } from "@/lib/rate-limit";
import { services } from "@/content/services";
export const runtime = "nodejs";
export const maxDuration = 15;
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
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NODE_ENV === "production" && !configuredOrigin)
    return reply("unavailable", 503);
  // Next dev can normalize request.url to localhost even when opened at 127.0.0.1.
  const expectedOrigin = configuredOrigin
    ? new URL(configuredOrigin).origin
    : `${url.protocol}//${request.headers.get("host") || url.host}`;
  if (request.headers.get("origin") !== expectedOrigin)
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
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return reply("unavailable", 503);
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
        subject: `New Portfolio Inquiry - ${service.title.en}`,
        html: inquiryEmail(input),
        text: inquiryText(input),
      },
      { idempotencyKey },
    );
    if (result.error || !result.data?.id) return reply("error", 502);
    return reply("success", 200);
  } catch {
    return reply("error", 503);
  }
}
