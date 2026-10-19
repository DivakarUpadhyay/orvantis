"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { industries, industryGroups } from "@/lib/content";
import { locations } from "@/lib/locations";
import { money } from "@/lib/currency";
import {
  categories,
  categoryIdsByGroup,
  orderedCategoryIds,
  serviceGroups,
  servicesByCategory,
  type CategoryId,
  type ServiceGroup,
} from "@/lib/services";
import { KindBadge } from "./KindBadge";
import {
  productCategories,
  productCategoriesByGroup,
  productsByCategory,
  type ProductCategoryId,
  type ProductGroup,
} from "@/lib/products";
import { officeAddress, offices, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type MegaId = "services" | "products" | "marketplace" | "industries" | "company";

// `match` lists the routes that light up each top-level item.
const megaItems: { id: MegaId; label: string; href: string; match: string[] }[] = [
  { id: "services", label: "Services", href: "/services", match: ["/services"] },
  { id: "products", label: "Products", href: "/products", match: ["/products"] },
  { id: "marketplace", label: "Marketplace", href: "/marketplace", match: ["/marketplace", "/donate"] },
  { id: "industries", label: "Industries", href: "/industries", match: ["/industries"] },
  {
    id: "company",
    label: "Company",
    href: "/about",
    match: ["/about", "/process", "/careers", "/locations", "/contact", "/partners", "/terms", "/returns", "/privacy"],
  },
];
const plainLinks = [{ href: "/demos", label: "Demos" }];

const companyLinks = [
  { href: "/about", label: "About us", icon: "Building2", text: "Who we are and what we stand for" },
  { href: "/process", label: "How we work", icon: "Workflow", text: "Our delivery process and engagement models" },
  {
    href: "/partners",
    label: "Partner programme",
    icon: "Handshake",
    text: "Referral, reseller, white-label and more",
  },
  { href: "/careers", label: "Careers", icon: "Briefcase", text: "Join our team in India" },
  { href: "/locations", label: "Markets we serve", icon: "Globe", text: "Clients in India and Taiwan" },
  { href: "/contact", label: "Contact us", icon: "Mail", text: "Talk to our team" },
  { href: "/terms", label: "Terms & Conditions", icon: "FileText", text: "Terms for every service and product type" },
  { href: "/returns", label: "Return & refund policy", icon: "Undo2", text: "Return windows by product type" },
];

const marketplaceLinks = [
  {
    href: "/marketplace#sell",
    label: "Sell on our marketplace",
    icon: "Store",
    text: "For businesses: list your products and reach our buyers",
  },
  {
    href: "/marketplace#resell",
    label: "Resell & earn commission",
    icon: "Share2",
    text: "For anyone: share products with your code and earn",
  },
  {
    href: "/donate",
    label: "Donate your used tech",
    icon: "HeartHandshake",
    text: "Give second-hand devices a new life",
  },
  {
    href: "/marketplace#listings",
    label: "Marketplace products",
    icon: "ShoppingBag",
    text: "Products from verified partner sellers",
  },
  {
    href: "/terms#marketplace-sellers",
    label: "Seller & reseller terms",
    icon: "FileText",
    text: "Commission, payouts and rules",
  },
];
const prodIds = Object.keys(productCategories) as ProductCategoryId[];
const prodGroups: { id: ProductGroup; label: string }[] = [
  { id: "shop", label: "New hardware by type" },
  { id: "offers", label: "Offers" },
];

const catIds = orderedCategoryIds;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<MegaId | null>(null);
  const [mobileSection, setMobileSection] = useState<MegaId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close menus after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMega(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMega(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMega(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openedAt = useRef(0);
  const openMega = (id: MegaId, at = 0) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (mega !== id) openedAt.current = at;
    setMega(id);
  };
  // A click right after hover-open should keep the menu open, not toggle it shut.
  const clickMega = (id: MegaId, at: number) => {
    if (mega === id && at - openedAt.current > 400) setMega(null);
    else openMega(id, at);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 150);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      ref={headerRef}
      className={`acrylic sticky top-0 z-50 border-b transition-colors ${
        scrolled || open || mega ? "border-line" : "border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-brand focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex" onMouseLeave={scheduleClose}>
          {megaItems.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-expanded={mega === m.id}
              aria-controls={`mega-${m.id}`}
              data-testid={`mega-trigger-${m.id}`}
              onMouseEnter={(e) => openMega(m.id, e.timeStamp)}
              onFocus={(e) => openMega(m.id, e.timeStamp)}
              onClick={(e) => clickMega(m.id, e.timeStamp)}
              className={`relative inline-flex items-center gap-1 rounded-md px-3.5 py-2 text-sm transition hover:bg-surface-3 ${
                m.match.some(isActive) || mega === m.id ? "font-semibold text-ink" : "text-ink/80"
              }`}
            >
              <NavPip on={m.match.some(isActive) || mega === m.id} />
              {m.label}
              <ChevronDown className={`h-4 w-4 transition ${mega === m.id ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          ))}
          {plainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={scheduleClose}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative rounded-md px-3.5 py-2 text-sm transition hover:bg-surface-3 ${
                isActive(l.href) ? "font-semibold text-ink" : "text-ink/80"
              }`}
            >
              <NavPip on={isActive(l.href)} />
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="btn-primary hidden sm:inline-flex" data-testid="header-cta">
            Get a quote
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-surface-3 active:scale-95 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            data-testid="menu-button"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega menus */}
      {mega && (
        <div
          id={`mega-${mega}`}
          data-testid={`mega-${mega}`}
          className="flyout absolute left-1/2 top-[calc(100%+6px)] hidden w-[min(76rem,calc(100vw-2rem))] -translate-x-1/2 animate-fade-in rounded-lg border border-line lg:block max-h-[calc(100dvh-5.5rem)] overflow-y-auto"
          onMouseEnter={() => openMega(mega)}
          onMouseLeave={scheduleClose}
          onClick={(e) => (e.target as HTMLElement).closest("a") && setMega(null)}
        >
          <div className="px-8 py-7">
            {mega === "services" && <ServicesMega />}
            {mega === "products" && <ProductsMega />}
            {mega === "marketplace" && <MarketplaceMega />}
            {mega === "industries" && <IndustriesMega />}
            {mega === "company" && <CompanyMega />}
          </div>
        </div>
      )}

      {/* Mobile menu with accordion sections */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          data-testid="mobile-menu"
          className="flyout h-[calc(100dvh-4rem)] animate-fade-in overflow-y-auto border-t border-line pb-10 pt-4 lg:hidden"
          onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
        >
          <ul className="container-x flex flex-col gap-1">
            {megaItems.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  aria-expanded={mobileSection === m.id}
                  data-testid={`mobile-section-${m.id}`}
                  onClick={() => setMobileSection((s) => (s === m.id ? null : m.id))}
                  className="flex w-full items-center justify-between rounded-md px-4 py-3 text-lg font-medium text-ink"
                >
                  {m.label}
                  <ChevronDown
                    className={`h-5 w-5 transition ${mobileSection === m.id ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {mobileSection === m.id && (
                  <div className="mb-2 animate-fade-in rounded-md bg-surface-2 px-4 py-3">
                    {m.id === "services" &&
                      catIds.map((c) => (
                        <div key={c} className="py-2">
                          <Link
                            href={`/services/category/${categories[c].slug}`}
                            className="text-xs font-semibold uppercase tracking-wider text-brand"
                          >
                            {categories[c].title}
                          </Link>
                          <ul className="mt-2 grid gap-1">
                            {servicesByCategory(c).map((s) => (
                              <li key={s.slug}>
                                <Link href={`/services/${s.slug}`} className="block py-1.5 text-sm text-ink">
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    {m.id === "industries" &&
                      industryGroups.map((g) => (
                        <div key={g} className="py-2">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{g}</p>
                          <ul className="mt-2 grid gap-1">
                            {industries
                              .filter((i) => i.group === g)
                              .map((i) => (
                                <li key={i.slug}>
                                  <Link
                                    href={`/industries#${i.slug}`}
                                    className="flex items-center gap-2 py-1.5 text-sm text-ink"
                                  >
                                    <Icon name={i.icon} className="h-4 w-4 text-brand" /> {i.title}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                    {m.id === "marketplace" && (
                      <ul className="grid gap-1">
                        {marketplaceLinks.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="flex items-center gap-2 py-1.5 text-sm text-ink">
                              <Icon name={l.icon} className="h-4 w-4 text-brand" /> {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {m.id === "products" &&
                      prodIds.map((c) => (
                        <div key={c} className="py-2">
                          <Link
                            href={`/products/category/${productCategories[c].slug}`}
                            className="text-xs font-semibold uppercase tracking-wider text-brand"
                          >
                            {productCategories[c].title}
                          </Link>
                          <ul className="mt-2 grid gap-1">
                            {productsByCategory(c).map((p) => (
                              <li key={p.slug}>
                                <Link href={`/products/${p.slug}`} className="block py-1.5 text-sm text-ink">
                                  {p.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    {m.id === "company" && (
                      <ul className="grid gap-1">
                        {companyLinks.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="flex items-center gap-2 py-1.5 text-sm text-ink">
                              <Icon name={l.icon} className="h-4 w-4 text-brand" /> {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={m.href}
                      className="mt-2 inline-flex items-center gap-1 py-1.5 text-sm font-semibold text-brand"
                    >
                      View all {m.label.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </li>
            ))}
            {plainLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-md px-4 py-3 text-lg font-medium ${
                    isActive(l.href) ? "bg-brand/10 text-brand" : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-x">
            <Link href="/contact" className="btn-primary mt-6 w-full justify-center">
              Get a free quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function ServicesMega() {
  const [active, setActive] = useState<CategoryId>("software");
  const cat = categories[active];
  const list = servicesByCategory(active);
  return (
    <div className="grid grid-cols-[17rem_1fr_15rem] gap-8">
      <div
        role="tablist"
        aria-label="Service categories"
        aria-orientation="vertical"
        className="flex flex-col gap-1 border-r border-line pr-6"
      >
        {(["software", "hardware"] as ServiceGroup[]).map((g) => (
          <div key={g} className="mb-1" data-testid={`mega-group-${g}`}>
            <p className="flex items-center gap-2 px-3 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-wider text-muted">
              <KindBadge kind={g} label={serviceGroups[g].title} />
            </p>
            {categoryIdsByGroup(g).map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active === c}
                data-testid={`mega-cat-${c}`}
                onMouseEnter={() => setActive(c)}
                onFocus={() => setActive(c)}
                onClick={() => setActive(c)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition ${
                  active === c ? "bg-surface-3 text-ink" : "text-ink hover:bg-surface-3"
                }`}
              >
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    active === c ? "bg-brand text-on-brand" : "bg-surface-3 text-brand"
                  }`}
                >
                  <Icon name={categories[c].icon} className="h-4 w-4" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{categories[c].title}</span>
                </span>
              </button>
            ))}
          </div>
        ))}
        <Link href="/services" className="mt-3 inline-flex items-center gap-1 px-3 text-sm font-semibold text-brand">
          All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div role="tabpanel" data-testid={`mega-panel-${active}`} key={active} className="animate-fade-in">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 font-semibold text-ink">
              {cat.title} <KindBadge kind={cat.group} />
            </p>
            <p className="mt-1 max-w-xl text-sm text-muted">{cat.blurb}</p>
          </div>
          <Link
            href={`/services/category/${cat.slug}`}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand"
          >
            Overview <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-1">
          {list.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex gap-3 rounded-md p-2.5 transition hover:bg-surface-3"
              >
                <Icon name={s.icon} className="mt-0.5 h-5 w-5 shrink-0 text-brand/70 group-hover:text-brand" />
                <span>
                  <span className="block text-sm font-medium text-ink group-hover:text-brand">{s.title}</span>
                  <span className="mt-0.5 line-clamp-1 block text-xs text-muted">{s.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <FeaturePanel
        title="Not sure where to start?"
        text="Book a free consultation with our specialists. We'll map your needs to the right services."
        href="/contact"
        cta="Book a free call"
        secondary={{ href: "/process", label: "How we work" }}
      />
    </div>
  );
}

function IndustriesMega() {
  return (
    <div className="grid grid-cols-[1fr_17rem] gap-8">
      <div className="grid grid-cols-3 gap-6">
        {industryGroups.map((g) => (
          <div key={g}>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted">{g}</p>
            <ul className="mt-3 space-y-1">
              {industries
                .filter((i) => i.group === g)
                .map((i) => (
                  <li key={i.slug}>
                    <Link
                      href={`/industries#${i.slug}`}
                      className="group flex gap-3 rounded-md p-3 transition hover:bg-surface-3"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <Icon name={i.icon} className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink group-hover:text-brand">{i.title}</span>
                        <span className="mt-0.5 line-clamp-1 block text-xs text-muted">{i.solutions.join(" · ")}</span>
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <FeaturePanel
        title="Industry 4.0 for manufacturers"
        text="MES, machine connectivity, predictive maintenance and machine vision from one team."
        href="/services/category/manufacturing-industry-4-0"
        cta="Manufacturing services"
        secondary={{ href: "/industries", label: "All industries" }}
      />
    </div>
  );
}

function ProductsMega() {
  const [active, setActive] = useState<ProductCategoryId>("iot");
  const cat = productCategories[active];
  const list = productsByCategory(active);
  return (
    <div className="grid grid-cols-[17rem_1fr_15rem] gap-8">
      <div
        role="tablist"
        aria-label="Product categories"
        aria-orientation="vertical"
        className="flex flex-col gap-1 border-r border-line pr-6"
      >
        {prodGroups.map((g) => (
          <div key={g.id} className="mb-1" data-testid={`mega-prod-group-${g.id}`}>
            <p className="px-3 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-wider text-muted">{g.label}</p>
            {productCategoriesByGroup(g.id).map(({ id: c }) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active === c}
                data-testid={`mega-prod-${c}`}
                onMouseEnter={() => setActive(c)}
                onFocus={() => setActive(c)}
                onClick={() => setActive(c)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition ${active === c ? "bg-surface-3 text-ink" : "text-ink hover:bg-surface-3"}`}
              >
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${active === c ? "bg-brand text-on-brand" : "bg-surface-3 text-brand"}`}
                >
                  <Icon name={productCategories[c].icon} className="h-4 w-4" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{productCategories[c].title}</span>
                </span>
              </button>
            ))}
          </div>
        ))}
        <Link href="/products" className="mt-3 inline-flex items-center gap-1 px-3 text-sm font-semibold text-brand">
          All products <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div role="tabpanel" data-testid={`mega-prod-panel-${active}`} key={active} className="animate-fade-in">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 font-semibold text-ink">
              {cat.title} <KindBadge kind="hardware" label={cat.group === "shop" ? "New hardware" : "Offer"} />
            </p>
            <p className="mt-1 max-w-xl text-sm text-muted">{cat.blurb}</p>
          </div>
          <Link
            href={`/products/category/${cat.slug}`}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand"
          >
            View category <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-1">
          {list.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="group flex gap-3 rounded-md p-2.5 transition hover:bg-surface-3"
              >
                <Icon name={p.icon} className="mt-0.5 h-5 w-5 shrink-0 text-brand/70 group-hover:text-brand" />
                <span>
                  <span className="block text-sm font-medium text-ink group-hover:text-brand">{p.name}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {p.category === "free"
                      ? "Free"
                      : p.category === "giveaway"
                        ? "Free to enter"
                        : p.retailInr
                          ? `${money(p.retailInr)} · single unit`
                          : p.priceOnRequest
                            ? "Price on request"
                            : `from ${p.tiers?.[0]?.inr ? money(p.tiers[0].inr) : "quote"}`}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <FeaturePanel
        title="One unit or a thousand"
        text="Buy single units online, or get tiered wholesale pricing, OEM options and delivery across India and Taiwan."
        href="/products#rfq"
        cta="Request a quote"
        secondary={{ href: "/products#how-to-buy", label: "How to buy" }}
      />
    </div>
  );
}

function MarketplaceMega() {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_16rem] gap-6">
      <a
        href="/marketplace#sell"
        className="reveal rounded-lg border border-line bg-surface-2 p-6 transition hover:border-brand"
        data-testid="mega-mp-sell"
      >
        <Icon name="Store" className="h-8 w-8 text-ok" />
        <p className="mt-4 text-lg font-semibold text-ink">Sell on our marketplace</p>
        <p className="mt-1 text-sm text-muted">
          For manufacturers, distributors and shops. List your products, we bring buyers, payments and support.
          Commission per sale.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          Apply as seller <ArrowRight className="h-4 w-4" />
        </span>
      </a>
      <a
        href="/marketplace#resell"
        className="reveal rounded-lg border border-line bg-surface-2 p-6 transition hover:border-brand"
        data-testid="mega-mp-resell"
      >
        <Icon name="Share2" className="h-8 w-8 text-ok" />
        <p className="mt-4 text-lg font-semibold text-ink">Resell &amp; earn commission</p>
        <p className="mt-1 text-sm text-muted">
          For individuals, students and shops. Share products with your reseller code; we deliver, you earn.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          Join as reseller <ArrowRight className="h-4 w-4" />
        </span>
      </a>
      <a
        href="/donate"
        className="reveal rounded-lg border border-line bg-surface-2 p-6 transition hover:border-brand"
        data-testid="mega-mp-donate"
      >
        <Icon name="HeartHandshake" className="h-8 w-8 text-ok" />
        <p className="mt-4 text-lg font-semibold text-ink">Donate your used tech</p>
        <p className="mt-1 text-sm text-muted">
          Give second-hand devices to students and NGOs. We wipe, test, refurbish or recycle them responsibly.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          Donate now <ArrowRight className="h-4 w-4" />
        </span>
      </a>
      <ul className="space-y-1">
        {marketplaceLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex gap-3 rounded-md p-2 transition hover:bg-surface-3">
              <Icon name={l.icon} className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>
                <span className="block text-sm font-semibold text-ink group-hover:text-brand">{l.label}</span>
                <span className="block text-xs text-muted">{l.text}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompanyMega() {
  return (
    <div className="grid grid-cols-[1fr_1fr_17rem] gap-8">
      <ul className="grid grid-cols-1 gap-1">
        {companyLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex gap-3 rounded-md p-2.5 transition hover:bg-surface-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                <Icon name={l.icon} className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink group-hover:text-brand">{l.label}</span>
                <span className="block text-xs text-muted">{l.text}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted">Markets we serve</p>
        <ul className="mt-3 grid grid-cols-2 gap-0.5" data-testid="mega-company-markets">
          {locations.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/locations/${l.slug}`}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink transition hover:bg-surface-3 hover:text-brand"
              >
                <span aria-hidden="true">{l.flag}</span> {l.country}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        {offices.map((o) => (
          <div key={o.id} className="rounded-md border border-line bg-card p-3">
            <p className="text-sm font-semibold text-ink">
              <span aria-hidden="true">{o.flag}</span> {o.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{officeAddress(o)}</p>
          </div>
        ))}
        <Link href="/contact" className="btn-primary justify-center">
          Contact us
        </Link>
      </div>
    </div>
  );
}

// NavigationView selection indicator: a short accent bar under the active item.
function NavPip({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-0.5 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-brand transition-all duration-300 ease-[var(--ease-fluent)] ${
        on ? "w-4 opacity-100" : "w-0 opacity-0"
      }`}
    />
  );
}

function FeaturePanel({
  title,
  text,
  href,
  cta,
  secondary,
}: {
  title: string;
  text: string;
  href: string;
  cta: string;
  secondary: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col rounded-lg bg-gradient-to-br from-[#005fb8] to-[#003e7e] p-6 text-white">
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 flex-1 text-sm text-white/85">{text}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#005fb8] transition hover:bg-white/90"
      >
        {cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <Link href={secondary.href} className="mt-3 text-center text-sm font-medium text-white/90 hover:underline">
        {secondary.label}
      </Link>
    </div>
  );
}
