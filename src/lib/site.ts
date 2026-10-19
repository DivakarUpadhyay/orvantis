import { categories, services } from "./services";

export const site = {
  name: "Orvantis Technologies",
  shortName: "Orvantis",
  tagline: "Custom software, IoT and embedded engineering for teams that build real things.",
  description:
    "Orvantis Technologies is a custom software development company. We build web, mobile and enterprise software, IoT and embedded systems, Industry 4.0 and automation solutions, AR/VR experiences, event technology rentals, and payment, KYC, SMS and logistics API integrations.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@orvantis.tech",
  /** Add a phone number here to show it on the site; leave empty to hide. */
  phone: "",
  address: "Room No. 304, Pavitra Prerna, Pavitradham, Near Juchandra, Naigaon East, Vasai, Maharashtra 401208, India",
  hours: "Mon – Sat, 09:30 – 18:30 (IST, GMT+5:30)",
  founded: 2026,
} as const;

export type Office = {
  id: string;
  label: string;
  flag: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryCode: string;
  phone: string;
  hours: string;
};

// Office addresses shown on the contact page, footer and structured data.
// Leave phone as "" to hide it for an office.
export const offices: Office[] = [
  {
    id: "india",
    label: "Headquarters — India",
    flag: "🇮🇳",
    street: "Room No. 304, Pavitra Prerna, Pavitradham, Near Juchandra, Naigaon East",
    city: "Vasai",
    region: "Maharashtra",
    postalCode: "401208",
    country: "India",
    countryCode: "IN",
    phone: site.phone,
    hours: site.hours,
  },
];

export const officeAddress = (o: Office) => `${o.street}, ${o.city}, ${o.region} ${o.postalCode}, ${o.country}`;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/locations", label: "Locations" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
] as const;

// Only claims the company can stand behind on day one; update as the track record grows.
export const stats = [
  { value: services.length, suffix: "", label: "Specialist services" },
  { value: Object.keys(categories).length, suffix: "", label: "Practices under one roof" },
  { value: 2, suffix: "", label: "Markets served" },
  { value: 24, suffix: "h", label: "Reply time on business days" },
] as const;
