import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { emailPreviewInquiry as input } from "./fixtures/inquiry";

const mocks = vi.hoisted(() => ({
  send: vi.fn(),
  notify: vi.fn(),
  after: vi.fn(),
  allow: vi.fn(),
}));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
  },
}));
vi.mock("next/server", () => ({ after: mocks.after }));
vi.mock("@/lib/inquiry-whatsapp", () => ({
  notifyInquiryWhatsApp: mocks.notify,
}));
vi.mock("@/lib/rate-limit", () => ({ allowInquiry: mocks.allow }));
import { POST } from "@/app/api/contact/route";

function request(body: unknown = input) {
  return new Request("https://portfolio.example/api/contact", {
    method: "POST",
    headers: {
      Origin: "https://portfolio.example",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-only");
  vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
  for (const mock of Object.values(mocks)) mock.mockReset();
  mocks.allow.mockResolvedValue(true);
  mocks.send.mockResolvedValue({ data: { id: "email-ack" }, error: null });
  mocks.notify.mockResolvedValue(undefined);
});
afterEach(() => vi.unstubAllEnvs());

it("preserves email success if the platform cannot schedule background work", async () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  mocks.after.mockImplementationOnce(() => {
    throw new Error("scheduler unavailable");
  });
  expect((await POST(request())).status).toBe(200);
  expect(warn).toHaveBeenCalledWith("WhatsApp inquiry notification failed", {
    reason: "scheduling",
  });
});

it("schedules owner notification after email acknowledgement and returns the existing success response", async () => {
  const response = await POST(request());
  expect(await response.json()).toEqual({ code: "success" });
  expect(response.status).toBe(200);
  expect(mocks.notify).not.toHaveBeenCalled();
  await mocks.after.mock.calls[0][0]();
  expect(mocks.notify).toHaveBeenCalledWith(
    input,
    mocks.send.mock.calls[0][1].idempotencyKey,
  );
});
it("preserves the same notification key across client retries", async () => {
  await POST(request());
  await POST(request());
  for (const [callback] of mocks.after.mock.calls) await callback();
  expect(mocks.notify.mock.calls[0][1]).toBe(mocks.notify.mock.calls[1][1]);
});
it("does not notify WhatsApp when email is rejected or lacks acknowledgement", async () => {
  for (const result of [
    { data: null, error: { message: "rejected" } },
    { data: {}, error: null },
  ]) {
    mocks.send.mockResolvedValue(result);
    expect((await POST(request())).status).toBe(502);
  }
  expect(mocks.after).not.toHaveBeenCalled();
});
it("does not schedule messages for invalid or rate limited submissions", async () => {
  expect((await POST(request({ ...input, website: "spam" }))).status).toBe(400);
  mocks.allow.mockResolvedValue(false);
  expect((await POST(request())).status).toBe(429);
  expect(mocks.after).not.toHaveBeenCalled();
  expect(mocks.notify).not.toHaveBeenCalled();
});
