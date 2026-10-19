import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { simpleParser } from "mailparser";
import { termsSections, returnRules } from "../../src/lib/policies";
import { isDesktop, OUTBOX_DIR, randomIp, snap } from "./helpers";

async function fillContactAndAddress(page: Page, formId: string, name: string) {
  const f = page.getByTestId(formId).filter({ visible: true });
  await f.locator('[name="name"]').fill(name);
  await f.locator('[name="email"]').fill("buyer@example.com");
  await f.locator('[name="phone"]').fill("+91 98200 12345");
  await f.locator('[name="addressLine"]').fill("Room 12, Shanti Nagar");
  await f.locator('[name="city"]').fill("Pune");
  await f.locator('[name="state"]').fill("Maharashtra");
  await f.locator('[name="postalCode"]').fill("411057");
  await f.locator('[name="country"]').selectOption("India");
  return f;
}

async function readMail(ref: string) {
  const file = path.join(OUTBOX_DIR, `${ref}-notification.eml`);
  await expect.poll(() => existsSync(file)).toBe(true);
  return simpleParser(readFileSync(file));
}

test.describe("Hardware vs software is clearly separated", () => {
  test("services page groups software and hardware services", async ({ page }, testInfo) => {
    await page.goto("/services");
    await expect(page.getByTestId("group-block-software")).toContainText("Software & Digital Services");
    await expect(page.getByTestId("group-block-hardware")).toContainText("Hardware & Engineering Services");
    await expect(page.getByTestId("group-block-software").getByTestId("category-section-software")).toBeVisible();
    await expect(page.getByTestId("group-block-hardware").getByTestId("category-section-hardware")).toBeVisible();
    // Every service card carries a Software or Hardware badge.
    const cards = page.getByTestId("service-card");
    const n = await cards.count();
    expect(await page.locator('[data-testid="service-card"] [data-kind]').count()).toBe(n);
    await snap(page, testInfo, "services-grouped", { fullPage: false });
  });

  test("services mega menu shows software and hardware groups", async ({ page }, testInfo) => {
    test.skip(!isDesktop(testInfo), "Desktop mega menu");
    await page.goto("/");
    await page.getByTestId("mega-trigger-services").hover();
    await expect(page.getByTestId("mega-group-software")).toContainText("Software Development");
    await expect(page.getByTestId("mega-group-hardware")).toContainText("IoT & Embedded Systems");
    await snap(page, testInfo, "mega-services-grouped", { fullPage: false });
  });

  test("home page explains each section", async ({ page }) => {
    await page.goto("/");
    for (const id of ["services", "products", "marketplace", "industries", "demos", "company"]) {
      await expect(page.getByTestId(`directory-${id}`)).toBeVisible();
    }
  });

  test("pages show a colour-coded section label", async ({ page }) => {
    for (const [url, section] of [
      ["/services/iot-solutions", "services"],
      ["/products/refurbished-industrial-pc-grade-a", "products"],
      ["/marketplace", "marketplace"],
      ["/terms", "company"],
    ] as const) {
      await page.goto(url);
      await expect(page.getByTestId("section-label").first()).toHaveAttribute("data-section", section);
    }
  });
});

