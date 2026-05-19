"use client";

import { CinematicOverlays } from "@/components/cinematic/CinematicOverlays";
import { OptimizedMedia } from "./OptimizedMedia";
import { useLiteEffects, useMotionReduced } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";

export function CinematicBackground({
  imageSrc,
  posterSrc,
  videoSrc,
  alt = "",
  className,
  overlay = true,
  kenBurns = false,
}: {
  imageSrc?: string;
  posterSrc?: string;
  videoSrc?: string;
  alt?: string;
  className?: string;
  overlay?: boolean;
  kenBurns?: boolean;
}) {
  const reduced = useMotionReduced();
  const lite = useLiteEffects();
  const showVideo = videoSrc && !reduced && !lite;
  const animateImage = kenBurns && !reduced && !lite;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {showVideo ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc ?? imageSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : imageSrc ? (
        <div
          className={cn(
            "absolute inset-0",
            animateImage && "ken-burns",
          )}
        >
          <OptimizedMedia
            src={imageSrc}
            alt={alt}
            fill
            priority
            sizes="100vw"
            quality={lite ? 65 : 75}
            className={cn(
              "h-full w-full object-cover object-[center_30%]",
            )}
          />
        </div>
      ) : (
        <div className="h-full w-full bg-gradient-to-b from-charcoal via-charcoal/90 to-black" />
      )}
      {overlay && <CinematicOverlays preset="hero" />}
      <div className="grain-overlay absolute inset-0 z-[2]" aria-hidden />
    </div>
  );
}
