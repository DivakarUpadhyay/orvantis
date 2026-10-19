// The site's top-level sections. Each has its own colour so visitors always
// know which part of the site they are in (shown in SectionLabel and on home).
export type SectionId = "services" | "products" | "marketplace" | "industries" | "demos" | "company";

export const sections: Record<
  SectionId,
  { id: SectionId; label: string; href: string; icon: string; color: string; text: string; links: { label: string; href: string }[] }
> = {
  services: {
    id: "services",
    label: "Services",
    href: "/services",
    icon: "Wrench",
    color: "#005fb8",
    text: "Work we do for you, split into Software & Digital and Hardware & Engineering.",
    links: [
      { label: "Software & digital services", href: "/services#software-services" },
      { label: "Hardware & engineering services", href: "/services#hardware-services" },
      { label: "All services", href: "/services" },
    ],
  },
  products: {
    id: "products",
    label: "Products",
    href: "/products",
    icon: "ShoppingBag",
    color: "#ca5010",
    text: "Hardware you can buy: single units, wholesale, refurbished, free samples and giveaways.",
    links: [
      { label: "New hardware", href: "/products#new" },
      { label: "Refurbished & second-hand", href: "/products/category/second-hand-refurbished" },
      { label: "Free products & giveaways", href: "/products#offers" },
    ],
  },
  marketplace: {
    id: "marketplace",
    label: "Marketplace",
    href: "/marketplace",
    icon: "Store",
    color: "#107c10",
    text: "Sell your products through us, share products and earn commission, or donate your used tech.",
    links: [
      { label: "Sell on our marketplace", href: "/marketplace#sell" },
      { label: "Resell & earn commission", href: "/marketplace#resell" },
      { label: "Donate your used tech", href: "/donate" },
      { label: "Marketplace products", href: "/marketplace#listings" },
    ],
  },
  industries: {
    id: "industries",
    label: "Industries",
    href: "/industries",
    icon: "Factory",
    color: "#038387",
    text: "How our services and products fit manufacturing, electronics, energy, logistics and more.",
    links: [
      { label: "All industries", href: "/industries" },
      { label: "Markets we serve", href: "/locations" },
    ],
  },
  demos: {
    id: "demos",
    label: "Demos",
    href: "/demos",
    icon: "Sparkles",
    color: "#744da9",
    text: "Try interactive demos of the solutions we build, right in your browser.",
    links: [
      { label: "Smart factory dashboard", href: "/demos/smart-factory-dashboard" },
      { label: "Payment checkout", href: "/demos/payment-checkout" },
      { label: "All demos", href: "/demos" },
    ],
  },
  company: {
    id: "company",
    label: "Company",
    href: "/about",
    icon: "Building2",
    color: "#5d5a58",
    text: "Who we are, how we work, partnerships, careers, policies and contact.",
    links: [
      { label: "About us", href: "/about" },
      { label: "Partner programme", href: "/partners" },
      { label: "Terms & returns", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
};
