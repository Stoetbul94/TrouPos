import { getSiteUrl } from "@/config/env";

export function buildInviteUrl(slug: string): string {
  return `${getSiteUrl()}/invite/${slug}`;
}

export function buildWhatsAppShareUrl(text: string, url?: string): string {
  const message = url ? `${text}\n\n${url}` : text;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
