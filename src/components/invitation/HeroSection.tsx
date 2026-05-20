"use client";

import Image from "next/image";
import { m } from "framer-motion";
import type { WeddingInvitationContent } from "@/types/invitation-content";
import { CinematicBackground } from "@/components/media/CinematicBackground";
import { CinematicLayer } from "@/components/cinematic/CinematicLayer";
import { CoupleNames } from "@/components/invitation/CoupleNames";
import { CountdownTimer } from "@/components/invitation/CountdownTimer";
import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { FloralParticles } from "@/components/motion/FloralParticles";
import { FloatingAccent } from "@/components/motion/FloatingAccent";
import { MotionSection } from "@/components/motion/MotionSection";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { EditorialImage } from "@/components/cinematic/EditorialImage";
import { CinematicOverlays } from "@/components/cinematic/CinematicOverlays";
import { GrainLayer } from "@/components/cinematic/GrainLayer";
import { useMotionReduced } from "@/components/providers/MotionProvider";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { formatWeddingDate } from "@/lib/utils/dates";
import { combineDateAndTime } from "@/lib/invitations/contentAdapter";
import { fadeUp, heroReveal, revealEditorial, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

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
  const { enabled: parallaxEnabled } = useSectionParallax();
  const textClass = theme === "light" ? "text-charcoal" : "text-ivory";
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  const foreground = (
    <m.div
      initial={reduced ? false : "hidden"}
      animate="visible"
      variants={heroReveal}
      className={cn("w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl", textClass)}
    >
      <CoupleNames
        couple={{
          partnerOne: content.brideName,
          partnerTwo: content.groomName,
          tagline: content.tagline ?? content.welcomeMessage,
        }}
        className="lg:text-left"
      />
      <p className="type-eyebrow mt-8 text-center lg:text-left">
        {formatWeddingDate(displayDate)}
      </p>
      <div className="mt-10 border-t border-gold/30 pt-8 lg:max-w-md">
        <CountdownTimer targetDate={content.countdownDate} theme={theme} />
      </div>
    </m.div>
  );

  return (
    <header className="relative flex min-h-dvh flex-col justify-end pb-24 pt-32 lg:min-h-[92vh] lg:pb-28">
      <CinematicBackground
        imageSrc={content.heroImage}
        posterSrc={content.heroPoster}
        videoSrc={content.heroVideo}
        alt={`${content.brideName} and ${content.groomName}`}
        overlay
        kenBurns
      />
      <GrainLayer intensity="hero" />
      <FloatingAccent count={4} />
      <Container width="wide" className="relative z-10">
        <EditorialGrid className="items-end pb-4 lg:min-h-[40vh]">
          {parallaxEnabled ? (
            <ParallaxLayer offset={24}>{foreground}</ParallaxLayer>
          ) : (
            foreground
          )}
        </EditorialGrid>
      </Container>
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
  const reduced = useMotionReduced();
  const { enabled: parallaxEnabled } = useSectionParallax();
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);
  const heroImage = content.heroImage;

  const titleBlock = (
    <m.div
      initial={reduced ? false : "hidden"}
      animate="visible"
      variants={heroReveal}
      className="text-center text-ivory lg:text-left"
    >
      <CoupleNames
        couple={{
          partnerOne: content.brideName,
          partnerTwo: content.groomName,
          tagline: content.welcomeMessage ?? content.tagline,
        }}
        className="[&_p]:text-ivory/70 [&_span]:text-[var(--theme-accent,#b8956a)]"
      />
      <p className="type-eyebrow mt-6">{formatWeddingDate(displayDate)}</p>
    </m.div>
  );

  return (
    <header className="relative scroll-mt-24">
      {heroImage && (
        <CinematicLayer
          imageSrc={heroImage}
          imageAlt={`${content.brideName} and ${content.groomName}`}
          overlay="hero"
          priority
          minHeight="min-h-[85vh] lg:min-h-[90vh]"
          imageClassName="object-cover object-[center_35%]"
          sizes="100vw"
          foregroundClassName="flex items-end pb-20 lg:pb-28"
        >
          <Container width="wide" className="w-full">
            {parallaxEnabled ? (
              <ParallaxLayer offset={20}>{titleBlock}</ParallaxLayer>
            ) : (
              titleBlock
            )}
          </Container>
        </CinematicLayer>
      )}

      <div className="border-b border-charcoal/10 bg-ivory">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-champagne/40 to-transparent lg:block"
          aria-hidden
        />
        <Container width="wide" className="relative py-16 sm:py-20 lg:py-[var(--section-py-lg)]">
          <EditorialGrid
            className="items-center gap-10 lg:gap-16"
            aside={
              heroImage ? (
                <m.div
                  initial={reduced ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={revealEditorial}
                  className="hidden lg:block lg:min-h-[50vh] lg:flex lg:items-center"
                >
                  <EditorialImage
                    src={heroImage}
                    alt={`${content.brideName} and ${content.groomName}`}
                    aspectRatio="4/5"
                    sizes="40vw"
                    variant="polaroid"
                    rotation={-1.5}
                    className="w-full max-w-md"
                  />
                </m.div>
              ) : undefined
            }
            asidePosition="right"
          >
            <MotionSection variant="revealSoft">
              {!heroImage && (
                <CoupleNames
                  couple={{
                    partnerOne: content.brideName,
                    partnerTwo: content.groomName,
                    tagline: content.welcomeMessage ?? content.tagline,
                  }}
                  className="text-charcoal [&_p]:text-charcoal/60"
                />
              )}
              {heroImage && (
                <div className="lg:hidden">
                  <EditorialImage
                    src={heroImage}
                    alt={`${content.brideName} and ${content.groomName}`}
                    aspectRatio="4/5"
                    sizes="100vw"
                    priority
                    variant="polaroid"
                    className="mb-8"
                  />
                </div>
              )}
              <p className="type-eyebrow mt-6 text-center text-gold-muted lg:text-left">
                {formatWeddingDate(displayDate)}
              </p>
              <div className="mt-8 border-t border-charcoal/10 pt-8 text-charcoal [&_p]:text-charcoal/50">
                <CountdownTimer targetDate={content.countdownDate} theme={theme} />
              </div>
            </MotionSection>
          </EditorialGrid>
        </Container>
      </div>
    </header>
  );
}

function HeroFloral({ content }: { content: WeddingInvitationContent }) {
  const reduced = useMotionReduced();
  const { enabled: parallaxEnabled } = useSectionParallax();
  const heroImage = content.heroImage ?? FLORAL_HERO_FALLBACK;
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  const foreground = (
    <m.div
      variants={staggerContainer}
      initial={reduced ? false : "hidden"}
      animate="visible"
      className="text-center"
    >
      <m.p variants={fadeUp} className="type-eyebrow text-[var(--theme-accent,#c9a962)]">
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
      <m.p variants={fadeUp} className="type-eyebrow mt-8 text-champagne/90">
        {formatWeddingDate(displayDate)}
        <span className="mt-1 block text-xs tracking-[0.25em] text-ivory/60">
          {content.weddingTime}
        </span>
      </m.p>
      <m.div variants={fadeUp} className="mt-10 border-t border-gold/25 pt-8 text-ivory">
        <CountdownTimer targetDate={content.countdownDate} theme="dark" />
      </m.div>
    </m.div>
  );

  return (
    <header className="relative flex min-h-dvh flex-col justify-end overflow-hidden pb-20 pt-28 lg:min-h-[92vh]">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,color-mix(in_srgb,var(--theme-accent)_25%,transparent),transparent_55%)]" />
        <CinematicOverlays preset="hero" />
        <GrainLayer intensity="hero" />
        <FloralParticles />
      </div>

      <Container width="editorial" className="relative z-10">
        {parallaxEnabled ? (
          <ParallaxLayer offset={24}>{foreground}</ParallaxLayer>
        ) : (
          foreground
        )}
      </Container>

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
