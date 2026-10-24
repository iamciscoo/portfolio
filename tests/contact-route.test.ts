import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
vi.mock("next/server", () => ({ after: vi.fn() }));
const mocks = vi.hoisted(() => ({ send: vi.fn(), allow: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
  },
}));
vi.mock("@/lib/rate-limit", () => ({ allowInquiry: mocks.allow }));
import { POST } from "@/app/api/contact/route";
const valid = {
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
};
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      Origin: "http://localhost:3000",
      "Content-Type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  vi.stubEnv("RESEND_API_KEY", "test-only");
  vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
  vi.stubEnv("CONTACT_FROM_EMAIL", "");
  mocks.send.mockReset();
  mocks.allow.mockReset();
  mocks.allow.mockResolvedValue(true);
});
afterEach(() => vi.unstubAllEnvs());
describe("contact HTTP contract", () => {
  it("passes an optional phone and software service into both provider email formats", async () => {
    mocks.send.mockResolvedValue({
      error: null,
      data: { id: "phone-test-id" },
    });
    const input = { ...valid, phone: "+255 712 345 678", service: "gaming" };
    expect((await POST(request(input))).status).toBe(200);
    const email = mocks.send.mock.calls[0][0];
    expect(email.subject).toContain("Game installation");
    expect(email.html).toContain(input.phone);
    expect(email.text).toContain(`Phone: ${input.phone}`);
    expect(email.replyTo).toBe(valid.email);
  });
  it("rejects an invalid phone before calling the provider", async () => {
    expect(
      (await POST(request({ ...valid, phone: "email me instead" }))).status,
    ).toBe(400);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("accepts the browser Host in development when no canonical origin is configured", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    mocks.send.mockResolvedValue({ error: null, data: { id: "test-id" } });
    const result = await POST(
      request(valid, {
        Host: "127.0.0.1:3000",
        Origin: "http://127.0.0.1:3000",
      }),
    );
    expect(result.status).toBe(200);
  });
  it("requires only the API key and destination in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    mocks.send.mockResolvedValue({ error: null, data: { id: "test-id" } });
    const result = await POST(
      new Request("https://cisco.vercel.app/api/contact", {
        method: "POST",
        headers: {
          Origin: "https://cisco.vercel.app",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valid),
      }),
    );
    expect(result.status).toBe(200);
    expect(mocks.send.mock.calls[0][0].from).toBe(
      "Cisco Portfolio <onboarding@resend.dev>",
    );
  });
  it("accepts the current custom or preview host without a canonical variable", async () => {
    vi.stubEnv("NODE_ENV", "production");
    mocks.send.mockResolvedValue({ error: null, data: { id: "test-id" } });
    expect(
      (
        await POST(
          request(valid, {
            Host: "portfolio.example",
            Origin: "http://portfolio.example",
          }),
        )
      ).status,
    ).toBe(200);
  });
  it("rejects a forged forwarded host that differs from the actual host", async () => {
    expect(
      (
        await POST(
          request(valid, {
            Host: "localhost:3000",
            Origin: "https://evil.example",
            "X-Forwarded-Host": "evil.example",
          }),
        )
      ).status,
    ).toBe(403);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("rejects cross-origin submissions", async () => {
    expect(
      (await POST(request(valid, { Origin: "https://evil.example" }))).status,
    ).toBe(403);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("rejects browser requests marked as cross-site", async () => {
    expect(
      (await POST(request(valid, { "Sec-Fetch-Site": "cross-site" }))).status,
    ).toBe(403);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("rejects non-JSON content", async () =>
    expect(
      (await POST(request(valid, { "Content-Type": "text/plain" }))).status,
    ).toBe(415));
  it("rejects invalid JSON", async () =>
    expect((await POST(request("{oops"))).status).toBe(400));
  it("caps the actual body without trusting content length", async () =>
    expect((await POST(request("x".repeat(17000)))).status).toBe(413));
  it("rejects a filled honeypot", async () => {
    expect((await POST(request({ ...valid, website: "spam" }))).status).toBe(
      400,
    );
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("returns unavailable without credentials and never invokes the provider", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const result = await POST(request());
    expect(result.status).toBe(503);
    expect(await result.json()).toEqual({ code: "unavailable" });
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("returns unavailable without a destination", async () => {
    vi.stubEnv("CONTACT_TO_EMAIL", "");
    expect((await POST(request())).status).toBe(503);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("requires rate limiting to allow the request", async () => {
    mocks.allow.mockResolvedValue(false);
    const result = await POST(request());
    expect(result.status).toBe(429);
    expect(result.headers.get("Retry-After")).toBe("600");
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("does not send when the limiter check fails", async () => {
    mocks.allow.mockRejectedValue(new Error("offline"));
    expect((await POST(request())).status).toBe(503);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("does not claim success on provider error", async () => {
    mocks.send.mockResolvedValue({
      error: { message: "rejected" },
      data: null,
    });
    expect((await POST(request())).status).toBe(502);
  });
  it("does not claim success without a provider ID", async () => {
    mocks.send.mockResolvedValue({ error: null, data: {} });
    expect((await POST(request())).status).toBe(502);
  });
  it("reports success only after acknowledgement and sets safe reply-to", async () => {
    mocks.send.mockResolvedValue({
      error: null,
      data: { id: "test-provider-id" },
    });
    const result = await POST(request());
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({ code: "success" });
    expect(mocks.send.mock.calls[0][0].replyTo).toBe(valid.email);
    expect(mocks.send.mock.calls[0][0].to).toBe("owner@example.com");
  });
  it("uses the same idempotency key on retry", async () => {
    mocks.send.mockResolvedValue({ error: null, data: { id: "test-id" } });
    await POST(request());
    await POST(request());
    expect(mocks.send.mock.calls[0][1].idempotencyKey).toBe(
      mocks.send.mock.calls[1][1].idempotencyKey,
    );
  });
  it("does not expose provider exceptions", async () => {
    mocks.send.mockRejectedValue(new Error("secret-detail"));
    const result = await POST(request());
    expect(result.status).toBe(503);
    expect(await result.text()).not.toContain("secret-detail");
  });
});
