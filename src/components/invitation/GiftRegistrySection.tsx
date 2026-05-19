"use client";

import type { GiftRegistry } from "@/types/invitation";
import type { WeddingInvitationContent } from "@/types/invitation-content";
import { GiftDonationSection } from "@/components/invitation/gift/GiftDonationSection";

/** @deprecated Use GiftDonationSection from @/components/invitation/gift */
export function GiftRegistrySection({
  gift,
  content,
  variant = "dark",
  className,
  message,
  qrCodeImage,
}: {
  gift?: GiftRegistry;
  content?: WeddingInvitationContent;
  variant?: "dark" | "light";
  className?: string;
  message?: string;
  qrCodeImage?: string;
}) {
  return (
    <GiftDonationSection
      gift={gift}
      content={content}
      variant={variant}
      className={className}
      message={message}
      qrCodeImage={qrCodeImage}
    />
  );
}
