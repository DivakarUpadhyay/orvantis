"use client";

import { useEffect, useRef, useState } from "react";
import { Cpu, Rocket, RotateCcw } from "lucide-react";

type Dev = { id: string; online: boolean; version: string; progress: number; state: "idle" | "updating" | "done" | "failed" | "retrying" };

const OLD = "v2.4.1";
const NEW = "v2.5.0";
const makeFleet = (): Dev[] =>
  Array.from({ length: 24 }, (_, i) => ({
    id: `node-${String(i + 1).padStart(2, "0")}`,
    online: i !== 7 && i !== 19,
    version: OLD,
    progress: 0,
    state: "idle",
  }));

// Devices update in three waves: canary (3), 30%, then the rest.
const waves = [[0, 1, 2], [3, 4, 5, 6, 8, 9], [10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23]];

export function FleetDemo() {
  const [fleet, setFleet] = useState(makeFleet);
  const [wave, setWave] = useState(-1);
  const failedOnce = useRef(false);

  useEffect(() => {
    if (wave < 0 || wave >= waves.length) return;
    const ids = new Set(waves[wave]);
    const tick = setInterval(() => {
      setFleet((f) => {
        const next = f.map((d, i) => {
          if (!ids.has(i) || !d.online || d.state === "done") return d;
          if (d.state === "failed") return { ...d, state: "retrying" as const, progress: 0 };
          const p = Math.min(100, d.progress + 8 + Math.random() * 14);
          // One device fails mid-update once, then succeeds on retry.
          if (i === 11 && !failedOnce.current && p > 55) {
            failedOnce.current = true;
            return { ...d, state: "failed" as const, progress: p };
          }
          return p >= 100 ? { ...d, progress: 100, state: "done" as const, version: NEW } : { ...d, progress: p, state: d.state === "retrying" ? "retrying" as const : "updating" as const };
        });
        const waveDone = waves[wave].every((i) => !next[i].online || next[i].state === "done");
        if (waveDone) setTimeout(() => setWave((w) => w + 1), 500);
        return next;
      });
    }, 260);
    return () => clearInterval(tick);
  }, [wave]);

  function deploy() {
    failedOnce.current = false;
    setFleet(makeFleet());
    setWave(0);
  }

  const online = fleet.filter((d) => d.online);
  const updated = fleet.filter((d) => d.version === NEW).length;
  const running = wave >= 0 && wave < waves.length;

  return (
    <div className="p-4 sm:p-5" data-testid="demo-fleet">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-md border border-line bg-card px-2.5 py-1.5 text-ink">Online <b>{online.length}/{fleet.length}</b></span>
          <span className="rounded-md border border-line bg-card px-2.5 py-1.5 text-ink">On {NEW} <b data-testid="fleet-updated">{updated}</b></span>
          <span className="rounded-md border border-line bg-card px-2.5 py-1.5 text-ink">
            Wave <b>{running ? `${wave + 1} / ${waves.length}` : wave >= waves.length ? "complete" : "—"}</b>
          </span>
        </div>
        <button type="button" className="btn-primary" onClick={deploy} disabled={running} data-testid="deploy-ota">
          {wave >= waves.length ? <><RotateCcw className="h-4 w-4" /> Reset and deploy again</> : <><Rocket className="h-4 w-4" /> Deploy {NEW}</>}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {fleet.map((d) => {
          const color = !d.online
            ? "border-line bg-surface-3 opacity-50"
            : d.state === "done"
              ? "border-ok/40 bg-ok/10"
              : d.state === "failed"
                ? "border-danger/50 bg-danger/10"
                : d.state === "updating" || d.state === "retrying"
                  ? "border-brand/50 bg-brand/10"
                  : "border-line bg-card";
          return (
            <div key={d.id} className={`rounded-md border p-2 transition ${color}`}>
              <div className="flex items-center justify-between">
                <Cpu className="h-3.5 w-3.5 text-muted" />
                <span className={`h-1.5 w-1.5 rounded-full ${d.online ? "bg-ok" : "bg-muted"}`} />
              </div>
              <p className="mt-1 font-mono text-[11px] text-ink">{d.id}</p>
              <p className="font-mono text-[10px] text-muted">
                {!d.online ? "offline" : d.state === "failed" ? "failed — retry" : d.state === "retrying" ? "retrying…" : d.version}
              </p>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface-3">
                <div className={`h-full transition-all duration-200 ${d.state === "failed" ? "bg-danger" : d.state === "done" ? "bg-ok" : "bg-brand"}`} style={{ width: `${d.progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">Offline devices receive the update automatically when they reconnect.</p>
    </div>
  );
}
