import type { Invitation } from "@/types/invitation";
import { invitationToContent } from "@/lib/invitations/contentAdapter";
import { templateRegistry } from "@/templates/registry";

export function InvitationView({ invitation }: { invitation: Invitation }) {
  const Template = templateRegistry[invitation.templateId];
  const content = invitation.content ?? invitationToContent(invitation);
  const meta = {
    id: invitation.id,
    slug: invitation.slug,
    templateId: invitation.templateId,
    locale: invitation.locale,
    timezone: invitation.timezone,
    sections: invitation.sections,
  };

  return <Template content={content} meta={meta} />;
}
