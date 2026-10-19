import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { simpleParser } from "mailparser";
import { demos } from "../../src/lib/demos";
import { products } from "../../src/lib/products";
import { isDesktop, OUTBOX_DIR, randomIp, snap } from "./helpers";

test.describe("Wholesale products", () => {
  test("catalogue lists every product by category", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByTestId("product-card")).toHaveCount(products.length);
    for (const id of ["iot", "arvr", "embedded", "semiconductor"]) {
      await expect(page.getByTestId(`product-section-${id}`)).toBeVisible();
    }
    await expect(page.getByTestId("ordering-process").locator("li")).toHaveCount(6);
  });

  test("product detail shows specs, pricing and ordering process", async ({ page }, testInfo) => {
    await page.goto("/products");
    await page.getByTestId("product-card").filter({ hasText: "Edge AI Computer" }).click();
    await expect(page).toHaveURL(/\/products\/edge-ai-computer-orin$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Edge AI Computer (Jetson Orin)");
    await expect(page.getByTestId("spec-table")).toContainText("Jetson Orin");
    await expect(page.getByTestId("price-tiers")).toContainText("₹");
    await expect(page.getByTestId("price-tiers")).toContainText("NT$");
    await expect(page.getByTestId("price-tiers")).not.toContainText("US$");
    await expect(page.getByTestId("ordering-process").filter({ visible: true })).toContainText("Request a quote");
    await snap(page, testInfo, "product-detail-edge-ai");
    // The RFQ form on this page is pre-selected for this product.
    await expect(page.getByTestId("rfq-form").filter({ visible: true }).locator('[name="product"]')).toHaveValue("edge-ai-computer-orin");
  });

  test("capital equipment is priced on request", async ({ page }) => {
    await page.goto("/products/semi-automatic-wafer-probe-station");
    await expect(page.getByTestId("price-tiers")).toContainText("Priced per configuration");
  });

  test("wholesale RFQ validates and emails the quote request", async ({ page }, testInfo) => {
    await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });
    await page.goto("/products/lorawan-gateway-8-channel");
    const form = page.getByTestId("rfq-form").filter({ visible: true });
    await form.getByTestId("rfq-form-submit").click();
    await expect(form.getByTestId("rfq-form-error-quantity")).toBeVisible();
    await expect(form.getByTestId("rfq-form-error-company")).toBeVisible();

    const name = `Buyer ${testInfo.project.name} ${Date.now()}`;
    await page.getByTestId("rfq-form").filter({ visible: true }).locator('[name="quantity"]').fill("120");
    await page.getByTestId("rfq-form").filter({ visible: true }).locator('[name="incoterm"]').selectOption("CIF");
    await form.getByLabel(/OEM/).check();
    await page.getByTestId("rfq-form").filter({ visible: true }).locator('[name="name"]').fill(name);
    await page.getByTestId("rfq-form").filter({ visible: true }).locator('[name="email"]').fill("buyer@example.com");
    await page.getByTestId("rfq-form").filter({ visible: true }).locator('[name="company"]').fill("Delta Systems Pte Ltd");
    await page.getByTestId("rfq-form").filter({ visible: true }).locator('[name="country"]').selectOption("Taiwan");
    await page.getByTestId("rfq-form").filter({ visible: true }).locator('[name="notes"]').fill("Need AS923 frequency plan.");
    await form.getByText(/I agree/).click();
    await snap(page, testInfo, "rfq-filled");
    await form.getByTestId("rfq-form-submit").click();

    await expect(page.getByTestId("rfq-form-success")).toBeVisible();
    const ref = (await page.getByTestId("rfq-form-ref").innerText()).replace("Reference:", "").trim();
    expect(ref).toMatch(/^RFQ-/);
    await snap(page, testInfo, "rfq-success");

    const file = path.join(OUTBOX_DIR, `${ref}-notification.eml`);
    await expect.poll(() => existsSync(file)).toBe(true);
    const mail = await simpleParser(readFileSync(file));
    expect(mail.subject).toContain("Wholesale RFQ: 120 × LoRaWAN Gateway 8-Channel (Outdoor) — Delta Systems Pte Ltd");
    expect(mail.text).toContain("Delivery term: CIF");
    expect(mail.text).toContain("OEM / custom branding: Yes");
  });
});

