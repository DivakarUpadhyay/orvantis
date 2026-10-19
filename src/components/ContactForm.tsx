"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { budgets, contactSchema, timelines, toFieldErrors, type FieldErrors } from "@/lib/contact-schema";
import { locations } from "@/lib/locations";
import { categories, services, type CategoryId } from "@/lib/services";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; ref: string } | { kind: "error"; message: string };

const empty = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select a service when arriving from a service page (?service=slug).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    if (slug && services.some((s) => s.slug === slug)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
      setValues((v) => ({ ...v, service: slug }));
    }
  }, []);

  function update(name: keyof typeof empty, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...values, consent };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe = toFieldErrors(parsed.error);
      setErrors(fe);
      const first = Object.keys(fe)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus({ kind: "sent", ref: json.ref });
        setValues(empty);
        setConsent(false);
        return;
      }
      if (json.fieldErrors) setErrors(json.fieldErrors);
      setStatus({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ kind: "error", message: "Network error. Check your connection and try again." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="card flex flex-col items-center p-10 text-center" role="status" data-testid="contact-success">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-ok/15 text-ok">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold text-ink">Thank you! Your message is on its way.</h2>
        <p className="mt-3 max-w-md text-muted">
          We have emailed you a confirmation. Our team will reply within one business day.
        </p>
        <p className="mt-4 rounded-sm bg-surface-3 px-4 py-1.5 font-mono text-sm text-ink" data-testid="contact-ref">
          Reference: {status.ref}
        </p>
        <button type="button" className="btn-ghost mt-8" onClick={() => setStatus({ kind: "idle" })}>
          Send another message
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";
  const fieldProps = (name: keyof typeof empty) => ({
    id: name,
    name,
    value: values[name],
    "aria-invalid": errors[name as keyof FieldErrors] ? true : undefined,
    "aria-describedby": errors[name as keyof FieldErrors] ? `${name}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(name, e.target.value),
    className: "field",
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card p-6 sm:p-8" data-testid="contact-form">
      {status.kind === "error" && (
        <div role="alert" className="mb-6 flex gap-3 rounded-md border border-danger/30 bg-danger/10 p-4 text-sm text-danger" data-testid="contact-error">
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" /> {status.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required error={errors.name}>
          <input {...fieldProps("name")} autoComplete="name" placeholder="Jane Lin" />
        </Field>
        <Field label="Work email" name="email" required error={errors.email}>
          <input {...fieldProps("email")} type="email" autoComplete="email" placeholder="jane@company.com" />
        </Field>
        <Field label="Company" name="company" error={errors.company}>
          <input {...fieldProps("company")} autoComplete="organization" placeholder="Company Ltd." />
        </Field>
        <Field label="Phone / WhatsApp" name="phone" error={errors.phone}>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" placeholder="+91 98200 12345" />
        </Field>
        <Field label="Country" name="country" error={errors.country}>
          <select {...fieldProps("country")}>
            <option value="">Select country</option>
            {locations.map((l) => (
              <option key={l.slug} value={l.country}>{l.country}</option>
            ))}
          </select>
        </Field>
        <Field label="Service needed" name="service" required error={errors.service}>
          <select {...fieldProps("service")}>
            <option value="">Select a service</option>
            {(Object.keys(categories) as CategoryId[]).map((c) => (
              <optgroup key={c} label={categories[c].title}>
                {services
                  .filter((s) => s.category === c)
                  .map((s) => (
                    <option key={s.slug} value={s.slug}>{s.title}</option>
                  ))}
              </optgroup>
            ))}
            <option value="other">Other / not sure</option>
          </select>
        </Field>
        <Field label="Budget" name="budget" required error={errors.budget}>
          <select {...fieldProps("budget")}>
            <option value="">Select budget</option>
            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Timeline" name="timeline" required error={errors.timeline}>
          <select {...fieldProps("timeline")}>
            <option value="">Select timeline</option>
            {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Project details" name="message" required error={errors.message}>
            <textarea
              {...fieldProps("message")}
              rows={6}
              maxLength={5000}
              placeholder="What are you building? Which systems, devices or machines are involved?"
            />
          </Field>
          <p className="mt-1 text-right text-xs text-muted">{values.message.length} / 5000</p>
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => update("website", e.target.value)} />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors((er) => ({ ...er, consent: undefined }));
            }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-4 w-4 rounded border-line accent-[var(--brand)]"
          />
          <span>
            I agree that {""}
            <a href="/privacy" className="font-medium text-brand underline-offset-2 hover:underline">my details will be used</a>{" "}
            to respond to this enquiry.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 text-sm text-danger">{errors.consent}</p>
        )}
      </div>

      <button type="submit" disabled={sending} className="btn-primary mt-8 w-full justify-center py-3.5 text-base sm:w-auto" data-testid="contact-submit">
        {sending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Send message <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label} {required && <span className="text-danger" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-danger" data-testid={`error-${name}`}>
          {error}
        </p>
      )}
    </div>
  );
}
