"use client";

import type { InvitationTemplateProps } from "@/templates/types";
import { InvitationShell } from "@/components/layout/InvitationShell";
import { Section } from "@/components/layout/Section";
import { StickyCta } from "@/components/layout/StickyCta";
import { GiftRegistrySection } from "@/components/invitation/GiftRegistrySection";
import { InvitationThemeProvider } from "@/components/invitation/InvitationThemeProvider";
import { BackgroundMusicPlayer } from "@/components/invitation/BackgroundMusicPlayer";
import { QuoteSection } from "@/components/invitation/QuoteSection";
import { QRCodeSection } from "@/components/invitation/QRCodeSection";
import { DynamicRsvpSection } from "@/components/invitation/DynamicRsvpSection";
import { bankDetailsToGift } from "@/lib/invitations/contentAdapter";
import { PageTransition } from "@/components/motion/PageTransition";
import { floralThemeClass } from "./config";
import { HeroFloralGold } from "./sections/HeroFloralGold";
import { WeddingDetailsGold } from "./sections/WeddingDetailsGold";
import { FloralGallery } from "./sections/FloralGallery";
import { FloralVenue } from "./sections/FloralVenue";
import { FloralFooter } from "./sections/FloralFooter";

export default function LuxuryFloralGoldTemplate({
  content,
  meta,
}: InvitationTemplateProps) {
  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  const gift = bankDetailsToGift(content.bankDetails);
  const showGallery =
    meta.sections.includes("gallery") && content.galleryImages.length > 0;

  return (
    <InvitationThemeProvider
      content={content}
      className={`${floralThemeClass} min-h-dvh bg-[var(--theme-background,#faf6f0)] text-charcoal`}
    >
      <InvitationShell variant="light" className="bg-transparent text-inherit">
        <BackgroundMusicPlayer src={content.backgroundMusic} />
        <PageTransition>
          {meta.sections.includes("hero") && <HeroFloralGold content={content} />}

          {content.quote && <QuoteSection quote={content.quote} variant="light" />}

          {meta.sections.includes("events") && (
            <WeddingDetailsGold content={content} />
          )}

          {meta.sections.includes("venue") && <FloralVenue content={content} />}

          {showGallery && <FloralGallery content={content} />}

          {meta.sections.includes("rsvp") && (
            <Section
              id="rsvp-section"
              className="bg-charcoal py-[var(--section-py)] text-ivory"
            >
              <div id="rsvp">
                <DynamicRsvpSection
                  rsvpLink={content.rsvpLink}
                  invitationSlug={meta.slug}
                  variant="dark"
                />
              </div>
            </Section>
          )}

          {meta.sections.includes("gift") && gift && (
            <Section id="gift" className="border-t border-gold/10 py-[var(--section-py)]">
              <GiftRegistrySection gift={gift} variant="light" />
            </Section>
          )}

          {content.qrCodeImage && (
            <Section className="py-12">
              <QRCodeSection qrCodeImage={content.qrCodeImage} />
            </Section>
          )}
        </PageTransition>

        <FloralFooter content={content} />

        <StickyCta
          onClick={scrollToRsvp}
          className="border-gold/20 bg-[#faf6f0]/95 backdrop-blur-md [&_button]:bg-charcoal [&_button]:text-ivory"
        />
      </InvitationShell>
    </InvitationThemeProvider>
  );
}
