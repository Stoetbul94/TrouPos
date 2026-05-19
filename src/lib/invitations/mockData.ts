import type { Invitation, TemplateId } from "@/types/invitation";
import { buildMockInvitation } from "./contentAdapter";

export const mockInvitations: Record<string, Invitation> = {
  "amara-thabo": buildMockInvitation("amara-thabo", "modern-cinematic", "inv-001"),
  "amara-thabo-classic": buildMockInvitation(
    "amara-thabo-classic",
    "classic-elegance",
    "inv-002",
  ),
  "amara-thabo-floral": buildMockInvitation(
    "amara-thabo-floral",
    "luxury-floral-gold",
    "inv-003",
    {
      welcomeMessage: "Together with their families",
      quote:
        "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
      backgroundMusic: undefined,
    },
  ),
};

export function getAllInvitationSlugs(): string[] {
  return Object.keys(mockInvitations);
}

export function getDemoInvitation(templateId: TemplateId): Invitation {
  const slugByTemplate: Record<TemplateId, string> = {
    "modern-cinematic": "amara-thabo",
    "classic-elegance": "amara-thabo-classic",
    "luxury-floral-gold": "amara-thabo-floral",
  };
  const slug = slugByTemplate[templateId];
  return mockInvitations[slug] ?? buildMockInvitation(slug, templateId, "demo");
}
