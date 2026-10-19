import type { MetadataRoute } from "next";
import { demos } from "@/lib/demos";
import { locations } from "@/lib/locations";
import { productCategories, products } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";
import { categories, services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-19");
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9, "weekly"),
    page("/contact", 0.9),
    page("/locations", 0.8),
    page("/industries", 0.8),
    page("/process", 0.6),
    page("/about", 0.6),
    page("/products", 0.9, "weekly"),
    page("/demos", 0.8),
    page("/partners", 0.8),
    page("/careers", 0.5),
    page("/marketplace", 0.8),
    page("/donate", 0.7),
    page("/terms", 0.3, "yearly"),
    page("/returns", 0.3, "yearly"),
    page("/privacy", 0.2, "yearly"),
    ...Object.values(productCategories).map((c) => page(`/products/category/${c.slug}`, 0.8)),
    ...products.map((p) => page(`/products/${p.slug}`, 0.7)),
    ...demos.map((d) => page(`/demos/${d.slug}`, 0.6)),
    ...Object.values(categories).map((c) => page(`/services/category/${c.slug}`, 0.85)),
    ...services.map((s) => page(`/services/${s.slug}`, 0.8)),
    ...locations.map((l) => page(`/locations/${l.slug}`, 0.8)),
  ];
}
