import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { Service } from "@/lib/services";
import { categories } from "@/lib/services";
import { KindBadge } from "./KindBadge";
import type { SectionId } from "@/lib/sections";
import { Bloom } from "./Bloom";
import { SectionLabel } from "./SectionLabel";
import { Icon } from "./Icon";

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`} data-reveal>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h-section mt-4">{title}</h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  children,
  section,
  trail,
}: {
  eyebrow: string;
  /** Top-level site section; renders a colour-coded breadcrumb instead of the plain eyebrow. */
  section?: SectionId;
  trail?: { label: string; href?: string }[];
  title: React.ReactNode;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
      <Bloom className="-right-40 -top-56 h-[34rem] w-[34rem] opacity-60" />
      <div className="container-x py-16 sm:py-24">
        {section ? <SectionLabel section={section} trail={trail ?? [{ label: eyebrow }]} /> : <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{text}</p>
        {children}
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card card-hover group flex h-full flex-col"
      data-testid="service-card"
      data-category={service.category}
      data-categories={[service.category, ...(service.alsoIn ?? [])].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-card-solid text-brand transition duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-on-brand">
          <Icon name={service.icon} className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="flex flex-col items-end gap-1">
          <KindBadge kind={categories[service.category].group} />
          <span className="text-[11px] text-muted">{categories[service.category].short}</span>
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-ink">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
        Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function CtaBanner({
  title = "Have a project in mind?",
  text = "Tell us what you are building. Our team will get back to you within one business day with clear next steps.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-x py-20" data-reveal>
      <div className="relative isolate overflow-hidden rounded-md bg-[#003e7e] px-6 py-14 text-center text-white sm:px-16" style={{ boxShadow: "var(--shadow-window)" }}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_100%_0%,#0a74da_0%,transparent_60%),radial-gradient(60%_100%_at_0%_100%,#5b3fbf_0%,transparent_65%)]" aria-hidden="true" />
        <Bloom className="-right-32 -top-40 h-[28rem] w-[28rem] !z-[-5] opacity-50" />
        <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/85">{text}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-[#005fb8] shadow-sm transition hover:bg-white/90 active:scale-[0.98]"
          >
            Start a conversation <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 active:scale-[0.98]"
          >
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-card backdrop-blur-xl" data-testid="faq">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-4 transition hover:bg-surface-3 open:bg-card [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
            {f.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
