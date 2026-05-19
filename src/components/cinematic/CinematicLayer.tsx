"use client";

import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { useLiteEffects } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";
import {
  CinematicOverlays,
  type OverlayPreset,
} from "./CinematicOverlays";

export function CinematicLayer({
  imageSrc,
  imageAlt = "",
  overlay = "none",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality = 70,
  className,
  imageClassName,
  children,
  minHeight = "min-h-[50vh]",
}: {
  imageSrc?: string;
  imageAlt?: string;
  overlay?: OverlayPreset;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
  minHeight?: string;
}) {
  const lite = useLiteEffects();

  return (
    <section
      className={cn("relative isolate overflow-hidden", minHeight, className)}
    >
      {imageSrc && (
        <div
          className={cn(
            "absolute inset-0 z-0",
            !lite && "scale-105",
          )}
          aria-hidden
        >
          <OptimizedMedia
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            sizes={sizes}
            quality={quality}
            className={cn("h-full w-full", imageClassName)}
          />
        </div>
      )}
      {overlay !== "none" && <CinematicOverlays preset={overlay} />}
      {children && <div className="relative z-10">{children}</div>}
    </section>
  );
}
