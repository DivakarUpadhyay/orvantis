import { sellerSchema } from "@/lib/enquiry-schemas";
import { handleEnquiry } from "@/lib/enquiry-route";
import { sendEnquiryEmails } from "@/lib/mailer";

export async function POST(req: Request) {
  return handleEnquiry(req, {
    key: "seller",
    refPrefix: "SELL",
    schema: sellerSchema,
    send: (d, meta) =>
      sendEnquiryEmails({
        ...meta,
        name: d.name,
        email: d.email,
        subject: `Marketplace seller application: ${d.company} (${d.country})`,
        heading: "New marketplace seller application",
        rows: [
          ["Company", d.company],
          ["Contact", d.name],
          ["Email", d.email],
          ["Phone", d.phone],
          ["Country", d.country],
          ["Tax / GST ID", d.taxId],
          ["Products", d.categories],
          ["Catalogue size", d.catalogueSize],
          ["Website", d.website_url],
        ],
        message: d.message,
        ackSubject: "Thanks for applying to sell on our marketplace",
        ackIntro:
          "Thank you for applying. Our marketplace team will review your application, then send the seller agreement and verification checklist within two business days.",
      }),
  });
}
