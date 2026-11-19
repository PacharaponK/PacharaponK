import type { MetadataRoute } from "next";
import { projects } from "@/data/work";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  return ["/", "/projects", ...projects.map(({ id }) => `/projects/${id}`)].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
