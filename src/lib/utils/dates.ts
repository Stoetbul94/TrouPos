import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";
import { enZA } from "date-fns/locale";

const LOCALE = enZA;

export function parseInvitationDate(iso: string): Date {
  const date = parseISO(iso);
  if (!isValid(date)) {
    throw new Error(`Invalid date: ${iso}`);
  }
  return date;
}

export function formatWeddingDate(iso: string, pattern = "EEEE, d MMMM yyyy") {
  return format(parseInvitationDate(iso), pattern, { locale: LOCALE });
}

export function formatEventTime(iso: string, pattern = "h:mm a") {
  return format(parseInvitationDate(iso), pattern, { locale: LOCALE });
}

export function formatRelativeToNow(iso: string) {
  return formatDistanceToNow(parseInvitationDate(iso), {
    addSuffix: true,
    locale: LOCALE,
  });
}
