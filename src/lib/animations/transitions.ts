import type { Transition } from "framer-motion";
import { motionDurations, motionEasings } from "@/lib/constants/motion";

export const luxuryTween: Transition = {
  duration: motionDurations.base,
  ease: motionEasings.luxury,
};

export const cinematicTween: Transition = {
  duration: motionDurations.cinematic,
  ease: motionEasings.entrance,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.8,
};

export const pageTransition: Transition = {
  duration: motionDurations.fast,
  ease: motionEasings.exit,
};
