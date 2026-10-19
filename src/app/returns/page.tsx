import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, SectionHeading } from "@/components/ui";
import { returnRules, termsUpdated } from "@/lib/policies";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Return & Refund Policy",
  description: "Return windows and refund rules for new hardware, wholesale orders, refurbished items, marketplace products, free products, digital downloads and services.",
  path: "/returns",
});

const howTo = [
  { icon: "Mail", title: "Contact us", text: `Email ${site.email} with your order reference, photos or video, and the reason for return.` },
  { icon: "ClipboardCheck", title: "Get approval", text: "We reply within one business day with a return authorisation and instructions." },
  { icon: "Truck", title: "Send it back", text: "Pack the item securely with all accessories; use the pickup or address we provide." },
  { icon: "Undo2", title: "Refund or replacement", text: "After inspection we refund to the original payment method within 7 business days, or ship a replacement." },
];

export default function ReturnsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Return & Refund Policy", path: "/returns" }])} />
      <PageHero
        section="company"
        trail={[{ label: "Policies" }, { label: "Return & Refund Policy" }]}
        eyebrow="Returns"
        title="Return & Refund Policy"
        text={`Return windows depend on what you bought. Find your product type below. Last updated ${termsUpdated}.`}
      />

      <section className="container-x py-14">
        <div className="overflow-x-auto rounded-lg border border-line bg-card backdrop-blur">
          <table className="w-full min-w-[34rem] text-sm" data-testid="returns-table">
            <thead className="border-b border-line text-left text-xs text-muted">
              <tr><th className="px-4 py-3 font-medium">Product type</th><th className="px-4 py-3 font-medium">Return window</th><th className="px-4 py-3 font-medium">Details</th></tr>
            </thead>
            <tbody>
              {returnRules.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-ink"><span className="inline-flex items-center gap-2"><Icon name={r.icon} className="h-4 w-4 text-brand" /> {r.title}</span></td>
                  <td className="px-4 py-3 text-ink">{r.window}</td>
                  <td className="px-4 py-3"><a href={`#${r.id}`} className="font-semibold text-brand hover:underline">Read</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {returnRules.map((r) => (
            <article key={r.id} id={r.id} className="card scroll-mt-24 target:border-brand" data-testid={`return-${r.id}`}>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-ink"><Icon name={r.icon} className="h-5 w-5 text-brand" /> {r.title}</h2>
              <p className="mt-1 text-sm font-semibold text-brand">Window: {r.window}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
                {r.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="acrylic border-y border-line py-14">
        <div className="container-x">
          <SectionHeading eyebrow="How to return" title="Returning an item" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howTo.map((h, i) => (
              <li key={h.title} className="card" data-reveal>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand text-on-brand"><Icon name={h.icon} className="h-5 w-5" /></span>
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                </div>
                <p className="mt-4 font-semibold text-ink">{h.title}</p>
                <p className="mt-1 text-sm text-muted">{h.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            See also our <Link href="/terms" className="font-semibold text-brand hover:underline">Terms &amp; Conditions</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
