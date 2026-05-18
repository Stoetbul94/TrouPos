"use client";

import type { GalleryImage } from "@/types/invitation";
import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";
import { m } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";

export function Gallery({ images }: { images: GalleryImage[] }) {
  if (!images.length) return null;

  return (
    <Container>
      <MotionSection>
        <h2 className="mb-8 text-center font-display text-3xl font-light">
          Moments
        </h2>
        <m.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {images.map((img, i) => (
            <m.div
              key={img.id}
              variants={fadeUp}
              className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
            >
              <OptimizedMedia
                src={img.src}
                alt={img.alt}
                aspectRatio={i === 0 ? "4/5" : "1/1"}
                sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "33vw"}
                className="rounded-sm"
              />
            </m.div>
          ))}
        </m.div>
      </MotionSection>
    </Container>
  );
}
