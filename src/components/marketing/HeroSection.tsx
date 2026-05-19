"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { siteConfig } from "@/config/site";
import { CTALink } from "./CTALink";
import { fadeUp, heroReveal, staggerContainer } from "@/lib/animations/variants";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80";

export function HeroSection() {
  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,169,98,0.12),transparent)]"
          aria-hidden
        />
        <div className="grain-overlay absolute inset-0" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <m.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-[0.4em] text-gold"
          >
            South Africa · Digital Wedding Invitations
          </m.p>
          <m.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl font-light leading-[1.1] tracking-wide text-ivory xs:text-5xl sm:text-6xl md:text-7xl"
          >
            Cinematic invitations
            <span className="mt-2 block text-ivory/90">worthy of your story</span>
          </m.h1>
          <m.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-ivory/65 sm:text-lg"
          >
            {siteConfig.description}. Share a single link on WhatsApp — guests
            RSVP in seconds on any phone.
          </m.p>
          <m.div
            variants={heroReveal}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <CTALink href="/templates">View Templates</CTALink>
            <CTALink href="#get-started" variant="secondary">
              Create Invitation
            </CTALink>
          </m.div>
        </m.div>
      </div>

      <m.a
        href="/templates"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/40 sm:flex"
        aria-label="Scroll to templates"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
      </m.a>
    </section>
  );
}