test.describe("Partner programme", () => {
  test("shows all models and the finder recommends by business type", async ({ page }, testInfo) => {
    await page.goto("/partners");
    await expect(page.getByTestId("partner-model")).toHaveCount(11);
    await expect(page.getByTestId("partner-regions")).toContainText("Hsinchu");
    await page.getByTestId("finder-type").selectOption("events");
    await expect(page.getByTestId("finder-results").locator("li").first()).toContainText("Event & rental partner");
    await page.getByTestId("finder-type").selectOption("distributor");
    await expect(page.getByTestId("finder-results").locator("li").first()).toContainText("Reseller / distributor");
    await snap(page, testInfo, "partner-finder", { fullPage: false });
  });

  test("partner application is emailed", async ({ page }, testInfo) => {
    await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });
    await page.goto("/partners?type=White-label%20partner#apply");
    const form = page.getByTestId("partner-form").filter({ visible: true });
    await expect(page.getByTestId("partner-form").filter({ visible: true }).locator('[name="partnerType"]')).toHaveValue("White-label partner");
    await page.getByTestId("partner-form").filter({ visible: true }).locator('[name="industry"]').selectOption("IT & software services");
    await page.getByTestId("partner-form").filter({ visible: true }).locator('[name="region"]').selectOption("Taiwan");
    await page.getByTestId("partner-form").filter({ visible: true }).locator('[name="name"]').fill("Lukas Meyer");
    await page.getByTestId("partner-form").filter({ visible: true }).locator('[name="email"]').fill("lukas@example.com");
    await page.getByTestId("partner-form").filter({ visible: true }).locator('[name="company"]').fill("Meyer Digital GmbH");
    await page.getByTestId("partner-form").filter({ visible: true }).locator('[name="country"]').selectOption("Taiwan");
    await page.getByTestId("partner-form").filter({ visible: true }).locator('[name="message"]').fill("We are a 40-person agency looking for a white-label IoT and app development partner.");
    await form.getByText(/I agree/).click();
    await form.getByTestId("partner-form-submit").click();
    await expect(page.getByTestId("partner-form-success")).toBeVisible();
    const ref = (await page.getByTestId("partner-form-ref").innerText()).replace("Reference:", "").trim();
    const file = path.join(OUTBOX_DIR, `${ref}-notification.eml`);
    await expect.poll(() => existsSync(file)).toBe(true);
    const mail = await simpleParser(readFileSync(file));
    expect(mail.subject).toContain("Partner application: White-label partner — Meyer Digital GmbH (Taiwan)");
    await snap(page, testInfo, "partner-success", { fullPage: false });
  });
});

test.describe("Live demos", () => {
  test("every demo page loads in its app window", async ({ page }) => {
    for (const d of demos) {
      await page.goto(`/demos/${d.slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(d.title);
      await expect(page.locator(".window").first()).toContainText(d.app);
    }
  });

  test("payment checkout completes with webhook events", async ({ page }, testInfo) => {
    await page.goto("/demos/payment-checkout");
    await page.getByTestId("pay-button").click();
    await expect(page.getByTestId("payment-success")).toBeVisible();
    await expect(page.getByTestId("webhook-log")).toContainText("payment.captured");
    await snap(page, testInfo, "demo-payment-success");
  });

  test("eKYC onboarding reaches approval", async ({ page }, testInfo) => {
    await page.goto("/demos/ekyc-onboarding");
    await page.getByTestId("kyc-send-otp").click();
    await page.getByTestId("kyc-otp").fill("000000");
    await page.getByTestId("kyc-verify-otp").click();
    await expect(page.getByText("Incorrect OTP")).toBeVisible();
    await page.getByTestId("kyc-otp").fill("482916");
    await page.getByTestId("kyc-verify-otp").click();
    await page.getByTestId("kyc-capture").click();
    await page.getByTestId("kyc-continue").click();
    await expect(page.getByTestId("kyc-approved")).toBeVisible({ timeout: 10_000 });
    await snap(page, testInfo, "demo-kyc-approved");
  });

  test("RPA bot posts invoices and flags the exception", async ({ page }, testInfo) => {
    test.skip(!isDesktop(testInfo), "Long-running demo; run once");
    await page.goto("/demos/rpa-invoice-bot");
    await page.getByTestId("run-bot").click();
    await expect(page.getByTestId("rpa-posted")).toHaveText("7", { timeout: 20_000 });
    await expect(page.getByTestId("demo-rpa")).toContainText("Amount differs from PO");
    await snap(page, testInfo, "demo-rpa-done");
  });

  test("chatbot tracks an order", async ({ page }, testInfo) => {
    await page.goto("/demos/whatsapp-chatbot");
    await page.getByTestId("chat-replies").getByRole("button", { name: "Track my order" }).click();
    await page.getByTestId("chat-replies").getByRole("button", { name: "ORV-10482" }).click();
    await expect(page.getByTestId("demo-chat")).toContainText("out for delivery");
    await snap(page, testInfo, "demo-chat", { fullPage: false });
  });

  test("3D configurator updates the price", async ({ page }) => {
    await page.goto("/demos/3d-product-configurator");
    await expect(page.getByTestId("config-price")).toHaveText("₹9,800");
    await page.getByRole("button", { name: "Increase" }).click();
    await page.getByText("Wi-Fi + LTE-M").click();
    await expect(page.getByTestId("config-price")).toHaveText("₹18,900");
  });
});

test.describe("Enquiry APIs", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(!isDesktop(testInfo), "API checks run once");
  });

  test("RFQ and partner endpoints validate input", async ({ request }) => {
    const rfq = await request.post("/api/rfq", { data: { product: "", quantity: 0 }, headers: { "x-forwarded-for": randomIp() } });
    expect(rfq.status()).toBe(422);
    expect(Object.keys((await rfq.json()).fieldErrors)).toEqual(expect.arrayContaining(["product", "quantity", "name", "email", "company", "consent"]));
    const partner = await request.post("/api/partner", { data: { partnerType: "Nope" }, headers: { "x-forwarded-for": randomIp() } });
    expect(partner.status()).toBe(422);
  });
});
