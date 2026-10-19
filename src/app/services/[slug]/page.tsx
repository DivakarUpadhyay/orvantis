import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { KindBadge } from "@/components/KindBadge";
import { SectionLabel } from "@/components/SectionLabel";
import { CtaBanner, ServiceCard } from "@/components/ui";
import { locations } from "@/lib/locations";
import { absoluteUrl, breadcrumbLd, pageMeta } from "@/lib/seo";
import { categories, getService, serviceGroups, services } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.title} Services`,
    description: `${s.summary} ${s.description}`.slice(0, 158),
    path: `/services/${s.slug}`,
    keywords: [
      s.title.toLowerCase(),
      ...s.tech.map((t) => `${t} development`),
      ...["India", "Taiwan"].map((c) => `${s.title.toLowerCase()} ${c}`),
    ],
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const cat = categories[service.category];
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: cat.title,
          url: absoluteUrl(`/services/${service.slug}`),
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: locations.map((l) => ({ "@type": "Country", name: l.country })),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: cat.title, path: `/services/category/${cat.slug}` },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x py-14 sm:py-20">
          <SectionLabel
            section="services"
            trail={[
              { label: serviceGroups[cat.group].title, href: `/services#${cat.group}-services` },
              { label: cat.title, href: `/services/category/${cat.slug}` },
              { label: service.title },
            ]}
          />
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-accent text-white">
                <Icon name={service.icon} className="h-8 w-8" />
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{service.title}</h1>
              <p className="mt-3"><KindBadge kind={cat.group} label={`${serviceGroups[cat.group].short} service`} /></p>
              <p className="mt-4 text-xl text-ink/90">{service.summary}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{service.description}</p>
            </div>
            <div className="card w-full shrink-0 lg:w-80">
              <p className="font-semibold text-ink">Start a {service.title.toLowerCase()} project</p>
              <p className="mt-2 text-sm text-muted">Free consultation with our specialists. NDA on request.</p>
              <Link
                href={`/contact?service=${service.slug}`}
                className="btn-primary mt-5 w-full justify-center"
                data-testid="service-cta"
              >
                Discuss your project <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-ink">What we deliver</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2" data-testid="capabilities">
            {service.capabilities.map((c) => (
              <li key={c} className="card flex gap-3 p-5" data-reveal>
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-ink">{c}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-14 text-2xl font-semibold text-ink">Business outcomes</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {service.outcomes.map((o) => (
              <li key={o} className="rounded-lg bg-gradient-to-br from-brand/10 to-accent/10 p-5 font-medium text-ink" data-reveal>
                {o}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <h2 className="font-semibold text-ink">Technologies</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.tech.map((t) => (
                <li key={t} className="rounded-md border border-line bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2 className="font-semibold text-ink">Available in India &amp; Taiwan</h2>
            <p className="mt-2 text-sm text-muted">Remote-first delivery with on-site support when hardware needs it.</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="rounded-md border border-line px-3 py-1 text-muted hover:border-brand hover:text-brand">
                    {l.country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-surface-2 py-16">
          <div className="container-x">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-ink">Related {cat.short} services</h2>
              <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
