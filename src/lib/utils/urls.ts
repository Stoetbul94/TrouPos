import { siteConfig } from "@/config/site";

export function buildInviteUrl(slug: string): string {
  return `${siteConfig.baseUrl}/invite/${slug}`;
}

export function buildWhatsAppShareUrl(text: string, url?: string): string {
  const message = url ? `${text}\n\n${url}` : text;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function buildGoogleCalendarUrl(params: {
  title: string;
  start: string;
  end?: string;
  location?: string;
  details?: string;
}): string {
  const formatCal = (iso: string) =>
    parseISOToCal(iso);

  const dates = params.end
    ? `${formatCal(params.start)}/${formatCal(params.end)}`
    : formatCal(params.start);

  const search = new URLSearchParams({
    action: "TEMPLATE",
    text: params.title,
    dates,
    details: params.details ?? "",
    location: params.location ?? "",
  });

  return `https://calendar.google.com/calendar/render?${search.toString()}`;
}

function parseISOToCal(iso: string): string {
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "").replace("Z", "Z");
}
