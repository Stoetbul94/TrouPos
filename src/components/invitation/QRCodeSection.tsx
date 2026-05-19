import { GiftDonationSection } from "@/components/invitation/gift/GiftDonationSection";

/** @deprecated QR is included in GiftDonationSection; use that or pass qrCodeImage prop */
export function QRCodeSection({
  qrCodeImage,
  caption = "Scan to view our invitation",
  variant = "light",
}: {
  qrCodeImage: string;
  caption?: string;
  variant?: "dark" | "light";
}) {
  return (
    <GiftDonationSection
      qrCodeImage={qrCodeImage}
      qrCaption={caption}
      variant={variant}
      title="Quick link"
      message="Scan to open our digital invitation."
    />
  );
}
