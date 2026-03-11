import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { getArticles, getConcentrations } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/profil",
    "/berita",
    "/kontak",
    "/tahfidz",
    "/spmb",
  ];

  const [articles, concentrations] = await Promise.all([
    getArticles().catch(() => []),
    getConcentrations().catch(() => []),
  ]);

  const articleRoutes = articles.map((article) => `/berita/${article.slug}`);
  const concentrationRoutes = concentrations.map((item) => `/jurusan/${item.slug}`);

  return [...staticRoutes, ...articleRoutes, ...concentrationRoutes].map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
    lastModified: new Date(),
  }));
}
