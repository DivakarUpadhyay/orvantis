import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui";
import { termsSections, termsUpdated } from "@/lib/policies";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Terms & Conditions",
  description: `Terms for ${site.name} services, new and refurbished hardware, free products, giveaways, event rentals, marketplace sellers and resellers.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: "/terms" }])} />
      <PageHero
        section="company"
        trail={[{ label: "Policies" }, { label: "Terms & Conditions" }]}
        eyebrow="Terms & Conditions"
        title="Terms & Conditions"
        text={`Find the section that applies to you. Last updated ${termsUpdated}.`}
      />
      <section className="container-x grid gap-10 py-14 lg:grid-cols-[17rem_1fr]">
        <nav aria-label="Terms sections" className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted">Jump to</p>
          <ul className="space-y-0.5" data-testid="terms-toc">
            {termsSections.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-ink transition hover:bg-surface-3">
                  <Icon name={t.icon} className="h-4 w-4 text-brand" /> {t.title}
                </a>
              </li>
            ))}
            <li>
              <Link href="/returns" className="mt-2 flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-brand hover:bg-surface-3">
                <Icon name="Undo2" className="h-4 w-4" /> Return & refund policy
              </Link>
            </li>
          </ul>
        </nav>
        <div className="space-y-6">
          {termsSections.map((t) => (
            <article key={t.id} id={t.id} className="card scroll-mt-24 target:border-brand" data-testid={`terms-${t.id}`}>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-ink"><Icon name={t.icon} className="h-5 w-5 text-brand" /> {t.title}</h2>
              <p className="mt-1 text-sm text-muted">Applies to: {t.appliesTo}</p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink">
                {t.points.map((p) => <li key={p}>{p}</li>)}
              </ol>
            </article>
          ))}
          <p className="text-sm text-muted">
            Questions about these terms? Email <a href={`mailto:${site.email}`} className="font-semibold text-brand">{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
