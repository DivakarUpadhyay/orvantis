"use client";

import { partnerSchema, partnerTypes } from "@/lib/enquiry-schemas";
import { partnerIndustries } from "@/lib/partners";
import { countries, worldRegions } from "@/lib/world";
import { EnquiryForm } from "./EnquiryForm";

const URL_PARAM = { param: "type", field: "partnerType" };

export function PartnerForm({ partnerType }: { partnerType?: string }) {
  return (
    <EnquiryForm
      endpoint="/api/partner"
      schema={partnerSchema}
      testId="partner-form"
      urlParam={URL_PARAM}
      initial={partnerType ? { partnerType } : {}}
      submitLabel="Apply to partner"
      successTitle="Application received"
      successText="Our partnerships team will review your application and contact you within two business days."
      fields={[
        { name: "partnerType", label: "Partnership model", type: "select", required: true, span: 2, options: partnerTypes.map((t) => ({ value: t, label: t })) },
        { name: "industry", label: "Your industry", type: "select", required: true, options: partnerIndustries.map((i) => ({ value: i, label: i })) },
        { name: "region", label: "Region you cover", type: "select", required: true, options: [...worldRegions.map((r) => ({ value: r.name, label: r.name })), { value: "India & Taiwan", label: "Both India & Taiwan" }] },
        { name: "name", label: "Full name", required: true },
        { name: "email", label: "Work email", type: "email", required: true },
        { name: "company", label: "Company", required: true },
        { name: "country", label: "Country", type: "select", required: true, options: countries.map((c) => ({ value: c, label: c })) },
        { name: "phone", label: "Phone / WhatsApp", type: "tel" },
        { name: "website_url", label: "Company website", type: "url", placeholder: "https://" },
        { name: "message", label: "Tell us about your business and customers", type: "textarea", required: true },
      ]}
    />
  );
}
