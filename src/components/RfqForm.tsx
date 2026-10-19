"use client";

import { incoterms, rfqSchema } from "@/lib/enquiry-schemas";
import { productCategories, products } from "@/lib/products";
import { countries } from "@/lib/world";
import { EnquiryForm } from "./EnquiryForm";

const URL_PARAM = { param: "product", field: "product" };

export function RfqForm({ product }: { product?: string }) {
  return (
    <EnquiryForm
      endpoint="/api/rfq"
      schema={rfqSchema}
      testId="rfq-form"
      urlParam={URL_PARAM}
      initial={product ? { product } : {}}
      submitLabel="Request wholesale quote"
      successTitle="Quote request received"
      successText="Our sales team will email you pricing, lead time and a proforma invoice within one business day."
      fields={[
        {
          name: "product",
          label: "Product",
          type: "select",
          required: true,
          span: 2,
          options: products.map((p) => ({ value: p.slug, label: `${productCategories[p.category].short} — ${p.name}` })),
        },
        { name: "quantity", label: "Quantity", type: "number", required: true, placeholder: "e.g. 200" },
        { name: "incoterm", label: "Delivery term", type: "select", required: true, options: incoterms.map((i) => ({ value: i, label: i })) },
        { name: "oem", label: "I need OEM / custom branding, firmware or packaging", type: "toggle", span: 2 },
        { name: "name", label: "Full name", required: true },
        { name: "email", label: "Work email", type: "email", required: true },
        { name: "company", label: "Company", required: true },
        { name: "country", label: "Delivery country", type: "select", required: true, options: countries.map((c) => ({ value: c, label: c })) },
        { name: "phone", label: "Phone / WhatsApp", type: "tel" },
        { name: "notes", label: "Notes (configuration, target price, timeline)", type: "textarea" },
      ]}
    />
  );
}
