import { useMemo } from "react";
import type { InvitationTemplateProps } from "@/types/template";
import { contentToInvitation } from "@/lib/invitations/contentAdapter";
import type { Invitation } from "@/types/invitation";

/** Bridges prop-driven content to legacy Invitation-shaped components */
export function useLegacyInvitation({
  content,
  meta,
}: InvitationTemplateProps): Invitation {
  return useMemo(() => contentToInvitation(meta, content), [content, meta]);
}
