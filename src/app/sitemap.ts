import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const marketingRoutes = [
  "/",
  "/pricing",
  "/blog",
  "/docs",
  "/docs/quickstart",
  "/docs/installation",
  "/docs/deployment",
  "/docs/database",
  "/docs/authentication",
  "/docs/billing",
  "/docs/ai",
  "/docs/admin",
  "/docs/api",
  "/docs/blog",
  "/api-docs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return marketingRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/pricing" || route === "/docs" ? 0.8 : 0.6,
  }));
}
