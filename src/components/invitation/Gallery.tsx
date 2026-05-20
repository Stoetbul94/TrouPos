"use client";

import type { GalleryImage } from "@/types/invitation";
import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { CinematicOverlays } from "@/components/cinematic/CinematicOverlays";
import { MotionSection } from "@/components/motion/MotionSection";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Container } from "@/components/layout/Container";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { m } from "framer-motion";
import { staggerChapter, fadeUp, revealEditorial } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

const OBJECT_POSITIONS = [
  "object-center",
  "object-[center_20%]",
  "object-[center_70%]",
  "object-[30%_center]",
  "object-[70%_center]",
  "object-[center_40%]",
] as const;

function GalleryTile({
  img,
  index,
  parallaxHero,
}: {
  img: GalleryImage;
  index: number;
  parallaxHero?: boolean;
}) {
  const isHero = index === 0;
  const { enabled: parallaxEnabled } = useSectionParallax();

  const tile = (
    <m.div
      variants={isHero ? revealEditorial : fadeUp}
      className={cn(
        "relative overflow-hidden rounded-sm",
        isHero &&
          "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 xl:col-span-2 xl:row-span-2",
      )}
    >
      <OptimizedMedia
        src={img.src}
        alt={img.alt}
        aspectRatio={isHero ? "4/5" : "1/1"}
        sizes={
          isHero
            ? "(max-width: 640px) 100vw, 50vw"
            : "(max-width: 640px) 50vw, 25vw"
        }
        className={cn(
          "h-full w-full",
          OBJECT_POSITIONS[index % OBJECT_POSITIONS.length],
        )}
      />
      <CinematicOverlays preset="vignette" />
    </m.div>
  );

  if (isHero && parallaxEnabled && parallaxHero) {
    return (
      <ParallaxLayer
        offset={28}
        className="col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 xl:col-span-2 xl:row-span-2"
      >
        <m.div
          variants={revealEditorial}
          className="relative h-full overflow-hidden rounded-sm"
        >
          <OptimizedMedia
            src={img.src}
            alt={img.alt}
            aspectRatio="4/5"
            sizes="(max-width: 640px) 100vw, 50vw"
            className={cn("h-full w-full", OBJECT_POSITIONS[0])}
          />
          <CinematicOverlays preset="vignette" />
        </m.div>
      </ParallaxLayer>
    );
  }

  return tile;
}

export function Gallery({
  images,
  variant = "dark",
  showTitle = true,
  fullBleed = false,
}: {
  images: GalleryImage[];
  variant?: "dark" | "light";
  showTitle?: boolean;
  fullBleed?: boolean;
}) {
  if (!images.length) return null;

  const grid = (
    <m.div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5",
        fullBleed &&
          "px-4 sm:px-6 lg:px-[var(--page-px-lg)]",
        "sm:grid-cols-3 xl:grid-cols-4",
      )}
      variants={staggerChapter}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {images.map((img, i) => (
        <GalleryTile key={img.id} img={img} index={i} parallaxHero={fullBleed} />
      ))}
    </m.div>
  );

  if (fullBleed) {
    return (
      <>
        {showTitle && (
          <Container width="editorial">
            <MotionSection variant="revealSoft">
              <h2
                className={cn(
                  "type-section-title mb-8 text-center lg:mb-12",
                  variant === "light" ? "text-charcoal" : "text-ivory",
                )}
              >
                Moments
              </h2>
            </MotionSection>
          </Container>
        )}
        <div className="w-full max-w-[100vw] overflow-hidden">{grid}</div>
      </>
    );
  }

  return (
    <Container width="wide">
      <MotionSection variant="revealSoft">
        {showTitle && (
          <h2
            className={cn(
              "type-section-title mb-8 text-center",
              variant === "light" ? "text-charcoal" : "text-ivory",
            )}
          >
            Moments
          </h2>
        )}
        {grid}
      </MotionSection>
    </Container>
  );
}
