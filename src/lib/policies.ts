import type { Product } from "./products";

// Terms & Conditions, organised by business line so each customer only needs
// the section that applies to them. Have these reviewed by a lawyer for each
// country you sell in before going live.

export type TermsSection = { id: string; title: string; icon: string; appliesTo: string; points: string[] };

export const termsUpdated = "19 October 2026";

export const termsSections: TermsSection[] = [
  {
    id: "general",
    title: "General terms",
    icon: "FileText",
    appliesTo: "Everyone using this website or buying from us",
    points: [
      "These terms apply to all services, products, marketplace listings, free products and giveaways offered through this website to customers in India and Taiwan.",
      "Prices are shown in Indian rupees (INR) with New Taiwan dollar (TWD) equivalents and exclude GST/VAT (business tax in Taiwan), duties and shipping unless stated. Customers in India are invoiced in INR and customers in Taiwan in TWD; TWD amounts on the website are converted at a reference rate and confirmed on the invoice.",
      "An order or engagement is confirmed only when we send a written confirmation, invoice or signed agreement.",
      "We may update these terms; the version in force when you place an order applies to that order.",
      "These terms are governed by the laws of India, with courts in Mumbai, Maharashtra having jurisdiction, unless a signed agreement says otherwise.",
    ],
  },
  {
    id: "software-services",
    title: "Software & digital services",
    icon: "Code2",
    appliesTo: "Software development, integrations, automation, AR/VR, digital marketing",
    points: [
      "Scope, deliverables, timeline and fees are defined in a proposal or statement of work signed by both parties.",
      "Fees are billed by milestone, monthly retainer or time-and-materials as agreed. Invoices are due within 15 days unless agreed otherwise.",
      "On full payment, you own the custom source code, designs and deliverables created for you. Third-party and open-source components remain under their own licences.",
      "Change requests outside the agreed scope are estimated and approved in writing before work starts.",
      "Digital marketing results (rankings, leads, ad performance) depend on external platforms and are not guaranteed.",
      "Either party may end an ongoing engagement with 30 days' written notice; completed work up to that date is payable.",
    ],
  },
  {
    id: "hardware-services",
    title: "Hardware & engineering services",
    icon: "Cpu",
    appliesTo: "IoT, embedded, PCB, industrial automation and smart-manufacturing projects",
    points: [
      "Site access, safety inductions and machine downtime windows are arranged by the customer.",
      "Prototype hardware is supplied for evaluation; production units follow the agreed specification and acceptance test.",
      "Work on customer machines is carried out under the customer's safety rules and lock-out procedures.",
      "Certification costs (CE, FCC, BIS, NCC and similar) are quoted separately unless included in the proposal.",
    ],
  },
  {
    id: "new-hardware",
    title: "New hardware products",
    icon: "Package",
    appliesTo: "New products sold by Orvantis, single unit or wholesale",
    points: [
      "Single-unit orders are confirmed after payment; wholesale orders after a purchase order and agreed payment terms.",
      "Ownership passes on full payment. Risk passes on delivery, or as defined by the agreed Incoterm for export orders.",
      "Warranty is as stated on the product page and covers manufacturing defects under normal use. It excludes misuse, unauthorised repair, power surges and physical or liquid damage.",
      "Lead times are estimates. We will inform you promptly of any delay and you may cancel an unshipped order if the delay exceeds 30 days.",
      "OEM / custom-branded orders are made to order and cannot be cancelled once production starts.",
    ],
  },
  {
    id: "refurbished",
    title: "Second-hand & refurbished products",
    icon: "RefreshCw",
    appliesTo: "Pre-owned, ex-demo and refurbished items",
    points: [
      "Items are pre-owned and graded: Grade A (minimal signs of use), Grade B (light cosmetic marks), Grade C (visible wear). All grades are fully functional when shipped.",
      "Each item is tested before dispatch; the test summary is available on request.",
      "Warranty is limited to the period shown on the product page and covers functional faults only, not cosmetic condition.",
      "Accessories may be compatible replacements rather than original parts; this is stated on the listing.",
    ],
  },
  {
    id: "free-products",
    title: "Free products & samples",
    icon: "Gift",
    appliesTo: "Free evaluation samples and free digital downloads",
    points: [
      "Free samples are for evaluation by registered businesses and are limited to one request per company per quarter unless agreed otherwise.",
      "We may approve or decline any request. Shipping, duties and taxes for physical samples are paid by the recipient unless stated.",
      "Free samples are provided as-is with no warranty and may not be resold.",
      "Free digital downloads are provided under the licence stated on the listing.",
    ],
  },
  {
    id: "giveaways",
    title: "Giveaways & contests",
    icon: "PartyPopper",
    appliesTo: "All giveaways and contests run by Orvantis",
    points: [
      "Entry is free; no purchase is necessary. One entry per person or company per giveaway period unless the listing says otherwise.",
      "Eligibility, closing date, prize and selection method (random draw or judging) are stated on each giveaway listing.",
      "Winners are contacted by email and must reply within 14 days or a new winner may be selected.",
      "Prizes are not transferable and cannot be exchanged for cash. Any taxes on prizes are the winner's responsibility.",
      "Giveaways are void where prohibited by law. Employees of Orvantis and their families are not eligible.",
    ],
  },
  {
    id: "event-rentals",
    title: "Event technology rentals",
    icon: "Tv",
    appliesTo: "LED walls, kiosks, VR booths, holograms, photo booths and AV",
    points: [
      "Bookings are confirmed with a signed quotation and an advance payment; the balance is due before the event.",
      "A refundable security deposit may apply and is returned after inspection of the equipment.",
      "Equipment is operated by our crew unless agreed otherwise. Damage caused by misuse, venue issues or third parties is charged at repair or replacement cost.",
      "Cancellations more than 14 days before the event receive a refund of the advance less costs incurred; later cancellations may be charged in full.",
      "The customer provides venue access, power and permissions required for installation.",
    ],
  },
  {
    id: "donations",
    title: "Donations of second-hand products",
    icon: "HeartHandshake",
    appliesTo: "Anyone donating used devices or equipment to Orvantis",
    points: [
      "You confirm that you own the items you donate and are free to give them away.",
      "Donations are voluntary and unpaid. Once received, items become the property of Orvantis.",
      "We securely wipe all storage before reuse. Please back up and remove your personal data and sign out of accounts before handing items over; we are not responsible for data left on devices.",
      "Items are used according to the preference you choose: given free to students, schools and NGOs, refurbished and resold at low cost (proceeds fund free kits), or recycled.",
      "Items that cannot be reused are recycled through an authorised e-waste recycler in line with applicable e-waste rules.",
      "We may decline items that are unsafe, hazardous or not accepted. We provide a donation acknowledgement on request; this is not a tax-exemption receipt.",
    ],
  },
  {
    id: "marketplace-sellers",
    title: "Marketplace sellers",
    icon: "Store",
    appliesTo: "Businesses selling their products through the Orvantis marketplace",
    points: [
      "Sellers must be registered businesses and complete verification (business registration, tax ID and bank details) before listing.",
      "Sellers are responsible for product accuracy, legal compliance, warranty and after-sales service for their listings.",
      "Orvantis charges a commission on each completed sale, as agreed in the seller agreement, deducted before payout.",
      "Payouts are made to the verified bank account on the agreed cycle after the return window closes.",
      "We may remove listings that are inaccurate, unsafe, counterfeit or that receive repeated complaints.",
    ],
  },
  {
    id: "resellers",
    title: "Resellers (share & earn)",
    icon: "Share2",
    appliesTo: "Individuals and businesses who share products and earn commission",
    points: [
      "Resellers earn the commission shown on each product for completed orders placed with their reseller code, after the return window closes.",
      "Resellers may add their own margin when quoting customers, but must not misrepresent products, prices, warranty or Orvantis.",
      "Commission is not paid on cancelled, returned or fraudulent orders, or on orders by the reseller for their own use.",
      "Payouts are made to the reseller's verified bank account or UPI ID on the agreed cycle. Applicable taxes (such as TDS) may be deducted.",
      "We may suspend reseller codes used for spam, misleading advertising or other misuse.",
    ],
  },
];

