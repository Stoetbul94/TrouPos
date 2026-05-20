"use client";

import type { ReactNode } from "react";
import { ChurchDoorOpening } from "@/components/invitation/intro";

export function InvitationWithIntro({
  children,
  slug,
}: {
  children: ReactNode;
  slug?: string;
}) {
  return <ChurchDoorOpening slug={slug}>{children}</ChurchDoorOpening>;
}
