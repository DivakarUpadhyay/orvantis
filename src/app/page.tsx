import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Bloom } from "@/components/Bloom";
import { HeroDesktop } from "@/components/HeroDesktop";
import { LiveTiles } from "@/components/LiveTiles";
import { RotatingWord } from "@/components/RotatingWord";
import { CtaBanner, Faq, SectionHeading, ServiceCard } from "@/components/ui";
import { faqs, industries, processSteps, sampleEngagements, techStack } from "@/lib/content";
import { demos } from "@/lib/demos";
import { locations } from "@/lib/locations";
import { partnerModels } from "@/lib/partners";
import { productCategories } from "@/lib/products";
import { sections } from "@/lib/sections";
import { services } from "@/lib/services";

export const metadata = { alternates: { canonical: "/" } };

const featured = [
  "custom-software-development",
  "web-application-development",
  "iot-solutions",
  "embedded-firmware",
  "robotic-process-automation",
  "payment-gateway-integration",
];

const layers = [
  { title: "Business apps", text: "ERP · MES · Dashboards · Mobile", icon: "Layers" },
  { title: "Cloud & data", text: "IoT hub · Time-series DB · AI models", icon: "Cloud" },
  { title: "Edge & connectivity", text: "Gateways · OPC UA · MQTT · LoRaWAN", icon: "Server" },
  { title: "Devices & machines", text: "Firmware · Sensors · PLCs · Robots", icon: "Cpu" },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <Bloom className="-right-48 -top-40 h-[44rem] w-[44rem]" />
        <div className="container-x grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="eyebrow">Software · IoT · Automation · AR/VR · Integrations</span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Software that connects your business to{" "}
              <RotatingWord words={["machines", "devices", "payments", "customers", "factories"]} />
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Orvantis Technologies is a custom software development company. One team builds your web and mobile apps,
              enterprise systems, firmware, IoT platforms, smart-factory solutions and the payment, KYC, messaging and
              logistics integrations that tie them together.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary px-6 py-2.5" data-testid="hero-cta">
                Get a free consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/services" className="btn-ghost px-6 py-2.5">
                View all services
              </Link>
              <Link href="/demos" className="btn-ghost px-6 py-2.5" data-testid="hero-demos">
                Try live demos
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {["NDA from day one", "You own all code & designs", "Reply within 1 business day"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-ok" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <HeroDesktop />
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="acrylic border-y border-line" aria-label="Why choose us">
        <ul className="container-x grid grid-cols-2 gap-6 py-10 lg:grid-cols-4" data-testid="value-strip">
          {[
            { icon: "ShieldCheck", title: "NDA from day one", text: "Your ideas and data stay protected." },
            { icon: "BadgeCheck", title: "You own everything", text: "Source code, designs and IP are yours." },
            { icon: "Globe", title: "India & Taiwan", text: "Headquartered in India, serving Taiwan too." },
            { icon: "Users", title: "One accountable team", text: "From strategy to support." },
          ].map((v) => (
            <li key={v.title} className="flex gap-3" data-reveal>
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                <Icon name={v.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-ink">{v.title}</span>
                <span className="block text-sm text-muted">{v.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Site directory */}
      <section className="container-x pt-20" aria-labelledby="explore-h">
        <SectionHeading
          eyebrow="Explore"
          title={<span id="explore-h">Find what you need</span>}
          text="Every part of the site, at a glance. Services are work we do for you; Products are hardware you buy; Marketplace is for sellers and resellers."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="site-directory">
          {Object.values(sections).map((sec) => (
            <div key={sec.id} className="card card-hover flex flex-col" data-reveal data-testid={`directory-${sec.id}`}>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white" style={{ background: sec.color }}>
                  <Icon name={sec.icon} className="h-5 w-5" />
                </span>
                <Link href={sec.href} className="text-lg font-semibold text-ink hover:text-brand">{sec.label}</Link>
              </div>
              <p className="mt-3 flex-1 text-sm text-muted">{sec.text}</p>
              <ul className="mt-4 space-y-1 border-t border-line pt-3 text-sm">
                {sec.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex items-center gap-1 text-ink hover:text-brand">
                      <ArrowRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" /> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="container-x py-20" aria-labelledby="pillars">
        <SectionHeading
          eyebrow="What we do"
          title={<span id="pillars">Every practice, one team</span>}
          text="From code and circuits to automation, AR/VR and live events, we cover the whole stack, so nothing gets lost between vendors."
        />
        <div className="mt-12">
          <LiveTiles />
        </div>
      </section>

      {/* Featured services */}
      <section className="bg-surface-2 py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Popular services" title="Where clients start with us" />
            <Link href="/services" className="btn-ghost">
              Browse all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((slug) => {
              const s = services.find((x) => x.slug === slug)!;
              return (
                <div key={slug} data-reveal>
                  <ServiceCard service={s} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live demos */}
      <section className="container-x py-20" aria-labelledby="demos-h">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Live demos"
            title={<span id="demos-h">See our solutions in action</span>}
            text="Interactive demos you can try right now, no sign-up needed."
          />
          <Link href="/demos" className="btn-ghost">
            All demos <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {demos.slice(0, 8).map((d) => (
            <Link key={d.slug} href={`/demos/${d.slug}`} className="card card-hover group flex flex-col p-5" data-reveal data-testid="home-demo">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand text-on-brand transition group-hover:scale-110">
                <Icon name={d.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 font-semibold text-ink">{d.title}</p>
              <p className="mt-1 flex-1 text-sm text-muted">{d.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Try demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Wholesale products */}
      <section className="acrylic border-y border-line py-20" aria-labelledby="products-h">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Products · Wholesale"
              title={<span id="products-h">Technology hardware in bulk</span>}
              text="IoT devices, AR/VR hardware, embedded boards and semiconductor equipment with OEM options and delivery across India and Taiwan."
            />
            <Link href="/products#rfq" className="btn-primary">
              Request a quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.values(productCategories).map((c) => (
              <Link key={c.id} href={`/products/category/${c.slug}`} className="card card-hover group flex flex-col" data-reveal>
                <Icon name={c.icon} className="h-8 w-8 text-brand" strokeWidth={1.5} />
                <p className="mt-4 font-semibold text-ink">{c.title}</p>
                <p className="mt-1 flex-1 text-sm text-muted">{c.blurb}</p>
                <p className="mt-4 text-xs font-semibold text-brand">View products →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="container-x py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Partner programme"
            title="Partner with us in India and Taiwan"
            text="Referral, reseller, white-label, implementation, OEM, co-development and more. Choose the model that fits your business."
          />
          <div className="flex flex-wrap gap-2" data-reveal>
            {partnerModels.map((m) => (
              <Link
                key={m.slug}
                href={`/partners#${m.slug}`}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-card px-3 py-2 text-sm text-ink backdrop-blur transition hover:border-brand hover:text-brand"
              >
                <Icon name={m.icon} className="h-4 w-4 text-brand" /> {m.name}
              </Link>
            ))}
            <Link href="/partners#apply" className="btn-primary">Become a partner</Link>
          </div>
        </div>
      </section>

      {/* Industry 4.0 stack */}
      <section className="container-x grid items-center gap-14 py-20 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Industry 4.0"
            title="From sensor to dashboard, without gaps"
            text="Smart manufacturing needs every layer to work together. We design, build and integrate the full stack, and can start at any layer you already have."
          />
          <ul className="mt-8 space-y-3" data-reveal>
            {[
              "Connect machines from any vendor with OPC UA, Modbus and SECS/GEM",
              "Run AI at the edge for vision inspection and predictive maintenance",
              "Feed MES and ERP with real production data, automatically",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-ink">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ok/15 text-ok">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <ol className="relative space-y-3" data-reveal aria-label="Industry 4.0 architecture layers">
          {layers.map((l, i) => (
            <li
              key={l.title}
              className="card flex items-center gap-4"
              style={{ marginLeft: `${i * 4}%`, marginRight: `${(3 - i) * 4}%` }}
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-brand to-accent text-white">
                <Icon name={l.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">{l.title}</p>
                <p className="text-sm text-muted">{l.text}</p>
              </div>
              <span className="ml-auto font-mono text-xs text-muted">L{4 - i}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Process */}
      <section className="bg-surface-2 py-20">
        <div className="container-x">
          <SectionHeading eyebrow="How we work" title="A clear process with no surprises" center />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s, i) => (
              <li key={s.title} className="card" data-reveal>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand/10 text-brand">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries */}
      <section className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Industries" title="Built for industries that make and move things" />
          <Link href="/industries" className="btn-ghost">
            All industries <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.slice(0, 10).map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries#${ind.slug}`}
              className="card card-hover flex flex-col items-center gap-3 p-5 text-center"
              data-reveal
            >
              <Icon name={ind.icon} className="h-7 w-7 text-brand" />
              <span className="text-sm font-medium text-ink">{ind.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech marquee */}
      <section className="overflow-hidden border-y border-line bg-surface-2 py-8" aria-label="Technologies we use">
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...techStack, ...techStack].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= techStack.length}
              className="whitespace-nowrap rounded-md border border-line bg-surface px-4 py-2 font-mono text-sm text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Example engagements */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Example engagements"
          title="What a typical project looks like"
          text="Illustrative scopes showing how our practices combine. Every engagement starts with a discovery phase tailored to you."
          center
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {sampleEngagements.map((e) => (
            <article key={e.title} className="card flex flex-col" data-reveal data-testid="engagement">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand/10 text-brand">
                <Icon name={e.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{e.title}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Challenge</dt>
                  <dd className="mt-0.5 text-muted">{e.problem}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Our approach</dt>
                  <dd className="mt-0.5 text-muted">{e.approach}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Target outcome</dt>
                  <dd className="mt-0.5 text-muted">{e.goal}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section className="bg-surface-2 py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Markets"
              title="Serving clients in India and Taiwan"
              text="Remote-first delivery in your time zone, with on-site visits for commissioning and hardware work."
            />
            <Link href="/locations" className="btn-ghost">
              All markets <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {locations.map((l) => (
              <li key={l.slug} data-reveal>
                <Link
                  href={`/locations/${l.slug}`}
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
                >
                  <span aria-hidden="true">{l.flag}</span> {l.country}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            text="Can't find your answer? Ask us directly and our team will get back to you."
          />
          <div data-reveal>
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
