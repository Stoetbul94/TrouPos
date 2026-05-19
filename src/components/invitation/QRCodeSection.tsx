import Image from "next/image";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";

export function QRCodeSection({
  qrCodeImage,
  caption = "Scan to view our invitation",
}: {
  qrCodeImage: string;
  caption?: string;
}) {
  return (
    <Container narrow>
      <MotionSection className="flex flex-col items-center text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-muted">
          {caption}
        </p>
        <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-gold/20 bg-white p-3 shadow-lg">
          <Image
            src={qrCodeImage}
            alt="Invitation QR code"
            fill
            className="object-contain p-2"
            sizes="160px"
          />
        </div>
      </MotionSection>
    </Container>
  );
}
