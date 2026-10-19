import { partnerSchema } from "@/lib/enquiry-schemas";
import { handleEnquiry } from "@/lib/enquiry-route";
import { sendEnquiryEmails } from "@/lib/mailer";

export async function POST(req: Request) {
  return handleEnquiry(req, {
    key: "partner",
    refPrefix: "PTR",
    schema: partnerSchema,
    send: (d, meta) =>
      sendEnquiryEmails({
        ...meta,
        name: d.name,
        email: d.email,
        subject: `Partner application: ${d.partnerType} — ${d.company} (${d.country})`,
        heading: "New partner application",
        rows: [
          ["Partnership model", d.partnerType],
          ["Industry", d.industry],
          ["Region", d.region],
          ["Name", d.name],
          ["Email", d.email],
          ["Company", d.company],
          ["Country", d.country],
          ["Phone", d.phone],
          ["Website", d.website_url],
        ],
        message: d.message,
        ackSubject: "Thanks for applying to partner with us",
        ackIntro:
          "Thank you for your interest in partnering with us. Our partnerships team will review your application and contact you within two business days to discuss next steps.",
      }),
  });
}
