import { expect, test } from "@playwright/test";
import { locations } from "../../src/lib/locations";
import { categories, services } from "../../src/lib/services";
import { demos } from "../../src/lib/demos";
import { products } from "../../src/lib/products";
import { isDesktop, snap } from "./helpers";

test.beforeEach(({}, testInfo) => {
  test.skip(!isDesktop(testInfo), "SEO checks are viewport-independent; run once");
});

const asian = ["India", "Taiwan"];

test("home page has full SEO metadata and structured data", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Orvantis Technologies | Custom Software, IoT & Embedded Development");
  const meta = (sel: string) => page.locator(sel).first().getAttribute("content");

  expect((await meta('meta[name="description"]'))!.length).toBeGreaterThan(80);
  const keywords = (await meta('meta[name="keywords"]'))!;
  for (const c of asian) expect(keywords).toContain(c);
  expect(keywords).toContain("台灣 軟體開發公司");

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(new URL(canonical!).pathname).toBe("/");
  expect(await meta('meta[property="og:title"]')).toBeTruthy();
  expect(await meta('meta[property="og:image"]')).toContain("opengraph-image");
  expect(await meta('meta[name="twitter:card"]')).toBe("summary_large_image");

  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = ld.map((t) => JSON.parse(t)["@type"]);
  const orgLd = ld.map((t) => JSON.parse(t)).find((d) => d["@type"] === "Organization");
  expect(orgLd.areaServed.map((a: { name: string }) => a.name).sort()).toEqual(["India", "Taiwan"]);
  expect(types).toContain("Organization");
  expect(types).toContain("FAQPage");
  const org = ld.map((t) => JSON.parse(t)).find((d) => d["@type"] === "Organization");
  expect(org.areaServed.map((a: { name: string }) => a.name)).toEqual(expect.arrayContaining(asian));
});

test("each Asian market has its own optimised landing page", async ({ page }, testInfo) => {
  for (const loc of locations) {
    await page.goto(`/locations/${loc.slug}`);
    await expect(page.locator("h1")).toContainText(loc.country);
    await expect(page).toHaveTitle(new RegExp(`in ${loc.country}`));
    const kw = await page.locator('meta[name="keywords"]').getAttribute("content");
    expect(kw).toContain(loc.keywords[0]);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(new RegExp(`/locations/${loc.slug}$`));
  }
  await page.goto("/locations/taiwan");
  await snap(page, testInfo, "location-taiwan-seo");
});

test("sitemap.xml lists every page", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(urls).toContain("/");
  expect(urls).toContain("/contact");
  for (const s of services) expect(urls).toContain(`/services/${s.slug}`);
  for (const l of locations) expect(urls).toContain(`/locations/${l.slug}`);
  for (const c of Object.values(categories)) expect(urls).toContain(`/services/category/${c.slug}`);
  for (const p of products) expect(urls).toContain(`/products/${p.slug}`);
  for (const d of demos) expect(urls).toContain(`/demos/${d.slug}`);
  for (const u of ["/products", "/demos", "/partners", "/careers", "/marketplace", "/terms", "/returns"]) expect(urls).toContain(u);
});

test("robots.txt allows crawling and points to the sitemap", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  expect(txt).toContain("Allow: /");
  expect(txt).toContain("Disallow: /api/");
  expect(txt).toMatch(/Sitemap: .*\/sitemap\.xml/);
});

test("Open Graph image and manifest are served", async ({ request }) => {
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.name).toBe("Orvantis Technologies");
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["x-powered-by"]).toBeUndefined();
});