test.describe("Product offers", () => {
  test("refurbished, free and giveaway categories are listed separately", async ({ page }, testInfo) => {
    await page.goto("/products");
    await expect(page.getByTestId("product-group-shop")).toContainText("New hardware by type");
    await expect(page.getByTestId("product-group-offers")).toContainText("Offers");
    for (const id of ["refurbished", "free", "giveaway"]) {
      await expect(page.getByTestId(`product-group-offers`).getByTestId(`product-section-${id}`)).toBeVisible();
    }
    await page.getByTestId("product-cat-refurbished").first().click();
    await expect(page).toHaveURL(/second-hand-refurbished/);
    await expect(page.getByTestId("product-card").first()).toContainText("Refurbished · Grade");
    await snap(page, testInfo, "products-refurbished");
  });

  test("single-unit order with a reseller code is emailed", async ({ page }, testInfo) => {
    await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });
    await page.goto("/products/wireless-vibration-temperature-sensor?ref=ASHA42#order");
    await expect(page.getByTestId("retail-price")).toContainText("₹11,350");
    await expect(page.getByTestId("retail-price")).toContainText("NT$");
    await expect(page.getByTestId("single-order-process")).toBeVisible();
    await expect(page.getByTestId("policy-summary")).toContainText("7 days");

    const name = `Single ${testInfo.project.name} ${Date.now()}`;
    const form = await fillContactAndAddress(page, "order-form-buy", name);
    await expect(form.locator('[name="refCode"]')).toHaveValue("ASHA42");
    await form.locator('[name="quantity"]').fill("2");
    await form.locator('[name="payment"]').selectOption("UPI");
    await form.getByTestId("order-form-buy-submit").click();
    await expect(form.getByText("Please accept the Terms & Conditions")).toBeVisible();
    await form.locator('input[type="checkbox"]').last().check();
    await form.getByTestId("order-form-buy-submit").click();

    await expect(page.getByTestId("order-form-buy-success")).toBeVisible();
    const ref = (await page.getByTestId("order-form-buy-ref").innerText()).replace("Reference:", "").trim();
    expect(ref).toMatch(/^ORD-/);
    const mail = await readMail(ref);
    expect(mail.subject).toContain("New single-unit order: 2 × Wireless Vibration & Temperature Sensor");
    expect(mail.subject).toContain("(reseller ASHA42)");
    expect(mail.text).toContain("Delivery address: Room 12, Shanti Nagar, Pune, Maharashtra 411057, India");
    await snap(page, testInfo, "single-order-success", { fullPage: false });
  });

  test("free sample request and giveaway entry are emailed", async ({ page }, testInfo) => {
    test.skip(!isDesktop(testInfo), "Form flows run once");
    await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });

    await page.goto("/products/free-esp32-evaluation-sample");
    await expect(page.getByTestId("policy-summary")).toContainText("Not returnable");
    let form = await fillContactAndAddress(page, "order-form-free", "Free Sample Tester");
    await form.locator('[name="notes"]').fill("Evaluating for a smart plug design.");
    await form.locator('input[type="checkbox"]').last().check();
    await form.getByTestId("order-form-free-submit").click();
    await expect(page.getByTestId("order-form-free-success")).toBeVisible();
    let ref = (await page.getByTestId("order-form-free-ref").innerText()).replace("Reference:", "").trim();
    expect(ref).toMatch(/^FREE-/);
    expect((await readMail(ref)).subject).toContain("New free product request");

    await page.goto("/products/giveaway-smart-energy-meter");
    await expect(page.getByTestId("price-tiers")).toContainText("Closes:");
    form = await fillContactAndAddress(page, "order-form-giveaway", "Giveaway Entrant");
    await form.locator('input[type="checkbox"]').last().check();
    await form.getByTestId("order-form-giveaway-submit").click();
    await expect(page.getByTestId("order-form-giveaway-success")).toBeVisible();
    ref = (await page.getByTestId("order-form-giveaway-ref").innerText()).replace("Reference:", "").trim();
    expect(ref).toMatch(/^GIVE-/);
    await snap(page, testInfo, "giveaway-entered", { fullPage: false });
  });

  test("marketplace products show the seller", async ({ page }) => {
    await page.goto("/products/uhf-rfid-reader-marketplace");
    await expect(page.getByTestId("seller-info")).toContainText("Verified marketplace seller");
    await expect(page.getByTestId("policy-summary")).toContainText("7 days");
  });

  test("share & earn builds a referral link", async ({ page }) => {
    await page.goto("/products/4g-gps-vehicle-tracker");
    const box = page.getByTestId("share-earn");
    await expect(box).toContainText("10% commission");
    await page.getByTestId("share-code").fill("asha42");
    await expect(page.getByTestId("share-link")).toContainText("/products/4g-gps-vehicle-tracker?ref=ASHA42#order");
  });
});

test.describe("Marketplace", () => {
  test("seller and reseller signups are emailed", async ({ page }, testInfo) => {
    await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });
    await page.goto("/marketplace");
    await expect(page.getByTestId("sell-steps").locator("li")).toHaveCount(5);
    await expect(page.getByTestId("resell-steps").locator("li")).toHaveCount(5);
    await snap(page, testInfo, "marketplace");

    const seller = page.getByTestId("seller-form").filter({ visible: true });
    await seller.locator('[name="company"]').fill("Nova Sensors Pvt Ltd");
    await seller.locator('[name="name"]').fill("Ravi Kulkarni");
    await seller.locator('[name="email"]').fill("ravi@example.com");
    await seller.locator('[name="phone"]').fill("+91 99200 11111");
    await seller.locator('[name="country"]').selectOption("India");
    await seller.locator('[name="categories"]').fill("Industrial temperature and pressure sensors");
    await seller.locator('[name="catalogueSize"]').selectOption("11–50");
    await seller.locator('input[type="checkbox"]').last().check();
    await seller.getByTestId("seller-form-submit").click();
    await expect(page.getByTestId("seller-form-success")).toBeVisible();
    const sref = (await page.getByTestId("seller-form-ref").innerText()).replace("Reference:", "").trim();
    expect((await readMail(sref)).subject).toContain("Marketplace seller application: Nova Sensors Pvt Ltd (India)");

    const reseller = page.getByTestId("reseller-form").filter({ visible: true });
    await reseller.locator('[name="name"]').fill("Asha Patil");
    await reseller.locator('[name="email"]').fill("asha@example.com");
    await reseller.locator('[name="phone"]').fill("+91 98000 22222");
    await reseller.locator('[name="resellerType"]').selectOption("Homemaker / part-time");
    await reseller.locator('[name="city"]').fill("Nashik");
    await reseller.locator('[name="country"]').selectOption("India");
    await reseller.locator('input[type="checkbox"]').last().check();
    await reseller.getByTestId("reseller-form-submit").click();
    await expect(page.getByTestId("reseller-form-success")).toBeVisible();
    const rref = (await page.getByTestId("reseller-form-ref").innerText()).replace("Reference:", "").trim();
    const mail = await readMail(rref);
    expect(mail.subject).toMatch(/Reseller signup: Asha Patil — Nashik, India \(code ASHAP[A-F0-9]{4}\)/);
  });
});

