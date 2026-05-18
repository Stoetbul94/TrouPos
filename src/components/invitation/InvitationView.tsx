import type { Invitation } from "@/types/invitation";
import { templateRegistry } from "@/templates/registry";

export function InvitationView({ invitation }: { invitation: Invitation }) {
  const Template = templateRegistry[invitation.templateId];
  return <Template invitation={invitation} />;
}
