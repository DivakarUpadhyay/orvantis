import { expect, test } from "@playwright/test";
import { isDesktop, snap } from "./helpers";

test.describe("Desktop mega menus", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(!isDesktop(testInfo), "Mega menus are shown at desktop widths");
  });

  test("Services mega menu switches category-wise", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.getByTestId("mega-trigger-services").hover();
    const panel = page.getByTestId("mega-services");
    await expect(panel).toBeVisible();
    await expect(page.getByTestId("mega-trigger-services")).toHaveAttribute("aria-expanded", "true");

    // Software is the default tab.
    await expect(page.getByTestId("mega-panel-software")).toContainText("Custom Software Development");
    await snap(page, testInfo, "mega-services-software", { fullPage: false });

    await page.getByTestId("mega-cat-hardware").hover();
    await expect(page.getByTestId("mega-panel-hardware")).toContainText("Embedded Systems & Firmware");
    await expect(page.getByTestId("mega-cat-hardware")).toHaveAttribute("aria-selected", "true");
    await snap(page, testInfo, "mega-services-iot-embedded", { fullPage: false });

    await page.getByTestId("mega-cat-manufacturing").hover();
    const mfg = page.getByTestId("mega-panel-manufacturing");
    await expect(mfg).toContainText("Manufacturing Execution Systems (MES)");
    await snap(page, testInfo, "mega-services-manufacturing", { fullPage: false });

    await page.getByTestId("mega-cat-integrations").hover();
    const integ = page.getByTestId("mega-panel-integrations");
    await expect(integ).toContainText("Payment Gateway Integration");
    await expect(integ).toContainText("KYC & Identity Verification Integration");
    await snap(page, testInfo, "mega-services-integrations", { fullPage: false });

    await page.getByTestId("mega-cat-manufacturing").hover();

    await mfg.getByRole("link", { name: /Predictive Maintenance/ }).click();
    await expect(page).toHaveURL(/\/services\/predictive-maintenance$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Predictive Maintenance");
    await expect(panel).toBeHidden();
  });

  test("Industries mega menu is grouped by sector", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.getByTestId("mega-trigger-industries").hover();
    const panel = page.getByTestId("mega-industries");
    await expect(panel).toBeVisible();
    for (const group of ["Manufacturing & Industrial", "Energy & Resources", "Health, Logistics & Commerce"]) {
      await expect(panel).toContainText(group);
    }
    await snap(page, testInfo, "mega-industries", { fullPage: false });
  });

  test("Products mega menu switches product categories", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.getByTestId("mega-trigger-products").hover();
    await expect(page.getByTestId("mega-products")).toBeVisible();
    await expect(page.getByTestId("mega-prod-panel-iot")).toContainText("Industrial IoT Gateway");
    await page.getByTestId("mega-prod-semiconductor").hover();
    await expect(page.getByTestId("mega-prod-panel-semiconductor")).toContainText("Wafer Probe Station");
    await snap(page, testInfo, "mega-products", { fullPage: false });
    await page.getByTestId("mega-prod-arvr").hover();
    await page.getByTestId("mega-prod-panel-arvr").getByRole("link", { name: /AR Smart Glasses/ }).click();
    await expect(page).toHaveURL(/\/products\/ar-smart-glasses-industrial$/);
  });

  test("Marketplace mega menu separates selling and reselling", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.getByTestId("mega-trigger-marketplace").hover();
    await expect(page.getByTestId("mega-mp-sell")).toContainText("Sell on our marketplace");
    await expect(page.getByTestId("mega-mp-resell")).toContainText("Resell & earn commission");
    await snap(page, testInfo, "mega-marketplace", { fullPage: false });
  });

  test("Company mega menu lists pages, markets and offices", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.getByTestId("mega-trigger-company").hover();
    const panel = page.getByTestId("mega-company");
    await expect(panel).toBeVisible();
    for (const t of ["About us", "Careers", "Partner programme", "Terms & Conditions", "Headquarters — India"]) await expect(panel).toContainText(t);
    for (const c of ["India", "Taiwan"]) {
      await expect(panel.getByRole("link", { name: new RegExp(c) }).first()).toBeVisible();
    }
    await snap(page, testInfo, "mega-company", { fullPage: false });
    await panel.getByTestId("mega-company-markets").getByRole("link", { name: /Taiwan/ }).click();
    await expect(page).toHaveURL(/\/locations\/taiwan$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Taiwan");
  });

  test("Escape and outside click close the mega menu", async ({ page }) => {
    await page.goto("/about");
    await page.getByTestId("mega-trigger-services").click();
    await expect(page.getByTestId("mega-services")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("mega-services")).toBeHidden();

    await page.getByTestId("mega-trigger-company").click();
    await expect(page.getByTestId("mega-company")).toBeVisible();
    await page.mouse.move(700, 850);
    await page.mouse.click(700, 850);
    await expect(page.getByTestId("mega-company")).toBeHidden();
  });
});

test.describe("Mobile and tablet menu", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(isDesktop(testInfo), "Hamburger menu is used below desktop widths");
  });

  test("hamburger opens category-wise accordion", async ({ page }, testInfo) => {
    await page.goto("/");
    await expect(page.getByTestId("mega-trigger-services")).toBeHidden();
    await page.getByTestId("menu-button").click();
    const menu = page.getByTestId("mobile-menu");
    await expect(menu).toBeVisible();

    await page.getByTestId("mobile-section-services").click();
    await expect(menu).toContainText("Software Development");
    await expect(menu).toContainText("IoT & Embedded Systems");
    await expect(menu).toContainText("Manufacturing & Industry 4.0");
    await snap(page, testInfo, "mobile-menu-services", { fullPage: false });

    await menu.getByRole("link", { name: "Edge Computing & Gateways" }).first().click();
    await expect(page).toHaveURL(/\/services\/edge-computing$/);
    await expect(menu).toBeHidden();
  });

  test("menu links reach every main section", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("menu-button").click();
    await page.getByTestId("mobile-menu").getByRole("link", { name: "Demos", exact: true }).click();
    await expect(page).toHaveURL(/\/demos$/);
    await page.getByTestId("menu-button").click();
    await page.getByTestId("mobile-section-marketplace").click();
    await page.getByTestId("mobile-menu").getByRole("link", { name: "Resell & earn commission" }).click();
    await expect(page).toHaveURL(/\/marketplace#resell$/);
    await page.getByTestId("menu-button").click();
    await page.getByTestId("mobile-section-company").click();
    await page.getByTestId("mobile-menu").getByRole("link", { name: "About us" }).click();
    await expect(page).toHaveURL(/\/about$/);
  });
});

test("home page CTAs lead to contact and services", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("hero-cta").click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.goBack();
  await page.getByRole("link", { name: "View all services" }).click();
  await expect(page).toHaveURL(/\/services$/);
});

test("theme toggle switches to dark mode and remembers it", async ({ page }, testInfo) => {
  await page.goto("/");
  const html = page.locator("html");
  const wasDark = await html.evaluate((el) => el.classList.contains("dark"));
  await page.getByTestId("theme-toggle").click();
  await expect.poll(() => html.evaluate((el) => el.classList.contains("dark"))).toBe(!wasDark);

  if (!wasDark) await snap(page, testInfo, "home-dark", { fullPage: false });

  await page.reload();
  const isDark = await html.evaluate((el) => el.classList.contains("dark"));
  expect(isDark).toBe(!wasDark);
});
