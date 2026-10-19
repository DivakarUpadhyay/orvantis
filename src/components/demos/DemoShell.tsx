import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { demos, type Demo } from "@/lib/demos";
import { getService } from "@/lib/services";
import { Icon } from "../Icon";
import { WindowFrame } from "../Window";
import { DemoRenderer } from "./DemoRenderer";

// Windows Settings-style layout: demo list on the left, the running demo in an
// app window on the right, with what it shows and the related services below.
export function DemoShell({ active }: { active: Demo }) {
  return (
    <section className="container-x grid grid-cols-1 gap-6 py-10 lg:grid-cols-[17rem_minmax(0,1fr)]">
      <nav aria-label="Demos" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 px-3 text-xs font-semibold text-muted">All demos</p>
        <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {demos.map((d) => {
            const on = d.slug === active.slug;
            return (
              <li key={d.slug} className="shrink-0">
                <Link
                  href={`/demos/${d.slug}`}
                  scroll={false}
                  aria-current={on ? "page" : undefined}
                  data-testid={`demo-link-${d.slug}`}
                  className={`relative flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm transition ${
                    on ? "bg-card-solid font-semibold text-ink shadow-[var(--shadow-card)]" : "text-ink/85 hover:bg-surface-3"
                  }`}
                >
                  {on && <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-brand" />}
                  <Icon name={d.icon} className="h-4 w-4 shrink-0 text-brand" />
                  {d.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="min-w-0">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{active.title}</h2>
          <p className="mt-1 text-muted">{active.description}</p>
        </div>

        <WindowFrame icon={<Icon name={active.icon} className="h-3.5 w-3.5" />} title={active.app} className="animate-fade-in">
          <DemoRenderer key={active.slug} slug={active.slug} />
        </WindowFrame>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Info className="h-3.5 w-3.5" /> Interactive demo with sample data. Nothing you enter leaves your browser.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="card">
            <h3 className="font-semibold text-ink">What this demo shows</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {active.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-ink">
                  <Check className="h-4 w-4 text-ok" /> {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="font-semibold text-ink">Built with these services</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {active.services.map((slug) => {
                const s = getService(slug);
                return s ? (
                  <li key={slug}>
                    <Link href={`/services/${slug}`} className="group flex items-center gap-2 text-ink hover:text-brand">
                      <Icon name={s.icon} className="h-4 w-4 text-brand" /> {s.title}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
            <Link href={`/contact?service=${active.services[0]}`} className="btn-primary mt-5">
              Build something like this <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
