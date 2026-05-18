"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";
import { useMotionReduced } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils/cn";

export function MotionSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useMotionReduced();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeUp}
    >
      {children}
    </m.div>
  );
}
