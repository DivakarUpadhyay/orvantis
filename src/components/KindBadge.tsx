import { Code2, Cpu, Download } from "lucide-react";

export type Kind = "software" | "hardware" | "digital";

const styles: Record<Kind, { label: string; cls: string; icon: React.ReactNode }> = {
  software: { label: "Software", cls: "bg-[#005fb8]/10 text-[#005fb8] dark:bg-[#60cdff]/15 dark:text-[#60cdff]", icon: <Code2 className="h-3 w-3" /> },
  hardware: { label: "Hardware", cls: "bg-[#ca5010]/10 text-[#b3450c] dark:bg-[#f7894a]/15 dark:text-[#f7a26e]", icon: <Cpu className="h-3 w-3" /> },
  digital: { label: "Digital download", cls: "bg-[#038387]/10 text-[#027075] dark:bg-[#4cd6d9]/15 dark:text-[#4cd6d9]", icon: <Download className="h-3 w-3" /> },
};

// Colour-coded label that tells customers at a glance whether something is
// software, physical hardware or a digital download.
export function KindBadge({ kind, label }: { kind: Kind; label?: string }) {
  const s = styles[kind];
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold ${s.cls}`} data-kind={kind}>
      {s.icon}
      {label ?? s.label}
    </span>
  );
}
