import { orderSchema } from "@/lib/enquiry-schemas";
import { handleEnquiry } from "@/lib/enquiry-route";
import { sendEnquiryEmails } from "@/lib/mailer";
import { money } from "@/lib/currency";
import { getProduct } from "@/lib/products";

const labels = {
  buy: { prefix: "ORD", heading: "New single-unit order", ack: "We received your order", intro: "Thank you for your order. We will confirm stock and email your invoice with a secure payment link within one business day. Your order ships after payment." },
  free: { prefix: "FREE", heading: "New free product request", ack: "We received your free product request", intro: "Thank you for your request. Our team will review eligibility and email you within two business days. Digital downloads are sent to this email address." },
  giveaway: { prefix: "GIVE", heading: "New giveaway entry", ack: "Your giveaway entry is confirmed", intro: "Thank you for entering. Winners are contacted by email after the closing date shown on the giveaway page. Good luck!" },
} as const;

export async function POST(req: Request) {
  // The reference prefix depends on the mode, so peek at it before the shared pipeline.
  const body = await req.clone().json().catch(() => ({}));
  const mode = (body?.mode as keyof typeof labels) in labels ? (body.mode as keyof typeof labels) : "buy";
  const l = labels[mode];

  return handleEnquiry(req, {
    key: `order-${mode}`,
    refPrefix: l.prefix,
    schema: orderSchema,
    send: (d, meta) => {
      const p = getProduct(d.product);
      const product = p?.name ?? d.product;
      return sendEnquiryEmails({
        ...meta,
        name: d.name,
        email: d.email,
        subject: `${l.heading}: ${d.quantity} × ${product} — ${d.name}${d.refCode ? ` (reseller ${d.refCode})` : ""}`,
        heading: l.heading,
        rows: [
          ["Product", product],
          ["Quantity", String(d.quantity)],
          ["Unit price", p?.retailInr ? money(p.retailInr) : "Free"],
          ["Sold by", p?.seller ? `${p.seller.name} (${p.seller.location})` : "Orvantis"],
          ["Payment preference", d.payment],
          ["Name", d.name],
          ["Email", d.email],
          ["Phone", d.phone],
          ["Company", d.company],
          ["Delivery address", `${d.addressLine}, ${d.city}, ${d.state} ${d.postalCode}, ${d.country}`],
          ["Reseller code", d.refCode],
        ],
        message: d.notes,
        ackSubject: l.ack,
        ackIntro: l.intro,
      });
    },
  });
}
