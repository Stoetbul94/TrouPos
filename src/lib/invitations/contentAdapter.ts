import { unsplashUrl } from "@/lib/cinematic/imagePresets";
import type {
  GalleryImageContent,
  InvitationMeta,
  WeddingInvitationContent,
} from "@/types/invitation-content";
import { sectionsForTemplate } from "@/lib/invitations/templateSections";
import type {
  GalleryImage,
  GiftRegistry,
  Invitation,
  SectionId,
  TemplateId,
  Venue,
  WeddingEvent,
} from "@/types/invitation";

/** Build ISO datetime from date + time strings for calendar/countdown helpers */
export function combineDateAndTime(date: string, time: string): string {
  if (date.includes("T")) return date;
  const normalizedTime = time.match(/^\d{1,2}:\d{2}/)
    ? time
    : "14:00";
  return `${date.split("T")[0]}T${normalizedTime}:00+02:00`;
}

export function galleryContentToImages(
  images: GalleryImageContent[],
): GalleryImage[] {
  return images.map((img, i) => ({
    id: img.id ?? `gallery-${i}`,
    src: img.src,
    alt: img.alt,
  }));
}

export function bankDetailsToGift(
  bank: WeddingInvitationContent["bankDetails"],
): GiftRegistry | undefined {
  if (!bank) return undefined;
  return {
    title: bank.title ?? "Gifts & blessings",
    description:
      bank.description ??
      "Your presence is our greatest gift. Should you wish to contribute, details are below.",
    bankName: bank.bankName,
    accountHolder: bank.accountHolder,
    accountNumber: bank.accountNumber,
    branchCode: bank.branchCode,
    reference: bank.reference,
  };
}

export function contentToVenue(content: WeddingInvitationContent): Venue {
  return {
    name: content.venueName,
    address: content.venueAddress,
    city: content.venueAddress.split(",").pop()?.trim() ?? "",
    mapUrl: content.googleMapsLink,
  };
}

export function contentToEvents(content: WeddingInvitationContent): WeddingEvent[] {
  const startsAt = combineDateAndTime(content.weddingDate, content.weddingTime);
  return [
    {
      id: "wedding",
      title: "Wedding celebration",
      startsAt,
      venue: {
        name: content.venueName,
        address: content.venueAddress,
        city: content.venueAddress.split(",").pop()?.trim() ?? "",
        mapUrl: content.googleMapsLink,
      },
    },
  ];
}

export function contentToInvitation(
  meta: InvitationMeta,
  content: WeddingInvitationContent,
): Invitation {
  const events = contentToEvents(content);
  const startsAt = combineDateAndTime(content.weddingDate, content.weddingTime);

  return {
    id: meta.id,
    slug: meta.slug,
    templateId: meta.templateId,
    locale: meta.locale,
    timezone: meta.timezone,
    sections: meta.sections,
    content,
    couple: {
      partnerOne: content.brideName,
      partnerTwo: content.groomName,
      tagline: content.tagline ?? content.welcomeMessage,
    },
    weddingDate: startsAt,
    events,
    media: {
      heroImage: content.heroImage,
      ogImage: content.heroImage,
      gallery: galleryContentToImages(content.galleryImages),
    },
    theme: {
      accentColor: content.themeColor,
      backgroundColor: content.backgroundColor,
      fontDisplay: content.fontStyle,
    },
    gift: bankDetailsToGift(content.bankDetails),
    story: content.story,
    dressCode: content.dressCode,
  };
}

