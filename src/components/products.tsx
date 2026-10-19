import Link from "next/link";
import { ArrowRight, Store, Undo2 } from "lucide-react";
import { money } from "@/lib/currency";
import { policyFor } from "@/lib/policies";
import {
  offerOf,
  orderingSteps,
  productCategories,
  productCategoriesByGroup,
  singleOrderSteps,
  type Product,
  type ProductCategoryId,
} from "@/lib/products";
import { Icon } from "./Icon";
import { KindBadge } from "./KindBadge";

const swatch: Record<ProductCategoryId, string> = {
  iot: "from-[#038387] to-[#005b70]",
  arvr: "from-[#c239b3] to-[#7a1f70]",
  embedded: "from-[#0063b1] to-[#004e8c]",
  semiconductor: "from-[#5c2e91] to-[#2f1650]",
  refurbished: "from-[#486860] to-[#2b3f3a]",
  free: "from-[#107c10] to-[#0b5a0b]",
  giveaway: "from-[#d13438] to-[#8a1f23]",
};

/** Small status labels shared by cards and the detail page. */
export function ProductBadges({ product }: { product: Product }) {
  const offer = offerOf(product);
  return (
    <div className="flex flex-wrap gap-1.5">
      <KindBadge kind={product.kind ?? "hardware"} />
      {product.condition && (
        <span className="rounded-sm bg-surface-3 px-1.5 py-0.5 text-[11px] font-semibold text-ink">Refurbished · Grade {product.condition.grade}</span>
      )}
      {offer === "free" && <span className="rounded-sm bg-ok/15 px-1.5 py-0.5 text-[11px] font-semibold text-ok">Free</span>}
      {offer === "giveaway" && <span className="rounded-sm bg-danger/15 px-1.5 py-0.5 text-[11px] font-semibold text-danger">Giveaway</span>}
      {product.seller && (
        <span className="inline-flex items-center gap-1 rounded-sm bg-surface-3 px-1.5 py-0.5 text-[11px] font-semibold text-muted">
          <Store className="h-3 w-3" /> Marketplace
        </span>
      )}
      {product.retailInr && offer === "buy" && (
        <span className="rounded-sm bg-brand/10 px-1.5 py-0.5 text-[11px] font-semibold text-brand">Single unit available</span>
      )}
    </div>
  );
}

// Stylised product "render" — a gradient tile with the product icon. Swap for
// real photography by adding images to /public and an `image` field.
export function ProductVisual({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-br text-white ${swatch[product.category]} ${
        size === "lg" ? "aspect-[4/3]" : "aspect-[16/10]"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full border border-white/15" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-white/10" />
      <Icon name={product.icon} className={size === "lg" ? "h-24 w-24 drop-shadow-lg" : "h-14 w-14 drop-shadow"} strokeWidth={1.25} />
      <span className="absolute left-3 top-3 rounded-sm bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
        {productCategories[product.category].short}
      </span>
      {product.oem && (
        <span className="absolute right-3 top-3 rounded-sm bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#1a1a1a]">OEM available</span>
      )}
    </div>
  );
}

function priceLine(product: Product) {
  const offer = offerOf(product);
  if (offer === "free") return { label: "Price", value: "Free" };
  if (offer === "giveaway") return { label: "Entry", value: "Free to enter" };
  if (product.retailInr) return { label: "Single unit", value: money(product.retailInr) };
  if (product.priceOnRequest) return { label: "Pricing", value: "On request" };
  const from = product.tiers?.[0];
  return { label: `From (${from?.qty})`, value: from?.inr ? money(from.inr) : "Quote" };
}

export function ProductCard({ product }: { product: Product }) {
  const price = priceLine(product);
  return (
    <Link href={`/products/${product.slug}`} className="card card-hover group flex h-full flex-col p-4" data-testid="product-card" data-category={product.category}>
      <ProductVisual product={product} />
      <div className="mt-3">
        <ProductBadges product={product} />
      </div>
      <h3 className="mt-2 font-semibold text-ink group-hover:text-brand">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{product.summary}</p>
      {product.seller && <p className="mt-2 text-xs text-muted">Sold by {product.seller.name} · {product.seller.location}</p>}
      <div className="mt-4 flex items-end justify-between gap-2 border-t border-line pt-3 text-xs">
        <div>
          <p className="text-muted">{offerOf(product) === "buy" ? "MOQ" : "Limit"}</p>
          <p className="font-semibold text-ink">{product.moq}</p>
        </div>
        <div className="text-right">
          <p className="text-muted">{price.label}</p>
          <p className="font-semibold text-ink">{price.value}</p>
        </div>
      </div>
    </Link>
  );
}

function StepsGrid({ steps, testId }: { steps: { title: string; icon: string; text: string }[]; testId: string }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid={testId}>
      {steps.map((s, i) => (
        <li key={s.title} className="card relative" data-reveal>
          <span className="absolute right-5 top-5 font-mono text-sm text-muted">0{i + 1}</span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand text-on-brand">
            <Icon name={s.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
          <p className="mt-1.5 text-sm text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Wholesale (bulk) ordering steps. */
export function OrderingProcess() {
  return <StepsGrid steps={orderingSteps} testId="ordering-process" />;
}

/** Single-quantity (retail) ordering steps. */
export function SingleOrderProcess() {
  return <StepsGrid steps={singleOrderSteps} testId="single-order-process" />;
}

/** Return window and terms that apply to one product. */
export function PolicySummary({ product }: { product: Product }) {
  const { rule, termsId } = policyFor(product);
  return (
    <div className="card p-4" data-testid="policy-summary">
      <p className="flex items-center gap-2 font-semibold text-ink">
        <Undo2 className="h-4 w-4 text-brand" /> Returns: {rule.window}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
        {rule.points.slice(0, 2).map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap gap-4 text-sm">
        <Link href={`/returns#${rule.id}`} className="font-semibold text-brand hover:underline">Full return policy</Link>
        <Link href={`/terms#${termsId}`} className="font-semibold text-brand hover:underline">Terms that apply</Link>
      </p>
    </div>
  );
}

export function ProductCategoryNav({ active }: { active?: ProductCategoryId }) {
  const chip = (href: string, on: boolean, children: React.ReactNode, testId?: string) => (
    <Link
      href={href}
      data-testid={testId}
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition ${
        on ? "border-brand bg-brand text-on-brand" : "border-line bg-card-solid text-ink hover:bg-surface-3"
      }`}
    >
      {children}
    </Link>
  );
  return (
    <nav aria-label="Product categories" className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {chip("/products", !active, "All products")}
        <Link href="#rfq" className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-brand">
          Wholesale quote <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {(
        [
          ["shop", "New hardware by type"],
          ["offers", "Offers"],
        ] as const
      ).map(([g, label]) => (
        <div key={g} className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="w-44 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
          <div className="flex flex-wrap gap-2">
            {productCategoriesByGroup(g).map((c) =>
              chip(`/products/category/${c.slug}`, active === c.id, (
                <>
                  <Icon name={c.icon} className="h-4 w-4" /> {c.title}
                </>
              ), `product-cat-${c.id}`),
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}
