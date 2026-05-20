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

function SectionTransitionBand({ dark }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        "section-transition-band",
        dark && "section-transition-band--dark",
      )}
      aria-hidden
    />
  );
}

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
  const atmosphere = content.atmosphere;

  return (
    <InvitationThemeProvider content={content} className={themeProviderClassName}>
      <InvitationShell variant={shellVariant} className={shellClassName}>
        <BackgroundMusicPlayer src={content.backgroundMusic} />
        <PageTransition>
          {meta.sections.includes("hero") && (
            <HeroSection content={content} variant={heroVariant} theme={uiVariant} />
          )}

          {content.quote && (
            <>
              <SectionTransitionBand dark={shellVariant === "dark"} />
              <QuoteSection
                quote={content.quote}
                variant={uiVariant}
                backgroundImage={atmosphere?.quoteBackground}
              />
            </>
          )}

          {meta.sections.includes("story") && content.story && content.story.length > 0 && (
            <>
              {content.quote && <SectionTransitionBand dark={shellVariant === "dark"} />}
              <Section
                id="story"
                className={cn(
                  "!p-0",
                  shellVariant === "light" && "bg-champagne/30",
                  storySectionClassName,
                )}
              >
                <StorySection
                  story={content.story}
                  variant={uiVariant}
                  ambienceImage={atmosphere?.storyAmbience}
                />
              </Section>
            </>
          )}

          {meta.sections.includes("events") &&
            (detailsLayout === "card" ? (
              <>
                <SectionTransitionBand />
                <WeddingDetailsSection
                  content={content}
                  variant={uiVariant}
                  layout="card"
                  invitationSlug={meta.slug}
                  inviteUrl={inviteUrl}
                />
              </>
            ) : (
              <>
                <SectionTransitionBand dark={shellVariant === "dark"} />
                <Section id="events" dark={shellVariant === "dark"} className="scroll-mt-24 !p-0">
                  <WeddingDetailsSection
                    content={content}
                    variant={uiVariant}
                    layout="events-list"
                    invitationSlug={meta.slug}
                    inviteUrl={inviteUrl}
                  />
                </Section>
              </>
            ))}

          {meta.sections.includes("venue") && (
            <>
              <SectionTransitionBand dark={shellVariant === "dark"} />
              <VenueMap
                content={content}
                variant={uiVariant}
                ambienceImage={atmosphere?.venueAmbience}
                showHeading={heroVariant === "floral"}
                className={
                  heroVariant !== "floral"
                    ? shellVariant === "light"
                      ? "text-charcoal"
                      : undefined
                    : undefined
                }
              />
            </>
          )}

          {showGallery && (
            <>
              <SectionTransitionBand dark={shellVariant === "dark"} />
              <GallerySection
                content={content}
                variant={uiVariant}
                showHeading={heroVariant === "floral"}
                title={galleryTitle}
                subtitle={gallerySubtitle}
              />
            </>
          )}

          {meta.sections.includes("dressCode") && content.dressCode && (
            <>
              <SectionTransitionBand dark={shellVariant === "dark"} />
              <Section
                id="dressCode"
                className={cn("!p-0", shellVariant === "light" && "text-charcoal")}
              >
                <DressCode dressCode={content.dressCode} variant={uiVariant} />
              </Section>
            </>
          )}

          {meta.sections.includes("rsvp") && (
            <>
              <SectionTransitionBand dark={shellVariant === "dark"} />
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
            </>
          )}

          {meta.sections.includes("gift") && (gift || content.bankDetails) && (
            <Section
              id="gift"
              className={cn(
                "scroll-mt-24 border-t border-gold/10 py-[var(--section-py)]",
                shellVariant === "dark" && "border-ivory/10",
              )}
            >
              <div
                className="pointer-events-none mb-8 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent"
                aria-hidden
              />
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
