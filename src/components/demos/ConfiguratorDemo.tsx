"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

const colors = [
  { id: "graphite", name: "Graphite", hex: "#2b2f36" },
  { id: "arctic", name: "Arctic White", hex: "#e9edf2" },
  { id: "ocean", name: "Ocean Blue", hex: "#0063b1" },
  { id: "coral", name: "Coral", hex: "#e05a47" },
];
const connectivity = [
  { id: "wifi", name: "Wi-Fi + BLE", price: 0 },
  { id: "lte", name: "Wi-Fi + LTE-M", price: 1400 },
  { id: "lora", name: "LoRaWAN", price: 900 },
];
const BASE = 4900;

// CSS 3D box rendered with preserve-3d; drag to rotate, auto-spins when idle.
export function ConfiguratorDemo() {
  const [color, setColor] = useState(colors[2]);
  const [conn, setConn] = useState(connectivity[0]);
  const [qty, setQty] = useState(2);
  const [rot, setRot] = useState({ x: -18, y: 35 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const idle = useRef(true);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (idle.current) setRot((r) => ({ ...r, y: r.y + 0.6 }));
    }, 30);
    return () => clearInterval(id);
  }, []);

  const light = color.id === "arctic";
  const face = (extra: string, transform: string, children?: React.ReactNode) => (
    <div
      className={`absolute flex items-center justify-center border ${light ? "border-black/10" : "border-white/10"} ${extra}`}
      style={{ transform, background: color.hex, backfaceVisibility: "hidden" }}
    >
      {children}
    </div>
  );
  const W = 160, H = 100, D = 100;
  const price = (BASE + conn.price) * qty;

  return (
    <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_17rem]" data-testid="demo-configurator">
      <div
        className="relative flex h-72 cursor-grab touch-none select-none items-center justify-center overflow-hidden rounded-md border border-line bg-[radial-gradient(circle_at_50%_40%,var(--card-solid),var(--surface-3))] active:cursor-grabbing sm:h-80"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY };
          idle.current = false;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          const dy = e.clientY - drag.current.y;
          drag.current = { x: e.clientX, y: e.clientY };
          setRot((r) => ({ x: Math.max(-70, Math.min(70, r.x - dy * 0.5)), y: r.y + dx * 0.5 }));
        }}
        onPointerUp={() => {
          drag.current = null;
          setTimeout(() => (idle.current = true), 1500);
        }}
      >
        <div style={{ perspective: 800 }}>
          <div
            className="relative transition-[background] duration-500"
            style={{ width: W, height: H, transformStyle: "preserve-3d", transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
          >
            {face("", `translateZ(${D / 2}px)`, (
              <div className="flex flex-col items-center gap-2">
                <span className={`text-sm font-semibold tracking-widest ${light ? "text-black/70" : "text-white/85"}`}>ORVANTIS</span>
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#4cc2ff] shadow-[0_0_10px_#4cc2ff]" />
              </div>
            ))}
            {face("", `rotateY(180deg) translateZ(${D / 2}px)`, <span className={`font-mono text-[9px] ${light ? "text-black/50" : "text-white/50"}`}>{conn.name}</span>)}
            {face("", `rotateY(90deg) translateZ(${W / 2}px)`)}
            {face("", `rotateY(-90deg) translateZ(${W / 2}px)`)}
            {face("", `rotateX(90deg) translateZ(${H / 2}px)`)}
            {face("", `rotateX(-90deg) translateZ(${H / 2}px)`)}
          </div>
        </div>
        <style>{`[data-testid="demo-configurator"] [style*="preserve-3d"] > div:nth-child(3),[data-testid="demo-configurator"] [style*="preserve-3d"] > div:nth-child(4){width:${D}px;height:${H}px;left:${(W - D) / 2}px}[data-testid="demo-configurator"] [style*="preserve-3d"] > div:nth-child(5),[data-testid="demo-configurator"] [style*="preserve-3d"] > div:nth-child(6){width:${W}px;height:${D}px;top:${(H - D) / 2}px}[data-testid="demo-configurator"] [style*="preserve-3d"] > div:nth-child(1),[data-testid="demo-configurator"] [style*="preserve-3d"] > div:nth-child(2){width:${W}px;height:${H}px}`}</style>
        <p className="absolute bottom-2 left-3 text-[11px] text-muted">Drag to rotate</p>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <p className="font-semibold text-ink">Smart Sensor Hub</p>
          <p className="text-xs text-muted">Colour: {color.name}</p>
          <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Colour">
            {colors.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={color.id === c.id}
                aria-label={c.name}
                onClick={() => setColor(c)}
                className={`h-8 w-8 rounded-full border-2 transition ${color.id === c.id ? "scale-110 border-brand" : "border-line"}`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted">Connectivity</p>
          <div className="mt-1.5 space-y-1.5">
            {connectivity.map((c) => (
              <label key={c.id} className={`flex cursor-pointer items-center gap-2 rounded-md border p-2 transition ${conn.id === c.id ? "border-brand bg-card-solid" : "border-line hover:bg-card-solid"}`}>
                <input type="radio" name="conn" checked={conn.id === c.id} onChange={() => setConn(c)} className="accent-[var(--brand)]" />
                <span className="flex-1 text-ink">{c.name}</span>
                <span className="text-xs text-muted">{c.price ? `+₹${c.price.toLocaleString("en-IN")}` : "Included"}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted">Quantity</span>
          <div className="flex items-center rounded-md border border-line bg-card-solid">
            <button type="button" className="p-2 text-muted hover:text-ink" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
            <span className="w-8 text-center tabular-nums text-ink" data-testid="config-qty">{qty}</span>
            <button type="button" className="p-2 text-muted hover:text-ink" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
          </div>
        </div>
        <div className="rounded-md border border-line bg-card p-3">
          <p className="text-xs text-muted">Total (excl. GST)</p>
          <p className="text-2xl font-semibold tabular-nums text-ink" data-testid="config-price">₹{price.toLocaleString("en-IN")}</p>
        </div>
      </div>
    </div>
  );
}
