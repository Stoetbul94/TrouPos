import type { MetadataRoute } from "next";
import { env } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  const base = env.siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: env.allowInviteIndexing
          ? ["/demo/"]
          : ["/demo/", "/invite/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
