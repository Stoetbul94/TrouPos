/**
 * Centralized environment variables for local dev and Vercel.
 * Only NEXT_PUBLIC_* vars are available in the browser.
 */

function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/** Canonical site URL (OG tags, sitemap, calendar invite links). */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return trimTrailingSlash(process.env.NEXT_PUBLIC_BASE_URL);
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const env = {
  siteUrl: getSiteUrl(),
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "Trou",
  /** When false, /invite/* pages get noindex (recommended for private weddings). */
  allowInviteIndexing:
    process.env.NEXT_PUBLIC_ALLOW_INVITE_INDEXING === "true",
  isProduction: process.env.NODE_ENV === "production",
  isVercel: Boolean(process.env.VERCEL),
} as const;
