import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarClock, Check, Clock, Package, ShieldCheck, Store, Truck } from "lucide-react";
import { OrderForm } from "@/components/CommerceForms";
import { JsonLd } from "@/components/JsonLd";
import {
  OrderingProcess,
  PolicySummary,
  ProductBadges,
  ProductCard,
  ProductVisual,
  SingleOrderProcess,
} from "@/components/products";
import { RfqForm } from "@/components/RfqForm";
import { SectionLabel } from "@/components/SectionLabel";
import { ShareEarn } from "@/components/ShareEarn";
import { SectionHeading } from "@/components/ui";
import { fmtInr, fmtTwd, money } from "@/lib/currency";
import { getProduct, offerOf, productCategories, products } from "@/lib/products";
import { absoluteUrl, breadcrumbLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const offer = offerOf(p);
  const suffix = offer === "free" ? "Free" : offer === "giveaway" ? "Giveaway" : p.condition ? "Refurbished" : "Buy & Wholesale";
  return pageMeta({
    title: `${p.name} — ${suffix}`,
    description: `${p.summary} ${offer === "buy" ? `MOQ ${p.moq}, lead time ${p.leadTime}.` : ""}`.trim().slice(0, 158),
    path: `/products/${p.slug}`,
    keywords: [p.name.toLowerCase(), `${p.name.toLowerCase()} price`, `${p.name.toLowerCase()} supplier`, ...p.certifications],
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const cat = productCategories[product.category];
  const offer = offerOf(product);
  const canBuyOne = offer === "buy" && !!product.retailInr;
  const wholesale = offer === "buy" && (!!product.tiers || !!product.priceOnRequest);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const lowPrice = [product.retailInr, ...(product.tiers?.map((t) => t.inr) ?? [])]
    .filter((n): n is number => typeof n === "number")
    .sort((a, b) => a - b)[0];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          category: cat.title,
          url: absoluteUrl(`/products/${product.slug}`),
          itemCondition: product.condition ? "https://schema.org/RefurbishedCondition" : "https://schema.org/NewCondition",
          ...(offer === "buy" && lowPrice !== undefined && !product.priceOnRequest
            ? {
                offers: {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  price: lowPrice,
                  availability: "https://schema.org/InStock",
                  seller: { "@type": "Organization", name: product.seller ? product.seller.name : site.name },
                },
              }
            : {}),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: cat.title, path: `/products/category/${cat.slug}` },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />

      <section className="container-x pt-8">
        <SectionLabel section="products" trail={[{ label: cat.title, href: `/products/category/${cat.slug}` }, { label: product.name }]} />
      </section>

      <section className="container-x grid gap-10 py-8 lg:grid-cols-[1.1fr_1fr]">
        <div data-reveal>
          <ProductVisual product={product} size="lg" />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: <Package className="h-4 w-4" />, k: offer === "buy" ? "MOQ" : "Limit", v: product.moq },
              { icon: <Clock className="h-4 w-4" />, k: "Lead time", v: product.leadTime },
              { icon: <ShieldCheck className="h-4 w-4" />, k: "Warranty", v: product.warranty },
              { icon: <Truck className="h-4 w-4" />, k: "Shipping", v: product.kind === "digital" ? "Email delivery" : "India & Taiwan" },
            ].map((x) => (
              <div key={x.k} className="card p-3">
                <p className="flex items-center gap-1.5 text-xs text-muted"><span className="text-brand">{x.icon}</span>{x.k}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{x.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ProductBadges product={product} />
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-lg text-ink/90">{product.summary}</p>
          <p className="mt-3 leading-relaxed text-muted">{product.description}</p>

          {product.seller && (
            <p className="mt-4 flex items-center gap-2 rounded-md border border-line bg-card px-3 py-2 text-sm text-ink" data-testid="seller-info">
              <Store className="h-4 w-4 text-brand" /> Sold and shipped by <b>{product.seller.name}</b> ({product.seller.location})
              {product.seller.verified && <BadgeCheck className="h-4 w-4 text-ok" aria-label="Verified" />}
            </p>
          )}
          {product.condition && (
            <p className="mt-4 rounded-md border border-line bg-card px-3 py-2 text-sm text-ink" data-testid="condition-info">
              <b>Condition: Grade {product.condition.grade}.</b> {product.condition.note}
            </p>
          )}

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" /> {f}</li>
            ))}
          </ul>

          <div className="mt-6 card p-4" data-testid="price-tiers">
            {offer === "giveaway" && product.giveaway ? (
              <>
                <p className="flex items-center gap-2 text-sm font-semibold text-ink"><CalendarClock className="h-4 w-4 text-brand" /> Closes: {product.giveaway.closes}</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
                  {product.giveaway.howToEnter.map((h) => <li key={h}>{h}</li>)}
                </ol>
                <a href="#order" className="btn-primary mt-4">Enter giveaway</a>
              </>
            ) : offer === "free" ? (
              <>
                <p className="text-sm font-semibold text-ink">Free {product.kind === "digital" ? "download" : "sample"}</p>
                <p className="mt-1 text-sm text-muted">{product.kind === "digital" ? "We email you the download link." : "Free for qualified businesses; you pay shipping only."}</p>
                <a href="#order" className="btn-primary mt-4">Get it free</a>
              </>
            ) : (
              <>
                {canBuyOne && (
                  <p className="flex items-baseline justify-between text-sm">
                    <span className="font-semibold text-ink">Single unit price</span>
                    <span className="text-right" data-testid="retail-price">
                      <span className="block text-2xl font-semibold tabular-nums text-ink">{fmtInr(product.retailInr!)}</span>
                      <span className="block text-sm text-muted">{fmtTwd(product.retailInr!)}</span>
                    </span>
                  </p>
                )}
                {product.priceOnRequest ? (
                  <p className="mt-2 text-sm text-muted">Priced per configuration, including installation, training and warranty. Request a quote for pricing.</p>
                ) : (
                  product.tiers && (
                    <table className="mt-3 w-full text-sm">
                      <thead className="text-xs text-muted">
                        <tr><th className="py-1 text-left font-medium">Wholesale quantity</th><th className="py-1 text-right font-medium">INR</th><th className="py-1 text-right font-medium">TWD</th></tr>
                      </thead>
                      <tbody>
                        {product.tiers.map((t) => (
                          <tr key={t.qty} className="border-t border-line">
                            <td className="py-1.5 text-ink">{t.qty}</td>
                            <td className="py-1.5 text-right font-semibold tabular-nums text-ink">{t.inr ? fmtInr(t.inr) : "Quote"}</td>
                            <td className="py-1.5 text-right tabular-nums text-muted">{t.inr ? fmtTwd(t.inr) : "Quote"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {canBuyOne && <a href="#order" className="btn-primary" data-testid="buy-one-cta">Buy single unit</a>}
                  {wholesale && <a href="#rfq" className={canBuyOne ? "btn-ghost" : "btn-primary"} data-testid="product-rfq-cta">Request wholesale quote</a>}
                </div>
              </>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.certifications.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 rounded-sm border border-line bg-card-solid px-2 py-0.5 text-xs text-ink">
                <BadgeCheck className="h-3.5 w-3.5 text-ok" /> {c}
              </span>
            ))}
          </div>

          <div className="mt-4 grid gap-4">
            <PolicySummary product={product} />
            {product.resellerCommission && offer === "buy" && (
              <ShareEarn slug={product.slug} name={product.name} commission={product.resellerCommission} />
            )}
          </div>
        </div>
      </section>

      <section className="container-x pb-12">
        <h2 className="text-2xl font-semibold text-ink">Specifications</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-line bg-card backdrop-blur-xl">
          <table className="w-full text-sm" data-testid="spec-table">
            <tbody>
              {product.specs.map(([k, v]) => (
                <tr key={k} className="border-b border-line last:border-0">
                  <th className="w-1/3 bg-surface-3 px-4 py-2.5 text-left font-medium text-muted">{k}</th>
                  <td className="px-4 py-2.5 text-ink">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {canBuyOne && (
        <section className="acrylic border-y border-line py-14">
          <div className="container-x">
            <SectionHeading eyebrow="Buy one unit" title="How single-unit ordering works" />
            <div className="mt-8">
              <SingleOrderProcess />
            </div>
          </div>
        </section>
      )}

      {offer !== "buy" || canBuyOne ? (
        <section id="order" className="container-x scroll-mt-20 py-14">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              title={offer === "giveaway" ? "Enter the giveaway" : offer === "free" ? `Get ${product.name}` : `Order ${product.name}`}
              text={offer === "buy" && product.retailInr ? `Single-unit price ${money(product.retailInr)}. For 10 or more units, request a wholesale quote.` : undefined}
              center
            />
            <div className="mt-8">
              <OrderForm product={product.slug} mode={offer} />
            </div>
          </div>
        </section>
      ) : null}

      {wholesale && (
        <>
          <section className={`${canBuyOne ? "" : "acrylic border-y border-line"} py-14`}>
            <div className="container-x">
              <SectionHeading eyebrow="Buy in bulk" title="How wholesale ordering works" />
              <div className="mt-8">
                <OrderingProcess />
              </div>
            </div>
          </section>
          <section id="rfq" className="container-x scroll-mt-20 pb-14">
            <div className="mx-auto max-w-3xl">
              <SectionHeading title={`Request a wholesale quote for ${product.name}`} center />
              <div className="mt-8">
                <RfqForm product={product.slug} />
              </div>
            </div>
          </section>
        </>
      )}

      {related.length > 0 && (
        <section className="container-x pb-16">
          <h2 className="text-2xl font-semibold text-ink">More in {cat.title}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
          <p className="mt-6 text-sm text-muted">
            <Link href="/products" className="font-semibold text-brand hover:underline">Back to all products</Link>
          </p>
        </section>
      )}
    </>
  );
}
