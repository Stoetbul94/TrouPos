"use client";

import type { InvitationTemplateProps } from "@/templates/types";
import { InvitationShell } from "@/components/layout/InvitationShell";
import { Section } from "@/components/layout/Section";
import { StickyCta } from "@/components/layout/StickyCta";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { GiftRegistrySection } from "@/components/invitation/GiftRegistrySection";
import { PageTransition } from "@/components/motion/PageTransition";
import { floralThemeClass } from "./config";
import { HeroFloralGold } from "./sections/HeroFloralGold";
import { WeddingDetailsGold } from "./sections/WeddingDetailsGold";
import { FloralGallery } from "./sections/FloralGallery";
import { FloralVenue } from "./sections/FloralVenue";
import { FloralFooter } from "./sections/FloralFooter";

export default function LuxuryFloralGoldTemplate({
  invitation,
}: InvitationTemplateProps) {
  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <InvitationShell
      variant="light"
      className={`${floralThemeClass} bg-[#faf6f0] text-charcoal`}
    >
      <PageTransition>
        <HeroFloralGold invitation={invitation} />

        <WeddingDetailsGold invitation={invitation} />

        <FloralVenue invitation={invitation} />

        {invitation.media.gallery && invitation.media.gallery.length > 0 && (
          <FloralGallery invitation={invitation} />
        )}

        <Section
          id="rsvp-section"
          className="bg-charcoal py-[var(--section-py)] text-ivory"
        >
          <RsvpForm invitationSlug={invitation.slug} variant="dark" />
        </Section>

        {invitation.gift && (
          <Section id="gift" className="border-t border-gold/10 py-[var(--section-py)]">
            <GiftRegistrySection gift={invitation.gift} variant="light" />
          </Section>
        )}
      </PageTransition>

      <FloralFooter invitation={invitation} />

      <StickyCta
        onClick={scrollToRsvp}
        className="border-gold/20 bg-[#faf6f0]/95 backdrop-blur-md [&_button]:bg-charcoal [&_button]:text-ivory"
      />
    </InvitationShell>
  );
}
