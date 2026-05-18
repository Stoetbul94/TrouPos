import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InvitationView } from "@/components/invitation/InvitationView";
import { getDemoInvitation } from "@/lib/invitations/getInvitation";
import { getTemplateMeta, isValidTemplateId } from "@/templates/registry";
import { siteConfig } from "@/config/site";

interface DemoPageProps {
  params: Promise<{ templateId: string }>;
}

export async function generateStaticParams() {
  return [
    { templateId: "modern-cinematic" },
    { templateId: "classic-elegance" },
  ];
}

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const { templateId } = await params;
  const meta = isValidTemplateId(templateId)
    ? getTemplateMeta(templateId)
    : null;

  return {
    title: meta ? `${meta.name} Demo` : "Template Demo",
    description: meta?.description ?? siteConfig.description,
  };
}

export default async function DemoTemplatePage({ params }: DemoPageProps) {
  const { templateId } = await params;

  if (!isValidTemplateId(templateId)) {
    notFound();
  }

  const invitation = getDemoInvitation(templateId);

  return <InvitationView invitation={invitation} />;
}
