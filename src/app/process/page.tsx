import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner, Faq, PageHero } from "@/components/ui";
import { engagementModels, faqs, processSteps } from "@/lib/content";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Development Process & Engagement Models",
  description:
    "How we deliver software and hardware projects: discovery, design, agile build, integration, deployment and support, with fixed-scope, dedicated-team and time-and-materials models.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }])} />
      <PageHero
        section="company"
        eyebrow="Process"
        title={
          <>
            From idea to <span className="text-gradient">production line</span>
          </>
        }
        text="A proven delivery process for projects that mix software, electronics and machines. You see working results every two weeks."
      />

      <section className="container-x py-16">
        <ol className="relative space-y-8 border-l-2 border-line pl-8 sm:pl-12">
          {processSteps.map((s, i) => (
            <li key={s.title} className="relative" data-reveal data-testid="process-step">
              <span className="absolute -left-[3.05rem] top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand font-mono text-sm font-semibold text-white ring-8 ring-surface sm:-left-[4.3rem]">
                {i + 1}
              </span>
              <div className="card">
                <div className="flex flex-wrap items-center gap-3">
                  <Icon name={s.icon} className="h-5 w-5 text-brand" />
                  <h2 className="text-xl font-semibold text-ink">{s.title}</h2>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-surface-2 py-16">
        <div className="container-x">
          <h2 className="h-section text-center">Engagement models</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {engagementModels.map((m) => (
              <div key={m.title} className="card text-center" data-reveal>
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand/10 text-brand">
                  <Icon name={m.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x max-w-4xl py-16">
        <h2 className="h-section mb-8">Frequently asked questions</h2>
        <Faq items={faqs} />
      </section>

      <CtaBanner />
    </>
  );
}
