import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, MapPin, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner, ServiceCard } from "@/components/ui";
import { getLocation, locations } from "@/lib/locations";
import { absoluteUrl, breadcrumbLd, pageMeta } from "@/lib/seo";
import { services } from "@/lib/services";
import { officeAddress, offices, site } from "@/lib/site";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return {};
  return pageMeta({
    title: `Custom Software, IoT & Embedded Development in ${l.country}`,
    description: `${site.name} serves clients in ${l.cities.slice(0, 3).join(", ")} and across ${l.country} with custom software, IoT, embedded firmware, MES and Industry 4.0 solutions.`,
    path: `/locations/${l.slug}`,
    keywords: l.keywords,
  });
}

const highlight = [
  "custom-software-development",
  "iot-solutions",
  "embedded-firmware",
  "manufacturing-execution-system",
  "machine-vision-quality",
  "ai-ml-data-engineering",
];

export default async function LocationPage({ params }: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const featured = highlight.map((s) => services.find((x) => x.slug === s)!);
  const office = offices.find((o) => o.countryCode === loc.code);
  const others = locations.filter((l) => l.slug !== loc.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: `${site.name} — ${loc.country}`,
          url: absoluteUrl(`/locations/${loc.slug}`),
          email: site.email,
          areaServed: [
            { "@type": "Country", name: loc.country, identifier: loc.code },
            ...loc.cities.map((c) => ({ "@type": "City", name: c })),
          ],
          parentOrganization: { "@type": "Organization", name: site.name, url: site.url },
          knowsAbout: services.map((s) => s.title),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: loc.country, path: `/locations/${loc.slug}` },
        ])}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/locations" className="hover:text-brand">Locations</Link> / {loc.country}
          </nav>
          <p className="mt-6 text-5xl" aria-hidden="true">{loc.flag}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Custom software, IoT &amp; embedded development in <span className="text-gradient">{loc.country}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{loc.intro}</p>
          {office && (
            <p className="mt-6 inline-flex items-start gap-2 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink" data-testid="local-office">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span>
                <span className="font-semibold">{office.label}:</span> {officeAddress(office)}
                {office.phone && ` · ${office.phone}`}
              </span>
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary px-6 py-3">
              Talk to our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/services" className="btn-ghost px-6 py-3">All services</Link>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-6 py-16 md:grid-cols-3">
        <div className="card" data-reveal>
          <MapPin className="h-6 w-6 text-brand" aria-hidden="true" />
          <h2 className="mt-4 font-semibold text-ink">Cities we serve</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{loc.cities.join(", ")}</p>
        </div>
        <div className="card" data-reveal>
          <Clock className="h-6 w-6 text-brand" aria-hidden="true" />
          <h2 className="mt-4 font-semibold text-ink">Your time zone</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We schedule stand-ups and support hours that overlap with {loc.timezone}.
          </p>
        </div>
        <div className="card" data-reveal>
          <ShieldCheck className="h-6 w-6 text-brand" aria-hidden="true" />
          <h2 className="mt-4 font-semibold text-ink">Data protection</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We design systems that support compliance with the {loc.dataLaw}.
          </p>
        </div>
      </section>

      <section className="bg-surface-2 py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="h-section">Industries we support in {loc.country}</h2>
            <ul className="mt-6 space-y-3">
              {loc.focusIndustries.map((i) => (
                <li key={i} className="flex items-center gap-3 text-ink">
                  <Check className="h-5 w-5 text-ok" aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {featured.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="text-xl font-semibold text-ink">Other markets we serve</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {others.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/locations/${l.slug}`}
                className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-muted hover:border-brand hover:text-brand"
              >
                <span aria-hidden="true">{l.flag}</span> {l.country}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBanner title={`Building something in ${loc.country}?`} />
    </>
  );
}
