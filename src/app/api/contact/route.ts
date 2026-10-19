import { randomBytes } from "node:crypto";
import { contactSchema, toFieldErrors } from "@/lib/contact-schema";
import { sendContactEmails } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";
import { getService } from "@/lib/services";

const MAX_BODY_BYTES = 20_000;

function clientIp(req: Request) {
  // Vercel sets x-forwarded-for; the first entry is the client.
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Too many messages. Please try again later or email us directly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "Message is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Bots that fill the hidden field get a normal-looking success and no email.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return Response.json({ ok: true, ref: "OK" });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors: toFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const serviceLabel = getService(data.service)?.title ?? (data.service === "other" ? "Other / not sure" : data.service);
  const ref = `ORV-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;

  try {
    await sendContactEmails(data, serviceLabel, { ip, ref });
  } catch (err) {
    console.error("[contact] email delivery failed", err);
    return Response.json(
      { ok: false, error: "We couldn't send your message right now. Please email us directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, ref });
}
