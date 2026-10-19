import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-brand)" />
            <stop offset="1" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#logo-g)" />
        <circle cx="16" cy="16" r="7.5" fill="none" stroke="#fff" strokeWidth="2.6" />
        <ellipse cx="16" cy="16" rx="12" ry="4.2" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.3" transform="rotate(-30 16 16)" />
        <circle cx="25.5" cy="10.5" r="2" fill="#fff" />
      </svg>
      <span className="text-lg font-semibold tracking-tight text-ink">
        Orvantis<span className="text-brand"> Tech</span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
