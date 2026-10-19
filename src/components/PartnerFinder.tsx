"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { businessTypes, partnerIndustries, partnerModels } from "@/lib/partners";
import { worldRegions } from "@/lib/world";
import { Icon } from "./Icon";

// Recommends partnership models from business type, industry and region.
export function PartnerFinder() {
  const [type, setType] = useState(businessTypes[0].id);
  const [industry, setIndustry] = useState(partnerIndustries[0]);
  const [region, setRegion] = useState<string>(worldRegions[0].name);
  const picks = businessTypes.find((b) => b.id === type)!.models.map((slug) => partnerModels.find((m) => m.slug === slug)!);

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]" data-testid="partner-finder">
      <div className="card space-y-4">
        <p className="flex items-center gap-2 font-semibold text-ink"><Sparkles className="h-4 w-4 text-brand" /> Find your partnership model</p>
        <label className="block text-sm text-ink">
          Your business
          <select className="field" value={type} onChange={(e) => setType(e.target.value)} data-testid="finder-type">
            {businessTypes.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
          </select>
        </label>
        <label className="block text-sm text-ink">
          Industry
          <select className="field" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {partnerIndustries.map((i) => <option key={i}>{i}</option>)}
          </select>
        </label>
        <label className="block text-sm text-ink">
          Region
          <select className="field" value={region} onChange={(e) => setRegion(e.target.value)}>
            {worldRegions.map((r) => <option key={r.id}>{r.name}</option>)}
            <option>India &amp; Taiwan</option>
          </select>
        </label>
      </div>

      <div>
        <p className="text-sm text-muted">
          Recommended for a <b className="text-ink">{businessTypes.find((b) => b.id === type)!.label.toLowerCase()}</b> in{" "}
          <b className="text-ink">{industry}</b>, covering <b className="text-ink">{region}</b>:
        </p>
        <ol className="mt-4 grid gap-4 md:grid-cols-3" data-testid="finder-results">
          {picks.map((m, i) => (
            <li key={`${type}-${m.slug}`} className="card card-hover animate-fade-in flex flex-col" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand text-on-brand">
                  <Icon name={m.icon} className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold text-muted">{i === 0 ? "Best match" : `Option ${i + 1}`}</span>
              </div>
              <p className="mt-3 font-semibold text-ink">{m.name}</p>
              <p className="mt-1 text-xs font-medium text-brand">{m.commercial}</p>
              <p className="mt-2 flex-1 text-sm text-muted">{m.how}</p>
              <a href={`?type=${encodeURIComponent(m.name)}#apply`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Apply as {m.name.toLowerCase()} <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
