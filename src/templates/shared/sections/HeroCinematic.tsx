"use client";

import { m } from "framer-motion";
import type { Invitation } from "@/types/invitation";
import { CinematicBackground } from "@/components/media/CinematicBackground";
import { CoupleNames } from "@/components/invitation/CoupleNames";
import { Countdown } from "@/components/invitation/Countdown";
import { formatWeddingDate } from "@/lib/utils/dates";
import { heroReveal } from "@/lib/animations/variants";
import { useMotionReduced } from "@/components/providers/MotionProvider";

export function HeroCinematic({
  invitation,
  variant = "dark",
}: {
  invitation: Invitation;
  variant?: "dark" | "light";
}) {
  const reduced = useMotionReduced();
  const textClass = variant === "light" ? "text-charcoal" : "text-ivory";

  return (
    <header className="relative flex min-h-dvh flex-col justify-end pb-24 pt-32">
      <CinematicBackground
        imageSrc={invitation.media.heroImage}
        posterSrc={invitation.media.heroPoster}
        videoSrc={invitation.media.heroVideo}
        alt={`${invitation.couple.partnerOne} and ${invitation.couple.partnerTwo}`}
      />
      <div className="grain-overlay relative z-10 px-5 sm:px-8">
        <m.div
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={heroReveal}
          className={textClass}
        >
          <CoupleNames couple={invitation.couple} />
          <p className="mt-8 text-center text-sm uppercase tracking-[0.35em] text-gold">
            {formatWeddingDate(invitation.weddingDate)}
          </p>
          <div className="mt-10">
            <Countdown targetDate={invitation.weddingDate} />
          </div>
        </m.div>
      </div>
    </header>
  );
}
