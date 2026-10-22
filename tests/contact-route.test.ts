import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
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
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
  vi.stubEnv("RESEND_API_KEY", "test-only");
  vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
  vi.stubEnv("CONTACT_FROM_EMAIL", "inquiries@example.com");
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
  it("requires a configured canonical origin in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect((await POST(request())).status).toBe(503);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("rejects cross-origin submissions", async () => {
    expect(
      (await POST(request(valid, { Origin: "https://evil.example" }))).status,
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
  it("requires rate limiting to allow the request", async () => {
    mocks.allow.mockResolvedValue(false);
    const result = await POST(request());
    expect(result.status).toBe(429);
    expect(result.headers.get("Retry-After")).toBe("600");
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("fails closed when the shared limiter is unavailable", async () => {
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
