import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
