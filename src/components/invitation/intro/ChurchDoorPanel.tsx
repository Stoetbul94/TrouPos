"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Side = "left" | "right";

export function ChurchDoorPanel({
  side,
  panelSrc,
  trimSrc,
  className,
}: {
  side: Side;
  panelSrc: string;
  trimSrc: string;
  className?: string;
}) {
  const isLeft = side === "left";

  return (
    <m.div
      className={cn(
        "absolute top-1/2 h-[min(78vh,640px)] w-[min(44vw,200px)] -translate-y-1/2 sm:w-[min(38vw,240px)] md:w-[min(34vw,280px)]",
        isLeft ? "right-1/2 origin-right" : "left-1/2 origin-left",
        className,
      )}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      <div className="relative h-full w-full">
        <Image
          src={panelSrc}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 767px) 44vw, 280px"
          className="object-contain object-center drop-shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
          draggable={false}
        />
        <Image
          src={trimSrc}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 767px) 44vw, 280px"
          className="pointer-events-none object-contain object-center mix-blend-screen"
          draggable={false}
          aria-hidden
        />
      </div>
    </m.div>
  );
}
