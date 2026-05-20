import type { SectionId, StoryBeat, TemplateId } from "./invitation";

/**
 * Prop-driven wedding invitation content.
 * All display data for dynamic templates — no hardcoded copy in components.
 */
export type FontStyle = "cormorant" | "inter" | "playfair";

export interface GalleryImageContent {
  src: string;
  alt: string;
  id?: string;
}

export interface BankDetails {
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
  branchCode?: string;
  reference?: string;
  title?: string;
  description?: string;
}

export interface WeddingInvitationContent {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsLink: string;
  countdownDate: string;
  welcomeMessage?: string;
  quote?: string;
  galleryImages: GalleryImageContent[];
  themeColor: string;
  fontStyle?: FontStyle;
  backgroundMusic?: string;
  rsvpLink?: string;
  bankDetails?: BankDetails;
  qrCodeImage?: string;
  /** Optional hero / OG imagery */
  heroImage?: string;
  tagline?: string;
  backgroundColor?: string;
  /** Optional love story beats (modern / classic templates) */
  story?: StoryBeat[];
  dressCode?: string;
  heroVideo?: string;
  heroPoster?: string;
  /** Optional atmospheric imagery for section backgrounds */
  atmosphere?: {
    quoteBackground?: string;
    detailsAccent?: string;
    storyAmbience?: string;
    galleryWash?: string;
    venueAmbience?: string;
  };
}

export interface InvitationMeta {
  id: string;
  slug: string;
  templateId: TemplateId;
  locale: string;
  timezone: string;
  sections: SectionId[];
}

export interface DynamicInvitationProps {
  content: WeddingInvitationContent;
  meta: InvitationMeta;
}
