import type { MetadataRoute } from "next";
import { services as defaultServices } from "@/data/services";
import { getPostSlugs, getServices } from "@/lib/cms/fetch";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, postSlugs] = await Promise.all([
    getServices().catch(() => defaultServices),
    getPostSlugs().catch(() => [] as string[]),
  ]);

  const serviceUrls = services.map((service) => ({
    url: `${SITE_URL}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postUrls = postSlugs.map((slug) => ({
    url: `${SITE_URL}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/service-areas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...serviceUrls,
    ...postUrls,
  ];
}
