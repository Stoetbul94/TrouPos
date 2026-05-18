"use client";

import type { InvitationTemplateProps } from "@/templates/types";
import { InvitationShell } from "@/components/layout/InvitationShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { StickyCta } from "@/components/layout/StickyCta";
import { CoupleNames } from "@/components/invitation/CoupleNames";
import { Countdown } from "@/components/invitation/Countdown";
import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { StoryTimeline } from "@/templates/shared/sections/StoryTimeline";
import { VenueMap } from "@/templates/shared/sections/VenueMap";
import { EventDetails } from "@/components/invitation/EventDetails";
import { Gallery } from "@/components/invitation/Gallery";
import { DressCode } from "@/components/invitation/DressCode";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { formatWeddingDate } from "@/lib/utils/dates";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageTransition } from "@/components/motion/PageTransition";

export default function ClassicEleganceTemplate({
  invitation,
}: InvitationTemplateProps) {
  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <InvitationShell variant="light" className="invite-classic">
      <PageTransition>
        {invitation.sections.includes("hero") && (
          <header className="border-b border-charcoal/10 bg-ivory">
            <Container className="py-16 sm:py-24">
              <div className="grid items-center gap-10 md:grid-cols-2">
                <MotionSection>
                  <CoupleNames
                    couple={invitation.couple}
                    className="text-charcoal [&_p]:text-charcoal/60 [&_span]:text-gold-muted"
                  />
                  <p className="mt-6 text-center text-xs uppercase tracking-[0.35em] text-gold-muted md:text-left">
                    {formatWeddingDate(invitation.weddingDate)}
                  </p>
                  <div className="mt-8 text-charcoal [&_p]:text-charcoal/50">
                    <Countdown targetDate={invitation.weddingDate} />
                  </div>
                </MotionSection>
                {invitation.media.heroImage && (
                  <OptimizedMedia
                    src={invitation.media.heroImage}
                    alt="Couple portrait"
                    aspectRatio="4/5"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-sm shadow-xl"
                  />
                )}
              </div>
            </Container>
          </header>
        )}

        {invitation.sections.includes("story") && invitation.story && (
          <Section id="story" className="bg-champagne/30">
            <StoryTimeline story={invitation.story} variant="light" />
          </Section>
        )}

        {invitation.sections.includes("events") && (
          <Section id="events" className="text-charcoal [&_h2]:text-charcoal [&_p]:text-charcoal/70">
            <EventDetails events={invitation.events} />
          </Section>
        )}

        {invitation.sections.includes("gallery") && invitation.media.gallery && (
          <Section id="gallery">
            <Gallery images={invitation.media.gallery} />
          </Section>
        )}

        {invitation.sections.includes("dressCode") && invitation.dressCode && (
          <Section id="dressCode" className="text-charcoal">
            <DressCode dressCode={invitation.dressCode} />
          </Section>
        )}

        {invitation.sections.includes("venue") && (
          <Section id="venue" className="text-charcoal">
            <VenueMap invitation={invitation} />
          </Section>
        )}

        {invitation.sections.includes("rsvp") && (
          <Section id="rsvp-section" className="border-t border-charcoal/10 bg-charcoal text-ivory">
            <RsvpForm invitationSlug={invitation.slug} variant="dark" />
          </Section>
        )}
      </PageTransition>

      <StickyCta
        onClick={scrollToRsvp}
        className="border-charcoal/10 bg-ivory/95 [&_button]:bg-charcoal [&_button]:text-ivory"
      />
    </InvitationShell>
  );
}
