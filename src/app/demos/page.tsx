import { DemoShell } from "@/components/demos/DemoShell";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui";
import { demos } from "@/lib/demos";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Live Project Demos",
  description:
    "Try interactive demos of our work: smart factory dashboard, payment checkout, eKYC onboarding, shipment tracking, RPA bot, IoT OTA updates, WhatsApp chatbot and a 3D product configurator.",
  path: "/demos",
  keywords: demos.map((d) => `${d.title.toLowerCase()} demo`),
});

export default function DemosPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Demos", path: "/demos" }])} />
      <PageHero
        section="demos"
        eyebrow="Live demos"
        title={
          <>
            Try our work, <span className="text-gradient">right here</span>
          </>
        }
        text={`Interactive demos of the kind of solutions we build, from factory dashboards and payment flows to IoT fleets and AR-ready 3D configurators.`}
      />
      <DemoShell active={demos[0]} />
    </>
  );
}
