import type { Invitation } from "@/types/invitation";
import { invitationToContent } from "@/lib/invitations/contentAdapter";
import { templateRegistry } from "@/templates/registry";
import { InvitationWithIntro } from "@/components/invitation/InvitationWithIntro";

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

  return (
    <InvitationWithIntro slug={invitation.slug}>
      <Template content={content} meta={meta} />
    </InvitationWithIntro>
  );
}
