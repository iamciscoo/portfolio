import { createHmac } from "node:crypto";
const local = new Map<string, { count: number; expires: number }>();
export async function allowInquiry(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (process.env.NODE_ENV === "production" && (!url || !token))
    throw new Error("Rate limiting unavailable");
  const now = Date.now();
  const bucket = Math.floor(now / 600000);
  const hash = createHmac("sha256", token || "local-development")
    .update(ip)
    .digest("hex");
  const key = `portfolio:inquiry:${hash}:${bucket}`;
  if (url && token) {
    if (!url.startsWith("https://"))
      throw new Error("Invalid rate limit configuration");
    const script =
      "local n=redis.call('INCR',KEYS[1]);if n==1 then redis.call('EXPIRE',KEYS[1],1200) end;return n";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["EVAL", script, "1", key]),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Rate limiting unavailable");
    const data = (await response.json()) as { result?: number; error?: string };
    if (typeof data.result !== "number" || data.error)
      throw new Error("Rate limiting unavailable");
    return data.result <= 5;
  }
  for (const [entry, value] of local)
    if (value.expires < now) local.delete(entry);
  const value = local.get(key) || { count: 0, expires: now + 600000 };
  value.count++;
  local.set(key, value);
  return value.count <= 5;
}
