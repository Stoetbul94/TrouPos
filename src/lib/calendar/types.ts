export interface WeddingCalendarEvent {
  uid: string;
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  url?: string;
}

export type CalendarProvider = "google" | "apple" | "outlook";
