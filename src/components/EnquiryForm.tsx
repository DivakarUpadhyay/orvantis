"use client";

import { useEffect, useId, useState } from "react";
import type { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { fieldErrors } from "@/lib/enquiry-schemas";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "url" | "select" | "textarea" | "toggle";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  span?: 2;
};

// Config-driven form used for wholesale RFQs and partner applications.
// Validates with the same Zod schema as the API, then posts JSON.
export function EnquiryForm({
  endpoint,
  schema,
  fields,
  initial = {},
  submitLabel,
  successTitle,
  successText,
  testId,
  urlParam,
  consentLabel,
}: {
  endpoint: string;
  schema: z.ZodType;
  fields: Field[];
  initial?: Record<string, string | boolean>;
  submitLabel: string;
  successTitle: string;
  successText: string;
  testId: string;
  /** Pre-fill a field from a query-string parameter, e.g. ?type=… */
  urlParam?: { param: string; field: string };
  /** Replaces the default privacy consent text (e.g. to require accepting terms). */
  consentLabel?: React.ReactNode;
}) {
  const blank = Object.fromEntries(fields.map((f) => [f.name, f.type === "toggle" ? false : ""])) as Record<string, string | boolean>;
  const [values, setValues] = useState<Record<string, string | boolean>>({ ...blank, ...initial, website: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");
  const [ref, setRef] = useState("");
  // Unique per instance: a hidden previous route can still be mounted.
  const uid = useId();

  useEffect(() => {
    if (!urlParam) return;
    const v = new URLSearchParams(window.location.search).get(urlParam.param);
    const f = fields.find((x) => x.name === urlParam.field);
    if (v && (!f?.options || f.options.some((o) => o.value === v))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
      setValues((s) => ({ ...s, [urlParam.field]: v }));
    }
    // Runs once on mount; fields/urlParam are recreated by parents on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k: string, v: string | boolean) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { ...values, consent };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const fe = fieldErrors(parsed.error);
      setErrors(fe);
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(fe)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setRef(json.ref);
        return;
      }
      if (json.fieldErrors) setErrors(json.fieldErrors);
      setMessage(json.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (ref) {
    return (
      <div className="card flex flex-col items-center p-8 text-center" role="status" data-testid={`${testId}-success`}>
        <CheckCircle2 className="h-12 w-12 text-ok" />
        <p className="mt-3 text-xl font-semibold text-ink">{successTitle}</p>
        <p className="mt-2 max-w-md text-sm text-muted">{successText}</p>
        <p className="mt-4 rounded-sm bg-surface-3 px-3 py-1 font-mono text-sm text-ink" data-testid={`${testId}-ref`}>Reference: {ref}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card p-5 sm:p-6" data-testid={testId}>
      {status === "error" && (
        <div role="alert" className="mb-5 flex gap-2 rounded-md border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
          <AlertCircle className="h-5 w-5 shrink-0" /> {message}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `${uid}-${f.name}`;
          const common = {
            id,
            name: f.name,
            "aria-invalid": errors[f.name] ? true : undefined,
            "aria-describedby": errors[f.name] ? `${id}-error` : undefined,
            className: "field",
          };
          return (
            <div key={f.name} className={f.span === 2 || f.type === "textarea" ? "sm:col-span-2" : ""}>
              {f.type === "toggle" ? (
                <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
                  <input
                    type="checkbox"
                    name={f.name}
                    checked={Boolean(values[f.name])}
                    onChange={(e) => set(f.name, e.target.checked)}
                    className="h-4 w-4 accent-[var(--brand)]"
                  />
                  {f.label}
                </label>
              ) : (
                <label htmlFor={id} className="text-sm font-medium text-ink">
                  {f.label} {f.required && <span className="text-danger" aria-hidden="true">*</span>}
                </label>
              )}
              {f.type === "select" ? (
                <select {...common} value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)}>
                  <option value="">Select…</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea {...common} rows={4} placeholder={f.placeholder} value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />
              ) : f.type === "toggle" ? null : (
                <input
                  {...common}
                  type={f.type ?? "text"}
                  min={f.type === "number" ? 1 : undefined}
                  placeholder={f.placeholder}
                  value={String(values[f.name] ?? "")}
                  onChange={(e) => set(f.name, e.target.value)}
                />
              )}
              {errors[f.name] && <p id={`${id}-error`} className="mt-1.5 text-sm text-danger" data-testid={`${testId}-error-${f.name}`}>{errors[f.name]}</p>}
            </div>
          );
        })}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input name="website" tabIndex={-1} autoComplete="off" value={String(values.website)} onChange={(e) => set("website", e.target.value)} />
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrors((er) => ({ ...er, consent: "" })); }} className="mt-0.5 h-4 w-4 accent-[var(--brand)]" />
        <span>
          {consentLabel ?? (
            <>I agree that my details will be used to respond to this request (<a href="/privacy" className="text-brand hover:underline">privacy</a>).</>
          )}
        </span>
      </label>
      {errors.consent && <p className="mt-1 text-sm text-danger">{errors.consent}</p>}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full justify-center py-2.5 sm:w-auto" data-testid={`${testId}-submit`}>
        {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>{submitLabel} <Send className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
