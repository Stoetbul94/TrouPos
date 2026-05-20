"use client";

import { AmbientSection } from "@/components/cinematic/AmbientSection";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

export function DressCode({
  dressCode,
  variant = "dark",
}: {
  dressCode: string;
  variant?: "dark" | "light";
}) {
  return (
    <AmbientSection
      variant={variant === "light" ? "light" : "elevated"}
      containerWidth="editorial"
      className="!py-12 lg:!py-16"
    >
      <Container width="narrow" className="text-center">
        <MotionSection variant="revealSoft">
          <p className="type-eyebrow">Dress Code</p>
          <p
            className={cn(
              "type-pull-quote mt-6 max-w-xl mx-auto",
              variant === "light" ? "text-charcoal/85" : "text-ivory/90",
            )}
          >
            {dressCode}
          </p>
        </MotionSection>
      </Container>
    </AmbientSection>
  );
}
