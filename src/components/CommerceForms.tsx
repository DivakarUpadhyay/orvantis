"use client";

import {
  donationConditions,
  donationHandover,
  donationItemTypes,
  donationSchema,
  donationUse,
  orderSchema,
  paymentMethods,
  resellerSchema,
  resellerTypes,
  sellerSchema,
} from "@/lib/enquiry-schemas";
import { countries } from "@/lib/world";
import { EnquiryForm, type Field } from "./EnquiryForm";

const countryOptions = countries.map((c) => ({ value: c, label: c }));
const termsConsent = (
  <>
    I accept the{" "}
    <a href="/terms" className="text-brand hover:underline" target="_blank">Terms &amp; Conditions</a> and{" "}
    <a href="/returns" className="text-brand hover:underline" target="_blank">Return Policy</a>.
  </>
);

const REF_PARAM = { param: "ref", field: "refCode" };

const contactFields: Field[] = [
  { name: "name", label: "Full name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
  { name: "company", label: "Company (optional)" },
];
const addressFields: Field[] = [
  { name: "addressLine", label: "Street address", required: true, span: 2 },
  { name: "city", label: "City", required: true },
  { name: "state", label: "State / province", required: true },
  { name: "postalCode", label: "PIN / postal code", required: true },
  { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
];

/** Single-unit purchase, free product claim or giveaway entry for one product. */
export function OrderForm({ product, mode }: { product: string; mode: "buy" | "free" | "giveaway" }) {
  const copy = {
    buy: { submit: "Place order", title: "Order received", text: "We'll email your invoice and secure payment link within one business day. Your order ships after payment." },
    free: { submit: "Request free product", title: "Request received", text: "We'll review eligibility and email you within two business days." },
    giveaway: { submit: "Enter giveaway", title: "You're entered!", text: "Winners are contacted by email after the closing date. Good luck!" },
  }[mode];

  const fields: Field[] = [
    ...(mode === "buy"
      ? ([
          { name: "quantity", label: "Quantity (1–9)", type: "number", required: true },
          { name: "payment", label: "Preferred payment", type: "select", options: paymentMethods.map((m) => ({ value: m, label: m })) },
        ] as Field[])
      : []),
    ...contactFields,
    ...addressFields,
    ...(mode === "buy" ? ([{ name: "refCode", label: "Reseller code (if someone referred you)" }] as Field[]) : []),
    {
      name: "notes",
      label: mode === "giveaway" ? "Tell us about your project or line" : mode === "free" ? "What will you use it for?" : "Order notes (optional)",
      type: "textarea",
    },
  ];

  return (
    <EnquiryForm
      endpoint="/api/order"
      schema={orderSchema}
      testId={`order-form-${mode}`}
      initial={{ product, mode, quantity: "1" }}
      urlParam={mode === "buy" ? REF_PARAM : undefined}
      submitLabel={copy.submit}
      successTitle={copy.title}
      successText={copy.text}
      consentLabel={termsConsent}
      fields={fields}
    />
  );
}

export function SellerForm() {
  return (
    <EnquiryForm
      endpoint="/api/seller"
      schema={sellerSchema}
      testId="seller-form"
      submitLabel="Apply to sell"
      successTitle="Application received"
      successText="Our marketplace team will send the seller agreement and verification checklist within two business days."
      consentLabel={<>I accept the <a href="/terms#marketplace-sellers" className="text-brand hover:underline" target="_blank">marketplace seller terms</a>.</>}
      fields={[
        { name: "company", label: "Business name", required: true },
        { name: "name", label: "Contact person", required: true },
        { name: "email", label: "Business email", type: "email", required: true },
        { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
        { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
        { name: "taxId", label: "GST / VAT / tax ID" },
        { name: "categories", label: "What do you sell?", required: true, span: 2, placeholder: "e.g. RFID readers, industrial sensors, refurbished laptops" },
        {
          name: "catalogueSize",
          label: "Number of products",
          type: "select",
          required: true,
          options: ["1–10", "11–50", "51–200", "200+"].map((v) => ({ value: v, label: v })),
        },
        { name: "website_url", label: "Website or store link", type: "url" },
        { name: "message", label: "Anything else we should know?", type: "textarea" },
      ]}
    />
  );
}

export function ResellerForm() {
  return (
    <EnquiryForm
      endpoint="/api/reseller"
      schema={resellerSchema}
      testId="reseller-form"
      submitLabel="Join as reseller"
      successTitle="Welcome aboard!"
      successText="We've emailed your provisional reseller code. It becomes active after a quick verification call."
      consentLabel={<>I accept the <a href="/terms#resellers" className="text-brand hover:underline" target="_blank">reseller terms</a>.</>}
      fields={[
        { name: "name", label: "Full name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
        { name: "resellerType", label: "You are", type: "select", required: true, options: resellerTypes.map((t) => ({ value: t, label: t })) },
        { name: "city", label: "City", required: true },
        { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
        { name: "payoutUpi", label: "UPI ID or bank details for payouts", span: 2 },
        { name: "howSell", label: "How will you share products? (WhatsApp groups, shop, social media…)", type: "textarea" },
      ]}
    />
  );
}

const opts = (xs: readonly string[]) => xs.map((x) => ({ value: x, label: x }));

/** Offer second-hand products as a donation. */
export function DonateForm() {
  return (
    <EnquiryForm
      endpoint="/api/donate"
      schema={donationSchema}
      testId="donate-form"
      initial={{ quantity: "1" }}
      submitLabel="Offer my donation"
      successTitle="Thank you for donating!"
      successText="Our team will contact you within two business days to arrange pickup or drop-off."
      consentLabel={<>I accept the <a href="/terms#donations" className="text-brand hover:underline" target="_blank">donation terms</a>.</>}
      fields={[
        { name: "itemType", label: "What are you donating?", type: "select", required: true, options: opts(donationItemTypes) },
        { name: "quantity", label: "Quantity", type: "number", required: true },
        { name: "description", label: "Brand, model and details", required: true, span: 2, placeholder: "e.g. Dell Latitude 5490, i5, 8 GB RAM, charger included" },
        { name: "condition", label: "Condition", type: "select", required: true, options: opts(donationConditions) },
        { name: "age", label: "Approximate age", placeholder: "e.g. 3 years" },
        { name: "handover", label: "Handover", type: "select", required: true, options: opts(donationHandover) },
        { name: "use", label: "How may we use it?", type: "select", required: true, options: opts(donationUse) },
        { name: "name", label: "Full name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
        { name: "company", label: "Company (if donating as a business)" },
        { name: "city", label: "City", required: true },
        { name: "state", label: "State / province", required: true },
        { name: "postalCode", label: "PIN / postal code", required: true },
        { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
        { name: "dataWiped", label: "I own these items and have backed up or removed my personal data (we also wipe all devices)", type: "toggle", span: 2 },
      ]}
    />
  );
}
