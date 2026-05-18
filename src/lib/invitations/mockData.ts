import type { Invitation, SectionId, TemplateId } from "@/types/invitation";

const baseInvitation = {
  couple: {
    partnerOne: "Amara",
    partnerTwo: "Thabo",
    tagline: "Together with their families",
  },
  weddingDate: "2026-11-14T14:00:00+02:00",
  timezone: "Africa/Johannesburg",
  locale: "en-ZA",
  dressCode: "Formal attire · Earth tones encouraged",
  rsvpDeadline: "2026-10-01T23:59:59+02:00",
  story: [
    {
      id: "1",
      year: "2019",
      title: "Cape Town",
      body: "A chance meeting at a friend's rooftop sundowner turned into hours of conversation.",
    },
    {
      id: "2",
      year: "2022",
      title: "The Proposal",
      body: "Thabo asked among the proteas on a Winelands morning — she said yes before he finished the question.",
    },
    {
      id: "3",
      year: "2026",
      title: "Forever",
      body: "Now they invite you to celebrate as they say I do.",
    },
  ],
  events: [
    {
      id: "ceremony",
      title: "Ceremony",
      description: "Please be seated by 13:45",
      startsAt: "2026-11-14T14:00:00+02:00",
      endsAt: "2026-11-14T15:30:00+02:00",
      venue: {
        name: "Stellenbosch Vine Estate",
        address: "R310, Koelenhof",
        city: "Stellenbosch",
        province: "Western Cape",
        mapUrl:
          "https://maps.google.com/?q=Stellenbosch+Western+Cape+South+Africa",
      },
      dressCode: "Formal",
    },
    {
      id: "reception",
      title: "Reception",
      startsAt: "2026-11-14T17:00:00+02:00",
      endsAt: "2026-11-14T23:00:00+02:00",
      venue: {
        name: "The Oak Pavilion",
        address: "R310, Koelenhof",
        city: "Stellenbosch",
        province: "Western Cape",
        mapUrl:
          "https://maps.google.com/?q=Stellenbosch+Western+Cape+South+Africa",
      },
    },
  ],
  media: {
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    heroPoster:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=70",
    ogImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    gallery: [
      {
        id: "g1",
        src: "https://images.unsplash.com/photo-1606800052052-a08af8348e18?w=800&q=80",
        alt: "Engagement portrait in the Winelands",
      },
      {
        id: "g2",
        src: "https://images.unsplash.com/photo-1465495976277-353ecfa9f2dd?w=800&q=80",
        alt: "Couple walking among vineyards",
      },
      {
        id: "g3",
        src: "https://images.unsplash.com/photo-1522673607860-1bda3141a7b2?w=800&q=80",
        alt: "Golden hour celebration",
      },
    ],
  },
  sections: [
    "hero",
    "story",
    "events",
    "gallery",
    "dressCode",
    "venue",
    "rsvp",
  ] satisfies SectionId[],
};

function buildInvitation(
  slug: string,
  templateId: TemplateId,
  id: string,
): Invitation {
  return {
    id,
    slug,
    templateId,
    ...baseInvitation,
    sections: [...baseInvitation.sections] as SectionId[],
    theme: {
      accentColor: templateId === "classic-elegance" ? "#b8956a" : "#c9a962",
      backgroundColor:
        templateId === "classic-elegance" ? "#faf8f5" : "#0f0e0c",
    },
  };
}

export const mockInvitations: Record<string, Invitation> = {
  "amara-thabo": buildInvitation(
    "amara-thabo",
    "modern-cinematic",
    "inv-001",
  ),
  "amara-thabo-classic": buildInvitation(
    "amara-thabo-classic",
    "classic-elegance",
    "inv-002",
  ),
};

export function getDemoInvitation(templateId: TemplateId): Invitation {
  const slug =
    templateId === "classic-elegance"
      ? "amara-thabo-classic"
      : "amara-thabo";
  return mockInvitations[slug] ?? buildInvitation(slug, templateId, "demo");
}
