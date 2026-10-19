import type { partnerTypes } from "./enquiry-schemas";

type PartnerType = (typeof partnerTypes)[number];

export type PartnerModel = {
  name: PartnerType;
  slug: string;
  icon: string;
  commercial: string;
  forWho: string;
  how: string;
  benefits: string[];
  /** Service / product areas this model is most used for. */
  areas: string[];
};

export const partnerModels: PartnerModel[] = [
  {
    name: "Referral partner",
    slug: "referral",
    icon: "Handshake",
    commercial: "Commission on every closed deal",
    forWho: "Consultants, accountants, industry experts and companies who meet businesses that need technology.",
    how: "Introduce a client, we handle the sales and delivery, and you earn a commission when the project is signed.",
    benefits: ["No delivery responsibility", "Transparent deal tracking", "Commission on renewals"],
    areas: ["All services", "Products"],
  },
  {
    name: "Reseller / distributor",
    slug: "reseller",
    icon: "Truck",
    commercial: "Wholesale margin on products and licences",
    forWho: "Hardware distributors, IT resellers and system houses selling to their own customer base.",
    how: "Buy IoT, AR/VR, embedded and semiconductor products at partner prices and resell them in your territory.",
    benefits: ["Tiered partner pricing", "Demo units and sales kits", "Territory protection on registered deals"],
    areas: ["IoT devices", "AR/VR hardware", "Embedded boards", "Semiconductor equipment"],
  },
  {
    name: "White-label partner",
    slug: "white-label",
    icon: "Layers",
    commercial: "Wholesale rate, you set your own price",
    forWho: "Digital agencies, IT companies and consultancies that want to offer more services under their own brand.",
    how: "We design, build and support the software behind the scenes; you own the client relationship and brand.",
    benefits: ["Your brand on everything", "NDA and non-solicit protection", "Dedicated delivery team"],
    areas: ["Web & mobile apps", "SaaS", "Digital marketing", "Automation"],
  },
  {
    name: "Technology & integration partner",
    slug: "technology",
    icon: "Plug",
    commercial: "Joint go-to-market and co-selling",
    forWho: "Software vendors, payment gateways, KYC providers, IoT platforms and hardware makers.",
    how: "We integrate your product into client solutions and list it in our integrations, and you refer integration work to us.",
    benefits: ["Certified integrations", "Joint case studies", "Co-marketing campaigns"],
    areas: ["Payments", "KYC", "IoT platforms", "ERP / CRM"],
  },
  {
    name: "Implementation partner",
    slug: "implementation",
    icon: "Wrench",
    commercial: "Subcontract or revenue share per project",
    forWho: "System integrators and service companies with local engineers who can install, commission and support.",
    how: "You deliver on-site work (installation, commissioning, training) for our projects in your region.",
    benefits: ["Steady project pipeline", "Training and certification", "Remote expert backup"],
    areas: ["Industrial automation", "IoT roll-outs", "Events setup", "AR/VR deployments"],
  },
  {
    name: "OEM / hardware partner",
    slug: "oem",
    icon: "Cpu",
    commercial: "Volume supply agreements",
    forWho: "Device and equipment manufacturers who need firmware, apps or connectivity, or want to supply components.",
    how: "We co-engineer firmware, apps and cloud for your devices, or source and supply components for your production.",
    benefits: ["Engineering to production support", "Long-term supply pricing", "Your brand on the product"],
    areas: ["Embedded systems", "IoT products", "Semiconductor components"],
  },
  {
    name: "Co-development / joint venture",
    slug: "co-development",
    icon: "GitBranch",
    commercial: "Shared investment and shared revenue",
    forWho: "Companies with domain expertise or distribution that want to build a new product together.",
    how: "We combine your industry knowledge with our engineering to build and commercialise a product, sharing risk and returns.",
    benefits: ["Shared IP and roadmap", "Lower upfront cost", "Faster time to market"],
    areas: ["SaaS products", "Industry solutions", "AR/VR platforms"],
  },
  {
    name: "Regional representative",
    slug: "regional",
    icon: "Globe",
    commercial: "Retainer plus success fee",
    forWho: "Business-development and consulting firms with strong networks in a specific country or region.",
    how: "Represent Orvantis in your region: generate leads, set up meetings and support local sales.",
    benefits: ["Exclusive regions available", "Full sales and technical backing", "Marketing budget support"],
    areas: ["All services", "Products", "Events"],
  },
  {
    name: "Event & rental partner",
    slug: "events",
    icon: "PartyPopper",
    commercial: "Rental revenue share",
    forWho: "Event management companies, exhibition organisers, malls and venues.",
    how: "Offer our LED walls, kiosks, VR booths, holograms and photo booths to your clients with our crew and content.",
    benefits: ["Partner rental rates", "Branded content creation", "Crew and logistics included"],
    areas: ["Event tech rentals", "Brand activations", "Live streaming"],
  },
  {
    name: "Agency partner",
    slug: "agency",
    icon: "Megaphone",
    commercial: "Referral fee or white-label rate",
    forWho: "Advertising, marketing and design agencies whose clients need apps, AR experiences or automation.",
    how: "Bring us in for the technical build behind your campaigns, under your brand or ours.",
    benefits: ["Creative + tech under one roof", "Fast turnaround for campaigns", "Shared credit on case studies"],
    areas: ["Web & apps", "AR / VR", "Chatbots", "Digital marketing"],
  },
  {
    name: "Startup & incubator partner",
    slug: "startup",
    icon: "Rocket",
    commercial: "Discounted build packages",
    forWho: "Incubators, accelerators, universities and investors supporting early-stage companies.",
    how: "Your startups get preferred rates for MVPs, prototypes and hardware, plus office hours with our specialists.",
    benefits: ["Preferred MVP pricing", "Prototype hardware support", "Mentoring sessions"],
    areas: ["MVPs", "IoT prototypes", "SaaS"],
  },
];

