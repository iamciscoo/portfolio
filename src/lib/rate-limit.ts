import { createHmac, randomBytes } from "node:crypto";
const local = new Map<string, { count: number; expires: number }>();
const secret = randomBytes(32);
export async function allowInquiry(ip: string): Promise<boolean> {
  const now = Date.now();
  const bucket = Math.floor(now / 600000);
  const hash = createHmac("sha256", secret).update(ip).digest("hex");
  const key = `portfolio:inquiry:${hash}:${bucket}`;
  for (const [entry, value] of local)
    if (value.expires < now) local.delete(entry);
  if (!local.has(key) && local.size >= 1000) return false;
  const value = local.get(key) || { count: 0, expires: now + 600000 };
  if (value.count >= 5) return false;
  value.count++;
  local.set(key, value);
  return true;
}
