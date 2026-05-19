"use client";

import type { InvitationTemplateProps } from "@/templates/types";
import { InvitationTemplateLayout } from "@/templates/shared/InvitationTemplateLayout";
import { floralThemeClass } from "./config";
import { FloralFooter } from "./sections/FloralFooter";

export default function LuxuryFloralGoldTemplate(props: InvitationTemplateProps) {
  const { content } = props;

  return (
    <InvitationTemplateLayout
      {...props}
      heroVariant="floral"
      shellVariant="light"
      shellClassName="bg-transparent text-inherit"
      themeProviderClassName={`${floralThemeClass} min-h-dvh bg-[var(--theme-background,#faf6f0)] text-charcoal`}
      stickyCtaClassName="border-gold/20 bg-[#faf6f0]/95 backdrop-blur-md [&_button]:bg-charcoal [&_button]:text-ivory"
      rsvpSectionClassName="bg-charcoal py-[var(--section-py)] text-ivory"
      gallerySubtitle="Our moments"
      galleryTitle="A love in bloom"
      footer={<FloralFooter content={content} />}
    />
  );
}
