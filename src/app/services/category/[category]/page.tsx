import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { KindBadge } from "@/components/KindBadge";
import { SectionLabel } from "@/components/SectionLabel";
import { CtaBanner, ServiceCard } from "@/components/ui";
import { serviceGroups } from "@/lib/services";
import { absoluteUrl, breadcrumbLd, pageMeta } from "@/lib/seo";
import { categories, getCategoryBySlug, servicesByCategory } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return Object.values(categories).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/category/[category]">) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  const list = servicesByCategory(cat.id);
  return pageMeta({
    title: `${cat.title} Services`,
    description: `${cat.blurb} Services include ${list
      .slice(0, 4)
      .map((s) => s.title)
      .join(", ")}.`,
    path: `/services/category/${cat.slug}`,
    keywords: [
      `${cat.title.toLowerCase()} company`,
      ...list.map((s) => s.title.toLowerCase()),
      ...["India", "Taiwan"].map((c) => `${cat.title.toLowerCase()} ${c}`),
    ],
  });
}

export default async function CategoryPage({ params }: PageProps<"/services/category/[category]">) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();
  const list = servicesByCategory(cat.id);
  const others = Object.values(categories).filter((c) => c.id !== cat.id);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${cat.title} services by ${site.name}`,
          itemListElement: list.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/services/${s.slug}`),
            name: s.title,
          })),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: cat.title, path: `/services/category/${cat.slug}` },
        ])}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x py-16 sm:py-24">
          <SectionLabel section="services" trail={[{ label: serviceGroups[cat.group].title, href: `/services#${cat.group}-services` }, { label: cat.title }]} />
          <span className="mt-8 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-accent text-white">
            <Icon name={cat.icon} className="h-8 w-8" />
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{cat.title}</h1>
          <p className="mt-3"><KindBadge kind={cat.group} label={serviceGroups[cat.group].title} /></p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{cat.intro}</p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <div key={s.slug} data-reveal>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-2 py-16">
        <div className="container-x">
          <h2 className="text-2xl font-semibold text-ink">Other practices</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((c) => (
              <Link key={c.id} href={`/services/category/${c.slug}`} className="card card-hover group flex items-center gap-5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-ink">{c.title}</span>
                  <span className="mt-1 block text-sm text-muted">{c.blurb}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-brand transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
