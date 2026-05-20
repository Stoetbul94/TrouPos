import type { Variants } from "framer-motion";
import { motionDurations } from "@/lib/constants/motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.base, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionDurations.slow },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const heroReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionDurations.cinematic, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motionDurations.base },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionDurations.fast },
  },
};

export const revealSoft: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.base, ease: [0.22, 1, 0.36, 1] },
  },
};

export const revealEditorial: Variants = {
  hidden: { opacity: 0, y: 24, scale: 1.02 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: motionDurations.cinematic, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerChapter: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

export const lineReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: motionDurations.slow, ease: [0.22, 1, 0.36, 1] },
  },
};

export type MotionRevealVariant = "fadeUp" | "revealSoft" | "revealEditorial";

const revealVariants: Record<MotionRevealVariant, Variants> = {
  fadeUp,
  revealSoft,
  revealEditorial,
};

export function getRevealVariant(name: MotionRevealVariant): Variants {
  return revealVariants[name];
}