export const partnerIndustries = [
  "Manufacturing",
  "Electronics & semiconductors",
  "Automotive & EV",
  "Energy & utilities",
  "Healthcare & life sciences",
  "Logistics & supply chain",
  "Retail & e-commerce",
  "Banking, fintech & insurance",
  "Real estate & construction",
  "Education & training",
  "Agriculture & food",
  "Events, media & advertising",
  "Government & public sector",
  "IT & software services",
  "Telecom",
  "Hospitality & travel",
];

// Partner finder: which models suit each kind of business, best first.
export const businessTypes: { id: string; label: string; models: string[] }[] = [
  { id: "it", label: "IT / software services company", models: ["white-label", "implementation", "referral"] },
  { id: "agency", label: "Marketing, advertising or design agency", models: ["agency", "white-label", "referral"] },
  { id: "distributor", label: "Hardware distributor / reseller", models: ["reseller", "oem", "regional"] },
  { id: "manufacturer", label: "Manufacturer / OEM", models: ["oem", "co-development", "technology"] },
  { id: "integrator", label: "System integrator / automation company", models: ["implementation", "reseller", "technology"] },
  { id: "saas", label: "Software / platform vendor", models: ["technology", "co-development", "referral"] },
  { id: "events", label: "Event, exhibition or venue company", models: ["events", "agency", "referral"] },
  { id: "consulting", label: "Consultancy / business advisor", models: ["referral", "regional", "co-development"] },
  { id: "incubator", label: "Incubator, university or investor", models: ["startup", "co-development", "referral"] },
];

export const partnerSteps = [
  { title: "Apply", icon: "ClipboardCheck", text: "Tell us about your business, region and the model that interests you." },
  { title: "Discovery call", icon: "Users", text: "We discuss your customers, capabilities and goals, and agree the best-fit model." },
  { title: "Agreement", icon: "ShieldCheck", text: "NDA and a clear partner agreement covering pricing, territory and responsibilities." },
  { title: "Onboarding", icon: "Rocket", text: "Training, sales kit, demo access and a named partner manager." },
  { title: "Grow together", icon: "LifeBuoy", text: "Co-selling, joint delivery and quarterly reviews with transparent reporting." },
];
