"use client";

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
}: {
  imageSrc?: string;
  posterSrc?: string;
  videoSrc?: string;
  alt?: string;
  className?: string;
  overlay?: boolean;
}) {
  const reduced = useMotionReduced();
  const lite = useLiteEffects();
  const showVideo = videoSrc && !reduced && !lite;

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
        <OptimizedMedia
          src={imageSrc}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={lite ? 65 : 75}
          className="h-full w-full"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-b from-charcoal via-charcoal/90 to-black" />
      )}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70"
          aria-hidden
        />
      )}
    </div>
  );
}