export function invitationToContent(invitation: Invitation): WeddingInvitationContent {
  if (invitation.content) {
    return invitation.content;
  }

  const event = invitation.events[0];
  const venue = event?.venue;

  return {
    brideName: invitation.couple.partnerOne,
    groomName: invitation.couple.partnerTwo,
    weddingDate: invitation.weddingDate,
    weddingTime: event ? formatTimeFromIso(event.startsAt) : "14:00",
    venueName: venue?.name ?? "",
    venueAddress: venue
      ? [venue.address, venue.city, venue.province].filter(Boolean).join(", ")
      : "",
    googleMapsLink: venue?.mapUrl ?? "",
    countdownDate: invitation.weddingDate,
    welcomeMessage: invitation.couple.tagline,
    quote: undefined,
    galleryImages: (invitation.media.gallery ?? []).map((g) => ({
      src: g.src,
      alt: g.alt,
      id: g.id,
    })),
    themeColor: invitation.theme?.accentColor ?? "#c9a962",
    fontStyle: (invitation.theme?.fontDisplay as WeddingInvitationContent["fontStyle"]) ?? "cormorant",
    backgroundMusic: undefined,
    rsvpLink: undefined,
    bankDetails: invitation.gift
      ? {
          title: invitation.gift.title,
          description: invitation.gift.description,
          bankName: invitation.gift.bankName,
          accountHolder: invitation.gift.accountHolder,
          accountNumber: invitation.gift.accountNumber,
          branchCode: invitation.gift.branchCode,
          reference: invitation.gift.reference,
        }
      : undefined,
    qrCodeImage: undefined,
    heroImage: invitation.media.heroImage,
    tagline: invitation.couple.tagline,
    backgroundColor: invitation.theme?.backgroundColor,
  };
}

function formatTimeFromIso(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-ZA", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(iso));
  } catch {
    return "2:00 PM";
  }
}

export function createDefaultContent(
  overrides?: Partial<WeddingInvitationContent>,
): WeddingInvitationContent {
  return {
    brideName: "Amara",
    groomName: "Thabo",
    weddingDate: "2026-11-14",
    weddingTime: "14:00",
    venueName: "Stellenbosch Vine Estate",
    venueAddress: "R310, Koelenhof, Stellenbosch, Western Cape",
    googleMapsLink:
      "https://maps.google.com/?q=Stellenbosch+Western+Cape+South+Africa",
    countdownDate: "2026-11-14T14:00:00+02:00",
    welcomeMessage: "Together with their families",
    quote:
      "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
    galleryImages: [],
    themeColor: "#c9a962",
    fontStyle: "cormorant",
    ...overrides,
  };
}

export function buildMockInvitation(
  slug: string,
  templateId: TemplateId,
  id: string,
  contentOverrides?: Partial<WeddingInvitationContent>,
  sections?: SectionId[],
): Invitation {
  const content = createDefaultContent({
    ...contentOverrides,
    atmosphere:
      contentOverrides?.atmosphere ?? atmosphereForTemplate(templateId),
    story:
      contentOverrides?.story ??
      (templateId !== "luxury-floral-gold" ? defaultStory : undefined),
    dressCode:
      contentOverrides?.dressCode ??
      (templateId !== "luxury-floral-gold"
        ? "Formal attire · Earth tones encouraged"
        : undefined),
    galleryImages:
      contentOverrides?.galleryImages ?? defaultGalleryForTemplate(templateId),
    themeColor:
      contentOverrides?.themeColor ?? themeColorForTemplate(templateId),
    backgroundColor:
      contentOverrides?.backgroundColor ??
      backgroundForTemplate(templateId),
    heroImage:
      contentOverrides?.heroImage ?? heroForTemplate(templateId),
    bankDetails:
      contentOverrides?.bankDetails ??
      (templateId === "luxury-floral-gold"
        ? {
            title: "Gifts & blessings",
            description:
              "Your presence is the greatest gift. Should you wish to honour us further, a contribution would be warmly appreciated.",
            bankName: "First National Bank",
            accountHolder: "Amara & Thabo Wedding",
            accountNumber: "627 1234 5678",
            branchCode: "250655",
            reference: "AmaraThabo2026",
          }
        : undefined),
  });

  const meta: InvitationMeta = {
    id,
    slug,
    templateId,
    locale: "en-ZA",
    timezone: "Africa/Johannesburg",
    sections: sections ?? defaultSectionsForTemplate(templateId),
  };

  const invitation = contentToInvitation(meta, content);

  if (templateId !== "luxury-floral-gold") {
    invitation.rsvpDeadline = "2026-10-01T23:59:59+02:00";
  }

  return invitation;
}

