// An abstract "bloom" of translucent petals that slowly rotates behind hero
// sections — our own take on the soft, layered light of Windows 11 wallpapers.
export function Bloom({ className = "" }: { className?: string }) {
  const petals = [0, 36, 72, 108, 144];
  return (
    <div className={`pointer-events-none absolute -z-10 ${className}`} aria-hidden="true">
      <svg viewBox="-200 -200 400 400" className="h-full w-full animate-bloom opacity-80 blur-[2px] dark:opacity-70">
        <defs>
          <linearGradient id="petal-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--bloom-3)" stopOpacity="0.85" />
            <stop offset="1" stopColor="var(--bloom-1)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="petal-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--bloom-2)" stopOpacity="0.8" />
            <stop offset="1" stopColor="var(--bloom-1)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {petals.map((deg, i) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-70"
            rx="62"
            ry="128"
            fill={i % 2 ? "url(#petal-b)" : "url(#petal-a)"}
            transform={`rotate(${deg * 2})`}
            style={{ mixBlendMode: "screen" }}
          />
        ))}
        <circle r="46" fill="var(--bloom-1)" opacity="0.35" />
      </svg>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,transparent_55%,var(--surface))]" />
    </div>
  );
}
