import Link from "next/link";
import { BadgeCheck, Check } from "lucide-react";
import { ResellerForm, SellerForm } from "@/components/CommerceForms";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/products";
import { PageHero, SectionHeading } from "@/components/ui";
import { products } from "@/lib/products";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Marketplace — Sell With Us or Resell & Earn Commission",
  description:
    "Businesses can list and sell their technology products through our marketplace. Individuals and shops can share products with their reseller code and earn commission on every completed order.",
  path: "/marketplace",
  keywords: ["sell electronics online marketplace", "become a reseller earn commission", "reseller program India", "dropshipping electronics India", "sell IoT products online"],
});

const sellSteps = [
  { icon: "UserPlus", title: "Apply", text: "Submit the seller form with your business and product details." },
  { icon: "ShieldCheck", title: "Get verified", text: "Share business registration, tax ID and bank details; sign the seller agreement." },
  { icon: "Package", title: "List products", text: "We help you create accurate listings with specs, prices and warranty." },
  { icon: "Truck", title: "Ship orders", text: "You ship to the customer (or to our warehouse) when an order arrives." },
  { icon: "BadgePercent", title: "Get paid", text: "Payout to your bank after the return window, minus the agreed commission." },
];

const resellSteps = [
  { icon: "UserPlus", title: "Join free", text: "Sign up in two minutes and get your personal reseller code." },
  { icon: "Share2", title: "Share products", text: "Share product links with your code on WhatsApp, social media or in your shop." },
  { icon: "ShoppingCart", title: "Customer orders", text: "Your customer orders on our site; your code is attached to the order automatically." },
  { icon: "Truck", title: "We deliver", text: "We handle payment, packing, shipping, returns and support." },
  { icon: "BadgePercent", title: "You earn", text: "Commission shown on each product is paid to your UPI or bank after the return window." },
];

function Steps({ steps, testId }: { steps: { icon: string; title: string; text: string }[]; testId: string }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" data-testid={testId}>
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
  );
}

export default function MarketplacePage() {
  const listings = products.filter((p) => p.seller);
  const earnable = products.filter((p) => p.resellerCommission).slice(0, 6);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Marketplace", path: "/marketplace" }])} />
      <PageHero
        section="marketplace"
        eyebrow="Overview"
        title={
          <>
            Sell with us, or <span className="text-gradient">resell and earn</span>
          </>
        }
        text="Three ways to take part: list your own products as a seller, share products as a reseller and earn commission, or donate second-hand tech so it reaches people who need it."
      >
        <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:max-w-5xl">
          <a href="#sell" className="card card-hover block" data-testid="mp-sell-card">
            <Icon name="Store" className="h-6 w-6 text-ok" />
            <p className="mt-3 font-semibold text-ink">I have products to sell</p>
            <p className="mt-1 text-sm text-muted">For manufacturers, distributors and shops. List your products and reach our customers.</p>
          </a>
          <a href="#resell" className="card card-hover block" data-testid="mp-resell-card">
            <Icon name="Share2" className="h-6 w-6 text-ok" />
            <p className="mt-3 font-semibold text-ink">I want to resell and earn</p>
            <p className="mt-1 text-sm text-muted">For individuals, students and shops. No stock, no investment; share and earn commission.</p>
          </a>
          <Link href="/donate" className="card card-hover block" data-testid="mp-donate-card">
            <Icon name="HeartHandshake" className="h-6 w-6 text-ok" />
            <p className="mt-3 font-semibold text-ink">I want to donate used tech</p>
            <p className="mt-1 text-sm text-muted">Give second-hand devices to students and NGOs. We wipe, test and refurbish or recycle them.</p>
          </Link>
        </div>
      </PageHero>

      {/* Sell */}
      <section id="sell" className="container-x scroll-mt-20 py-14">
        <SectionHeading eyebrow="For sellers" title="Sell your products on our marketplace" text="Reach business buyers across India and Taiwan. You set your price; we bring buyers, payments and support." />
        <div className="mt-8"><Steps steps={sellSteps} testId="sell-steps" /></div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <div className="card">
              <p className="font-semibold text-ink">What you get</p>
              <ul className="mt-3 space-y-2 text-sm">
                {["Listing on our product catalogue and partner network", "Secure payment collection and buyer protection", "Optional warehousing and shipping from our hub", "Seller dashboard reports by email", "Help with specs, photos and listing content"].map((t) => (
                  <li key={t} className="flex gap-2 text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <p className="font-semibold text-ink">Seller requirements</p>
              <ul className="mt-3 space-y-2 text-sm">
                {["Registered business with GST / tax ID", "Genuine, legal and safe products only", "Accurate specifications and warranty details", "Dispatch within the promised time"].map((t) => (
                  <li key={t} className="flex gap-2 text-ink"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {t}</li>
                ))}
              </ul>
              <Link href="/terms#marketplace-sellers" className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">Read the seller terms</Link>
            </div>
          </div>
          <SellerForm />
        </div>
      </section>

      {/* Resell */}
      <section id="resell" className="acrylic scroll-mt-20 border-y border-line py-14">
        <div className="container-x">
          <SectionHeading eyebrow="For resellers" title="Resell products and earn commission" text="Like social reselling apps: pick products, share them with your reseller code, and earn on every completed order. We handle everything else." />
          <div className="mt-8"><Steps steps={resellSteps} testId="resell-steps" /></div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <h3 className="text-lg font-semibold text-ink">Products you can earn on</h3>
              <ul className="mt-4 space-y-2" data-testid="earn-list">
                {earnable.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} className="flex items-center justify-between gap-3 rounded-md border border-line bg-card px-3 py-2 text-sm transition hover:border-brand">
                      <span className="text-ink">{p.name}</span>
                      <span className="shrink-0 rounded-sm bg-ok/15 px-1.5 py-0.5 text-[11px] font-semibold text-ok">{p.resellerCommission} commission</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                Commission is shown on every eligible product page under “Share &amp; earn”.{" "}
                <Link href="/terms#resellers" className="font-semibold text-brand hover:underline">Reseller terms</Link>
              </p>
            </div>
            <ResellerForm />
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="container-x scroll-mt-20 py-14">
        <SectionHeading eyebrow="Marketplace listings" title="Products from verified sellers" text="Sold and shipped by verified partner sellers, with our buyer protection and return support." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </>
  );
}
