"use client";

import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { cn } from "@/lib/utils/cn";
import { CinematicOverlays } from "./CinematicOverlays";

export type EditorialImageVariant = "framed" | "flush" | "polaroid";

export function EditorialImage({
  src,
  alt,
  aspectRatio = "4/5",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality = 75,
  className,
  imageClassName,
  variant = "framed",
  rotation = 0,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  className?: string;
  imageClassName?: string;
  variant?: EditorialImageVariant;
  rotation?: number;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variant === "framed" && "rounded-sm photo-shadow-editorial",
        variant === "polaroid" &&
          "border-[10px] border-white/90 bg-white/95 p-2 photo-shadow-polaroid",
        variant === "flush" && "rounded-none shadow-none",
        className,
      )}
      style={rotation ? { transform: `rotate(${rotation}deg)` } : undefined}
    >
      <OptimizedMedia
        src={src}
        alt={alt}
        aspectRatio={aspectRatio}
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={imageClassName}
      />
      <CinematicOverlays preset="vignette" />
    </div>
  );
}
