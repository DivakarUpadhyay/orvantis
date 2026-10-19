import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, orderedCategoryIds, servicesByCategory, type CategoryId } from "@/lib/services";
import { Icon } from "./Icon";

// Windows "live tiles": each practice is a coloured tile whose face peeks up
// to reveal the services inside it, on a staggered loop (pure CSS).
const tileColors: Record<CategoryId, string> = {
  software: "from-[#0063b1] to-[#004e8c]",
  hardware: "from-[#038387] to-[#005b70]",
  manufacturing: "from-[#ca5010] to-[#8e3a0b]",
  integrations: "from-[#744da9] to-[#4b2f7a]",
  automation: "from-[#107c10] to-[#0b5a0b]",
  immersive: "from-[#c239b3] to-[#7a1f70]",
  events: "from-[#d13438] to-[#8a1f23]",
};

export function LiveTiles() {
  const ids: CategoryId[] = orderedCategoryIds;
  return (
    <div className="grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[12.5rem] lg:grid-cols-4" data-testid="live-tiles">
      {ids.map((id, i) => {
        const cat = categories[id];
        const list = servicesByCategory(id);
        const big = i === 0;
        return (
          <Link
            key={id}
            href={`/services/category/${cat.slug}`}
            data-testid="pillar"
            data-reveal
            className={`reveal group relative overflow-hidden rounded-lg bg-gradient-to-br text-white shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-flyout)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${tileColors[id]} ${
              big ? "col-span-2 row-span-2" : i >= 5 ? "col-span-2" : ""
            }`}
          >
            <div
              className="tile-peek absolute inset-x-0 top-0 h-[200%] group-hover:[animation-play-state:paused]"
              style={{ "--peek-delay": `${i * 1.7}s`, "--peek-duration": `${9 + i}s` } as React.CSSProperties}
            >
              {/* Face */}
              <div className="flex h-1/2 flex-col justify-between p-5">
                <div className="flex items-start justify-between">
                  <Icon name={cat.icon} className={big ? "h-12 w-12" : "h-9 w-9"} strokeWidth={1.5} />
                  <span className="rounded-sm bg-black/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">{cat.group}</span>
                </div>
                <div>
                  <p className={`font-semibold leading-tight ${big ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"}`}>{cat.title}</p>
                  {big && <p className="mt-2 max-w-sm text-sm text-white/85">{cat.blurb}</p>}
                </div>
              </div>
              {/* Back: services peek */}
              <div className="flex h-1/2 flex-col justify-end bg-black/15 p-5">
                <ul className={`space-y-1 ${big ? "text-base" : "text-xs sm:text-sm"}`}>
                  {list.slice(0, big ? 7 : 4).map((s) => (
                    <li key={s.slug} className="truncate">{s.title}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs font-semibold text-white/80">{cat.short}</p>
              </div>
            </div>
            <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}
