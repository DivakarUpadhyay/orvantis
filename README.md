# Orvantis Technologies — company website

Company website for **Orvantis Technologies** (headquartered in Vasai, Maharashtra, India): software and
hardware services, a hardware product catalogue (single units, wholesale, refurbished, free and giveaways),
a seller/reseller marketplace, donations, live demos and a partner programme.

**Markets:** India and Taiwan only (at the moment). **Prices:** stored in INR and shown with the TWD equivalent.

Built with **Next.js 16 (App Router, Cache Components)**, **React 19**, **Tailwind CSS 4**, **TypeScript**,
**Zod** and **Nodemailer**, styled after Windows 11 (Fluent: Mica/Acrylic, Segoe UI, reveal highlight).
Tested end-to-end with **Playwright** in Google Chrome.

## Site structure (top-level sections)

Each section has its own menu, colour-coded breadcrumb label and landing page (`src/lib/sections.ts`).

| Section | What it contains |
|---|---|
| **Services** | Work we do for you, split into **Software & Digital** (software dev & digital marketing, integrations, automation, AR/VR) and **Hardware & Engineering** (IoT & embedded, manufacturing / Industry 4.0, event technology). Every card carries a Software or Hardware badge. |
| **Products** | Hardware to buy. **New hardware by type** (IoT, AR/VR, embedded, semiconductor) and **Offers** (second-hand & refurbished, free products & samples, giveaways). Single-unit ordering (1–9) and wholesale RFQs (10+). |
| **Marketplace** | **Sell on our marketplace** (businesses list products, commission per sale) and **Resell & earn** (anyone shares products with a reseller code and earns the commission shown on each product). |
| **Industries** | Industries and the markets we serve (India and Taiwan). |
| **Demos** | Interactive in-browser demos (factory dashboard, payments, eKYC, shipping, RPA, IoT OTA, chatbot, 3D configurator). |
| **Company** | About, process, partner programme, careers, contact, Terms & Conditions, Return Policy, Privacy. |

## Forms (all send two emails: notification to you + confirmation to the sender)

| Form | Endpoint | Reference prefix |
|---|---|---|
| Contact | `/api/contact` | `ORV-` |
| Wholesale quote | `/api/rfq` | `RFQ-` |
| Single-unit order / free claim / giveaway entry | `/api/order` | `ORD-` / `FREE-` / `GIVE-` |
| Partner application | `/api/partner` | `PTR-` |
| Marketplace seller | `/api/seller` | `SELL-` |
| Reseller signup (issues a provisional reseller code) | `/api/reseller` | `RES-` |

Reseller codes travel in links as `?ref=CODE`; the order form picks the code up automatically and it appears
in the order email so you can credit commission. Online payment is not taken on the site: you email an
invoice with a payment link after confirming stock.

## Where to edit content

```
src/lib/services.ts     services, categories and the Software / Hardware groups
src/lib/products.ts     products, categories, prices, single-unit price, reseller commission, ordering steps
src/lib/policies.ts     Terms & Conditions sections and Return Policy rules (per product type)
src/lib/partners.ts     partnership models
src/lib/demos.ts        demo list
src/lib/site.ts         company name, email, phone, headquarters address
src/lib/sections.ts     top-level sections, colours and quick links
src/lib/locations.ts    market pages (India, Taiwan) and SEO keywords
src/lib/world.ts        markets offered in forms and the partner programme
src/lib/currency.ts     INR → TWD reference rate and price formatting
```

## Currency

Prices in `src/lib/products.ts` are INR numbers. TWD is calculated with `TWD_PER_INR` in `src/lib/currency.ts`
(default 0.36), which you can override in Vercel with `NEXT_PUBLIC_TWD_PER_INR`. Update it when exchange rates move.
To add another market later, add it back to `src/lib/locations.ts` and `src/lib/world.ts`.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; without SMTP, emails are written to .outbox/
npm run dev                  # http://localhost:3000
```

## Tests (Playwright, visible Chrome)

```bash
npx playwright install ffmpeg      # once, for failure videos
npm run test:e2e                   # builds, starts the app and runs all tests in a visible Chrome window
npm run test:e2e:headless          # same, without showing the browser
npm run test:report                # open the HTML report (screenshots attached to each test)
```

Tests run on three Chrome profiles: `desktop-chrome` (1440×900), `tablet-chrome` (iPad Mini) and
`mobile-chrome` (Pixel 7). Screenshots are kept in `screenshots/<profile>/`.
During tests emails are written to `.outbox-test/` and parsed to check subject, recipients and content.

## Deploy to Vercel

1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. In Vercel: **Add New → Project → Import** the repository. Framework preset: **Next.js** (auto-detected).
3. In **Settings → Environment Variables** add the keys from `.env.example`
   (at minimum `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `CONTACT_TO`,
   `NEXT_PUBLIC_SITE_URL`). Without SMTP settings the forms return an error in production.
4. Deploy, then add your domain in **Settings → Domains**.
5. Verify the sending domain with your email provider (SPF/DKIM) so emails don't land in spam.
6. Submit `https://<your-domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Before going live — checklist

- [ ] Trademark search for "Orvantis" (IP India, WIPO Global Brand Database and your export markets); register the domain.
- [ ] Add your phone number in `src/lib/site.ts` (`phone`), and confirm the headquarters address and PIN code.
- [ ] **Have a lawyer review `src/lib/policies.ts`** (Terms, Return Policy, giveaway rules, seller/reseller terms),
      including Consumer Protection (E-Commerce) Rules 2020 and GST/TDS treatment of reseller commissions in India.
- [ ] Confirm product prices, single-unit prices, MOQs and reseller commissions in `src/lib/products.ts`.
- [ ] Replace sample marketplace listings with real seller listings once sellers are verified.
- [ ] Replace the "Example engagements" with real case studies (with client permission).
- [ ] The rate limiter is in-memory (per server instance); use Upstash Redis / Vercel KV for a strict global limit.
