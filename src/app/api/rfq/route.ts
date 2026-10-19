import { rfqSchema } from "@/lib/enquiry-schemas";
import { handleEnquiry } from "@/lib/enquiry-route";
import { sendEnquiryEmails } from "@/lib/mailer";
import { getProduct } from "@/lib/products";

export async function POST(req: Request) {
  return handleEnquiry(req, {
    key: "rfq",
    refPrefix: "RFQ",
    schema: rfqSchema,
    send: (d, meta) => {
      const product = getProduct(d.product)?.name ?? d.product;
      return sendEnquiryEmails({
        ...meta,
        name: d.name,
        email: d.email,
        subject: `Wholesale RFQ: ${d.quantity.toLocaleString("en-US")} × ${product} — ${d.company}`,
        heading: "New wholesale quote request",
        rows: [
          ["Product", product],
          ["Quantity", d.quantity.toLocaleString("en-US")],
          ["Delivery term", d.incoterm],
          ["OEM / custom branding", d.oem ? "Yes" : "No"],
          ["Name", d.name],
          ["Email", d.email],
          ["Company", d.company],
          ["Country", d.country],
          ["Phone", d.phone],
        ],
        message: d.notes,
        ackSubject: "We received your quote request",
        ackIntro: `Thank you for your interest in ${product}. Our sales team will send you pricing, lead time and a proforma invoice within one business day.`,
      });
    },
  });
}
