import type { MetadataRoute } from "next";
import { PRODUCTS, SOLUTIONS } from "@/content/products";
import { listPublished } from "@/lib/articlesServer";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/products", "/solutions", "/resources", "/about", "/industries", "/clients", "/contact"]
    .map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 }));
  const products = PRODUCTS.map((p) => ({ url: `${BASE}/products/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 }));
  const solutions = SOLUTIONS.map((s) => ({ url: `${BASE}/solutions/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 }));
  const articles = (await listPublished()).map((a) => ({ url: `${BASE}/resources/${a.slug}`, changeFrequency: "weekly" as const, priority: 0.6 }));
  return [...staticPages, ...products, ...solutions, ...articles];
}
