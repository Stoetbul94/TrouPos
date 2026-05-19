"use client";

import type { ReactNode } from "react";
import type { InvitationTemplateProps } from "@/templates/types";
import { InvitationShell } from "@/components/layout/InvitationShell";
import { Section } from "@/components/layout/Section";
import { StickyCta } from "@/components/layout/StickyCta";
import { HeroSection, type HeroSectionVariant } from "@/components/invitation/HeroSection";
import { StorySection } from "@/components/invitation/StorySection";
import { WeddingDetailsSection } from "@/components/invitation/WeddingDetailsSection";
import { GallerySection } from "@/components/invitation/GallerySection";
import { VenueMap } from "@/components/invitation/VenueMap";
import { DressCode } from "@/components/invitation/DressCode";
import { DynamicRsvpSection } from "@/components/invitation/DynamicRsvpSection";
import { GiftRegistrySection } from "@/components/invitation/GiftRegistrySection";
import { InvitationThemeProvider } from "@/components/invitation/InvitationThemeProvider";
import { BackgroundMusicPlayer } from "@/components/invitation/BackgroundMusicPlayer";
import { QuoteSection } from "@/components/invitation/QuoteSection";
import { PageTransition } from "@/components/motion/PageTransition";
import { bankDetailsToGift } from "@/lib/invitations/contentAdapter";
import { scrollToRsvp } from "@/lib/invitations/scrollToRsvp";
import { buildInviteUrl } from "@/lib/utils/urls";
import { cn } from "@/lib/utils/cn";

export type InvitationShellVariant = "dark" | "light";

export function InvitationTemplateLayout({
  content,
  meta,
  heroVariant,
  shellVariant = "dark",
  shellClassName,
  themeProviderClassName,
  stickyCtaClassName,
  rsvpSectionClassName,
  storySectionClassName,
  galleryTitle,
  gallerySubtitle,
  footer,
  children,
}: InvitationTemplateProps & {
  heroVariant: HeroSectionVariant;
  shellVariant?: InvitationShellVariant;
  shellClassName?: string;
  themeProviderClassName?: string;
  stickyCtaClassName?: string;
  rsvpSectionClassName?: string;
  storySectionClassName?: string;
  galleryTitle?: string;
  gallerySubtitle?: string;
  footer?: ReactNode;
  children?: ReactNode;
}) {
  const uiVariant = shellVariant === "light" ? "light" : "dark";
  const gift = bankDetailsToGift(content.bankDetails);
  const detailsLayout = heroVariant === "floral" ? "card" : "events-list";
  const showGallery =
    meta.sections.includes("gallery") && content.galleryImages.length > 0;
  const inviteUrl = buildInviteUrl(meta.slug);

  return (
    <InvitationThemeProvider content={content} className={themeProviderClassName}>
      <InvitationShell variant={shellVariant} className={shellClassName}>
        <BackgroundMusicPlayer src={content.backgroundMusic} />
        <PageTransition>
          {meta.sections.includes("hero") && (
            <HeroSection content={content} variant={heroVariant} theme={uiVariant} />
          )}

          {content.quote && (
            <QuoteSection quote={content.quote} variant={uiVariant} />
          )}

          {meta.sections.includes("story") && content.story && content.story.length > 0 && (
            <Section
              id="story"
              className={cn(
                shellVariant === "light" && "bg-champagne/30",
                storySectionClassName,
              )}
            >
              <StorySection story={content.story} variant={uiVariant} />
            </Section>
          )}

          {meta.sections.includes("events") &&
            (detailsLayout === "card" ? (
              <WeddingDetailsSection
                content={content}
                variant={uiVariant}
                layout="card"
                invitationSlug={meta.slug}
                inviteUrl={inviteUrl}
              />
            ) : (
              <Section id="events" dark={shellVariant === "dark"} className="scroll-mt-24">
                <WeddingDetailsSection
                  content={content}
                  variant={uiVariant}
                  layout="events-list"
                  invitationSlug={meta.slug}
                  inviteUrl={inviteUrl}
                />
              </Section>
            ))}

          {meta.sections.includes("venue") && (
            <VenueMap
              content={content}
              variant={uiVariant}
              showHeading={heroVariant === "floral"}
              className={
                heroVariant !== "floral"
                  ? shellVariant === "light"
                    ? "text-charcoal"
                    : undefined
                  : undefined
              }
            />
          )}

          {showGallery && (
            <GallerySection
              content={content}
              variant={uiVariant}
              showHeading={heroVariant === "floral"}
              title={galleryTitle}
              subtitle={gallerySubtitle}
            />
          )}

          {meta.sections.includes("dressCode") && content.dressCode && (
            <Section
              id="dressCode"
              className={cn(shellVariant === "light" && "text-charcoal")}
            >
              <DressCode dressCode={content.dressCode} />
            </Section>
          )}

          {meta.sections.includes("rsvp") && (
            <Section
              id="rsvp-section"
              className={cn(
                "scroll-mt-24",
                rsvpSectionClassName ??
                  (shellVariant === "light"
                    ? "border-t border-charcoal/10 bg-charcoal text-ivory"
                    : undefined),
              )}
            >
              <div id="rsvp">
                <DynamicRsvpSection
                  rsvpLink={content.rsvpLink}
                  invitationSlug={meta.slug}
                  variant={shellVariant === "light" ? "dark" : uiVariant}
                />
              </div>
            </Section>
          )}

          {meta.sections.includes("gift") && (gift || content.bankDetails) && (
            <Section
              id="gift"
              className={cn(
                "scroll-mt-24 border-t border-gold/10 py-[var(--section-py)]",
                shellVariant === "dark" && "border-ivory/10",
              )}
            >
              <GiftRegistrySection
                content={content}
                gift={gift}
                variant={uiVariant}
                qrCodeImage={content.qrCodeImage}
              />
            </Section>
          )}

          {children}
        </PageTransition>

        {footer}

        <StickyCta onClick={scrollToRsvp} className={stickyCtaClassName} />
      </InvitationShell>
    </InvitationThemeProvider>
  );
}
