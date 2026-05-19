"use client";

import type { InvitationTemplateProps } from "@/templates/types";
import { useLegacyInvitation } from "@/templates/shared/useLegacyInvitation";
import { InvitationShell } from "@/components/layout/InvitationShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { StickyCta } from "@/components/layout/StickyCta";
import { CoupleNames } from "@/components/invitation/CoupleNames";
import { Countdown } from "@/components/invitation/Countdown";
import { StoryTimeline } from "@/templates/shared/sections/StoryTimeline";
import { VenueMap } from "@/templates/shared/sections/VenueMap";
import { EventDetails } from "@/components/invitation/EventDetails";
import { Gallery } from "@/components/invitation/Gallery";
import { DressCode } from "@/components/invitation/DressCode";
import { DynamicRsvpSection } from "@/components/invitation/DynamicRsvpSection";
import { InvitationThemeProvider } from "@/components/invitation/InvitationThemeProvider";
import { BackgroundMusicPlayer } from "@/components/invitation/BackgroundMusicPlayer";
import { QuoteSection } from "@/components/invitation/QuoteSection";
import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { formatWeddingDate } from "@/lib/utils/dates";
import { combineDateAndTime } from "@/lib/invitations/contentAdapter";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageTransition } from "@/components/motion/PageTransition";

export default function ClassicEleganceTemplate(props: InvitationTemplateProps) {
  const invitation = useLegacyInvitation(props);
  const { content, meta } = props;
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <InvitationThemeProvider content={content}>
      <InvitationShell variant="light" className="invite-classic">
        <BackgroundMusicPlayer src={content.backgroundMusic} />
        <PageTransition>
          {meta.sections.includes("hero") && (
            <header className="border-b border-charcoal/10 bg-ivory">
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
                      <Countdown targetDate={content.countdownDate} />
                    </div>
                  </MotionSection>
                  {content.heroImage && (
                    <OptimizedMedia
                      src={content.heroImage}
                      alt={`${content.brideName} and ${content.groomName}`}
                      aspectRatio="4/5"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-sm shadow-xl"
                    />
                  )}
                </div>
              </Container>
            </header>
          )}

          {content.quote && <QuoteSection quote={content.quote} variant="light" />}

          {meta.sections.includes("story") && invitation.story && (
            <Section id="story" className="bg-champagne/30">
              <StoryTimeline story={invitation.story} variant="light" />
            </Section>
          )}

          {meta.sections.includes("events") && (
            <Section id="events" className="text-charcoal [&_h2]:text-charcoal [&_p]:text-charcoal/70">
              <EventDetails events={invitation.events} />
            </Section>
          )}

          {meta.sections.includes("gallery") && content.galleryImages.length > 0 && (
            <Section id="gallery">
              <Gallery images={invitation.media.gallery ?? []} variant="light" />
            </Section>
          )}

          {meta.sections.includes("dressCode") && invitation.dressCode && (
            <Section id="dressCode" className="text-charcoal">
              <DressCode dressCode={invitation.dressCode} />
            </Section>
          )}

          {meta.sections.includes("venue") && (
            <Section id="venue" className="text-charcoal">
              <VenueMap invitation={invitation} />
            </Section>
          )}

          {meta.sections.includes("rsvp") && (
            <Section id="rsvp-section" className="border-t border-charcoal/10 bg-charcoal text-ivory">
              <div id="rsvp">
                <DynamicRsvpSection
                  rsvpLink={content.rsvpLink}
                  invitationSlug={meta.slug}
                  variant="dark"
                />
              </div>
            </Section>
          )}
        </PageTransition>

        <StickyCta
          onClick={scrollToRsvp}
          className="border-charcoal/10 bg-ivory/95 [&_button]:bg-charcoal [&_button]:text-ivory"
        />
      </InvitationShell>
    </InvitationThemeProvider>
  );
}
