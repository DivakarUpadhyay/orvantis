import { Check } from "lucide-react";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner, PageHero } from "@/components/ui";
import { techStack } from "@/lib/content";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { LiveTiles } from "@/components/LiveTiles";
import { productCategories } from "@/lib/products";
import { officeAddress, offices, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Us",
  description: `${site.name} is a technology company headquartered in Maharashtra, India, delivering software, IoT, automation, AR/VR, event technology and wholesale hardware to businesses in India and Taiwan.`,
  path: "/about",
});

const values = [
  { icon: "Wrench", title: "Expert-led delivery", text: "Every engagement is led by experienced specialists, with a dedicated account manager as your single point of contact." },
  { icon: "ShieldCheck", title: "Transparent by default", text: "Shared backlog, demos every sprint, honest estimates and no hidden costs." },
  { icon: "Cable", title: "Whole-stack ownership", text: "Hardware, firmware, cloud and apps from one team, so nothing falls between vendors." },
  { icon: "LifeBuoy", title: "Long-term partners", text: "We design for maintainability and stay with you after launch." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        section="company"
        eyebrow="About us"
        title={
          <>
            A technology company built for <span className="text-gradient">businesses that make and move things</span>
          </>
        }
        text={`${site.name} is a technology company headquartered in India. We help businesses digitise, automate and grow with software, connected hardware, immersive experiences and technology products.`}
      />

      <section className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <div data-reveal>
          <h2 className="h-section">Our mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            We help manufacturers, hardware companies and growing businesses in India and Taiwan turn ideas into reliable
            software and connected products. We believe one accountable team should own the whole journey: sensor,
            firmware, cloud, application and the people who use them.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Headquartered in Vasai, Maharashtra (Mumbai region), India",
              "Serving clients in India and Taiwan",
              "English-language delivery with Mandarin support available",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-ink">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-ok" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="card" data-reveal>
              <Icon name={v.icon} className="h-6 w-6 text-brand" />
              <h3 className="mt-4 font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="h-section">What we do</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Service practices and a wholesale products division ({Object.values(productCategories).map((c) => c.short).join(", ")}), under one company.
        </p>
        <div className="mt-8">
          <LiveTiles />
        </div>
      </section>

      <section className="container-x pb-16">
        <h2 className="h-section">Our headquarters</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {offices.map((o) => (
            <div key={o.id} className="card" data-reveal>
              <p className="text-lg font-semibold text-ink"><span aria-hidden="true">{o.flag}</span> {o.label}</p>
              <p className="mt-2 text-sm text-muted">{officeAddress(o)}</p>
              <p className="mt-1 text-sm text-muted">{o.hours}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <h2 className="h-section">Technologies we work with</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {techStack.map((t) => (
              <li key={t} className="rounded-md border border-line bg-card px-4 py-2 font-mono text-sm text-muted backdrop-blur">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner title="Let's build something real together" />
    </>
  );
}
