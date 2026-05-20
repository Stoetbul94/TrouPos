"use client";

import type { GalleryImage } from "@/types/invitation";
import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { CinematicOverlays } from "@/components/cinematic/CinematicOverlays";
import { BleedContainer } from "@/components/layout/BleedContainer";
import { useLiteEffects } from "@/components/providers/MotionProvider";
import { m } from "framer-motion";
import { staggerChapter, fadeUp, revealEditorial } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

const DEFAULT_ROTATIONS = [-2, 3, -1.5, 2, -2.5, 1];

function PolaroidFrame({
  img,
  index,
  lite,
  variant = "dark",
  className,
}: {
  img: GalleryImage;
  index: number;
  lite: boolean;
  variant?: "dark" | "light";
  className?: string;
}) {
  const rotation = lite ? 0 : (img.rotation ?? DEFAULT_ROTATIONS[index % DEFAULT_ROTATIONS.length]);
  const isHero = img.layout === "hero" || index === 0;

  return (
    <m.figure
      variants={isHero ? revealEditorial : fadeUp}
      className={cn(
        "scrapbook-stack relative mx-auto w-full max-w-sm",
        !lite && "photo-shadow-polaroid",
        className,
      )}
      style={{
        transform: lite ? undefined : `rotate(${rotation}deg)`,
        zIndex: img.zIndex ?? (isHero ? 10 : index + 1),
      }}
    >
      <div
        className={cn(
          "overflow-hidden bg-white/95 p-2 pb-10 sm:p-3 sm:pb-12",
          isHero ? "border-[10px] border-white/90" : "border-[8px] border-white/90",
        )}
      >
        <OptimizedMedia
          src={img.src}
          alt={img.alt}
          aspectRatio={isHero ? "4/5" : "1/1"}
          sizes={
            isHero
              ? "(max-width: 640px) 90vw, 480px"
              : "(max-width: 640px) 45vw, 280px"
          }
          className="object-cover"
        />
        <CinematicOverlays preset="vignette" />
      </div>
      {img.caption && (
        <figcaption
          className={cn(
            "mt-3 text-center font-display text-sm italic",
            variant === "light" ? "text-charcoal/55" : "text-ivory/70",
          )}
        >
          {img.caption}
        </figcaption>
      )}
    </m.figure>
  );
}

export function ScrapbookGallery({
  images,
  variant = "dark",
}: {
  images: GalleryImage[];
  variant?: "dark" | "light";
}) {
  const lite = useLiteEffects();
  if (!images.length) return null;

  const hero = images.find((i) => i.layout === "hero") ?? images[0];
  const rest = images.filter((i) => i.id !== hero.id);

  if (lite) {
    return (
      <BleedContainer insetX>
        <m.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          variants={staggerChapter}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {images.map((img, i) => (
            <PolaroidFrame key={img.id} img={img} index={i} lite variant={variant} className="max-w-none" />
          ))}
        </m.div>
      </BleedContainer>
    );
  }

  const captionClass =
    variant === "light" ? "text-charcoal/55" : "text-ivory/60";

  return (
    <BleedContainer>
      <m.div
        className="relative mx-auto max-w-6xl px-4 py-4 sm:px-8 lg:px-12 lg:py-8"
        variants={staggerChapter}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-6 lg:col-start-1">
            <PolaroidFrame img={hero} index={0} lite={false} variant={variant} className="lg:-ml-4" />
          </div>
          <div className="relative flex flex-col gap-6 sm:gap-8 lg:col-span-5 lg:col-start-8 lg:pt-16">
            {rest.slice(0, 4).map((img, i) => (
              <PolaroidFrame
                key={img.id}
                img={img}
                index={i + 1}
                lite={false}
                variant={variant}
                className={cn(
                  i % 2 === 0 ? "lg:-mr-6 lg:ml-auto" : "lg:-ml-8",
                  i > 0 && "-mt-4 sm:-mt-8",
                )}
              />
            ))}
          </div>
        </div>
        {rest.length > 4 && (
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:mt-16">
            {rest.slice(4).map((img, i) => (
              <PolaroidFrame key={img.id} img={img} index={i + 5} lite={false} variant={variant} />
            ))}
          </div>
        )}
        <p className={cn("mt-8 text-center text-caption-fluid", captionClass)} aria-hidden>
          &nbsp;
        </p>
      </m.div>
    </BleedContainer>
  );
}
