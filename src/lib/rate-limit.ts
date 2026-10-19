// Fixed-window limiter kept in memory. On Vercel each serverless instance has
// its own memory, so this is best-effort burst protection; use Upstash/KV for a
// strict global limit.
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, max = Number(process.env.RATE_LIMIT_MAX ?? 5), windowMs = 10 * 60_000) {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  }
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: max - 1, retryAfter: 0 };
  }
  entry.count++;
  if (entry.count > max) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  return { ok: true, remaining: max - entry.count, retryAfter: 0 };
}
