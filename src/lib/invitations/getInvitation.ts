import type { Invitation } from "@/types/invitation";
import { contentToInvitation, invitationToContent } from "./contentAdapter";
import type { InvitationMeta } from "@/types/invitation-content";
import { getDemoInvitation, mockInvitations } from "./mockData";

export async function getInvitation(slug: string): Promise<Invitation | null> {
  const invitation = mockInvitations[slug];
  if (!invitation) {
    return null;
  }

  const content =
    invitation.content ?? invitationToContent(invitation);
  const meta: InvitationMeta = {
    id: invitation.id,
    slug: invitation.slug,
    templateId: invitation.templateId,
    locale: invitation.locale,
    timezone: invitation.timezone,
    sections: invitation.sections,
  };

  return structuredClone(contentToInvitation(meta, content));
}

export function getAllInvitationSlugs(): string[] {
  return Object.keys(mockInvitations);
}

export { getDemoInvitation };
