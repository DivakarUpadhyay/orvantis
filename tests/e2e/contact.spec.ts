import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { simpleParser } from "mailparser";
import { isDesktop, OUTBOX_DIR, randomIp, snap, validContact } from "./helpers";

test.describe("Contact form (UI)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });
    await page.goto("/contact");
  });

  test("shows the India headquarters address and no Taiwan office", async ({ page }) => {
    await expect(page.getByTestId("office-taiwan")).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText("Taipei");
    const india = page.getByTestId("office-india");
    await expect(india).toContainText("Headquarters — India");
    await expect(india).toContainText("Room No. 304, Pavitra Prerna, Pavitradham, Near Juchandra, Naigaon East");
    await expect(india).toContainText("Maharashtra 401208, India");
    await expect(page.getByTestId("site-footer")).toContainText("Naigaon East");
  });

  test("shows validation errors for an empty submit", async ({ page }, testInfo) => {
    await page.getByTestId("contact-submit").click();
    for (const field of ["name", "email", "service", "budget", "timeline", "message"]) {
      await expect(page.getByTestId(`error-${field}`)).toBeVisible();
    }
    await expect(page.locator("#consent-error")).toBeVisible();
    await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#name")).toBeFocused();
    await snap(page, testInfo, "contact-validation-errors");
  });

  test("rejects an invalid email and clears the error when corrected", async ({ page }) => {
    await page.locator("#email").fill("not-an-email");
    await page.getByTestId("contact-submit").click();
    await expect(page.getByTestId("error-email")).toHaveText("Please enter a valid email address.");
    await page.locator("#email").fill("ok@example.com");
    await expect(page.getByTestId("error-email")).toBeHidden();
  });

  test("sends the enquiry and the confirmation email", async ({ page }, testInfo) => {
    const name = `Test ${testInfo.project.name} ${Date.now()}`;
    await page.locator("#name").fill(name);
    await page.locator("#email").fill(validContact.email);
    await page.locator("#company").fill(validContact.company);
    await page.locator("#phone").fill(validContact.phone);
    await page.locator("#country").selectOption("Taiwan");
    await page.locator("#service").selectOption("iot-solutions");
    await page.locator("#budget").selectOption(validContact.budget);
    await page.locator("#timeline").selectOption(validContact.timeline);
    await page.locator("#message").fill(validContact.message);
    await page.getByRole("checkbox").check();
    await snap(page, testInfo, "contact-filled");

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().endsWith("/api/contact")),
      page.getByTestId("contact-submit").click(),
    ]);
    expect(response.status()).toBe(200);

    await expect(page.getByTestId("contact-success")).toBeVisible();
    const refText = await page.getByTestId("contact-ref").innerText();
    const ref = refText.replace("Reference:", "").trim();
    expect(ref).toMatch(/^ORV-[A-Z0-9]+-[A-F0-9]{4}$/);
    await snap(page, testInfo, "contact-success");

    // The server wrote both emails to the test outbox.
    const notification = path.join(OUTBOX_DIR, `${ref}-notification.eml`);
    const acknowledgement = path.join(OUTBOX_DIR, `${ref}-acknowledgement.eml`);
    await expect.poll(() => existsSync(notification)).toBe(true);
    const n = await simpleParser(readFileSync(notification));
    expect(n.subject).toBe(`[Website enquiry ${ref}] End-to-End IoT Solutions — ${name} (${validContact.company})`);
    expect(n.replyTo?.value[0]).toMatchObject({ address: validContact.email, name });
    expect(n.text).toContain(validContact.message);
    expect(n.text).toContain("Country: Taiwan");
    expect(n.html).toContain("New website enquiry");

    const a = await simpleParser(readFileSync(acknowledgement));
    expect(a.to && !Array.isArray(a.to) ? a.to.value[0] : null).toMatchObject({ address: validContact.email, name });
    expect(a.subject).toBe(`We received your message — Orvantis Technologies (ref ${ref})`);
    expect(a.text).toContain(`Hi ${name},`);
  });
});

test.describe("Contact API", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(!isDesktop(testInfo), "API checks run once");
  });

  const post = (request: import("@playwright/test").APIRequestContext, data: unknown, ip = randomIp()) =>
    request.post("/api/contact", { data, headers: { "x-forwarded-for": ip } });

  test("accepts a valid payload", async ({ request }) => {
    const res = await post(request, validContact);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.ref).toMatch(/^ORV-/);
  });

  test("returns field errors for invalid data", async ({ request }) => {
    const res = await post(request, { ...validContact, email: "bad", message: "short", consent: false });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(Object.keys(body.fieldErrors).sort()).toEqual(["consent", "email", "message"]);
  });

  test("rejects malformed JSON", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: Buffer.from("{not json"),
      headers: { "content-type": "application/json", "x-forwarded-for": randomIp() },
    });
    expect(res.status()).toBe(400);
  });

  test("silently drops honeypot submissions", async ({ request }) => {
    const res = await post(request, { ...validContact, website: "http://spam.example" });
    expect(res.status()).toBe(200);
    expect((await res.json()).ref).toBe("OK");
  });

  test("rate-limits repeated submissions from one IP", async ({ request }) => {
    const ip = randomIp();
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(request, { ...validContact, message: "x" }, ip)).status());
    expect(statuses.slice(0, 5)).toEqual([422, 422, 422, 422, 422]);
    expect(statuses[5]).toBe(429);
  });

  test("only accepts POST", async ({ request }) => {
    const res = await request.get("/api/contact");
    expect(res.status()).toBe(405);
  });
});
