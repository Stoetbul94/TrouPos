"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { mapPremiumToPayload } from "@/lib/rsvp/mapPremiumToPayload";
import {
  premiumRsvpSchema,
  type PremiumRsvpFormValues,
} from "@/lib/rsvp/premiumSchema";
import { clearRsvpDraft, loadRsvpDraft, saveRsvpDraft } from "@/lib/rsvp/storage";
import { submitRsvp } from "@/lib/rsvp/submitRsvp";
import type { RsvpResult } from "@/types/rsvp";

const defaultValues = (slug: string): PremiumRsvpFormValues => ({
  invitationSlug: slug,
  fullName: "",
  attending: "yes",
  guestCount: 1,
  dietaryRequirements: "",
  personalMessage: "",
});

export function usePremiumRsvpForm(invitationSlug: string): {
  form: UseFormReturn<PremiumRsvpFormValues>;
  onSubmit: (values: PremiumRsvpFormValues) => Promise<RsvpResult>;
} {
  const form = useForm<PremiumRsvpFormValues>({
    resolver: zodResolver(premiumRsvpSchema),
    defaultValues: defaultValues(invitationSlug),
    mode: "onBlur",
  });

  useEffect(() => {
    const draft = loadRsvpDraft(invitationSlug);
    if (!draft) return;

    const attending =
      draft.attending === "no" || draft.attendance === "declined" ? "no" : "yes";

    form.reset({
      ...defaultValues(invitationSlug),
      fullName: draft.fullName ?? draft.guests?.[0]?.name ?? "",
      attending,
      guestCount: draft.guestCount ?? 1,
      dietaryRequirements: draft.dietaryRequirements ?? draft.dietaryNotes ?? "",
      personalMessage: draft.personalMessage ?? draft.message ?? "",
    });
  }, [invitationSlug, form]);

  useEffect(() => {
    const sub = form.watch((values) => {
      if (values) {
        saveRsvpDraft(invitationSlug, values);
      }
    });
    return () => sub.unsubscribe();
  }, [form, invitationSlug]);

  const onSubmit = useCallback(
    async (values: PremiumRsvpFormValues) => {
      const result = await submitRsvp(mapPremiumToPayload(values));
      if (result.ok) {
        clearRsvpDraft(invitationSlug);
      }
      return result;
    },
    [invitationSlug],
  );

  return { form, onSubmit };
}
