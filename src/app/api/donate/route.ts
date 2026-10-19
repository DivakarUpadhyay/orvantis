import { donationSchema } from "@/lib/enquiry-schemas";
import { handleEnquiry } from "@/lib/enquiry-route";
import { sendEnquiryEmails } from "@/lib/mailer";

export async function POST(req: Request) {
  return handleEnquiry(req, {
    key: "donate",
    refPrefix: "DON",
    schema: donationSchema,
    send: (d, meta) =>
      sendEnquiryEmails({
        ...meta,
        name: d.name,
        email: d.email,
        subject: `Donation offer: ${d.quantity} × ${d.itemType} (${d.condition}) — ${d.city}, ${d.country}`,
        heading: "New second-hand product donation",
        rows: [
          ["Item type", d.itemType],
          ["Description", d.description],
          ["Quantity", String(d.quantity)],
          ["Condition", d.condition],
          ["Age", d.age],
          ["Handover", d.handover],
          ["Donor's preferred use", d.use],
          ["Name", d.name],
          ["Email", d.email],
          ["Phone", d.phone],
          ["Company", d.company],
          ["Location", `${d.city}, ${d.state} ${d.postalCode}, ${d.country}`],
          ["Ownership & data confirmed", d.dataWiped ? "Yes" : "No"],
        ],
        message: d.description,
        ackSubject: "Thank you for offering a donation",
        ackIntro:
          "Thank you for offering to donate. Our team will review your items and contact you within two business days to arrange pickup or drop-off. Please reply to this email with a few photos of the items if you can.",
      }),
  });
}
