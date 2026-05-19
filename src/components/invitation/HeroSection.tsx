"use client";

import Image from "next/image";
import { m } from "framer-motion";
import type { WeddingInvitationContent } from "@/types/invitation-content";
import { CinematicBackground } from "@/components/media/CinematicBackground";
import { CoupleNames } from "@/components/invitation/CoupleNames";
import { CountdownTimer } from "@/components/invitation/CountdownTimer";
import { Container } from "@/components/layout/Container";
import { FloralParticles } from "@/components/motion/FloralParticles";
import { MotionSection } from "@/components/motion/MotionSection";
import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { formatWeddingDate } from "@/lib/utils/dates";
import { combineDateAndTime } from "@/lib/invitations/contentAdapter";
import { fadeUp, heroReveal, staggerContainer } from "@/lib/animations/variants";
import { useMotionReduced } from "@/components/providers/MotionProvider";
export type HeroSectionVariant = "cinematic" | "classic" | "floral";

const FLORAL_HERO_FALLBACK =
  "https://images.unsplash.com/photo-1520854221256-17451cc791c3?w=1920&q=80";

export function HeroSection({
  content,
  variant,
  theme = "dark",
}: {
  content: WeddingInvitationContent;
  variant: HeroSectionVariant;
  theme?: "dark" | "light";
}) {
  if (variant === "classic") {
    return <HeroClassic content={content} theme={theme} />;
  }
  if (variant === "floral") {
    return <HeroFloral content={content} />;
  }
  return <HeroCinematic content={content} theme={theme} />;
}

function HeroCinematic({
  content,
  theme,
}: {
  content: WeddingInvitationContent;
  theme: "dark" | "light";
}) {
  const reduced = useMotionReduced();
  const textClass = theme === "light" ? "text-charcoal" : "text-ivory";
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  return (
    <header className="relative flex min-h-dvh flex-col justify-end pb-24 pt-32">
      <CinematicBackground
        imageSrc={content.heroImage}
        posterSrc={content.heroPoster}
        videoSrc={content.heroVideo}
        alt={`${content.brideName} and ${content.groomName}`}
      />
      <div className="grain-overlay relative z-10 px-5 sm:px-8">
        <m.div
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={heroReveal}
          className={textClass}
        >
          <CoupleNames
            couple={{
              partnerOne: content.brideName,
              partnerTwo: content.groomName,
              tagline: content.tagline ?? content.welcomeMessage,
            }}
          />
          <p className="mt-8 text-center text-sm uppercase tracking-[0.35em] text-gold">
            {formatWeddingDate(displayDate)}
          </p>
          <div className="mt-10">
            <CountdownTimer targetDate={content.countdownDate} theme={theme} />
          </div>
        </m.div>
      </div>
    </header>
  );
}

function HeroClassic({
  content,
  theme,
}: {
  content: WeddingInvitationContent;
  theme: "dark" | "light";
}) {
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  return (
    <header className="scroll-mt-24 border-b border-charcoal/10 bg-ivory">
      <Container className="py-16 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <MotionSection>
            <CoupleNames
              couple={{
                partnerOne: content.brideName,
                partnerTwo: content.groomName,
                tagline: content.welcomeMessage ?? content.tagline,
              }}
              className="text-charcoal [&_p]:text-charcoal/60 [&_span]:text-[var(--theme-accent,#b8956a)]"
            />
            <p className="mt-6 text-center text-xs uppercase tracking-[0.35em] text-gold-muted md:text-left">
              {formatWeddingDate(displayDate)}
            </p>
            <div className="mt-8 text-charcoal [&_p]:text-charcoal/50">
              <CountdownTimer targetDate={content.countdownDate} theme={theme} />
            </div>
          </MotionSection>
          {content.heroImage && (
            <OptimizedMedia
              src={content.heroImage}
              alt={`${content.brideName} and ${content.groomName}`}
              aspectRatio="4/5"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="rounded-sm shadow-xl"
            />
          )}
        </div>
      </Container>
    </header>
  );
}

function HeroFloral({ content }: { content: WeddingInvitationContent }) {
  const reduced = useMotionReduced();
  const heroImage = content.heroImage ?? FLORAL_HERO_FALLBACK;
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  return (
    <header className="relative flex min-h-dvh flex-col justify-end overflow-hidden pb-20 pt-28">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${content.brideName} and ${content.groomName}`}
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          decoding="async"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf6f0]/30 via-charcoal/40 to-[#1a1612]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,color-mix(in_srgb,var(--theme-accent)_25%,transparent),transparent_55%)]" />
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
            <CountdownTimer targetDate={content.countdownDate} theme="dark" />
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
