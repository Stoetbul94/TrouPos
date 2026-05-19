"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";
import { useMotionReduced } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";

export function FloralSectionReveal({
  children,
  className,
  stagger,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const reduced = useMotionReduced();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={cn(className)}
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {children}
    </m.div>
  );
}
