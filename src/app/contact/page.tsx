import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { officeAddress, offices, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Us — Get a Free Project Consultation",
  description:
    "Tell us about your software, IoT, embedded or manufacturing project. Our team replies within one business day. Serving India and Taiwan.",
  path: "/contact",
});

const steps = [
  "Our solutions team reviews your enquiry, usually the same day",
  "A call to understand your goals and constraints",
  "A written proposal with scope, timeline and estimate",
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${site.name}`,
          mainEntity: {
            "@type": "Organization",
            name: site.name,
            email: site.email,
            telephone: site.phone || undefined,
            location: offices.map((o) => ({
              "@type": "Place",
              name: `${site.name} — ${o.label}`,
              telephone: o.phone || undefined,
              address: {
                "@type": "PostalAddress",
                streetAddress: o.street,
                addressLocality: o.city,
                addressRegion: o.region,
                postalCode: o.postalCode,
                addressCountry: o.countryCode,
              },
            })),
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: site.email,
              availableLanguage: ["English", "Hindi", "Marathi", "Chinese"],
              areaServed: ["IN", "TW"],
            },
          },
        }}
      />
      <PageHero
        section="company"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <span className="text-gradient">your project</span>
          </>
        }
        text="Share a few details and we will get back to you within one business day. No obligation, and we're happy to sign your NDA first."
      />

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr]">
        <ContactForm />

        <aside className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-ink">Email us</h2>
            <p className="mt-4 flex gap-3 text-sm">
              <Mail className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="text-ink hover:text-brand" data-testid="contact-email">
                {site.email}
              </a>
            </p>
          </div>

          {offices.map((o) => (
            <div key={o.id} className="card" data-testid={`office-${o.id}`}>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
                <span aria-hidden="true">{o.flag}</span> {o.label}
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <address className="not-italic text-ink">{officeAddress(o)}</address>
                </li>
                {o.phone && (
                  <li className="flex gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="text-ink hover:text-brand">
                      {o.phone}
                    </a>
                  </li>
                )}
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span className="text-ink">{o.hours}</span>
                </li>
              </ul>
            </div>
          ))}

          <div className="card">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <MessageSquare className="h-5 w-5 text-brand" aria-hidden="true" /> What happens next
            </h2>
            <ol className="mt-5 space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm text-muted">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-semibold text-brand">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>
    </>
  );
}
