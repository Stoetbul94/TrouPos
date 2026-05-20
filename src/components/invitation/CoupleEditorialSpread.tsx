"use client";

import type { CoupleSpreadContent } from "@/types/invitation-content";
import { EditorialImage } from "@/components/cinematic/EditorialImage";
import { BleedContainer } from "@/components/layout/BleedContainer";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/motion/MotionSection";
import { cn } from "@/lib/utils/cn";

export function CoupleEditorialSpread({
  spread,
  variant = "dark",
}: {
  spread: CoupleSpreadContent;
  variant?: "dark" | "light";
}) {
  return (
    <section className="scroll-mt-24 py-[var(--section-py)] lg:py-[var(--section-py-lg)]">
      <BleedContainer className="lg:px-0">
        <MotionSection variant="revealEditorial">
          <div className="relative mx-auto max-w-5xl lg:max-w-6xl">
            <EditorialImage
              src={spread.image}
              alt={spread.imageAlt ?? "The couple"}
              aspectRatio="21/9"
              sizes="100vw"
              variant="flush"
              className="max-h-[50vh] lg:max-h-[55vh]"
            />
          </div>
        </MotionSection>
      </BleedContainer>
      {spread.line && (
        <Container width="editorial" className="mt-10 lg:mt-14">
          <MotionSection variant="revealSoft">
            <p
              className={cn(
                "type-pull-quote max-w-2xl text-center lg:mx-auto",
                variant === "light" ? "text-charcoal/75" : "text-ivory/75",
              )}
            >
              {spread.line}
            </p>
          </MotionSection>
        </Container>
      )}
    </section>
  );
}
