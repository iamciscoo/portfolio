import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
let allowInquiry: typeof import("@/lib/rate-limit").allowInquiry;
beforeEach(async () => {
  vi.resetModules();
  ({ allowInquiry } = await import("@/lib/rate-limit"));
  vi.stubEnv("NODE_ENV", "development");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
describe("rate limiting", () => {
  it("allows five local requests and rejects the sixth", async () => {
    for (let i = 0; i < 5; i++)
      expect(await allowInquiry("local-test-client")).toBe(true);
    expect(await allowInquiry("local-test-client")).toBe(false);
  });
  it("expires the local request bucket", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-22T00:00:00Z"));
    for (let i = 0; i < 5; i++) await allowInquiry("expiry-test");
    expect(await allowInquiry("expiry-test")).toBe(false);
    vi.advanceTimersByTime(600001);
    expect(await allowInquiry("expiry-test")).toBe(true);
  });
  it("limits production requests without Redis configuration", async () => {
    vi.stubEnv("NODE_ENV", "production");
    for (let i = 0; i < 5; i++)
      expect(await allowInquiry("production-client")).toBe(true);
    expect(await allowInquiry("production-client")).toBe(false);
  });
  it("keeps client limits separate without an external service", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    for (let i = 0; i < 5; i++) await allowInquiry("client-a");
    expect(await allowInquiry("client-a")).toBe(false);
    expect(await allowInquiry("client-b")).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("bounds stored client buckets and frees expired entries", async () => {
    vi.useFakeTimers();
    for (let i = 0; i < 1000; i++)
      expect(await allowInquiry(`client-${i}`)).toBe(true);
    expect(await allowInquiry("one-too-many")).toBe(false);
    vi.advanceTimersByTime(600001);
    expect(await allowInquiry("one-too-many")).toBe(true);
  });
  it("uses a fresh counter in each process instance", async () => {
    for (let i = 0; i < 5; i++) await allowInquiry("client");
    expect(await allowInquiry("client")).toBe(false);
    vi.resetModules();
    const fresh = await import("@/lib/rate-limit");
    expect(await fresh.allowInquiry("client")).toBe(true);
  });
});
