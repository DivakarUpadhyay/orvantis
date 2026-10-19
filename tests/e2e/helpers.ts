import { mkdirSync } from "node:fs";
import path from "node:path";
import type { Page, TestInfo } from "@playwright/test";

export const SCREENSHOT_DIR = "screenshots";
export const OUTBOX_DIR = ".outbox-test";

/**
 * Saves a full-page screenshot to screenshots/<project>/<name>.png (kept between
 * runs, unlike test-results/) and attaches it to the HTML report.
 */
export async function snap(page: Page, testInfo: TestInfo, name: string, opts: { fullPage?: boolean } = {}) {
  const dir = path.join(SCREENSHOT_DIR, testInfo.project.name);
  mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${name}.png`);
  await page.waitForLoadState("networkidle").catch(() => {});
  const body = await page.screenshot({ path: file, fullPage: opts.fullPage ?? true, animations: "disabled" });
  await testInfo.attach(name, { body, contentType: "image/png" });
  return file;
}

export const isDesktop = (testInfo: TestInfo) => testInfo.project.name === "desktop-chrome";

/** A fresh fake client IP so per-IP rate limiting doesn't couple tests together. */
export function randomIp() {
  const n = () => Math.floor(Math.random() * 250) + 1;
  return `10.${n()}.${n()}.${n()}`;
}

export const validContact = {
  name: "Mei Chen",
  email: "mei.chen@example.com",
  company: "Precision Parts Co.",
  phone: "+886 912 345 678",
  country: "Taiwan",
  service: "manufacturing-execution-system",
  budget: "₹40 lakh–1.25 crore / NT$1.4M–4.5M",
  timeline: "1–3 months",
  message: "We want to connect 40 CNC machines to a new MES and track OEE in real time.",
  consent: true,
  website: "",
};

export const mainPages = [
  { path: "/", name: "home" },
  { path: "/services", name: "services" },
  { path: "/services/category/software-development", name: "category-software" },
  { path: "/services/category/iot-embedded-systems", name: "category-iot-embedded" },
  { path: "/services/category/manufacturing-industry-4-0", name: "category-manufacturing" },
  { path: "/services/category/third-party-api-integrations", name: "category-integrations" },
  { path: "/services/iot-solutions", name: "service-iot-solutions" },
  { path: "/services/payment-gateway-integration", name: "service-payment-gateway" },
  { path: "/products", name: "products" },
  { path: "/products/category/semiconductor-equipment-components", name: "product-category-semiconductor" },
  { path: "/products/industrial-iot-gateway-4g", name: "product-iot-gateway" },
  { path: "/demos", name: "demos" },
  { path: "/demos/payment-checkout", name: "demo-payment" },
  { path: "/partners", name: "partners" },
  { path: "/marketplace", name: "marketplace" },
  { path: "/donate", name: "donate" },
  { path: "/terms", name: "terms" },
  { path: "/returns", name: "returns" },
  { path: "/products/category/second-hand-refurbished", name: "product-category-refurbished" },
  { path: "/products/free-iot-dashboard-template", name: "product-free-digital" },
  { path: "/products/giveaway-student-embedded-kit", name: "product-giveaway" },
  { path: "/careers", name: "careers" },
  { path: "/industries", name: "industries" },
  { path: "/locations", name: "locations" },
  { path: "/locations/india", name: "location-india" },
  { path: "/locations/taiwan", name: "location-taiwan" },
  { path: "/process", name: "process" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/privacy", name: "privacy" },
];
