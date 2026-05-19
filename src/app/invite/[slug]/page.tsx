import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InvitationView } from "@/components/invitation/InvitationView";
import { getInvitation, getAllInvitationSlugs } from "@/lib/invitations/getInvitation";
import { formatWeddingDate } from "@/lib/utils/dates";
import { env } from "@/config/env";
import { inviteRobots } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

interface InvitePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllInvitationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InvitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitation(slug);

  if (!invitation) {
    return { title: "Invitation not found" };
  }

  const title = `${invitation.couple.partnerOne} & ${invitation.couple.partnerTwo}`;
  const description = `You're invited · ${formatWeddingDate(invitation.weddingDate)}`;

  const ogImage = invitation.media.ogImage;

  return {
    title,
    description,
    robots: inviteRobots(),
    alternates: {
      canonical: `${env.siteUrl}/invite/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: invitation.locale,
      siteName: siteConfig.name,
      url: `${env.siteUrl}/invite/${slug}`,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { slug } = await params;
  const invitation = await getInvitation(slug);

  if (!invitation) {
    notFound();
  }

  return <InvitationView invitation={invitation} />;
}
