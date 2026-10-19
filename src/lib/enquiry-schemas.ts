import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your full name.").max(100);
const email = z.email("Please enter a valid email address.").max(200);
const company = z.string().trim().min(2, "Please enter your company name.").max(120);
const country = z.string().trim().min(2, "Please choose your country.").max(60);
const phone = z.string().trim().max(30).regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + ( ) - only.").optional().default("");
const honeypot = z.string().max(0).optional().default("");
const consent = z.literal(true, { error: "Please agree so we can reply to you." });

export const incoterms = ["EXW", "FOB", "CIF", "DDP", "Not sure"] as const;

// Wholesale request for quotation.
export const rfqSchema = z.object({
  product: z.string().trim().min(1, "Please choose a product.").max(120),
  quantity: z.coerce.number({ error: "Enter a quantity." }).int("Whole numbers only.").min(1, "Enter a quantity of at least 1.").max(10_000_000),
  incoterm: z.enum(incoterms, { error: "Please choose a delivery term." }),
  oem: z.boolean().optional().default(false),
  name,
  email,
  company,
  country,
  phone,
  notes: z.string().trim().max(3000, "Notes are too long.").optional().default(""),
  consent,
  website: honeypot,
});

export const partnerTypes = [
  "Referral partner",
  "Reseller / distributor",
  "White-label partner",
  "Technology & integration partner",
  "Implementation partner",
  "OEM / hardware partner",
  "Co-development / joint venture",
  "Regional representative",
  "Event & rental partner",
  "Agency partner",
  "Startup & incubator partner",
] as const;

export const partnerSchema = z.object({
  partnerType: z.enum(partnerTypes, { error: "Please choose a partnership model." }),
  industry: z.string().trim().min(2, "Please choose your industry.").max(80),
  region: z.string().trim().min(2, "Please choose your region.").max(60),
  name,
  email,
  company,
  country,
  phone,
  website_url: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(20, "Please tell us a little more (at least 20 characters).").max(3000),
  consent,
  website: honeypot,
});

export type RfqInput = z.input<typeof rfqSchema>;
export type PartnerInput = z.input<typeof partnerSchema>;

export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

const address = {
  addressLine: z.string().trim().min(5, "Please enter your street address.").max(200),
  city: z.string().trim().min(2, "Please enter your city.").max(80),
  state: z.string().trim().min(2, "Please enter your state / province.").max(80),
  postalCode: z.string().trim().min(3, "Please enter your PIN / postal code.").max(12),
};
const agreeTerms = z.literal(true, { error: "Please accept the Terms & Conditions and Return Policy." });

export const paymentMethods = ["UPI", "Credit / debit card", "Net banking", "Bank transfer"] as const;

// Single-unit purchase, free product claim or giveaway entry.
export const orderSchema = z.object({
  product: z.string().trim().min(1, "Please choose a product.").max(120),
  mode: z.enum(["buy", "free", "giveaway"]),
  quantity: z.coerce.number({ error: "Enter a quantity." }).int().min(1, "Minimum quantity is 1.").max(9, "For 10 or more units, please request a wholesale quote."),
  payment: z.string().max(40).optional().default(""),
  name,
  email,
  phone: z.string().trim().min(7, "Please enter a phone number.").max(30).regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + ( ) - only."),
  company: z.string().trim().max(120).optional().default(""),
  ...address,
  country,
  refCode: z.string().trim().max(40).regex(/^[A-Za-z0-9_-]*$/, "Reseller codes use letters and numbers only.").optional().default(""),
  notes: z.string().trim().max(2000).optional().default(""),
  consent: agreeTerms,
  website: honeypot,
});

// Marketplace seller onboarding.
export const sellerSchema = z.object({
  name,
  email,
  phone: z.string().trim().min(7, "Please enter a phone number.").max(30),
  company,
  country,
  taxId: z.string().trim().max(40).optional().default(""),
  categories: z.string().trim().min(2, "Tell us what you sell.").max(300),
  catalogueSize: z.string().trim().min(1, "Please choose a range.").max(40),
  website_url: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  consent: agreeTerms,
  website: honeypot,
});

export const resellerTypes = ["Individual / student", "Homemaker / part-time", "Shop or retailer", "IT or electronics business", "Other business"] as const;

// Share-and-earn reseller signup.
export const resellerSchema = z.object({
  name,
  email,
  phone: z.string().trim().min(7, "Please enter a phone number.").max(30),
  resellerType: z.enum(resellerTypes, { error: "Please choose what describes you best." }),
  city: z.string().trim().min(2, "Please enter your city.").max(80),
  country,
  payoutUpi: z.string().trim().max(80).optional().default(""),
  howSell: z.string().trim().max(1000).optional().default(""),
  consent: agreeTerms,
  website: honeypot,
});

export const donationItemTypes = [
  "Laptop / desktop",
  "Tablet / phone",
  "IoT devices & sensors",
  "Development boards & components",
  "AR / VR headset",
  "Networking equipment",
  "Test & measurement equipment",
  "Industrial / factory equipment",
  "Other electronics",
] as const;
export const donationConditions = ["Working", "Working with minor issues", "Not working / for parts"] as const;
export const donationHandover = ["Pickup from my address", "I will drop off / courier it"] as const;
export const donationUse = [
  "Give free to students, schools and NGOs only",
  "OK to refurbish and resell at low cost (proceeds fund free kits)",
  "Whatever helps most",
] as const;

// Second-hand product donation offer.
export const donationSchema = z.object({
  itemType: z.enum(donationItemTypes, { error: "Please choose what you are donating." }),
  description: z.string().trim().min(5, "Please describe the item (brand, model).").max(500),
  quantity: z.coerce.number({ error: "Enter a quantity." }).int().min(1, "Minimum quantity is 1.").max(10_000),
  condition: z.enum(donationConditions, { error: "Please choose the condition." }),
  age: z.string().trim().max(40).optional().default(""),
  handover: z.enum(donationHandover, { error: "Please choose pickup or drop-off." }),
  use: z.enum(donationUse, { error: "Please choose how your donation may be used." }),
  name,
  email,
  phone: z.string().trim().min(7, "Please enter a phone number.").max(30).regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + ( ) - only."),
  company: z.string().trim().max(120).optional().default(""),
  city: z.string().trim().min(2, "Please enter your city.").max(80),
  state: z.string().trim().min(2, "Please enter your state / province.").max(80),
  postalCode: z.string().trim().min(3, "Please enter your PIN / postal code.").max(12),
  country,
  dataWiped: z.literal(true, { error: "Please confirm you own the item and have backed up or removed your data." }),
  consent: z.literal(true, { error: "Please accept the donation terms." }),
  website: honeypot,
});
