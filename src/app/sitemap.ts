import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/work/${project.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