test.describe("Policies", () => {
  test("terms cover every business line", async ({ page }, testInfo) => {
    await page.goto("/terms");
    for (const t of termsSections) await expect(page.getByTestId(`terms-${t.id}`)).toContainText(t.title);
    await snap(page, testInfo, "terms", { fullPage: false });
  });

  test("returns policy lists every product type", async ({ page }) => {
    await page.goto("/returns");
    await expect(page.getByTestId("returns-table").locator("tbody tr")).toHaveCount(returnRules.length);
    await expect(page.getByTestId("return-refurbished")).toContainText(/stated grade/i);
  });

  test("order API requires accepting the terms and caps single orders", async ({ request }, testInfo) => {
    test.skip(!isDesktop(testInfo), "API check runs once");
    const res = await request.post("/api/order", {
      data: { product: "4g-gps-vehicle-tracker", mode: "buy", quantity: 25, consent: false },
      headers: { "x-forwarded-for": randomIp() },
    });
    expect(res.status()).toBe(422);
    const errs = (await res.json()).fieldErrors;
    expect(errs.consent).toContain("Terms & Conditions");
    expect(errs.quantity).toContain("wholesale quote");
  });
});

test.describe("Donations", () => {
  test("donation offer is validated and emailed", async ({ page }, testInfo) => {
    await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });
    await page.goto("/donate");
    await expect(page.getByTestId("donate-steps").locator("li")).toHaveCount(5);
    await expect(page.getByTestId("section-label").first()).toHaveAttribute("data-section", "marketplace");
    await snap(page, testInfo, "donate");

    const form = page.getByTestId("donate-form").filter({ visible: true });
    await form.getByTestId("donate-form-submit").click();
    await expect(form.getByTestId("donate-form-error-itemType")).toBeVisible();
    await expect(form.getByTestId("donate-form-error-dataWiped")).toBeVisible();

    await form.locator('[name="itemType"]').selectOption("Laptop / desktop");
    await form.locator('[name="quantity"]').fill("3");
    await form.locator('[name="description"]').fill("Dell Latitude 5490, i5, 8 GB RAM, chargers included");
    await form.locator('[name="condition"]').selectOption("Working");
    await form.locator('[name="handover"]').selectOption("Pickup from my address");
    await form.locator('[name="use"]').selectOption("Give free to students, schools and NGOs only");
    await form.locator('[name="name"]').fill("Meera Joshi");
    await form.locator('[name="email"]').fill("meera@example.com");
    await form.locator('[name="phone"]').fill("+91 98190 33333");
    await form.locator('[name="city"]').fill("Vasai");
    await form.locator('[name="state"]').fill("Maharashtra");
    await form.locator('[name="postalCode"]').fill("401208");
    await form.locator('[name="country"]').selectOption("India");
    await form.locator('input[name="dataWiped"]').check();
    await form.locator('input[type="checkbox"]').last().check();
    await form.getByTestId("donate-form-submit").click();

    await expect(page.getByTestId("donate-form-success")).toBeVisible();
    const ref = (await page.getByTestId("donate-form-ref").innerText()).replace("Reference:", "").trim();
    expect(ref).toMatch(/^DON-/);
    const mail = await readMail(ref);
    expect(mail.subject).toContain("Donation offer: 3 × Laptop / desktop (Working) — Vasai, India");
    expect(mail.text).toContain("Donor's preferred use: Give free to students, schools and NGOs only");
  });

  test("donation is reachable from marketplace menu and terms", async ({ page }, testInfo) => {
    await page.goto("/marketplace");
    await expect(page.getByTestId("mp-donate-card")).toBeVisible();
    await page.goto("/terms");
    await expect(page.getByTestId("terms-donations")).toContainText("e-waste");
    await page.goto("/products/free-donated-laptops-students-ngos");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Donated");
    if (isDesktop(testInfo)) {
      await page.goto("/");
      await page.getByTestId("mega-trigger-marketplace").hover();
      await expect(page.getByTestId("mega-mp-donate")).toContainText("Donate your used tech");
      await snap(page, testInfo, "mega-marketplace-donate", { fullPage: false });
    }
  });
});

test("only India and Taiwan are offered, with INR and TWD prices", async ({ page }) => {
  await page.goto("/contact");
  const opts = await page.locator("#country option").allInnerTexts();
  expect(opts.filter((o) => o !== "Select country").sort()).toEqual(["India", "Taiwan"]);
  await page.goto("/locations");
  await expect(page.getByTestId("location-card")).toHaveCount(2);
  await page.goto("/products");
  const body = await page.locator("main").innerText();
  expect(body).toContain("₹");
  expect(body).toContain("NT$");
  expect(body).not.toContain("US$");
  for (const c of ["Singapore", "Malaysia", "Dubai", "Japan"]) expect(body).not.toContain(c);
});
