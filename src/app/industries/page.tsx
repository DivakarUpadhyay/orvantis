import Link from "next/link";
import { Check } from "lucide-react";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner, PageHero } from "@/components/ui";
import { industries, industryGroups } from "@/lib/content";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { servicesByCategory } from "@/lib/services";

export const metadata = pageMeta({
  title: "Industries: Manufacturing, Electronics, Automotive & More",
  description:
    "Software, IoT and automation for discrete and process manufacturing, electronics and semiconductors, automotive and EV, energy, healthcare, logistics, agriculture and retail.",
  path: "/industries",
  keywords: industries.map((i) => `${i.title.toLowerCase()} software`),
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
      <PageHero
        section="industries"
        eyebrow="Industries"
        title={
          <>
            Deep experience where <span className="text-gradient">software meets the physical world</span>
          </>
        }
        text="We focus on industries where machines, devices and supply chains matter, and where generic software rarely fits."
      />

      <section className="container-x space-y-14 py-16">
        {industryGroups.map((group) => (
          <div key={group}>
            <h2 className="text-2xl font-semibold text-ink">{group}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {industries
                .filter((i) => i.group === group)
                .map((ind) => (
                  <article
                    key={ind.slug}
                    id={ind.slug}
                    className="card card-hover scroll-mt-24 target:border-brand target:ring-4 target:ring-brand/15"
                    data-testid="industry-card"
                    data-reveal
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand/10 text-brand">
                      <Icon name={ind.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold text-ink">{ind.title}</h3>
                    <p className="mt-2 text-sm text-muted">
                      <span className="font-medium text-ink">The challenge: </span>
                      {ind.challenge}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {ind.solutions.map((s) => (
                        <li key={s} className="flex gap-2 text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden="true" /> {s}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-surface-2 py-16">
        <div className="container-x">
          <h2 className="h-section">Manufacturing solutions</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Our Industry 4.0 practice covers every layer of the smart factory.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicesByCategory("manufacturing").map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-hover flex items-center gap-3 p-4">
                <Icon name={s.icon} className="h-5 w-5 shrink-0 text-brand" />
                <span className="text-sm font-medium text-ink">{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
