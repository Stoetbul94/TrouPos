"use client";

import { useState } from "react";
import { useRsvpForm } from "@/hooks/useRsvpForm";
import { FormField } from "./FormField";
import { GuestFields } from "./GuestFields";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/motion/MotionSection";
import { cn } from "@/lib/utils/cn";

export function RsvpForm({
  invitationSlug,
  className,
  variant = "dark",
}: {
  invitationSlug: string;
  className?: string;
  variant?: "dark" | "light";
}) {
  const { form, onSubmit } = useRsvpForm(invitationSlug);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState<string>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const attendance = watch("attendance");
  const guestCount = watch("guestCount");

  const syncGuests = (count: number) => {
    const current = form.getValues("guests");
    const next = [...current];
    while (next.length < count) {
      next.push({ name: "", mealPreference: "standard" });
    }
    setValue("guests", next.slice(0, count));
    setValue("guestCount", count);
  };

  const submit = handleSubmit(async (values) => {
    setStatus("submitting");
    const result = await onSubmit(values);
    if (result.ok) {
      setReference(result.reference);
      setStatus("success");
    } else {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <Container narrow className={className}>
        <div className="py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Thank you</p>
          <h2 className="mt-4 font-display text-3xl">RSVP received</h2>
          {reference && (
            <p className="mt-2 text-sm text-ivory/60">Reference: {reference}</p>
          )}
        </div>
      </Container>
    );
  }

  return (
    <Container narrow className={cn(className, variant === "light" && "text-charcoal")}>
      <MotionSection>
        <div id="rsvp" className="scroll-mt-24 py-8">
          <h2 className="text-center font-display text-3xl font-light">RSVP</h2>
          <p className="mt-2 text-center text-sm text-ivory/60">
            Kindly respond at your earliest convenience
          </p>

          <form onSubmit={submit} className="mt-10 space-y-6" noValidate>
            <FormField label="Will you attend?" error={errors.attendance?.message}>
              <div className="flex flex-wrap gap-3">
                {(["attending", "declined", "maybe"] as const).map((value) => (
                  <label
                    key={value}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm capitalize transition",
                      attendance === value
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-ivory/20 text-ivory/70",
                    )}
                  >
                    <input
                      type="radio"
                      value={value}
                      className="sr-only"
                      {...register("attendance")}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </FormField>

            {attendance === "attending" && (
              <>
                <FormField
                  label="Number of guests"
                  htmlFor="guestCount"
                  error={errors.guestCount?.message}
                >
                  <Input
                    id="guestCount"
                    type="number"
                    min={1}
                    max={10}
                    {...register("guestCount", {
                      valueAsNumber: true,
                      onChange: (e) => syncGuests(Number(e.target.value) || 1),
                    })}
                  />
                </FormField>

                <div className="space-y-4">
                  {Array.from({ length: guestCount }).map((_, i) => (
                    <GuestFields key={i} form={form} index={i} />
                  ))}
                </div>
                {errors.guests?.message && (
                  <p className="text-xs text-red-400">{errors.guests.message}</p>
                )}
              </>
            )}

            <FormField label="Email (optional)" htmlFor="email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
              />
            </FormField>

            <FormField
              label="Mobile (optional)"
              htmlFor="phone"
              error={errors.phone?.message}
            >
              <Input
                id="phone"
                type="tel"
                placeholder="+27 or 082..."
                autoComplete="tel"
                {...register("phone")}
              />
            </FormField>

            <FormField label="Message" htmlFor="message">
              <Textarea id="message" rows={3} {...register("message")} />
            </FormField>

            {attendance === "attending" && (
              <FormField label="Dietary notes" htmlFor="dietaryNotes">
                <Textarea id="dietaryNotes" rows={2} {...register("dietaryNotes")} />
              </FormField>
            )}

            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}

            <Button type="submit" fullWidth disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send RSVP"}
            </Button>
          </form>
        </div>
      </MotionSection>
    </Container>
  );
}
