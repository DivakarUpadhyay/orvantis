import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner, PageHero } from "@/components/ui";
import { locations, type Location } from "@/lib/locations";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Software Development Company Serving India and Taiwan",
  description:
    "Custom software, IoT, embedded, automation and Industry 4.0 development for clients in India and Taiwan.",
  path: "/locations",
  keywords: locations.flatMap((l) => l.keywords.slice(0, 5)),
});

const regions: Location["region"][] = ["South Asia", "East Asia"];

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }])} />
      <PageHero
        section="industries"
        eyebrow="Markets we serve"
        title={
          <>
            Serving <span className="text-gradient">India and Taiwan</span>
          </>
        }
        text="Headquartered in India, working in your time zone. We serve manufacturers, hardware companies and enterprises in India and Taiwan."
      />
      <section className="container-x space-y-14 py-16">
        {regions.map((region) => {
          const list = locations.filter((l) => l.region === region);
          if (list.length === 0) return null;
          return (
            <div key={region}>
              <h2 className="text-2xl font-semibold text-ink">{region}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/locations/${l.slug}`}
                    className="card card-hover group flex flex-col"
                    data-testid="location-card"
                    data-reveal
                  >
                    <span className="text-4xl" aria-hidden="true">{l.flag}</span>
                    <h3 className="mt-4 text-lg font-semibold text-ink">Software development in {l.country}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted">{l.cities.slice(0, 4).join(" · ")}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      View {l.country} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      <CtaBanner title="Building something in India or Taiwan?" text="Tell us what you are building and our team will get back to you within one business day." />
    </>
  );
}
