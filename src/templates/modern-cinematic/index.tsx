"use client";

import type { InvitationTemplateProps } from "@/templates/types";
import { InvitationTemplateLayout } from "@/templates/shared/InvitationTemplateLayout";

export default function ModernCinematicTemplate(props: InvitationTemplateProps) {
  return (
    <InvitationTemplateLayout
      {...props}
      heroVariant="cinematic"
      shellVariant="dark"
    />
  );
}
