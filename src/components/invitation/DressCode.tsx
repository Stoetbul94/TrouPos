import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";

export function DressCode({ dressCode }: { dressCode: string }) {
  return (
    <Container narrow>
      <MotionSection className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Dress Code</p>
        <p className="mt-4 font-display text-xl leading-relaxed sm:text-2xl">
          {dressCode}
        </p>
      </MotionSection>
    </Container>
  );
}
