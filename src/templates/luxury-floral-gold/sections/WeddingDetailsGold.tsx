"use client";

import { m } from "framer-motion";
import type { WeddingInvitationContent } from "@/types/invitation-content";
import { formatWeddingDate } from "@/lib/utils/dates";
import { combineDateAndTime } from "@/lib/invitations/contentAdapter";
import { AddToCalendarButton } from "@/components/invitation/AddToCalendarButton";
import { Container } from "@/components/layout/Container";
import { FloralSectionReveal } from "./FloralSectionReveal";
import { fadeUp } from "@/lib/animations/variants";

export function WeddingDetailsGold({ content }: { content: WeddingInvitationContent }) {
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  return (
    <section id="details" className="scroll-mt-24 py-[var(--section-py)]">
      <Container>
        <FloralSectionReveal className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-muted">
            Wedding details
          </p>
          <h2 className="mt-3 font-display text-3xl font-light text-charcoal sm:text-4xl">
            The celebration
          </h2>
        </FloralSectionReveal>

        <m.div
          className="mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <article className="relative rounded-2xl border border-gold/15 bg-white/50 p-8 shadow-sm shadow-gold/5 backdrop-blur-sm">
            <div
              className="absolute -left-px top-8 h-16 w-1 rounded-full bg-gradient-to-b from-[var(--theme-accent,#c9a962)] to-gold-muted/30"
              aria-hidden
            />
            <p className="text-xs uppercase tracking-[0.25em] text-gold-muted">
              {formatWeddingDate(displayDate, "EEEE, d MMMM yyyy")}
            </p>
            <h3 className="mt-2 font-display text-2xl text-charcoal">
              {content.brideName} & {content.groomName}
            </h3>
            <p className="mt-1 text-sm text-charcoal/60">{content.weddingTime}</p>
            <p className="mt-4 font-medium text-charcoal">{content.venueName}</p>
            <p className="text-sm text-charcoal/55">{content.venueAddress}</p>
          </article>
        </m.div>

        <FloralSectionReveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <AddToCalendarButton content={content} variant="light" />
        </FloralSectionReveal>
      </Container>
    </section>
  );
}
