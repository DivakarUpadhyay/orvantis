import { expect, test } from "@playwright/test";
import { mainPages, snap } from "./helpers";

test.describe("Every page renders and is responsive", () => {
  for (const p of mainPages) {
    test(`${p.name} (${p.path})`, async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

      const res = await page.goto(p.path);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(/Orvantis Technologies/);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.getByTestId("site-footer")).toBeVisible();

      // No horizontal scrolling at this viewport.
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "page should not scroll horizontally").toBeLessThanOrEqual(1);

      await snap(page, testInfo, p.name);
      expect(errors, `console errors: ${errors.join("\n")}`).toEqual([]);
    });
  }

  test("unknown URL shows the 404 page", async ({ page }, testInfo) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByTestId("not-found")).toBeVisible();
    await snap(page, testInfo, "404");
  });

  test("unknown service slug is a 404", async ({ page }) => {
    const res = await page.goto("/services/not-a-real-service");
    expect(res?.status()).toBe(404);
  });
});
