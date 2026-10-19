import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { productCategoriesByGroup } from "@/lib/products";
import { categories, categoryIdsByGroup } from "@/lib/services";
import { officeAddress, offices, site } from "@/lib/site";
import { Logo } from "./Logo";

const marketplace = [
  { href: "/marketplace#sell", label: "Sell on our marketplace" },
  { href: "/marketplace#resell", label: "Resell & earn" },
  { href: "/donate", label: "Donate used tech" },
  { href: "/marketplace#listings", label: "Marketplace products" },
];

const policies = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/returns", label: "Return & refund policy" },
  { href: "/privacy", label: "Privacy policy" },
];

const company = [
  { href: "/about", label: "About us" },
  { href: "/process", label: "How we work" },
  { href: "/demos", label: "Live demos" },
  { href: "/partners", label: "Partner programme" },
  { href: "/careers", label: "Careers" },
  { href: "/locations", label: "Markets we serve" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact us" },
];

export function Footer() {
  return (
    <footer className="acrylic mt-auto border-t border-line" data-testid="site-footer">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
            <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
          </p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {offices.map((o) => (
              <li key={o.id} className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  <span className="font-medium text-ink">{o.label}</span>
                  <br />
                  {officeAddress(o)}
                  {o.phone && (
                    <>
                      <br />
                      <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 hover:text-brand">
                        <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {o.phone}
                      </a>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <FooterCol title="Software services" links={categoryIdsByGroup("software").map((c) => ({ href: `/services/category/${categories[c].slug}`, label: categories[c].title }))} />
          <FooterCol title="Hardware services" links={categoryIdsByGroup("hardware").map((c) => ({ href: `/services/category/${categories[c].slug}`, label: categories[c].title }))} more={{ href: "/services", label: "All services →" }} />
        </div>
        <div className="space-y-8">
          <FooterCol title="Hardware products" links={productCategoriesByGroup("shop").map((c) => ({ href: `/products/category/${c.slug}`, label: c.title }))} />
          <FooterCol title="Offers" links={productCategoriesByGroup("offers").map((c) => ({ href: `/products/category/${c.slug}`, label: c.title }))} more={{ href: "/products", label: "All products →" }} />
        </div>
        <div className="space-y-8">
          <FooterCol title="Marketplace" links={marketplace} />
          <FooterCol title="Policies" links={policies} />
        </div>
        <FooterCol title="Company" links={company} />
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted sm:flex-row">
          <p>© {site.founded} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="hover:text-brand">Terms</Link>
            <Link href="/returns" className="hover:text-brand">Returns</Link>
            <Link href="/privacy" className="hover:text-brand">Privacy</Link>
            <Link href="/contact" className="hover:text-brand">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, more }: { title: string; links: { href: string; label: string }[]; more?: { href: string; label: string } }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-muted transition hover:text-brand">{l.label}</Link>
          </li>
        ))}
        {more && (
          <li>
            <Link href={more.href} className="font-medium text-brand">{more.label}</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
