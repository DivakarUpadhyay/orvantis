"use client";

import { useEffect, useState } from "react";
import { Check, Truck } from "lucide-react";

const rates = [
  { id: "delhivery", name: "Delhivery Express", days: "2 days", price: 86 },
  { id: "bluedart", name: "Blue Dart Air", days: "1 day", price: 142 },
  { id: "surface", name: "Shiprocket Surface", days: "4 days", price: 74 },
  { id: "dtdc", name: "DTDC Priority", days: "2 days", price: 98 },
];

const statuses = [
  { label: "Shipment booked", place: "Naigaon East, Vasai" },
  { label: "Picked up", place: "Vasai pickup hub" },
  { label: "In transit", place: "Bhiwandi sort centre" },
  { label: "Out for delivery", place: "Pune — Hinjewadi" },
  { label: "Delivered", place: "Signed by: R. Patil" },
];

// Route drawn as a polyline across a stylised map; the truck is placed by
// interpolating along the segments according to delivery progress.
const route: [number, number][] = [
  [40, 60], [90, 80], [150, 110], [210, 120], [260, 170], [320, 190],
];

function pointAt(p: number): [number, number] {
  const seg = route.slice(1).map((pt, i) => Math.hypot(pt[0] - route[i][0], pt[1] - route[i][1]));
  const total = seg.reduce((a, b) => a + b, 0);
  let d = p * total;
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i]) {
      const t = d / seg[i];
      return [route[i][0] + (route[i + 1][0] - route[i][0]) * t, route[i][1] + (route[i + 1][1] - route[i][1]) * t];
    }
    d -= seg[i];
  }
  return route[route.length - 1];
}

export function ShipDemo() {
  const [choice, setChoice] = useState("delhivery");
  const [awb, setAwb] = useState("");
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    if (stage < 0 || stage >= statuses.length - 1) return;
    const id = setTimeout(() => setStage((s) => s + 1), 1500);
    return () => clearTimeout(id);
  }, [stage]);

  function book() {
    setAwb(`AWB ${Math.floor(1e10 + Math.random() * 9e10)}`);
    setStage(0);
  }

  const progress = stage < 0 ? 0 : stage / (statuses.length - 1);
  const [tx, ty] = pointAt(progress);

  return (
    <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[18rem_1fr]" data-testid="demo-shipping">
      <div className="space-y-3">
        <div className="rounded-md border border-line bg-card p-3">
          <p className="text-xs font-semibold text-muted">Mumbai 401208 → Pune 411057 · 1.2 kg</p>
          <ul className="mt-2 space-y-1.5">
            {rates.map((r) => (
              <li key={r.id}>
                <label className={`flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm transition ${choice === r.id ? "border-brand bg-card-solid" : "border-line hover:bg-card-solid"}`}>
                  <input type="radio" name="courier" checked={choice === r.id} onChange={() => setChoice(r.id)} className="accent-[var(--brand)]" disabled={stage >= 0} />
                  <span className="flex-1 text-ink">{r.name}<span className="block text-xs text-muted">{r.days}</span></span>
                  <span className="font-semibold tabular-nums text-ink">₹{r.price}</span>
                </label>
              </li>
            ))}
          </ul>
          {stage < 0 ? (
            <button type="button" className="btn-primary mt-3 w-full justify-center" onClick={book} data-testid="book-shipment">Book shipment</button>
          ) : (
            <button type="button" className="btn-ghost mt-3 w-full justify-center" onClick={() => { setStage(-1); setAwb(""); }}>New shipment</button>
          )}
        </div>
        {awb && <p className="rounded-md bg-surface-3 px-3 py-2 font-mono text-xs text-ink" data-testid="awb">{awb}</p>}
      </div>

      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-md border border-line bg-card">
          <svg viewBox="0 0 360 230" className="h-52 w-full sm:h-60">
            <defs>
              <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="var(--line)" />
              </pattern>
            </defs>
            <rect width="360" height="230" fill="url(#map-grid)" />
            <path d="M0 150 C80 120 120 200 200 170 S320 120 360 140" fill="none" stroke="color-mix(in srgb, var(--bloom-3) 40%, transparent)" strokeWidth="10" />
            <polyline points={route.map((p) => p.join(",")).join(" ")} fill="none" stroke="var(--line-strong)" strokeWidth="3" strokeDasharray="6 6" />
            <polyline
              points={route.map((p) => p.join(",")).join(" ")}
              fill="none" stroke="var(--brand)" strokeWidth="3.5" strokeLinecap="round"
              pathLength={1} strokeDasharray={`${progress} 1`} style={{ transition: "stroke-dasharray 1.2s var(--ease-fluent)" }}
            />
            <circle cx={route[0][0]} cy={route[0][1]} r="6" fill="var(--brand)" />
            <circle cx={route[route.length - 1][0]} cy={route[route.length - 1][1]} r="6" fill="var(--ok)" />
            <text x={route[0][0] - 10} y={route[0][1] - 12} fontSize="11" fill="var(--ink)">Vasai</text>
            <text x={route[route.length - 1][0] - 20} y={route[route.length - 1][1] + 22} fontSize="11" fill="var(--ink)">Pune</text>
          </svg>
          <span
            className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-on-brand shadow-lg transition-all duration-[1200ms] ease-[var(--ease-fluent)]"
            style={{ left: `${(tx / 360) * 100}%`, top: `${(ty / 230) * 100}%` }}
          >
            <Truck className="h-4 w-4" />
          </span>
        </div>
        <ol className="grid gap-2 sm:grid-cols-5" data-testid="ship-timeline">
          {statuses.map((s, i) => (
            <li key={s.label} className={`rounded-md border p-2 text-xs transition ${i <= stage ? "border-ok/40 bg-ok/10" : "border-line bg-card"}`}>
              <p className={`flex items-center gap-1 font-semibold ${i <= stage ? "text-ok" : "text-muted"}`}>
                {i <= stage && <Check className="h-3.5 w-3.5" />} {s.label}
              </p>
              <p className="mt-0.5 text-muted">{s.place}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
