import type { WeddingCalendarEvent } from "./types";

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function formatIcsUtc(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

/** RFC 5545 .ics document — opens in Apple Calendar, Outlook desktop, etc. */
export function buildIcsFile(event: WeddingCalendarEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TrouPos//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${escapeIcsText(event.uid)}`,
    `DTSTAMP:${formatIcsUtc(new Date())}`,
    `DTSTART:${formatIcsUtc(event.start)}`,
    `DTEND:${formatIcsUtc(event.end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
  ];

  if (event.url) {
    lines.push(`URL:${escapeIcsText(event.url)}`);
  }

  lines.push("END:VEVENT", "END:VCALENDAR");

  return `${lines.join("\r\n")}\r\n`;
}

export function downloadIcsFile(event: WeddingCalendarEvent, filename = "wedding.ics"): void {
  if (typeof window === "undefined") return;

  const blob = new Blob([buildIcsFile(event)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
