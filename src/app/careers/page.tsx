import { Mail } from "lucide-react";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/ui";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { offices, officeAddress, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Careers",
  description: `Build software, IoT, automation, AR/VR and event technology for clients in India and Taiwan. Join ${site.name} in India.`,
  path: "/careers",
});

const areas = [
  { icon: "Code2", title: "Software & cloud", text: "Web, mobile, cloud, data and AI development." },
  { icon: "Cpu", title: "Embedded & IoT", text: "Firmware, electronics, connectivity and device platforms." },
  { icon: "Factory", title: "Industrial automation", text: "PLC, SCADA, MES and smart-factory projects." },
  { icon: "Glasses", title: "AR / VR & 3D", text: "Immersive apps, 3D content and simulations." },
  { icon: "Megaphone", title: "Marketing & sales", text: "Digital marketing, business development and partnerships." },
  { icon: "PartyPopper", title: "Events & operations", text: "Event technology, logistics and on-site crews." },
];

const values = [
  "Work on real products used in factories, stores and events",
  "Learning budget and certifications",
  "Hybrid working from our India headquarters",
  "Clear growth paths and mentoring",
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />
      <PageHero
        section="company"
        eyebrow="Careers"
        title={
          <>
            Build technology that <span className="text-gradient">moves the real world</span>
          </>
        }
        text={`${site.name} brings together specialists in software, hardware, automation, immersive technology, marketing and events. We are always happy to meet talented people.`}
      />
      <section className="container-x py-14">
        <SectionHeading eyebrow="Teams" title="Where you could work" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <div key={a.title} className="card card-hover" data-reveal>
              <Icon name={a.icon} className="h-6 w-6 text-brand" />
              <h3 className="mt-3 font-semibold text-ink">{a.title}</h3>
              <p className="mt-1 text-sm text-muted">{a.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="acrylic border-y border-line py-14">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why join us" title="What we offer" />
            <ul className="mt-6 space-y-3">
              {values.map((v) => (
                <li key={v} className="flex gap-3 text-ink"><Icon name="BadgeCheck" className="mt-0.5 h-5 w-5 text-ok" /> {v}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold text-ink">No open role that fits?</h2>
            <p className="mt-2 text-muted">
              Send your CV and a short note about what you would like to work on. We review every application and contact you when a suitable position opens.
            </p>
            <a href={`mailto:${site.email}?subject=Career%20application`} className="btn-primary mt-5" data-testid="careers-email">
              <Mail className="h-4 w-4" /> Email your CV
            </a>
            <div className="mt-6 space-y-2 text-sm text-muted">
              {offices.map((o) => (
                <p key={o.id}><b className="text-ink">{o.label}:</b> {officeAddress(o)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
