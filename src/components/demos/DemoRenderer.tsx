"use client";

import { ChatDemo } from "./ChatDemo";
import { ConfiguratorDemo } from "./ConfiguratorDemo";
import { FactoryDemo } from "./FactoryDemo";
import { FleetDemo } from "./FleetDemo";
import { KycDemo } from "./KycDemo";
import { PaymentDemo } from "./PaymentDemo";
import { RpaDemo } from "./RpaDemo";
import { ShipDemo } from "./ShipDemo";

const map: Record<string, () => React.ReactElement> = {
  "smart-factory-dashboard": FactoryDemo,
  "payment-checkout": PaymentDemo,
  "ekyc-onboarding": KycDemo,
  "shipment-tracking": ShipDemo,
  "rpa-invoice-bot": RpaDemo,
  "iot-fleet-ota": FleetDemo,
  "whatsapp-chatbot": ChatDemo,
  "3d-product-configurator": ConfiguratorDemo,
};

export function DemoRenderer({ slug }: { slug: string }) {
  const Cmp = map[slug];
  return Cmp ? <Cmp /> : null;
}
