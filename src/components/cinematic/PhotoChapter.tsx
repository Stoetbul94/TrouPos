"use client";

import { CinematicLayer } from "./CinematicLayer";
import { cn } from "@/lib/utils/cn";

export function PhotoChapter({
  imageSrc,
  imageAlt = "",
  className,
  minHeight = "min-h-[50vh] lg:min-h-[60vh]",
  children,
}: {
  imageSrc: string;
  imageAlt?: string;
  className?: string;
  minHeight?: string;
  children?: React.ReactNode;
}) {
  return (
    <CinematicLayer
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      overlay="quote"
      minHeight={minHeight}
      imageClassName="object-cover object-center"
      sizes="100vw"
      quality={70}
      className={cn("scrim-strong", className)}
      foregroundClassName="flex items-end justify-center pb-12 lg:pb-16"
    >
      {children}
    </CinematicLayer>
  );
}
