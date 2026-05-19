import type { WeddingCalendarEvent } from "./types";

function toOutlookIso(date: Date): string {
  return date.toISOString();
}

function toGoogleCal(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export function buildGoogleCalendarUrl(event: WeddingCalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toGoogleCal(event.start)}/${toGoogleCal(event.end)}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildOutlookCalendarUrl(
  event: WeddingCalendarEvent,
  host: "live" | "office" = "live",
): string {
  const base =
    host === "office"
      ? "https://outlook.office.com/calendar/0/deeplink/compose"
      : "https://outlook.live.com/calendar/0/deeplink/compose";

  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: toOutlookIso(event.start),
    enddt: toOutlookIso(event.end),
  });

  return `${base}?${params.toString()}`;
}
