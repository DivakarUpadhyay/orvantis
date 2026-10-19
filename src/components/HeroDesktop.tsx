"use client";

import { useEffect, useState } from "react";
import { Activity, Cpu, Gauge, Thermometer } from "lucide-react";
import { TitleBar } from "./Window";

/* ------------------------------------------------------------------ */
/* A decorative Windows-style "desktop": a live dashboard app window, a */
/* projects board across countries, and toast notifications. Nothing   */
/* here is fetched; values drift on timers to suggest a running plant. */
/* ------------------------------------------------------------------ */

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Dashboard window ---------------- */

type Reading = { oee: number; temp: number; vib: number; units: number; spark: number[] };
const initialReading: Reading = {
  oee: 82.4,
  temp: 61.2,
  vib: 2.8,
  units: 12480,
  spark: [40, 52, 48, 61, 58, 66, 63, 70, 68, 74, 71, 78, 76, 82],
};

function Dashboard() {
  const [r, setR] = useState(initialReading);

  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => {
      setR((p) => {
        const jitter = (n: number, d: number, min: number, max: number) =>
          Math.min(max, Math.max(min, +(n + (Math.random() - 0.5) * d).toFixed(1)));
        return {
          oee: jitter(p.oee, 1.2, 74, 91),
          temp: jitter(p.temp, 1.4, 55, 70),
          vib: jitter(p.vib, 0.4, 1.8, 4.2),
          units: p.units + Math.floor(Math.random() * 4) + 1,
          spark: [...p.spark.slice(1), jitter(p.spark[p.spark.length - 1], 12, 35, 95)],
        };
      });
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const max = Math.max(...r.spark);
  const points = r.spark.map((v, i) => `${(i / (r.spark.length - 1)) * 100},${40 - (v / max) * 36}`).join(" ");
  const metrics = [
    { icon: <Gauge className="h-3.5 w-3.5" />, label: "OEE", value: `${r.oee.toFixed(1)}%` },
    { icon: <Thermometer className="h-3.5 w-3.5" />, label: "Spindle", value: `${r.temp.toFixed(1)}°C` },
    { icon: <Activity className="h-3.5 w-3.5" />, label: "Vibration", value: `${r.vib.toFixed(1)} mm/s` },
    { icon: <Cpu className="h-3.5 w-3.5" />, label: "Units", value: r.units.toLocaleString("en-US") },
  ];

  return (
    <div className="flex">
      {/* NavigationView rail */}
      <div className="hidden w-11 shrink-0 flex-col items-center gap-3 border-r border-line bg-surface/40 py-3 sm:flex">
        {[Gauge, Activity, Cpu, Thermometer].map((I, i) => (
          <span key={i} className={`relative flex h-7 w-7 items-center justify-center rounded-md ${i === 0 ? "bg-surface-3 text-brand" : "text-muted"}`}>
            {i === 0 && <span className="absolute -left-1.5 h-3.5 w-[3px] rounded-full bg-brand" />}
            <I className="h-4 w-4" />
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Line 3 · CNC Cell</p>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-ok/10 px-2 py-0.5 text-[11px] font-semibold text-ok">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ok" /> LIVE
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-md border border-line bg-card p-2.5">
              <p className="flex items-center gap-1.5 text-[11px] text-muted">
                <span className="text-brand">{m.icon}</span>
                {m.label}
              </p>
              <p className="mt-0.5 font-mono text-base font-semibold tabular-nums text-ink">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-md border border-line bg-card p-2.5">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>Throughput (units/min)</span>
            <span className="font-mono">MQTT · OPC UA</span>
          </div>
          <svg viewBox="0 0 100 42" preserveAspectRatio="none" className="mt-1 h-14 w-full">
            <defs>
              <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--brand)" stopOpacity="0.35" />
                <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`0,42 ${points} 100,42`} fill="url(#spark-fill)" />
            <polyline points={points} fill="none" stroke="var(--brand)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Projects board window ---------------- */

const projects = [
  { name: "Smart factory MES", sector: "Automotive", place: "Pune, IN", stage: "Integration", p: 72 },
  { name: "Payment & eKYC onboarding", sector: "Fintech", place: "Hsinchu, TW", stage: "Testing", p: 88 },
  { name: "VR safety training", sector: "Energy", place: "Nashik, IN", stage: "Design", p: 34 },
  { name: "IoT fleet roll-out", sector: "Utilities", place: "Taichung, TW", stage: "Deploying", p: 61 },
  { name: "LED wall & VR booth", sector: "Expo", place: "Mumbai, IN", stage: "Scheduled", p: 18 },
];

function ProjectsBoard() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between text-[11px] text-muted">
        <span className="font-semibold text-ink">Active engagements</span>
        <span>India · Taiwan</span>
      </div>
      <ul className="space-y-1.5">
        {projects.map((pr, i) => {
          const p = Math.min(100, pr.p + ((tick + i * 3) % 14));
          return (
            <li key={pr.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 rounded-md border border-line bg-card px-2.5 py-1.5">
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-ink">{pr.name}</p>
                <p className="truncate text-[10px] text-muted">{pr.sector} · {pr.place}</p>
              </div>
              <span className="rounded-sm bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand">{pr.stage}</span>
              <div className="col-span-2 mt-1 h-1 overflow-hidden rounded-full bg-surface-3">
                <div className="h-full rounded-full bg-brand transition-all duration-1000 ease-[var(--ease-fluent)]" style={{ width: `${p}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------------- Toast notifications ---------------- */

const toasts = [
  { title: "Firmware v2.4.1 deployed", text: "1,284 sensor nodes updated over the air." },
  { title: "Payment captured", text: "UPI payment of ₹12,400 verified by webhook." },
  { title: "KYC approved", text: "Aadhaar eKYC and face match passed in 38 s." },
  { title: "RPA run complete", text: "312 supplier invoices posted to ERP." },
  { title: "Shipment booked", text: "AWB generated and pickup scheduled for 4 PM." },
];

function Toast() {
  const [i, setI] = useState(-1);

  useEffect(() => {
    if (reduced()) {
      const t = setTimeout(() => setI(0), 0);
      return () => clearTimeout(t);
    }
    const first = setTimeout(() => setI(0), 1400);
    const id = setInterval(() => setI((v) => (v + 1) % toasts.length), 4800);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  if (i < 0) return null;
  const t = toasts[i];
  return (
    <div
      key={i}
      role="status"
      className="acrylic w-72 animate-toast rounded-lg border border-line p-3.5"
      style={{ boxShadow: "var(--shadow-flyout)" }}
      data-testid="hero-toast"
    >
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-brand text-[9px] font-semibold text-on-brand">O</span>
        Orvantis Cloud
        <span className="ml-auto">now</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-ink">{t.title}</p>
      <p className="mt-0.5 text-xs text-muted">{t.text}</p>
    </div>
  );
}

/* ---------------- Scene ---------------- */

export function HeroDesktop() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-xl sm:h-[480px]" data-testid="live-telemetry" aria-label="Animated preview of Orvantis software" role="img">
      <div className="window absolute right-0 top-0 w-full animate-float-slow sm:w-[90%]">
        <TitleBar icon={<Gauge className="h-3.5 w-3.5" />} title="Orvantis FactoryOS — Smart Factory" />
        <Dashboard />
      </div>
      <div className="window absolute bottom-10 left-0 hidden w-[72%] animate-float [animation-delay:-3s] sm:block">
        <TitleBar icon={<Cpu className="h-3.5 w-3.5" />} title="Orvantis Projects — Delivery board" />
        <ProjectsBoard />
      </div>
      <div className="absolute -bottom-2 right-0 sm:right-[-12px]">
        <Toast />
      </div>
    </div>
  );
}
