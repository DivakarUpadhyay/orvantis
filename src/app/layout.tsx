import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/Reveal";
import { RevealHighlight } from "@/components/RevealHighlight";
import { locations, seoKeywords } from "@/lib/locations";
import { offices, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Custom Software, IoT & Embedded Development`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: seoKeywords,
  applicationName: site.name,
  category: "technology",
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f3f3" },
    { media: "(prefers-color-scheme: dark)", color: "#202020" },
  ],
};

// Runs before first paint: applies the saved or system theme and flags that JS is on.
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark'){d.classList.add('dark')}d.style.colorScheme=t}catch(e){}})()`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone || undefined,
  logo: `${site.url}/icon.svg`,
  foundingDate: String(site.founded),
  address: offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.street,
    addressLocality: o.city,
    addressRegion: o.region,
    postalCode: o.postalCode,
    addressCountry: o.countryCode,
  })),
  areaServed: locations.map((l) => ({ "@type": "Country", name: l.country })),
  knowsAbout: ["Custom software development", "IoT", "Embedded systems", "Firmware", "MES", "Industry 4.0", "Machine vision"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <div className="mica-bg" aria-hidden="true" />
        <div className="scroll-progress" aria-hidden="true" />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <RevealHighlight />
      </body>
    </html>
  );
}
