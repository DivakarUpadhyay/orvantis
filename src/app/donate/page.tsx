import Link from "next/link";
import { Ban, Check } from "lucide-react";
import { DonateForm } from "@/components/CommerceForms";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/ui";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Donate Your Used Tech",
  description:
    "Donate second-hand laptops, devices, dev boards, VR headsets and equipment. We wipe, test and give them to students and NGOs, refurbish them, or recycle them responsibly. Free pickup in many cities.",
  path: "/donate",
  keywords: ["donate old laptop", "donate electronics India", "e-waste donation", "donate used computers to students", "electronics donation Mumbai"],
});

const steps = [
  { icon: "ClipboardCheck", title: "Tell us what you have", text: "Fill in the form with the items, condition and your city." },
  { icon: "Truck", title: "Pickup or drop-off", text: "We arrange free pickup where possible, or share a drop-off / courier address." },
  { icon: "ShieldCheck", title: "Data wipe & testing", text: "Every device is securely wiped and tested. Wipe confirmation on request." },
  { icon: "RefreshCw", title: "Refurbish & reuse", text: "Working items are repaired, cleaned and graded for their next owner." },
  { icon: "HeartHandshake", title: "Give or recycle", text: "Items go free to students, schools and NGOs, or are recycled by an authorised e-waste recycler." },
];

const accepted = [
  "Laptops, desktops, monitors, tablets and phones",
  "IoT devices, sensors, gateways and routers",
  "Development boards, modules and components",
  "VR / AR headsets and accessories",
  "Test & measurement and lab equipment",
  "Industrial and factory electronics",
];

const notAccepted = [
  "Swollen, leaking or damaged batteries",
  "CRT monitors and TVs",
  "Devices you do not own or that are locked to an account",
  "Hazardous, contaminated or medical-implant items",
];

const destinations = [
  { icon: "GraduationCap", title: "Students & schools", text: "Laptops and kits for students and labs that need them." },
  { icon: "HeartHandshake", title: "NGOs & community groups", text: "Devices for digital-literacy and skills programmes." },
  { icon: "RefreshCw", title: "Refurbished at low cost", text: "Only if you allow it; proceeds fund more free kits." },
  { icon: "Recycle", title: "Responsible recycling", text: "Non-repairable items go to authorised e-waste recyclers." },
];

export default function DonatePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Marketplace", path: "/marketplace" }, { name: "Donate", path: "/donate" }])} />
      <PageHero
        section="marketplace"
        trail={[{ label: "Donate your used tech" }]}
        eyebrow="Donate"
        title={
          <>
            Give your used tech <span className="text-gradient">a second life</span>
          </>
        }
        text="Donate second-hand devices and equipment you no longer need. We wipe, test and refurbish them, then give them to students, schools and NGOs, or recycle them responsibly."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#donate-form" className="btn-primary px-6 py-2.5">Donate now</a>
          <a href="#how" className="btn-ghost px-6 py-2.5">How it works</a>
        </div>
      </PageHero>

      <section id="how" className="container-x scroll-mt-20 py-14">
        <SectionHeading eyebrow="How it works" title="From your shelf to someone who needs it" />
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" data-testid="donate-steps">
          {steps.map((s, i) => (
            <li key={s.title} className="card p-4" data-reveal>
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-ok/15 text-ok"><Icon name={s.icon} className="h-4 w-4" /></span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <p className="mt-3 font-semibold text-ink">{s.title}</p>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="acrylic border-y border-line py-14">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div className="card">
            <p className="font-semibold text-ink">We accept</p>
            <ul className="mt-3 space-y-2 text-sm" data-testid="donate-accepted">
              {accepted.map((a) => (
                <li key={a} className="flex gap-2 text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" /> {a}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <p className="font-semibold text-ink">We can&apos;t accept</p>
            <ul className="mt-3 space-y-2 text-sm">
              {notAccepted.map((a) => (
                <li key={a} className="flex gap-2 text-ink"><Ban className="mt-0.5 h-4 w-4 shrink-0 text-danger" /> {a}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <p className="font-semibold text-ink">Before you donate</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink">
              <li>Back up your files and sign out of all accounts (Google, Apple, Microsoft).</li>
              <li>Remove SIM and memory cards.</li>
              <li>Include chargers and cables if you have them.</li>
              <li>We wipe every device again, but please remove what you can.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <SectionHeading eyebrow="Where donations go" title="You decide how your donation is used" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <div key={d.title} className="card" data-reveal>
              <Icon name={d.icon} className="h-6 w-6 text-ok" />
              <p className="mt-3 font-semibold text-ink">{d.title}</p>
              <p className="mt-1 text-sm text-muted">{d.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Need a donated device? See{" "}
          <Link href="/products/category/free-products-samples" className="font-semibold text-brand hover:underline">Free products</Link>. Donations are covered by our{" "}
          <Link href="/terms#donations" className="font-semibold text-brand hover:underline">donation terms</Link>.
        </p>
      </section>

      <section id="donate-form" className="container-x scroll-mt-20 pb-16">
        <div className="mx-auto max-w-3xl">
          <SectionHeading title="Offer a donation" text="Takes two minutes. We reply within two business days." center />
          <div className="mt-8">
            <DonateForm />
          </div>
        </div>
      </section>
    </>
  );
}