const defaultStory = [
  {
    id: "1",
    year: "2019",
    title: "Cape Town",
    body: "A chance meeting at a friend's rooftop sundowner turned into hours of conversation.",
    image: unsplashUrl("1465495976277-353ecfa9f2dd"),
    imageAlt: "Couple walking through vineyards at golden hour",
  },
  {
    id: "2",
    year: "2022",
    title: "The Proposal",
    body: "Thabo asked among the proteas on a Winelands morning — she said yes before he finished the question.",
    image: unsplashUrl("1511285560929-f80fd9e1239a"),
    imageAlt: "Hands intertwined with engagement ring",
  },
  {
    id: "3",
    year: "2026",
    title: "Forever",
    body: "Now they invite you to celebrate as they say I do.",
  },
];

function defaultSectionsForTemplate(templateId: TemplateId): SectionId[] {
  return sectionsForTemplate(templateId);
}

function themeColorForTemplate(templateId: TemplateId): string {
  if (templateId === "classic-elegance") return "#b8956a";
  return "#c9a962";
}

function backgroundForTemplate(templateId: TemplateId): string {
  if (templateId === "classic-elegance") return "#faf8f5";
  if (templateId === "luxury-floral-gold") return "#faf6f0";
  return "#0f0e0c";
}

function heroForTemplate(templateId: TemplateId): string {
  if (templateId === "luxury-floral-gold") {
    return unsplashUrl("1520854221256-17451cc791c3", { width: 1920 });
  }
  if (templateId === "classic-elegance") {
    return unsplashUrl("1606800052052-a08af8348e18", { width: 1920 });
  }
  return unsplashUrl("1519741497674-611481863552", { width: 1920 });
}

function atmosphereForTemplate(
  templateId: TemplateId,
): WeddingInvitationContent["atmosphere"] {
  if (templateId === "luxury-floral-gold") {
    return {
      quoteBackground: unsplashUrl("1519225421980-715cb0215aed"),
      detailsAccent: unsplashUrl("1469371670804-432a26d33670"),
      storyAmbience: unsplashUrl("1520854221256-17451cc791c3"),
    };
  }
  if (templateId === "classic-elegance") {
    return {
      quoteBackground: unsplashUrl("1465495976277-353ecfa9f2dd"),
      detailsAccent: unsplashUrl("1519167758481-83f29da8ae43"),
      storyAmbience: unsplashUrl("1511285560929-f80fd9e1239a"),
    };
  }
  return {
    quoteBackground: unsplashUrl("1522673607860-1bda3141a7b2"),
    detailsAccent: unsplashUrl("1519167758481-83f29da8ae43"),
    storyAmbience: unsplashUrl("1465495976277-353ecfa9f2dd"),
  };
}

function defaultGalleryForTemplate(templateId: TemplateId): GalleryImageContent[] {
  const floral: GalleryImageContent[] = [
    { src: unsplashUrl("1519225421980-715cb0215aed"), alt: "Floral arch ceremony" },
    { src: unsplashUrl("1520854221256-17451cc791c3"), alt: "Golden floral tablescape" },
    { src: unsplashUrl("1469371670804-432a26d33670"), alt: "Couple among proteas" },
    { src: unsplashUrl("1465495976277-353ecfa9f2dd"), alt: "Winelands golden hour" },
    { src: unsplashUrl("1511285560929-f80fd9e1239a"), alt: "Hands with wedding bands" },
    { src: unsplashUrl("1606800052052-a08af8348e18"), alt: "Intimate portrait" },
  ];
  const standard: GalleryImageContent[] = [
    { src: unsplashUrl("1606800052052-a08af8348e18"), alt: "Engagement portrait" },
    { src: unsplashUrl("1465495976277-353ecfa9f2dd"), alt: "Vineyard walk at sunset" },
    { src: unsplashUrl("1522673607860-1bda3141a7b2"), alt: "Golden hour embrace" },
    { src: unsplashUrl("1519167758481-83f29da8ae43"), alt: "Winery celebration table" },
    { src: unsplashUrl("1511285560929-f80fd9e1239a"), alt: "Hands intertwined" },
    { src: unsplashUrl("1519741497674-611481863552"), alt: "Cinematic couple portrait" },
  ];
  return templateId === "luxury-floral-gold" ? floral : standard;
}
