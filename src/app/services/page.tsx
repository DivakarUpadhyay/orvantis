import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { ServicesExplorer } from "@/components/ServicesExplorer";
import { CtaBanner, PageHero, ServiceCard } from "@/components/ui";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata = pageMeta({
  title: "Software, IoT, Embedded & Manufacturing Services",
  description: `Our services: custom software, web and mobile apps, cloud, AI, IoT, embedded firmware, PCB design, MES, PLC/SCADA, predictive maintenance and machine vision for clients in India and Taiwan.`,
  path: "/services",
  keywords: services.map((s) => s.title.toLowerCase()),
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <PageHero
        section="services"
        eyebrow="Services"
        title={
          <>
            Everything you need to build <span className="text-gradient">connected products</span>
          </>
        }
        text="Specialist services across software development, digital marketing, IoT and embedded systems, smart manufacturing, automation, AR/VR, event technology and integrations. Pick one, or let one team deliver the whole stack."
      />
      <section className="container-x py-16">
        {/* The fallback is the full static grid, so crawlers see every service. */}
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          }
        >
          <ServicesExplorer />
        </Suspense>
      </section>
      <CtaBanner title="Not sure which service you need?" text="Describe the problem and we will propose the right mix of software, hardware and integration." />
    </>
  );
}
