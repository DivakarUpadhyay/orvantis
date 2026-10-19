"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { categories, categoryIdsByGroup, inCategory, services, type CategoryId, type ServiceGroup } from "@/lib/services";
import { KindBadge } from "./KindBadge";
import { Icon } from "./Icon";
import { ServiceCard } from "./ui";

type Filter = CategoryId | "all";

export function ServicesExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const fromUrl = params.get("category");
  const category: Filter = fromUrl && fromUrl in categories ? (fromUrl as CategoryId) : "all";
  const [query, setQuery] = useState("");

  function setCategory(next: Filter) {
    const qs = next === "all" ? "" : `?category=${next}`;
    router.replace(`${pathname}${qs}`, { scroll: false });
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (category !== "all" && !inCategory(s, category)) return false;
      if (!q) return true;
      return [s.title, s.summary, s.description, ...s.tech, ...s.capabilities].join(" ").toLowerCase().includes(q);
    });
  }, [category, query]);

  const tabButton = (id: Filter, label: string) => (
    <button
      key={id}
      type="button"
      role="tab"
      aria-selected={category === id}
      data-testid={`filter-${id}`}
      onClick={() => setCategory(id)}
      className={`whitespace-nowrap rounded-md border px-3.5 py-1.5 text-sm font-medium transition ${
        category === id ? "border-brand bg-brand text-on-brand" : "border-line bg-card-solid text-ink hover:border-brand hover:text-brand"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div role="tablist" aria-label="Service categories" className="space-y-3">
          <div className="flex flex-wrap gap-2">{tabButton("all", "All services")}</div>
          {(["software", "hardware"] as ServiceGroup[]).map((g) => (
            <div key={g} className="flex flex-col gap-2 sm:flex-row sm:items-start" data-testid={`filter-group-${g}`}>
              <span className="w-28 shrink-0 pt-1.5"><KindBadge kind={g} /></span>
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
                {categoryIdsByGroup(g).map((id) => tabButton(id, categories[id].title))}
              </div>
            </div>
          ))}
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">Search services</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. firmware, MES, React…"
            data-testid="service-search"
            className="field mt-0 pl-10"
          />
        </label>
      </div>

      <p className="mt-6 min-h-5 text-sm text-muted" aria-live="polite" data-testid="result-count">
        {query.trim() ? `Results for “${query.trim()}”` : ""}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 space-y-16">
          {(category === "all" ? (["software", "hardware"] as ServiceGroup[]) : [categories[category].group]).map((g) => {
            const cats = (category === "all" ? categoryIdsByGroup(g) : [category]).filter((c) =>
              results.some((s) => (category === "all" ? s.category === c : true)),
            );
            if (cats.length === 0) return null;
            return (
              <div key={g} id={`${g}-services`} className="scroll-mt-24" data-testid={`group-block-${g}`}>
                {category === "all" && (
                  <div className="mb-8 flex items-center gap-3 rounded-md border border-line bg-card px-4 py-3 backdrop-blur">
                    <KindBadge kind={g} />
                    <h2 className="text-lg font-semibold text-ink">{g === "software" ? "Software & Digital Services" : "Hardware & Engineering Services"}</h2>
                  </div>
                )}
                <div className="space-y-12">
                  {cats.map((c) => (
                    <section key={c} aria-labelledby={`cat-${c}`} data-testid={`category-section-${c}`}>
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                        <h3 id={`cat-${c}`} className="flex items-center gap-3 text-xl font-semibold text-ink">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                            <Icon name={categories[c].icon} className="h-5 w-5" />
                          </span>
                          {categories[c].title}
                        </h3>
                        <Link href={`/services/category/${categories[c].slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                          Category overview <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {results
                          .filter((s) => (category === "all" ? s.category === c : true))
                          .map((s) => (
                            <ServiceCard key={s.slug} service={s} />
                          ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-line p-12 text-center" data-testid="no-results">
          <p className="font-semibold text-ink">No services match “{query}”.</p>
          <p className="mt-2 text-sm text-muted">We probably still do it. Ask us directly.</p>
          <button type="button" className="btn-ghost mt-6" onClick={() => setQuery("")}>
            <X className="h-4 w-4" aria-hidden="true" /> Clear search
          </button>
        </div>
      )}
    </div>
  );
}
