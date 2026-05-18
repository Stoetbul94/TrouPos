"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { rsvpSchema, type RsvpFormValues } from "@/lib/rsvp/schema";
import { clearRsvpDraft, loadRsvpDraft, saveRsvpDraft } from "@/lib/rsvp/storage";
import { submitRsvp } from "@/lib/rsvp/submitRsvp";
import type { RsvpPayload } from "@/types/rsvp";

const defaultValues = (slug: string): RsvpFormValues => ({
  invitationSlug: slug,
  attendance: "attending",
  guestCount: 1,
  guests: [{ name: "", mealPreference: "standard" }],
  email: "",
  phone: "",
  message: "",
  dietaryNotes: "",
});

export function useRsvpForm(invitationSlug: string): {
  form: UseFormReturn<RsvpFormValues>;
  onSubmit: (values: RsvpFormValues) => Promise<import("@/types/rsvp").RsvpResult>;
} {
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: defaultValues(invitationSlug),
    mode: "onBlur",
  });

  useEffect(() => {
    const draft = loadRsvpDraft(invitationSlug);
    if (draft) {
      form.reset({ ...defaultValues(invitationSlug), ...draft });
    }
  }, [invitationSlug, form]);

  useEffect(() => {
    const sub = form.watch((values) => {
      saveRsvpDraft(invitationSlug, values as Partial<RsvpPayload>);
    });
    return () => sub.unsubscribe();
  }, [form, invitationSlug]);

  const onSubmit = useCallback(
    async (values: RsvpFormValues) => {
      const payload: RsvpPayload = {
        ...values,
        email: values.email || undefined,
        phone: values.phone || undefined,
        message: values.message || undefined,
        dietaryNotes: values.dietaryNotes || undefined,
      };
      const result = await submitRsvp(payload);
      if (result.ok) {
        clearRsvpDraft(invitationSlug);
      }
      return result;
    },
    [invitationSlug],
  );

  return { form, onSubmit };
}
