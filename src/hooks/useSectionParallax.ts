"use client";

import { useLiteEffects, useMotionReduced } from "@/components/providers/MotionProvider";

/** Whether scroll-linked parallax is allowed for this section */
export function useSectionParallax(): { enabled: boolean; offset: number } {
  const reduced = useMotionReduced();
  const lite = useLiteEffects();
  const enabled = !reduced && !lite;
  return { enabled, offset: enabled ? 24 : 0 };
}
