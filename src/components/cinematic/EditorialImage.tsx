"use client";

import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { cn } from "@/lib/utils/cn";

export function EditorialImage({
  src,
  alt,
  aspectRatio = "4/5",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality = 75,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm shadow-xl shadow-black/20",
        className,
      )}
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
      <div className="cinematic-vignette pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}
