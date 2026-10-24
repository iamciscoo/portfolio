import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { emailPreviewInquiry as input } from "./fixtures/inquiry";
import { notifyInquiryWhatsApp } from "@/lib/inquiry-whatsapp";

const fetchMock = vi.fn();
let key = 0;
const notify = () => notifyInquiryWhatsApp(input, `test-${key}`);
beforeEach(() => {
  key++;
  vi.stubEnv("GREEN_API_URL", "https://7107.api.greenapi.com");
  vi.stubEnv("GREEN_API_INSTANCE_ID", "710700000001");
  vi.stubEnv("GREEN_API_TOKEN", "test-only-token0000".replaceAll("-", ""));
  vi.stubEnv("CONTACT_WHATSAPP_CHAT_ID", "255700000000@c.us");
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("owner WhatsApp notification", () => {
  it("sends the validated enquiry to the configured owner with no link previews", async () => {
    fetchMock.mockResolvedValue(Response.json({ idMessage: "ack" }));
    await notify();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe(
      "https://7107.api.greenapi.com/waInstance710700000001/sendMessage/testonlytoken0000",
    );
    expect(options).toMatchObject({
      method: "POST",
      redirect: "error",
      cache: "no-store",
    });
    expect(options.signal).toBeInstanceOf(AbortSignal);
    const body = JSON.parse(options.body);
    expect(body.chatId).toBe("255700000000@c.us");
    expect(body.linkPreview).toBe(false);
    for (const value of [
      input.name,
      input.email,
      input.phone,
      input.description,
      input.requestId,
      "French",
      "Within a month",
      "$1,000 to $5,000",
    ])
      expect(body.message).toContain(value);
    expect(body.message).not.toContain("Reply to this email");
    expect(console.warn).not.toHaveBeenCalled();
  });
  it("deduplicates concurrent and completed submissions within the process", async () => {
    fetchMock.mockResolvedValue(Response.json({ idMessage: "ack" }));
    await Promise.all([notify(), notify()]);
    await notify();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it("stays disabled when all settings are empty", async () => {
    for (const env of [
      "GREEN_API_URL",
      "GREEN_API_INSTANCE_ID",
      "GREEN_API_TOKEN",
      "CONTACT_WHATSAPP_CHAT_ID",
    ])
      vi.stubEnv(env, "");
    await notify();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
  });
  it.each([
    ["GREEN_API_URL", "https://evil.example"],
    ["GREEN_API_URL", "https://7107.api.greenapi.com@evil.example"],
    ["GREEN_API_TOKEN", ""],
    ["GREEN_API_INSTANCE_ID", "../other"],
    ["CONTACT_WHATSAPP_CHAT_ID", "invalid"],
  ])("refuses unsafe or incomplete configuration: %s", async (env, value) => {
    vi.stubEnv(env, value);
    await notify();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(
      "WhatsApp inquiry notification failed",
      { reason: "configuration" },
    );
  });
  it.each([
    Response.json({}, { status: 466 }),
    Response.json({}),
    Response.json({ idMessage: " " }),
    new Response("invalid json"),
  ])(
    "handles rejected or invalid provider replies without claiming acknowledgement",
    async (response) => {
      fetchMock.mockResolvedValue(response);
      await expect(notify()).resolves.toBeUndefined();
      expect(console.warn).toHaveBeenCalled();
      fetchMock.mockResolvedValue(Response.json({ idMessage: "retry-ack" }));
      await notify();
      expect(fetchMock).toHaveBeenCalledTimes(2);
    },
  );
  it("contains network failures and never logs credentials or enquiry contents", async () => {
    fetchMock.mockRejectedValue(
      new Error(`secret-url ${process.env.GREEN_API_TOKEN} ${input.email}`),
    );
    await expect(notify()).resolves.toBeUndefined();
    const log = JSON.stringify(vi.mocked(console.warn).mock.calls);
    expect(log).not.toContain(process.env.GREEN_API_TOKEN);
    expect(log).not.toContain(input.email);
    expect(log).not.toContain(input.description);
  });
});
