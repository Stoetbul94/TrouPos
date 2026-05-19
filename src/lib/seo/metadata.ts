import type { Metadata } from "next";
import { env } from "@/config/env";
import { siteConfig } from "@/config/site";

const defaultOgImage = "/opengraph-image";

export const rootMetadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${siteConfig.name} · Luxury Digital Wedding Invitations`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "wedding invitation",
    "digital wedding invite",
    "South Africa wedding",
    "online RSVP",
    "luxury wedding website",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: env.siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · Luxury Digital Wedding Invitations`,
    description: siteConfig.description,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · Luxury Digital Wedding Invitations`,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: env.siteUrl,
  },
};

export function demoRobots(): Metadata["robots"] {
  return { index: false, follow: false };
}

export function inviteRobots(): Metadata["robots"] {
  if (env.allowInviteIndexing) {
    return { index: true, follow: true };
  }
  return { index: false, follow: false, nocache: true };
}
