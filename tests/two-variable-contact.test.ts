import { afterEach, expect, it, vi } from "vitest";
import { emailPreviewInquiry } from "./fixtures/inquiry";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));
import { POST } from "@/app/api/contact/route";

afterEach(() => vi.unstubAllEnvs());

it("the complete production route needs only two configured variables", async () => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("VERCEL", "1");
  vi.stubEnv("RESEND_API_KEY", "test-only");
  vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
  for (const legacy of [
    "CONTACT_FROM_EMAIL",
    "NEXT_PUBLIC_SITE_URL",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
  ])
    vi.stubEnv(legacy, "");
  send.mockResolvedValue({
    error: null,
    data: { id: "provider-acknowledgement" },
  });

  const request = () =>
    new Request("https://portfolio.example/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://portfolio.example",
        "Content-Type": "application/json",
        "X-Vercel-Forwarded-For": "192.0.2.42",
      },
      body: JSON.stringify(emailPreviewInquiry),
    });
  for (let i = 0; i < 5; i++) {
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ code: "success" });
  }
  expect(send).toHaveBeenCalledTimes(5);
  expect(send.mock.calls[0][0]).toMatchObject({
    from: "Cisco Portfolio <onboarding@resend.dev>",
    to: "owner@example.com",
    replyTo: emailPreviewInquiry.email,
  });
  const blocked = await POST(request());
  expect(blocked.status).toBe(429);
  expect(blocked.headers.get("Retry-After")).toBe("600");
  expect(send).toHaveBeenCalledTimes(5);
});
