import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import type { ContactData } from "./contact-schema";
import { officeAddress, offices, site } from "./site";

/**
 * EMAIL_TRANSPORT
 *   smtp  – send through SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS (production, e.g. on Vercel)
 *   file  – write .eml files to EMAIL_OUTBOX_DIR (local development and Playwright tests)
 * Defaults to smtp when SMTP_HOST is set, otherwise file outside production.
 */
export function emailMode(): "smtp" | "file" | "unconfigured" {
  const explicit = process.env.EMAIL_TRANSPORT;
  if (explicit === "smtp" || explicit === "file") return explicit;
  if (process.env.SMTP_HOST) return "smtp";
  return process.env.NODE_ENV === "production" && !process.env.EMAIL_OUTBOX_DIR ? "unconfigured" : "file";
}

function createTransport(mode: "smtp" | "file") {
  if (mode === "smtp") {
    const port = Number(process.env.SMTP_PORT ?? 587);
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
  }
  return nodemailer.createTransport({ streamTransport: true, buffer: true, newline: "unix" });
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(data: ContactData, serviceLabel: string) {
  return [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Phone", data.phone || "—"],
    ["Country", data.country || "—"],
    ["Service", serviceLabel],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
  ] as const;
}

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f8fc;font-family:Segoe UI,Arial,sans-serif;color:#0b1220">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;border:1px solid #e2e8f0">
<tr><td style="padding:24px 28px;background:linear-gradient(135deg,#2f5bea,#06b6d4);border-radius:16px 16px 0 0;color:#fff">
<strong style="font-size:18px">${esc(site.name)}</strong><div style="opacity:.9;font-size:14px;margin-top:4px">${esc(title)}</div></td></tr>
<tr><td style="padding:28px">${body}</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#4a5568">${esc(site.name)} · ${esc(site.email)}<br>${offices.map((o) => `${esc(o.label)}: ${esc(officeAddress(o))}`).join("<br>")}</td></tr>
</table></td></tr></table></body></html>`;
}

export async function sendContactEmails(data: ContactData, serviceLabel: string, meta: { ip: string; ref: string }) {
  const mode = emailMode();
  if (mode === "unconfigured") {
    throw new Error("Email is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.");
  }
  const transport = createTransport(mode);
  const from = process.env.MAIL_FROM ?? `${site.name} <${site.email}>`;
  const to = process.env.CONTACT_TO ?? site.email;

  const table = rows(data, serviceLabel)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#4a5568;font-size:14px;white-space:nowrap">${k}</td><td style="padding:6px 0;font-size:14px">${esc(v)}</td></tr>`,
    )
    .join("");
  const message = esc(data.message).replace(/\n/g, "<br>");

  const notification = {
    from,
    to,
    replyTo: { name: data.name, address: data.email },
    subject: `[Website enquiry ${meta.ref}] ${serviceLabel} — ${data.name}${data.company ? ` (${data.company})` : ""}`,
    text: [
      `New enquiry ${meta.ref}`,
      ...rows(data, serviceLabel).map(([k, v]) => `${k}: ${v}`),
      "",
      data.message,
      "",
      `IP: ${meta.ip}`,
    ].join("\n"),
    html: layout(
      `New website enquiry · ${meta.ref}`,
      `<table cellpadding="0" cellspacing="0">${table}</table>
       <h3 style="margin:24px 0 8px;font-size:15px">Message</h3>
       <div style="background:#f6f8fc;border-radius:12px;padding:16px;font-size:14px;line-height:1.6">${message}</div>
       <p style="font-size:12px;color:#4a5568;margin-top:20px">IP: ${esc(meta.ip)}. Reply to this email to answer the sender directly.</p>`,
    ),
  };

  const acknowledgement = {
    from,
    to: { name: data.name, address: data.email },
    replyTo: to,
    subject: `We received your message — ${site.name} (ref ${meta.ref})`,
    text: `Hi ${data.name},\n\nThank you for contacting ${site.name}. Our team will review your ${serviceLabel} enquiry and reply within one business day.\n\nYour reference: ${meta.ref}\n\nYour message:\n${data.message}\n\n— ${site.name}`,
    html: layout(
      "Thanks for reaching out",
      `<p style="font-size:15px">Hi ${esc(data.name)},</p>
       <p style="font-size:15px;line-height:1.6">Thank you for contacting ${esc(site.name)}. Our team will review your
       <strong>${esc(serviceLabel)}</strong> enquiry and reply within <strong>one business day</strong>.</p>
       <p style="font-size:14px;color:#4a5568">Your reference: <strong>${esc(meta.ref)}</strong></p>
       <h3 style="margin:24px 0 8px;font-size:15px">Your message</h3>
       <div style="background:#f6f8fc;border-radius:12px;padding:16px;font-size:14px;line-height:1.6">${message}</div>`,
    ),
  };

  const sent = [];
  for (const [kind, mail] of [["notification", notification], ["acknowledgement", acknowledgement]] as const) {
    const info = await transport.sendMail(mail);
    if (mode === "file") {
      const dir = process.env.EMAIL_OUTBOX_DIR ?? path.join(process.cwd(), ".outbox");
      await mkdir(dir, { recursive: true });
      const file = path.join(dir, `${meta.ref}-${kind}.eml`);
      await writeFile(file, (info as unknown as { message: Buffer }).message);
      sent.push({ kind, file });
    } else {
      sent.push({ kind, id: info.messageId });
    }
  }
  return { mode, sent };
}

