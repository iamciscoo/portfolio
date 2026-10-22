import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { allowInquiry } from "@/lib/rate-limit";
beforeEach(() => {
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
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
  it("requires shared configuration in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await expect(allowInquiry("client")).rejects.toThrow("unavailable");
  });
  it("uses an atomic shared counter without retaining a plain IP", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-token");
    const fetch = vi.fn().mockResolvedValue(Response.json({ result: 5 }));
    vi.stubGlobal("fetch", fetch);
    expect(await allowInquiry("192.0.2.123")).toBe(true);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body[0]).toBe("EVAL");
    expect(body[1]).toContain("EXPIRE");
    expect(body[3]).not.toContain("192.0.2.123");
  });
  it("rejects requests over the shared limit", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-token");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ result: 6 })),
    );
    expect(await allowInquiry("client")).toBe(false);
  });
  it("fails closed when the shared service errors", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-token");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ error: "offline" })),
    );
    await expect(allowInquiry("client")).rejects.toThrow("unavailable");
  });
});
