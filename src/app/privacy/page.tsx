import { PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses personal data submitted through this website.`,
  path: "/privacy",
});

const sections = [
  {
    h: "What we collect",
    p: "When you use our contact form we collect your name, email address and the details you choose to give us (company, phone, country, project information). We do not use advertising trackers.",
  },
  {
    h: "How we use it",
    p: "We use your details only to reply to your enquiry, prepare a proposal and keep a record of our conversation. We never sell your data.",
  },
  {
    h: "Email delivery",
    p: "Messages are delivered by email through our email provider. Our website is hosted on Vercel, which may process technical data such as IP addresses to deliver and protect the service.",
  },
  {
    h: "How long we keep it",
    p: "Enquiries that do not become projects are deleted within 24 months. You can ask us to delete your data at any time.",
  },
  {
    h: "Your rights",
    p: "Under India's Digital Personal Data Protection Act and Taiwan's Personal Data Protection Act, you may have the right to access, correct or delete your personal data. Email us to make a request.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        section="company" eyebrow="Legal" title="Privacy Policy" text="Last updated 19 October 2026." />
      <section className="container-x max-w-3xl space-y-10 py-16">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="text-xl font-semibold text-ink">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.p}</p>
          </div>
        ))}
        <p className="text-muted">
          Contact:{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-brand">
            {site.email}
          </a>
        </p>
      </section>
    </>
  );
}
