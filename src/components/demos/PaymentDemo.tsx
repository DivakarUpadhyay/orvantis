"use client";

import { useRef, useState } from "react";
import { CheckCircle2, CreditCard, Loader2, Smartphone, Wallet } from "lucide-react";

type Method = "upi" | "card" | "wallet";
type Stage = "form" | "processing" | "success";

const methods: { id: Method; label: string; icon: React.ReactNode }[] = [
  { id: "upi", label: "UPI", icon: <Smartphone className="h-4 w-4" /> },
  { id: "card", label: "Card", icon: <CreditCard className="h-4 w-4" /> },
  { id: "wallet", label: "Wallet", icon: <Wallet className="h-4 w-4" /> },
];

const items = [
  { name: "Smart Sensor Hub × 2", price: 9800 },
  { name: "Cloud plan (12 months)", price: 2400 },
];

export function PaymentDemo() {
  const [method, setMethod] = useState<Method>("upi");
  const [stage, setStage] = useState<Stage>("form");
  const [events, setEvents] = useState<{ name: string; t: number }[]>([]);
  const [txn, setTxn] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const subtotal = items.reduce((a, b) => a + b.price, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  function pay() {
    setStage("processing");
    setEvents([]);
    const id = `pay_${Math.random().toString(36).slice(2, 12).toUpperCase()}`;
    setTxn(id);
    const steps = ["payment.created", "payment.authorized", "payment.captured", "order.paid"];
    steps.forEach((name, i) => {
      timers.current.push(
        setTimeout(() => {
          setEvents((e) => [...e, { name, t: (i + 1) * 0.6 }]);
          if (i === steps.length - 1) setStage("success");
        }, 600 * (i + 1)),
      );
    });
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStage("form");
    setEvents([]);
  }

  return (
    <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_17rem]" data-testid="demo-payment">
      <div className="rounded-md border border-line bg-card p-4">
        {stage === "success" ? (
          <div className="flex flex-col items-center py-8 text-center" data-testid="payment-success">
            <CheckCircle2 className="h-14 w-14 text-ok" />
            <p className="mt-3 text-lg font-semibold text-ink">Payment successful</p>
            <p className="mt-1 text-sm text-muted">₹{total.toLocaleString("en-IN")} paid via {method.toUpperCase()}</p>
            <p className="mt-3 rounded-sm bg-surface-3 px-2 py-1 font-mono text-xs text-ink">{txn}</p>
            <button type="button" onClick={reset} className="btn-ghost mt-5">New payment</button>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-ink">Pay Orvantis Store</p>
            <div className="mt-3 flex gap-1 rounded-md bg-surface-3 p-1" role="tablist" aria-label="Payment method">
              {methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={method === m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-[5px] py-1.5 text-sm transition ${
                    method === m.id ? "bg-card-solid font-semibold text-ink shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {method === "upi" && (
                <label className="block text-sm text-ink">
                  UPI ID
                  <input className="field" defaultValue="demo@okaxis" />
                </label>
              )}
              {method === "card" && (
                <>
                  <label className="block text-sm text-ink">
                    Card number
                    <input className="field font-mono" defaultValue="4111 1111 1111 1111" />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block text-sm text-ink">Expiry<input className="field" defaultValue="12/29" /></label>
                    <label className="block text-sm text-ink">CVV<input className="field" defaultValue="123" type="password" /></label>
                  </div>
                </>
              )}
              {method === "wallet" && (
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {["Paytm", "PhonePe", "Amazon Pay"].map((w, i) => (
                    <label key={w} className="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-card-solid p-2.5">
                      <input type="radio" name="wallet" defaultChecked={i === 0} className="accent-[var(--brand)]" /> {w}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={pay}
              disabled={stage === "processing"}
              className="btn-primary mt-5 w-full justify-center py-2.5"
              data-testid="pay-button"
            >
              {stage === "processing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                </>
              ) : (
                <>Pay ₹{total.toLocaleString("en-IN")}</>
              )}
            </button>
            <p className="mt-2 text-center text-[11px] text-muted">Demo only. No real payment is made.</p>
          </>
        )}
      </div>

      <div className="space-y-3">
        <div className="rounded-md border border-line bg-card p-3 text-sm">
          {items.map((it) => (
            <div key={it.name} className="flex justify-between py-1">
              <span className="text-muted">{it.name}</span>
              <span className="tabular-nums text-ink">₹{it.price.toLocaleString("en-IN")}</span>
            </div>
          ))}
          <div className="flex justify-between py-1">
            <span className="text-muted">GST 18%</span>
            <span className="tabular-nums text-ink">₹{gst.toLocaleString("en-IN")}</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-line pt-2 font-semibold">
            <span className="text-ink">Total</span>
            <span className="tabular-nums text-ink">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <div className="rounded-md border border-line bg-[#1f1f1f] p-3 font-mono text-[11px] text-[#d4d4d4]">
          <p className="text-[#6e7681]">{"// webhook → POST /api/payments/webhook"}</p>
          {events.length === 0 && <p className="mt-1 text-[#6e7681]">waiting for events…</p>}
          <ul className="mt-1 space-y-1" data-testid="webhook-log">
            {events.map((e) => (
              <li key={e.name} className="animate-fade-in">
                <span className="text-[#4ec9b0]">200</span> <span className="text-[#dcdcaa]">{e.name}</span>{" "}
                <span className="text-[#6e7681]">+{e.t.toFixed(1)}s</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