/**
 * Generic enquiry email pair (notification to the company + confirmation to the
 * sender), used by wholesale RFQs and partner applications.
 */
export async function sendEnquiryEmails(e: {
  ref: string;
  ip: string;
  name: string;
  email: string;
  subject: string;
  heading: string;
  rows: [string, string][];
  message: string;
  ackSubject: string;
  ackIntro: string;
}) {
  const mode = emailMode();
  if (mode === "unconfigured") {
    throw new Error("Email is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.");
  }
  const transport = createTransport(mode);
  const from = process.env.MAIL_FROM ?? `${site.name} <${site.email}>`;
  const to = process.env.CONTACT_TO ?? site.email;
  const table = e.rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#4a5568;font-size:14px;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;font-size:14px">${esc(v || "—")}</td></tr>`,
    )
    .join("");
  const message = esc(e.message || "—").replace(/\n/g, "<br>");

  const mails = [
    [
      "notification",
      {
        from,
        to,
        replyTo: { name: e.name, address: e.email },
        subject: `[${e.ref}] ${e.subject}`,
        text: [e.heading, ...e.rows.map(([k, v]) => `${k}: ${v || "—"}`), "", e.message, "", `IP: ${e.ip}`].join("\n"),
        html: layout(
          `${e.heading} · ${e.ref}`,
          `<table cellpadding="0" cellspacing="0">${table}</table>
           <h3 style="margin:24px 0 8px;font-size:15px">Details</h3>
           <div style="background:#f6f8fc;border-radius:8px;padding:16px;font-size:14px;line-height:1.6">${message}</div>
           <p style="font-size:12px;color:#4a5568;margin-top:20px">IP: ${esc(e.ip)}. Reply to this email to answer the sender directly.</p>`,
        ),
      },
    ],
    [
      "acknowledgement",
      {
        from,
        to: { name: e.name, address: e.email },
        replyTo: to,
        subject: `${e.ackSubject} — ${site.name} (ref ${e.ref})`,
        text: `Hi ${e.name},\n\n${e.ackIntro}\n\nYour reference: ${e.ref}\n\n${e.rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n")}\n\n— ${site.name}`,
        html: layout(
          e.ackSubject,
          `<p style="font-size:15px">Hi ${esc(e.name)},</p>
           <p style="font-size:15px;line-height:1.6">${esc(e.ackIntro)}</p>
           <p style="font-size:14px;color:#4a5568">Your reference: <strong>${esc(e.ref)}</strong></p>
           <table cellpadding="0" cellspacing="0">${table}</table>`,
        ),
      },
    ],
  ] as const;

  for (const [kind, mail] of mails) {
    const info = await transport.sendMail(mail);
    if (mode === "file") {
      const dir = process.env.EMAIL_OUTBOX_DIR ?? path.join(process.cwd(), ".outbox");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, `${e.ref}-${kind}.eml`), (info as unknown as { message: Buffer }).message);
    }
  }
  return { mode };
}
