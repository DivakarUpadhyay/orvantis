"use client";

import { useEffect, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, PauseCircle } from "lucide-react";

type State = "run" | "idle" | "down";
type Machine = { id: string; name: string; state: State; parts: number; temp: number };
type LogItem = { t: string; machine: string; reason: string };

const reasons = ["Tool change", "Material shortage", "Spindle overheat", "Quality check", "Program loading", "Operator break"];
const start: Machine[] = [
  { id: "CNC-01", name: "Mazak VCN-530", state: "run", parts: 412, temp: 58 },
  { id: "CNC-02", name: "DMG Mori NLX", state: "run", parts: 388, temp: 61 },
  { id: "CNC-03", name: "Haas VF-4", state: "idle", parts: 205, temp: 44 },
  { id: "CNC-04", name: "Okuma LB3000", state: "run", parts: 451, temp: 63 },
  { id: "CNC-05", name: "Fanuc Robodrill", state: "down", parts: 129, temp: 72 },
  { id: "CNC-06", name: "Doosan Puma", state: "run", parts: 367, temp: 57 },
];

const stateStyle: Record<State, { label: string; cls: string; icon: React.ReactNode }> = {
  run: { label: "Running", cls: "bg-ok/15 text-ok", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  idle: { label: "Idle", cls: "bg-warn/15 text-warn", icon: <PauseCircle className="h-3.5 w-3.5" /> },
  down: { label: "Down", cls: "bg-danger/15 text-danger", icon: <AlertTriangle className="h-3.5 w-3.5" /> },
};

const now = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export function FactoryDemo() {
  const [machines, setMachines] = useState(start);
  const [selected, setSelected] = useState("CNC-01");
  const [log, setLog] = useState<LogItem[]>([{ t: "08:42:10", machine: "CNC-05", reason: "Spindle overheat" }]);

  useEffect(() => {
    const id = setInterval(() => {
      setMachines((ms) => {
        const i = Math.floor(Math.random() * ms.length);
        const roll = Math.random();
        const next: State = roll < 0.65 ? "run" : roll < 0.85 ? "idle" : "down";
        if (next === "down" && ms[i].state !== "down") {
          const reason = reasons[Math.floor(Math.random() * reasons.length)];
          setLog((l) => [{ t: now(), machine: ms[i].id, reason }, ...l].slice(0, 6));
        }
        return ms.map((m, j) => ({
          ...m,
          state: j === i ? next : m.state,
          parts: m.state === "run" ? m.parts + Math.floor(Math.random() * 3) + 1 : m.parts,
          temp: Math.round(Math.min(78, Math.max(40, m.temp + (Math.random() - 0.5) * 3))),
        }));
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const running = machines.filter((m) => m.state === "run").length;
  const availability = Math.round((running / machines.length) * 100);
  const performance = 91;
  const quality = 98;
  const oee = Math.round((availability * performance * quality) / 10000);
  const sel = machines.find((m) => m.id === selected)!;

  return (
    <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_16rem]" data-testid="demo-factory">
      <div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { k: "OEE", v: `${oee}%` },
            { k: "Availability", v: `${availability}%` },
            { k: "Performance", v: `${performance}%` },
            { k: "Quality", v: `${quality}%` },
          ].map((x) => (
            <div key={x.k} className="rounded-md border border-line bg-card p-3">
              <p className="text-xs text-muted">{x.k}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-ink" data-testid={`kpi-${x.k.toLowerCase()}`}>{x.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {machines.map((m) => {
            const st = stateStyle[m.state];
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelected(m.id)}
                aria-pressed={selected === m.id}
                className={`reveal rounded-md border p-3 text-left transition ${
                  selected === m.id ? "border-brand bg-card-solid" : "border-line bg-card hover:bg-card-solid"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-ink">{m.id}</span>
                  <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-semibold ${st.cls}`}>
                    {st.icon} {st.label}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-muted">{m.name}</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-3">
                  <div
                    className={`h-full transition-all duration-700 ${m.state === "run" ? "bg-ok" : m.state === "idle" ? "bg-warn" : "bg-danger"}`}
                    style={{ width: `${Math.min(100, m.parts / 5)}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-md border border-line bg-card p-3">
          <p className="text-xs font-semibold text-muted">Selected machine</p>
          <p className="mt-1 font-semibold text-ink">{sel.id} · {sel.name}</p>
          <dl className="mt-2 grid grid-cols-2 gap-y-1 text-xs">
            <dt className="text-muted">Status</dt>
            <dd className="text-ink">{stateStyle[sel.state].label}</dd>
            <dt className="text-muted">Parts today</dt>
            <dd className="tabular-nums text-ink">{sel.parts}</dd>
            <dt className="text-muted">Spindle temp</dt>
            <dd className="tabular-nums text-ink">{sel.temp} °C</dd>
          </dl>
        </div>
        <div className="rounded-md border border-line bg-card p-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Activity className="h-3.5 w-3.5 text-brand" /> Downtime log
          </p>
          <ul className="mt-2 space-y-1.5 text-xs" data-testid="downtime-log">
            {log.map((l, i) => (
              <li key={`${l.t}-${i}`} className="flex animate-fade-in justify-between gap-2">
                <span className="text-ink">{l.machine} · {l.reason}</span>
                <span className="shrink-0 font-mono text-muted">{l.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
