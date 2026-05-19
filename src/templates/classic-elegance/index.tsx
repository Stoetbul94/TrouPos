"use client";

import type { InvitationTemplateProps } from "@/templates/types";
import { InvitationTemplateLayout } from "@/templates/shared/InvitationTemplateLayout";

export default function ClassicEleganceTemplate(props: InvitationTemplateProps) {
  return (
    <InvitationTemplateLayout
      {...props}
      heroVariant="classic"
      shellVariant="light"
      shellClassName="invite-classic"
      stickyCtaClassName="border-charcoal/10 bg-ivory/95 [&_button]:bg-charcoal [&_button]:text-ivory"
    />
  );
}