// ---------------- Returns & refunds ----------------

export type ReturnRule = { id: string; title: string; icon: string; window: string; points: string[] };

export const returnRules: ReturnRule[] = [
  {
    id: "new-hardware",
    title: "New hardware (sold by Orvantis)",
    icon: "Package",
    window: "7 days from delivery",
    points: [
      "Dead-on-arrival or damaged-in-transit items: report within 48 hours with photos or video for a free replacement or full refund.",
      "Change of mind: unused items in original sealed packaging can be returned within 7 days. Return shipping is paid by the customer.",
      "Refunds are issued to the original payment method within 7 business days after the returned item passes inspection.",
      "Not returnable: opened software licences, custom-configured or OEM-branded units, consumables, and items damaged by misuse.",
    ],
  },
  {
    id: "wholesale",
    title: "Wholesale & capital equipment",
    icon: "Boxes",
    window: "As per quotation",
    points: [
      "Wholesale orders are covered by the warranty and acceptance terms in your quotation or purchase agreement.",
      "Defective units found at incoming inspection are replaced or credited; please report within 7 days of delivery.",
      "Capital equipment is accepted after installation and acceptance testing; returns after acceptance are not possible, but warranty applies.",
    ],
  },
  {
    id: "refurbished",
    title: "Second-hand & refurbished",
    icon: "RefreshCw",
    window: "7 days from delivery",
    points: [
      "Items not matching their stated grade or not working on arrival can be returned within 7 days for a refund or replacement.",
      "Functional faults after 7 days are covered by the warranty shown on the listing (repair or replacement).",
      "Cosmetic condition consistent with the stated grade is not a reason for return.",
    ],
  },
  {
    id: "marketplace",
    title: "Marketplace products (partner sellers)",
    icon: "Store",
    window: "7 days from delivery (unless the listing states otherwise)",
    points: [
      "Return requests are raised with us; we coordinate with the seller and keep you updated.",
      "If the seller does not resolve a valid return within 10 days, Orvantis will step in to arrange a refund.",
      "Warranty claims are handled by the seller as stated on the listing.",
    ],
  },
  {
    id: "free",
    title: "Free products, giveaways & donations",
    icon: "Gift",
    window: "Not returnable",
    points: [
      "Donated items cannot be returned to the donor once received.",
      "Free samples, free downloads and giveaway prizes are not returnable or refundable.",
      "If a prize arrives damaged, tell us within 48 hours and we will replace it where possible.",
    ],
  },
  {
    id: "digital",
    title: "Digital downloads & software licences",
    icon: "Download",
    window: "Not returnable once delivered",
    points: [
      "Digital items cannot be returned once the download link or licence key is delivered.",
      "If a file is corrupted or a licence key does not work, contact us and we will resend or replace it.",
    ],
  },
  {
    id: "services",
    title: "Services & event rentals",
    icon: "Wrench",
    window: "See cancellation terms",
    points: [
      "Software and engineering services are not refundable once delivered; cancellation follows your proposal or agreement.",
      "Event rental cancellations follow the event rental terms (refund of advance less costs if cancelled more than 14 days before the event).",
    ],
  },
];

/** The return rule and terms section that apply to a product. */
export function policyFor(p: Product): { rule: ReturnRule; termsId: string } {
  const pick = (id: string) => returnRules.find((r) => r.id === id)!;
  if (p.category === "free" || p.category === "giveaway") {
    return { rule: pick(p.kind === "digital" ? "digital" : "free"), termsId: p.category === "giveaway" ? "giveaways" : "free-products" };
  }
  if (p.category === "refurbished") return { rule: pick("refurbished"), termsId: "refurbished" };
  if (p.seller) return { rule: pick("marketplace"), termsId: "marketplace-sellers" };
  if (p.priceOnRequest) return { rule: pick("wholesale"), termsId: "new-hardware" };
  return { rule: pick("new-hardware"), termsId: "new-hardware" };
}
