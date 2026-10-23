import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({ getTranslations: vi.fn() }));
beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
  vi.stubEnv("VERCEL_URL", "");
});
afterEach(() => vi.unstubAllEnvs());

it("uses Vercel's production domain for metadata without a manual URL", async () => {
  vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "cisco.example");
  vi.stubEnv("VERCEL_URL", "cisco-preview.vercel.app");
  expect((await import("@/lib/metadata")).siteUrl).toBe(
    "https://cisco.example",
  );
});
it("uses the deployment domain when no production domain is available", async () => {
  vi.stubEnv("VERCEL_URL", "cisco-preview.vercel.app");
  expect((await import("@/lib/metadata")).siteUrl).toBe(
    "https://cisco-preview.vercel.app",
  );
});
it("keeps a local URL outside Vercel", async () => {
  expect((await import("@/lib/metadata")).siteUrl).toBe(
    "http://127.0.0.1:3000",
  );
});
