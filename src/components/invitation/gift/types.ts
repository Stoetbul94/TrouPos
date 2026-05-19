import type { BankDetails } from "@/types/invitation-content";
import type { GiftRegistry } from "@/types/invitation";
import type { WeddingInvitationContent } from "@/types/invitation-content";

export type GiftSectionVariant = "dark" | "light";

export interface GiftDonationSectionProps {
  variant?: GiftSectionVariant;
  className?: string;
  /** Override heading (defaults to bankDetails.title or gift.title) */
  title?: string;
  /** Optional donation / thank-you message */
  message?: string;
  qrCodeImage?: string;
  qrCaption?: string;
  bankDetails?: BankDetails;
  /** Legacy gift registry shape */
  gift?: GiftRegistry;
  content?: WeddingInvitationContent;
}
