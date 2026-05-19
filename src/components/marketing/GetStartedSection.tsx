"use client";

import { m } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { CTALink } from "./CTALink";
import { fadeUp } from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";

export function GetStartedSection() {
  return (
    <section
      id="get-started"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <m.div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-gold/20 px-6 py-16 text-center sm:px-12 sm:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeUp}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/15 via-transparent to-charcoal"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Begin your invitation
          </p>
          <h2 className="mt-4 font-display text-3xl font-light sm:text-4xl md:text-5xl">
            Ready to create something unforgettable?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-ivory/60 sm:text-base">
            Choose a template, preview it live, and share with guests — no
            backend setup required to explore.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <CTALink href="/demo/modern-cinematic">Create Invitation</CTALink>
            <CTALink href="/templates" variant="secondary">
              View Templates
            </CTALink>
          </div>
        </div>
      </m.div>
    </section>
  );
}
