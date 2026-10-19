import { expect, test } from "@playwright/test";
import { categories, inCategory, services, servicesByCategory, type CategoryId } from "../../src/lib/services";
import { isDesktop, snap } from "./helpers";

test.describe("Services catalogue", () => {
  test("lists all services grouped category-wise", async ({ page }) => {
    await page.goto("/services");
    await expect(page.getByTestId("service-card")).toHaveCount(services.length);
    for (const id of Object.keys(categories)) {
      await expect(page.getByTestId(`category-section-${id}`)).toBeVisible();
    }
  });

  test("category filter tabs narrow the list and update the URL", async ({ page }, testInfo) => {
    await page.goto("/services");
    for (const id of Object.keys(categories) as CategoryId[]) {
      const count = services.filter((s) => inCategory(s, id)).length;
      await page.getByTestId(`filter-${id}`).click();
      await expect(page).toHaveURL(new RegExp(`category=${id}`));
      await expect(page.getByTestId("service-card")).toHaveCount(count);
      await expect(page.locator(`[data-testid=service-card]:not([data-categories~=${id}])`)).toHaveCount(0);
    }
    await snap(page, testInfo, "services-filter-manufacturing");
    await page.getByTestId("filter-all").click();
    await expect(page.getByTestId("service-card")).toHaveCount(services.length);
  });

  test("deep link with ?category= preselects the tab", async ({ page }) => {
    await page.goto("/services?category=hardware");
    await expect(page.getByTestId("filter-hardware")).toHaveAttribute("aria-selected", "true");
    await expect(page.getByTestId("service-card")).toHaveCount(servicesByCategory("hardware").length);
  });

  test("integrations category lists payment, camera, KYC, SMS and logistics", async ({ page }, testInfo) => {
    await page.goto("/services?category=integrations");
    const cards = page.getByTestId("service-card");
    await expect(cards).toHaveCount(servicesByCategory("integrations").length);
    for (const title of [
      "Payment Gateway Integration",
      "Camera & Video SDK Integration",
      "KYC & Identity Verification Integration",
      "SMS, WhatsApp & Messaging Gateway Integration",
      "Logistics & Shipping API Integration",
    ]) {
      await expect(cards.filter({ hasText: title })).toBeVisible();
    }
    await snap(page, testInfo, "services-filter-integrations");
  });

  test("AR/VR, events, automation, marketing and Industry 4.0 services are listed", async ({ page }, testInfo) => {
    const expected: [CategoryId, string[]][] = [
      ["immersive", ["Augmented Reality (AR) App Development", "VR Training & Simulation"]],
      ["events", ["LED Video Wall & Digital Display Rental", "Event Management & Brand Activations"]],
      ["automation", ["Robotic Process Automation (RPA)", "Industrial Automation, PLC & SCADA"]],
      ["software", ["SEO & Local SEO", "Performance Marketing (Google & Meta Ads)"]],
      ["manufacturing", ["Industry 4.0 Readiness & Smart Factory Consulting", "OT & Industrial Cybersecurity", "Edge Computing & Gateways"]],
    ];
    for (const [cat, titles] of expected) {
      await page.goto(`/services?category=${cat}`);
      for (const t of titles) await expect(page.getByTestId("service-card").filter({ hasText: t })).toBeVisible();
    }
    await snap(page, testInfo, "services-filter-manufacturing-industry40");
  });

  test("search finds services and handles no results", async ({ page }, testInfo) => {
    await page.goto("/services");
    await page.getByTestId("service-search").fill("firmware");
    await expect(page.getByTestId("service-card").filter({ hasText: "Embedded Systems & Firmware" })).toBeVisible();
    await snap(page, testInfo, "services-search-firmware");

    await page.getByTestId("service-search").fill("quantum teleportation");
    await expect(page.getByTestId("no-results")).toBeVisible();
    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(page.getByTestId("service-card")).toHaveCount(services.length);
  });

  test("category landing pages show their services", async ({ page }) => {
    for (const cat of Object.values(categories)) {
      await page.goto(`/services/category/${cat.slug}`);
      const count = servicesByCategory(cat.id).length;
      await expect(page.locator("h1")).toHaveText(cat.title);
      await expect(page.getByTestId("service-card")).toHaveCount(count);
    }
  });

  test("every service detail page loads", async ({ request }, testInfo) => {
    test.skip(!isDesktop(testInfo), "Server-side check; run once");
    for (const s of services) {
      const res = await request.get(`/services/${s.slug}`);
      expect(res.status(), s.slug).toBe(200);
      const html = await res.text();
      expect(html, s.slug).toContain(s.title.replace(/&/g, "&amp;"));
      expect(html, s.slug).toContain('"@type":"Service"');
    }
  });

  test("service page CTA pre-selects the service on the contact form", async ({ page }, testInfo) => {
    await page.goto("/services/embedded-firmware");
    await expect(page.getByTestId("capabilities").locator("li")).toHaveCount(6);
    await snap(page, testInfo, "service-embedded-firmware");
    await page.getByTestId("service-cta").click();
    await expect(page).toHaveURL(/\/contact\?service=embedded-firmware$/);
    await expect(page.locator("#service")).toHaveValue("embedded-firmware");
  });
});
