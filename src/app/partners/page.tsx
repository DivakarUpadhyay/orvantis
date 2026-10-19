import { Check } from "lucide-react";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PartnerFinder } from "@/components/PartnerFinder";
import { PartnerForm } from "@/components/PartnerForm";
import { CtaBanner, PageHero, SectionHeading } from "@/components/ui";
import { partnerIndustries, partnerModels, partnerSteps } from "@/lib/partners";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { worldRegions } from "@/lib/world";

export const metadata = pageMeta({
  title: "Partner Programme — Referral, Reseller, White-Label & More",
  description:
    "Partner with us in India and Taiwan: referral, reseller and distributor, white-label, technology, implementation, OEM, co-development, regional, event, agency and startup partnership models across all industries.",
  path: "/partners",
  keywords: ["technology partner programme", "software reseller program", "white label software development", "IoT distributor partnership", "referral partner program", "system integrator partnership"],
});

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Partners", path: "/partners" }])} />
      <PageHero
        section="company"
        eyebrow="Partner programme"
        title={
          <>
            Grow with us <span className="text-gradient">in India and Taiwan</span>
          </>
        }
        text={`Flexible partnership models for companies of every kind, across every industry in India and Taiwan. Choose how you want to work with us; we bring the technology, products and delivery.`}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#apply" className="btn-primary px-6 py-2.5">Apply to partner</a>
          <a href="#finder" className="btn-ghost px-6 py-2.5">Find your model</a>
        </div>
      </PageHero>

      <section className="container-x py-14" aria-labelledby="models">
        <SectionHeading eyebrow="Partnership models" title={<span id="models">Choose how we work together</span>} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-testid="partner-models">
          {partnerModels.map((m) => (
            <article key={m.slug} id={m.slug} className="card card-hover flex scroll-mt-24 flex-col" data-reveal data-testid="partner-model">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-card-solid text-brand">
                  <Icon name={m.icon} className="h-5 w-5" />
                </span>
                <span className="rounded-sm bg-brand/10 px-2 py-0.5 text-right text-[11px] font-semibold text-brand">{m.commercial}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{m.name}</h3>
              <p className="mt-1 text-sm text-muted"><b className="font-medium text-ink">For: </b>{m.forWho}</p>
              <p className="mt-2 text-sm text-muted"><b className="font-medium text-ink">How it works: </b>{m.how}</p>
              <ul className="mt-3 flex-1 space-y-1.5 text-sm">
                {m.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" /> {b}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.areas.map((a) => <span key={a} className="rounded-sm bg-surface-3 px-2 py-0.5 text-[11px] text-muted">{a}</span>)}
              </div>
              <a href={`?type=${encodeURIComponent(m.name)}#apply`} className="btn-ghost mt-5 justify-center">Apply as {m.name.toLowerCase()}</a>
            </article>
          ))}
        </div>
      </section>

      <section id="finder" className="acrylic scroll-mt-20 border-y border-line py-14">
        <div className="container-x">
          <SectionHeading eyebrow="Partner finder" title="Which model fits your business?" text="Tell us what you do, your industry and where you operate." />
          <div className="mt-8">
            <PartnerFinder />
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Markets" title="Partners in India and Taiwan" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2" data-testid="partner-regions">
            {worldRegions.map((r) => (
              <div key={r.id} className="card p-4" data-reveal>
                <p className="flex items-center gap-2 font-semibold text-ink"><Icon name="Globe" className="h-4 w-4 text-brand" /> {r.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{r.areas.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Industries" title="Across every industry" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {partnerIndustries.map((i) => (
              <li key={i} className="rounded-md border border-line bg-card px-3 py-1.5 text-sm text-ink backdrop-blur" data-reveal>{i}</li>
            ))}
          </ul>
          <h3 className="mt-10 text-lg font-semibold text-ink">How partnership works</h3>
          <ol className="mt-4 space-y-3">
            {partnerSteps.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-on-brand">{i + 1}</span>
                <div>
                  <p className="font-semibold text-ink">{s.title}</p>
                  <p className="text-sm text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="apply" className="container-x scroll-mt-20 pb-16">
        <div className="mx-auto max-w-3xl">
          <SectionHeading title="Apply to become a partner" text="It takes two minutes. Our partnerships team replies within two business days." center />
          <div className="mt-8">
            <PartnerForm />
          </div>
        </div>
      </section>

      <CtaBanner title="Prefer to talk first?" text="Tell us about your business and we'll suggest the right partnership model." />
    </>
  );
}
