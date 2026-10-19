export type Demo = {
  slug: string;
  title: string;
  /** Name shown in the demo window's title bar. */
  app: string;
  icon: string;
  summary: string;
  description: string;
  highlights: string[];
  /** Service slugs this demo showcases. */
  services: string[];
};

// Interactive demos built into the site. Every value inside them is sample
// data generated in the browser; nothing is sent anywhere.
export const demos: Demo[] = [
  {
    slug: "smart-factory-dashboard",
    title: "Smart Factory OEE Dashboard",
    app: "Orvantis FactoryOS",
    icon: "Factory",
    summary: "Live machine states, OEE and downtime for a CNC line.",
    description:
      "A manufacturing execution dashboard that shows every machine's live status, OEE broken into availability, performance and quality, and the reasons behind each stop.",
    highlights: ["Live machine status", "OEE breakdown", "Downtime reason log", "Click a machine for details"],
    services: ["manufacturing-execution-system", "oee-production-analytics", "industrial-automation-plc-scada"],
  },
  {
    slug: "payment-checkout",
    title: "Payment Gateway Checkout",
    app: "Orvantis Pay — Checkout",
    icon: "CreditCard",
    summary: "UPI, card and wallet checkout with live webhook events.",
    description:
      "A checkout flow like the ones we integrate with Razorpay, Stripe, PayU and ECPay: choose a method, pay, and watch the webhook events your server would receive.",
    highlights: ["UPI, card and wallet", "Processing and success states", "Webhook event log", "Transaction reference"],
    services: ["payment-gateway-integration", "web-application-development"],
  },
  {
    slug: "ekyc-onboarding",
    title: "eKYC Digital Onboarding",
    app: "Orvantis Verify",
    icon: "ScanFace",
    summary: "Mobile OTP, ID capture and face liveness in four steps.",
    description:
      "A digital onboarding journey with OTP verification, ID document capture with OCR, a liveness and face-match check, and an instant decision with confidence scores.",
    highlights: ["OTP verification", "ID OCR extraction", "Liveness face scan", "Risk scores and decision"],
    services: ["kyc-identity-verification", "mobile-app-development"],
  },
  {
    slug: "shipment-tracking",
    title: "Shipment Tracking & Courier Rates",
    app: "Orvantis Ship",
    icon: "PackageCheck",
    summary: "Compare courier rates, book a shipment and follow it on the map.",
    description:
      "A logistics integration demo: rate shopping across couriers, one-click booking, and live tracking with a status timeline and route map.",
    highlights: ["Multi-courier rates", "One-click booking", "Live route map", "Status timeline"],
    services: ["logistics-shipping-api-integration", "maps-gps-location-integration"],
  },
  {
    slug: "rpa-invoice-bot",
    title: "RPA Invoice Processing Bot",
    app: "Orvantis Bot Runner",
    icon: "MousePointerClick",
    summary: "Watch a software robot read, validate and post supplier invoices.",
    description:
      "A robotic process automation run: the bot opens each invoice, extracts fields with OCR, matches them against purchase orders and posts them to the ERP, flagging exceptions for a human.",
    highlights: ["OCR field extraction", "PO matching", "ERP posting", "Exceptions and time saved"],
    services: ["robotic-process-automation", "document-processing-automation"],
  },
  {
    slug: "iot-fleet-ota",
    title: "IoT Fleet & OTA Firmware Update",
    app: "Orvantis Device Cloud",
    icon: "Wifi",
    summary: "Roll out new firmware to a sensor fleet in staged waves.",
    description:
      "A device-management console showing a fleet of sensor nodes. Start an over-the-air update and watch it roll out in waves, with automatic retries for devices that fail.",
    highlights: ["Fleet health", "Staged OTA rollout", "Automatic retries", "Version tracking"],
    services: ["iot-cloud-platforms", "embedded-firmware", "iot-solutions"],
  },
  {
    slug: "whatsapp-chatbot",
    title: "WhatsApp Customer Chatbot",
    app: "Orvantis Chat",
    icon: "MessagesSquare",
    summary: "Order tracking, booking and live-agent handover in a chat.",
    description:
      "A conversational assistant like the WhatsApp and LINE bots we build: quick replies for common requests, order tracking, demo booking and handover to a person.",
    highlights: ["Quick replies", "Order tracking", "Appointment booking", "Human handover"],
    services: ["chatbot-conversational-automation", "sms-whatsapp-messaging-gateway"],
  },
  {
    slug: "3d-product-configurator",
    title: "3D Product Configurator",
    app: "Orvantis 3D Studio",
    icon: "Rotate3d",
    summary: "Rotate a product in 3D, change finish and see the price update.",
    description:
      "A lightweight 3D configurator: drag to rotate, pick colours and options, and see the price and spec update instantly, ready to extend with WebAR.",
    highlights: ["Drag to rotate in 3D", "Colour and option picker", "Live pricing", "Works on mobile"],
    services: ["3d-product-configurators-webar", "augmented-reality-app-development"],
  },
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}
