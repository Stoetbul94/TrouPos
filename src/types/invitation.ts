export type TemplateId =
  | "modern-cinematic"
  | "classic-elegance"
  | "luxury-floral-gold";

export type SectionId =
  | "hero"
  | "story"
  | "events"
  | "gallery"
  | "dressCode"
  | "venue"
  | "rsvp"
  | "gift";

export interface GiftRegistry {
  title: string;
  description: string;
  accountHolder?: string;
  bankName?: string;
  accountNumber?: string;
  branchCode?: string;
  reference?: string;
  externalUrl?: string;
}

export interface Couple {
  partnerOne: string;
  partnerTwo: string;
  tagline?: string;
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  province?: string;
  mapUrl?: string;
  coordinates?: { lat: number; lng: number };
}

export interface WeddingEvent {
  id: string;
  title: string;
  description?: string;
  startsAt: string;
  endsAt?: string;
  venue: Venue;
  dressCode?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface StoryBeat {
  id: string;
  year?: string;
  title: string;
  body: string;
}

export interface InvitationMedia {
  heroImage?: string;
  heroVideo?: string;
  heroPoster?: string;
  ogImage?: string;
  gallery?: GalleryImage[];
}

export interface InvitationTheme {
  accentColor?: string;
  backgroundColor?: string;
  fontDisplay?: string;
}

export interface Invitation {
  id: string;
  slug: string;
  templateId: TemplateId;
  /** Prop-driven content — source of truth for dynamic templates */
  content?: import("./invitation-content").WeddingInvitationContent;
  couple: Couple;
  weddingDate: string;
  timezone: string;
  events: WeddingEvent[];
  story?: StoryBeat[];
  dressCode?: string;
  media: InvitationMedia;
  theme?: InvitationTheme;
  sections: SectionId[];
  rsvpDeadline?: string;
  gift?: GiftRegistry;
  locale: string;
}
