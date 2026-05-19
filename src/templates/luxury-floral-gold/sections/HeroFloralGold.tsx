"use client";

import Image from "next/image";
import { m } from "framer-motion";
import type { WeddingInvitationContent } from "@/types/invitation-content";
import { CoupleNames } from "@/components/invitation/CoupleNames";
import { Countdown } from "@/components/invitation/Countdown";
import { formatWeddingDate } from "@/lib/utils/dates";
import { combineDateAndTime } from "@/lib/invitations/contentAdapter";
import { fadeUp, heroReveal, staggerContainer } from "@/lib/animations/variants";
import { FloralParticles } from "./FloralParticles";
import { useMotionReduced } from "@/components/providers/MotionProvider";

export function HeroFloralGold({ content }: { content: WeddingInvitationContent }) {
  const reduced = useMotionReduced();
  const heroImage =
    content.heroImage ??
    "https://images.unsplash.com/photo-1520854221256-17451cc791c3?w=1920&q=80";
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  return (
    <header className="relative flex min-h-dvh flex-col justify-end overflow-hidden pb-20 pt-28">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${content.brideName} and ${content.groomName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf6f0]/30 via-charcoal/40 to-[#1a1612]/90" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,color-mix(in_srgb,var(--theme-accent)_25%,transparent),transparent_55%)]"
        />
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
            className="text-xs font-medium uppercase tracking-[0.4em] text-[var(--theme-accent,#c9a962)]"
          >
            {content.welcomeMessage ?? "You are invited"}
          </m.p>
          <m.div variants={heroReveal} className="mt-6 text-ivory">
            <CoupleNames
              couple={{
                partnerOne: content.brideName,
                partnerTwo: content.groomName,
                tagline: content.tagline,
              }}
              className="[&_p]:text-ivory/75 [&_span]:text-[var(--theme-accent,#c9a962)]"
            />
          </m.div>
          <m.p
            variants={fadeUp}
            className="mt-8 text-sm uppercase tracking-[0.35em] text-champagne/90"
          >
            {formatWeddingDate(displayDate)}
            <span className="mt-1 block text-xs tracking-[0.25em] text-ivory/60">
              {content.weddingTime}
            </span>
          </m.p>
          <m.div variants={fadeUp} className="mt-10 text-ivory">
            <Countdown targetDate={content.countdownDate} />
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
        <span className="block h-10 w-px bg-gradient-to-b from-[var(--theme-accent,#c9a962)]/70 to-transparent" />
      </m.a>
    </header>
  );
}
