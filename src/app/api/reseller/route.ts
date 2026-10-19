import { randomBytes } from "node:crypto";
import { resellerSchema } from "@/lib/enquiry-schemas";
import { handleEnquiry } from "@/lib/enquiry-route";
import { sendEnquiryEmails } from "@/lib/mailer";

export async function POST(req: Request) {
  return handleEnquiry(req, {
    key: "reseller",
    refPrefix: "RES",
    schema: resellerSchema,
    send: (d, meta) => {
      // Provisional reseller code; activated after verification.
      const code = `${d.name.replace(/[^A-Za-z]/g, "").slice(0, 5).toUpperCase() || "ORV"}${randomBytes(2).toString("hex").toUpperCase()}`;
      return sendEnquiryEmails({
        ...meta,
        name: d.name,
        email: d.email,
        subject: `Reseller signup: ${d.name} — ${d.city}, ${d.country} (code ${code})`,
        heading: "New reseller signup",
        rows: [
          ["Name", d.name],
          ["Email", d.email],
          ["Phone", d.phone],
          ["Reseller type", d.resellerType],
          ["City", d.city],
          ["Country", d.country],
          ["Payout UPI / bank", d.payoutUpi],
          ["Provisional reseller code", code],
        ],
        message: d.howSell,
        ackSubject: "Welcome to the reseller programme",
        ackIntro: `Thank you for joining. Your provisional reseller code is ${code}. It becomes active after a quick verification call. Add ?ref=${code} to any product link you share, and commission is credited for completed orders placed with your code.`,
      });
    },
  });
}
