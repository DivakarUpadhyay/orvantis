import { Minus, Square, X } from "lucide-react";

// Windows 11 style app window: title bar with icon, title and caption buttons.
export function TitleBar({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex h-8 items-center justify-between border-b border-line bg-surface/60 pl-3 text-xs text-ink">
      <span className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 text-brand">{icon}</span>
        <span className="truncate">{title}</span>
      </span>
      <span className="flex shrink-0" aria-hidden="true">
        <span className="caption-btn"><Minus className="h-3.5 w-3.5" /></span>
        <span className="caption-btn"><Square className="h-3 w-3" /></span>
        <span className="caption-btn close"><X className="h-3.5 w-3.5" /></span>
      </span>
    </div>
  );
}

export function WindowFrame({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`window ${className}`}>
      <TitleBar icon={icon} title={title} />
      {children}
    </div>
  );
}
