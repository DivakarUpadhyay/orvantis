"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Bot, CheckCircle2, Loader2, Play, RotateCcw } from "lucide-react";

type Status = "queued" | "reading" | "validating" | "posted" | "exception";
type Invoice = { no: string; vendor: string; amount: number; po: string; status: Status; note?: string };

const initial: Invoice[] = [
  { no: "INV-2291", vendor: "Shree Metals", amount: 48200, po: "PO-7781", status: "queued" },
  { no: "INV-2292", vendor: "Apex Bearings", amount: 12650, po: "PO-7784", status: "queued" },
  { no: "INV-2293", vendor: "Nova Plastics", amount: 30410, po: "PO-7790", status: "queued" },
  { no: "INV-2294", vendor: "Kiran Logistics", amount: 8900, po: "PO-7791", status: "queued" },
  { no: "INV-2295", vendor: "Delta Electricals", amount: 61750, po: "PO-7795", status: "queued" },
  { no: "INV-2296", vendor: "Prime Packaging", amount: 15320, po: "PO-7801", status: "queued" },
  { no: "INV-2297", vendor: "Vertex Tools", amount: 22480, po: "PO-7802", status: "queued" },
  { no: "INV-2298", vendor: "Sun Chemicals", amount: 39990, po: "PO-7806", status: "queued" },
];

const badge: Record<Status, string> = {
  queued: "bg-surface-3 text-muted",
  reading: "bg-brand/15 text-brand",
  validating: "bg-brand/15 text-brand",
  posted: "bg-ok/15 text-ok",
  exception: "bg-danger/15 text-danger",
};

export function RpaDemo() {
  const [rows, setRows] = useState(initial);
  const [cursor, setCursor] = useState(-1);
  const [phase, setPhase] = useState<"reading" | "validating">("reading");

  useEffect(() => {
    if (cursor < 0 || cursor >= rows.length) return;
    const id = setTimeout(() => {
      if (phase === "reading") {
        setRows((r) => r.map((x, i) => (i === cursor ? { ...x, status: "validating" } : x)));
        setPhase("validating");
      } else {
        // INV-2295 has a price mismatch against its PO — routed to a human.
        setRows((r) =>
          r.map((x, i) =>
            i === cursor
              ? x.no === "INV-2295"
                ? { ...x, status: "exception", note: "Amount differs from PO by ₹1,250" }
                : { ...x, status: "posted", note: `ERP doc 51000${40 + i}` }
              : i === cursor + 1
                ? { ...x, status: "reading" }
                : x,
          ),
        );
        setPhase("reading");
        setCursor((c) => c + 1);
      }
    }, 550);
    return () => clearTimeout(id);
  }, [cursor, phase, rows.length]);

  function run() {
    setRows(initial.map((x, i) => (i === 0 ? { ...x, status: "reading" } : x)));
    setPhase("reading");
    setCursor(0);
  }

  const done = rows.filter((r) => r.status === "posted").length;
  const exceptions = rows.filter((r) => r.status === "exception").length;
  const running = cursor >= 0 && cursor < rows.length;
  const finished = cursor >= rows.length;

  return (
    <div className="p-4 sm:p-5" data-testid="demo-rpa">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={run} disabled={running} data-testid="run-bot">
          {running ? <><Loader2 className="h-4 w-4 animate-spin" /> Bot running…</> : finished ? <><RotateCcw className="h-4 w-4" /> Run again</> : <><Play className="h-4 w-4" /> Run bot</>}
        </button>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-md border border-line bg-card px-2.5 py-1.5 text-ink">Posted <b className="tabular-nums" data-testid="rpa-posted">{done}</b></span>
          <span className="rounded-md border border-line bg-card px-2.5 py-1.5 text-ink">Exceptions <b className="tabular-nums">{exceptions}</b></span>
          <span className="rounded-md border border-line bg-card px-2.5 py-1.5 text-ink">Time saved <b className="tabular-nums">{(done + exceptions) * 6} min</b></span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-md border border-line bg-card">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Invoice</th>
              <th className="px-3 py-2 font-medium">Vendor</th>
              <th className="px-3 py-2 text-right font-medium">Amount</th>
              <th className="px-3 py-2 font-medium">PO</th>
              <th className="px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.no} className={`border-b border-line last:border-0 transition ${i === cursor ? "bg-brand/10" : ""}`}>
                <td className="px-3 py-2 font-mono text-xs text-ink">
                  {i === cursor && <Bot className="mr-1 inline h-3.5 w-3.5 text-brand" />}
                  {r.no}
                </td>
                <td className="px-3 py-2 text-ink">{r.vendor}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink">₹{r.amount.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2 font-mono text-xs text-muted">{r.po}</td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold capitalize ${badge[r.status]}`}>
                    {r.status === "posted" && <CheckCircle2 className="h-3 w-3" />}
                    {r.status === "exception" && <AlertTriangle className="h-3 w-3" />}
                    {r.status}
                  </span>
                  {r.note && <span className="ml-2 text-[11px] text-muted">{r.note}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
