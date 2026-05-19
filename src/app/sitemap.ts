import type { MetadataRoute } from "next";
import { env } from "@/config/env";
import { getAllInvitationSlugs } from "@/lib/invitations/getInvitation";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/templates`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  if (!env.allowInviteIndexing) {
    return staticRoutes;
  }

  const inviteRoutes: MetadataRoute.Sitemap = getAllInvitationSlugs().map(
    (slug) => ({
      url: `${base}/invite/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...inviteRoutes];
}
