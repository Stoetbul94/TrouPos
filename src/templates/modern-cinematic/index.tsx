"use client";

import type { InvitationTemplateProps } from "@/templates/types";
import { useLegacyInvitation } from "@/templates/shared/useLegacyInvitation";
import { InvitationShell } from "@/components/layout/InvitationShell";
import { Section } from "@/components/layout/Section";
import { StickyCta } from "@/components/layout/StickyCta";
import { HeroCinematic } from "@/templates/shared/sections/HeroCinematic";
import { StoryTimeline } from "@/templates/shared/sections/StoryTimeline";
import { VenueMap } from "@/templates/shared/sections/VenueMap";
import { EventDetails } from "@/components/invitation/EventDetails";
import { Gallery } from "@/components/invitation/Gallery";
import { DressCode } from "@/components/invitation/DressCode";
import { DynamicRsvpSection } from "@/components/invitation/DynamicRsvpSection";
import { InvitationThemeProvider } from "@/components/invitation/InvitationThemeProvider";
import { BackgroundMusicPlayer } from "@/components/invitation/BackgroundMusicPlayer";
import { QuoteSection } from "@/components/invitation/QuoteSection";
import { PageTransition } from "@/components/motion/PageTransition";

export default function ModernCinematicTemplate(props: InvitationTemplateProps) {
  const invitation = useLegacyInvitation(props);
  const { content, meta } = props;

  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <InvitationThemeProvider content={content}>
      <InvitationShell variant="dark">
        <BackgroundMusicPlayer src={content.backgroundMusic} />
        <PageTransition>
          {meta.sections.includes("hero") && (
            <HeroCinematic invitation={invitation} variant="dark" />
          )}
          {content.quote && <QuoteSection quote={content.quote} variant="dark" />}
          {meta.sections.includes("story") && invitation.story && (
            <Section id="story">
              <StoryTimeline story={invitation.story} variant="dark" />
            </Section>
          )}
          {meta.sections.includes("events") && (
            <Section id="events" dark>
              <EventDetails events={invitation.events} />
            </Section>
          )}
          {meta.sections.includes("gallery") && content.galleryImages.length > 0 && (
            <Section id="gallery">
              <Gallery images={invitation.media.gallery ?? []} />
            </Section>
          )}
          {meta.sections.includes("dressCode") && invitation.dressCode && (
            <Section id="dressCode">
              <DressCode dressCode={invitation.dressCode} />
            </Section>
          )}
          {meta.sections.includes("venue") && (
            <Section id="venue">
              <VenueMap invitation={invitation} />
            </Section>
          )}
          {meta.sections.includes("rsvp") && (
            <Section id="rsvp-section">
              <div id="rsvp">
                <DynamicRsvpSection
                  rsvpLink={content.rsvpLink}
                  invitationSlug={meta.slug}
                />
              </div>
            </Section>
          )}
        </PageTransition>
        <StickyCta onClick={scrollToRsvp} />
      </InvitationShell>
    </InvitationThemeProvider>
  );
}
