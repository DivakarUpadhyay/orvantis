import Link from "next/link";
import { ArrowRight, Boxes, Globe, PackageCheck, ShieldCheck, ShoppingCart, Tag } from "lucide-react";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { OrderingProcess, ProductCard, ProductCategoryNav, SingleOrderProcess } from "@/components/products";
import { RfqForm } from "@/components/RfqForm";
import { Faq, PageHero, SectionHeading } from "@/components/ui";
import { productCategoriesByGroup, productsByCategory, wholesaleFaqs, type ProductGroup } from "@/lib/products";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Hardware Products — Buy Single Units, Wholesale, Refurbished & Free",
  description:
    "Buy IoT devices, AR/VR hardware, embedded boards and semiconductor equipment as single units or wholesale. Also refurbished equipment, free samples and giveaways, with clear return policies.",
  path: "/products",
  keywords: [
    "IoT devices wholesale",
    "AR VR hardware supplier",
    "embedded modules buy online",
    "semiconductor equipment supplier",
    "refurbished industrial PC",
    "free electronics samples",
  ],
});

const perks = [
  { icon: <Tag className="h-5 w-5" />, title: "Clear pricing", text: "Single-unit prices and wholesale tiers on every product." },
  { icon: <PackageCheck className="h-5 w-5" />, title: "Tested before dispatch", text: "Every unit configured and QC-tested before it ships." },
  { icon: <Globe className="h-5 w-5" />, title: "India & Taiwan delivery", text: "Door delivery in India; export documents handled for Taiwan." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Warranty & returns", text: "Clear return windows for each product type." },
];

const groups: { id: ProductGroup; anchor: string; title: string; text: string }[] = [
  { id: "shop", anchor: "new", title: "New hardware by type", text: "Brand-new products sold by us or by verified marketplace sellers." },
  { id: "offers", anchor: "offers", title: "Offers: refurbished, free & giveaways", text: "Graded pre-owned equipment, free samples and downloads, and giveaways." },
];

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }])} />
      <PageHero
        section="products"
        eyebrow="All hardware products"
        title={
          <>
            Hardware products, <span className="text-gradient">one unit or wholesale</span>
          </>
        }
        text="Everything in this section is physical hardware (or a free digital resource) that you can buy, claim or win. Looking for work done for you? See Services."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#new" className="btn-primary px-6 py-2.5">Browse new hardware</a>
          <a href="#offers" className="btn-ghost px-6 py-2.5">See offers</a>
          <a href="#how-to-buy" className="btn-ghost px-6 py-2.5">How to buy</a>
          <Link href="/donate" className="btn-ghost px-6 py-2.5">Donate used tech</Link>
        </div>
      </PageHero>

      <section className="container-x py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="card p-5" data-reveal>
              <span className="text-brand">{p.icon}</span>
              <p className="mt-3 font-semibold text-ink">{p.title}</p>
              <p className="mt-1 text-sm text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-6">
        <ProductCategoryNav />
      </section>

      {groups.map((g) => (
        <div key={g.id} id={g.anchor} className="scroll-mt-20 pt-6" data-testid={`product-group-${g.id}`}>
          <div className="container-x">
            <div className="rounded-md border border-line bg-card px-4 py-3 backdrop-blur">
              <h2 className="text-xl font-semibold text-ink">{g.title}</h2>
              <p className="text-sm text-muted">{g.text}</p>
            </div>
          </div>
          {productCategoriesByGroup(g.id).map((c) => (
            <section key={c.id} className="container-x py-8" aria-labelledby={`pc-${c.id}`} data-testid={`product-section-${c.id}`}>
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
                <h3 id={`pc-${c.id}`} className="flex items-center gap-3 text-lg font-semibold text-ink">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-brand/10 text-brand"><Icon name={c.icon} className="h-5 w-5" /></span>
                  {c.title}
                </h3>
                <Link href={`/products/category/${c.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  View category <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-2 text-sm text-muted">{c.blurb}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {productsByCategory(c.id).map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ))}

      <section id="how-to-buy" className="acrylic mt-10 scroll-mt-20 border-y border-line py-14">
        <div className="container-x">
          <SectionHeading eyebrow="How to buy" title="Two ways to order" text="Buy a single unit online, or request a wholesale quote for larger quantities." />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="card">
              <p className="flex items-center gap-2 text-lg font-semibold text-ink"><ShoppingCart className="h-5 w-5 text-brand" /> Single unit (1–9 pieces)</p>
              <p className="mt-1 text-sm text-muted">For evaluation, small projects and replacements. Products with a single-unit price can be ordered directly.</p>
              <div className="mt-5"><SingleOrderProcess /></div>
            </div>
            <div className="card">
              <p className="flex items-center gap-2 text-lg font-semibold text-ink"><Boxes className="h-5 w-5 text-brand" /> Wholesale (10+ pieces)</p>
              <p className="mt-1 text-sm text-muted">Tiered pricing, OEM options, credit terms and export shipping for business buyers.</p>
              <div className="mt-5"><OrderingProcess /></div>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted">
            Every order follows our <Link href="/terms" className="font-semibold text-brand hover:underline">Terms &amp; Conditions</Link> and{" "}
            <Link href="/returns" className="font-semibold text-brand hover:underline">Return Policy</Link>.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Buying FAQ" title="Common questions" />
          <div className="mt-6">
            <Faq items={wholesaleFaqs} />
          </div>
        </div>
        <div id="rfq" className="scroll-mt-20">
          <h2 className="h-section">Request a wholesale quote</h2>
          <p className="mt-2 text-muted">In stock or made to order. Tell us what you need.</p>
          <div className="mt-6">
            <RfqForm />
          </div>
        </div>
      </section>
    </>
  );
}
