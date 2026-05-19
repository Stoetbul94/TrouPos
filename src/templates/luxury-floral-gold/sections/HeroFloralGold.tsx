"use client";

import Image from "next/image";
import { m } from "framer-motion";
import type { Invitation } from "@/types/invitation";
import { CoupleNames } from "@/components/invitation/CoupleNames";
import { Countdown } from "@/components/invitation/Countdown";
import { formatWeddingDate } from "@/lib/utils/dates";
import { fadeUp, heroReveal, staggerContainer } from "@/lib/animations/variants";
import { FloralParticles } from "./FloralParticles";
import { useMotionReduced } from "@/components/providers/MotionProvider";

export function HeroFloralGold({ invitation }: { invitation: Invitation }) {
  const reduced = useMotionReduced();
  const heroImage =
    invitation.media.heroImage ??
    "https://images.unsplash.com/photo-1520854221256-17451cc791c3?w=1920&q=80";

  return (
    <header className="relative flex min-h-dvh flex-col justify-end overflow-hidden pb-20 pt-28">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${invitation.couple.partnerOne} and ${invitation.couple.partnerTwo}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf6f0]/30 via-charcoal/40 to-[#1a1612]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(201,169,98,0.25),transparent_55%)]" />
        <FloralParticles />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <m.div
          variants={staggerContainer}
          initial={reduced ? false : "hidden"}
          animate="visible"
        >
          <m.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-[0.4em] text-gold"
          >
            You are invited
          </m.p>
          <m.div variants={heroReveal} className="mt-6 text-ivory">
            <CoupleNames
              couple={invitation.couple}
              className="[&_p]:text-ivory/75"
            />
          </m.div>
          <m.p
            variants={fadeUp}
            className="mt-8 text-sm uppercase tracking-[0.35em] text-champagne/90"
          >
            {formatWeddingDate(invitation.weddingDate)}
          </m.p>
          <m.div variants={fadeUp} className="mt-10 text-ivory">
            <Countdown targetDate={invitation.weddingDate} />
          </m.div>
        </m.div>
      </div>

      <m.a
        href="#details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/50"
        aria-label="Scroll to wedding details"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Discover</span>
        <span className="block h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
      </m.a>
    </header>
  );
}
