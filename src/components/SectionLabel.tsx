import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { sections, type SectionId } from "@/lib/sections";
import { Icon } from "./Icon";

// Colour-coded "you are here" bar: section pill + breadcrumb trail.
export function SectionLabel({ section, trail = [] }: { section: SectionId; trail?: { label: string; href?: string }[] }) {
  const s = sections[section];
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm" data-testid="section-label" data-section={section}>
      <Link
        href={s.href}
        className="inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-white"
        style={{ background: s.color }}
      >
        <Icon name={s.icon} className="h-3.5 w-3.5" /> {s.label}
      </Link>
      {trail.map((t, i) => (
        <span key={`${t.label}-${i}`} className="inline-flex items-center gap-1.5 text-muted">
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          {t.href ? (
            <Link href={t.href} className="hover:text-brand">{t.label}</Link>
          ) : (
            <span className="text-ink" aria-current="page">{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
