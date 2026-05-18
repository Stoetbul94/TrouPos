import type { Invitation } from "@/types/invitation";
import { getDemoInvitation, mockInvitations } from "./mockData";

export async function getInvitation(slug: string): Promise<Invitation | null> {
  const invitation = mockInvitations[slug];
  if (!invitation) {
    return null;
  }
  return structuredClone(invitation);
}

export function getAllInvitationSlugs(): string[] {
  return Object.keys(mockInvitations);
}

export { getDemoInvitation };
