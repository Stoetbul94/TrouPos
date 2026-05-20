"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import {
  getRevealVariant,
  type MotionRevealVariant,
} from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";
import { useLiteEffects, useMotionReduced } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";

export function MotionSection({
  children,
  className,
  variant = "fadeUp",
}: {
  children: ReactNode;
  className?: string;
  variant?: MotionRevealVariant;
}) {
  const reduced = useMotionReduced();
  const lite = useLiteEffects();

  if (reduced || lite) {
    return <div className={className}>{children}</div>;
  }

  const motionVariant = getRevealVariant(variant);

  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={motionVariant}
    >
      {children}
    </m.div>
  );
}
