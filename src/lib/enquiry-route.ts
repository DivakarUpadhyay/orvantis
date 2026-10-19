import "server-only";
import { randomBytes } from "node:crypto";
import type { z } from "zod";
import { fieldErrors } from "./enquiry-schemas";
import { rateLimit } from "./rate-limit";

const MAX_BODY_BYTES = 20_000;

/**
 * Shared POST pipeline for enquiry forms: rate limit → size check → JSON →
 * honeypot → validation → handler. Returns the JSON responses the forms expect.
 */
export async function handleEnquiry<S extends z.ZodType>(
  req: Request,
  opts: {
    key: string;
    refPrefix: string;
    schema: S;
    send: (data: z.output<S>, meta: { ip: string; ref: string }) => Promise<unknown>;
  },
) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

  const limit = rateLimit(`${opts.key}:${ip}`);
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again later or email us directly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return Response.json({ ok: false, error: "Request is too large." }, { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (body && typeof body === "object" && (body as { website?: unknown }).website) {
    return Response.json({ ok: true, ref: "OK" });
  }

  const parsed = opts.schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const ref = `${opts.refPrefix}-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;
  try {
    await opts.send(parsed.data, { ip, ref });
  } catch (err) {
    console.error(`[${opts.key}] email delivery failed`, err);
    return Response.json({ ok: false, error: "We couldn't send your request right now. Please email us directly." }, { status: 502 });
  }
  return Response.json({ ok: true, ref });
}
