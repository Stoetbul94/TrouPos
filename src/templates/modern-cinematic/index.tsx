"use client";

import type { InvitationTemplateProps } from "@/templates/types";
import { InvitationShell } from "@/components/layout/InvitationShell";
import { Section } from "@/components/layout/Section";
import { StickyCta } from "@/components/layout/StickyCta";
import { HeroCinematic } from "@/templates/shared/sections/HeroCinematic";
import { StoryTimeline } from "@/templates/shared/sections/StoryTimeline";
import { VenueMap } from "@/templates/shared/sections/VenueMap";
import { EventDetails } from "@/components/invitation/EventDetails";
import { Gallery } from "@/components/invitation/Gallery";
import { DressCode } from "@/components/invitation/DressCode";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { PageTransition } from "@/components/motion/PageTransition";

export default function ModernCinematicTemplate({
  invitation,
}: InvitationTemplateProps) {
  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <InvitationShell variant="dark">
      <PageTransition>
        {invitation.sections.includes("hero") && (
          <HeroCinematic invitation={invitation} variant="dark" />
        )}

        {invitation.sections.includes("story") && invitation.story && (
          <Section id="story">
            <StoryTimeline story={invitation.story} variant="dark" />
          </Section>
        )}

        {invitation.sections.includes("events") && (
          <Section id="events" dark>
            <EventDetails events={invitation.events} />
          </Section>
        )}

        {invitation.sections.includes("gallery") && invitation.media.gallery && (
          <Section id="gallery">
            <Gallery images={invitation.media.gallery} />
          </Section>
        )}

        {invitation.sections.includes("dressCode") && invitation.dressCode && (
          <Section id="dressCode">
            <DressCode dressCode={invitation.dressCode} />
          </Section>
        )}

        {invitation.sections.includes("venue") && (
          <Section id="venue">
            <VenueMap invitation={invitation} />
          </Section>
        )}

        {invitation.sections.includes("rsvp") && (
          <Section id="rsvp-section">
            <RsvpForm invitationSlug={invitation.slug} variant="dark" />
          </Section>
        )}
      </PageTransition>

      <StickyCta onClick={scrollToRsvp} />
    </InvitationShell>
  );
}
