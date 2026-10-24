import { z } from "zod";
import type { ContactInput } from "./contact-schema";
import { inquiryText } from "./inquiry-email";

const configSchema = z.object({
  url: z
    .string()
    .regex(/^https:\/\/(?:\d+\.api\.greenapi\.com|api\.green-api\.com)$/),
  instance: z.string().regex(/^\d+$/),
  token: z.string().regex(/^[a-zA-Z0-9]{16,256}$/),
  chatId: z.string().regex(/^\d{7,15}@c\.us$/),
});
const acknowledgement = z.object({ idMessage: z.string().trim().min(1) });
// Best-effort duplicate protection within one process, including concurrent retries.
const sent = new Map<string, { expires: number; work: Promise<void> }>();
const retention = 24 * 60 * 60 * 1000;

export async function notifyInquiryWhatsApp(input: ContactInput, key: string) {
  const values = {
    url: process.env.GREEN_API_URL?.trim().replace(/\/$/, ""),
    instance: process.env.GREEN_API_INSTANCE_ID?.trim(),
    token: process.env.GREEN_API_TOKEN?.trim(),
    chatId: process.env.CONTACT_WHATSAPP_CHAT_ID?.trim(),
  };
  if (!Object.values(values).some(Boolean)) return;
  const config = configSchema.safeParse(values);
  if (!config.success) {
    console.warn("WhatsApp inquiry notification failed", {
      reason: "configuration",
    });
    return;
  }
  const now = Date.now();
  for (const [id, entry] of sent) if (entry.expires <= now) sent.delete(id);
  const existing = sent.get(key);
  if (existing) return existing.work;
  if (sent.size >= 1000) sent.delete(sent.keys().next().value!);

  const work = send(config.data, input).then((success) => {
    if (!success) sent.delete(key);
  });
  sent.set(key, { expires: now + retention, work });
  return work;
}

async function send(config: z.infer<typeof configSchema>, input: ContactInput) {
  try {
    const response = await fetch(
      `${config.url}/waInstance${config.instance}/sendMessage/${config.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: config.chatId,
          message: `Cisco portfolio enquiry\n\n${inquiryText(input, "whatsapp")}\nReference: ${input.requestId}`,
          linkPreview: false,
        }),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) {
      console.warn("WhatsApp inquiry notification failed", {
        reason: "http",
        status: response.status,
      });
      return false;
    }
    if (!acknowledgement.safeParse(await response.json()).success) {
      console.warn("WhatsApp inquiry notification failed", {
        reason: "acknowledgement",
      });
      return false;
    }
    return true;
  } catch {
    // Never log the exception: fetch errors can contain the token-bearing URL.
    console.warn("WhatsApp inquiry notification failed", {
      reason: "network-or-response",
    });
    return false;
  }
}
