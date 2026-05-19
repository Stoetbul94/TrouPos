"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { usePremiumRsvpForm } from "@/hooks/usePremiumRsvpForm";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Container } from "@/components/layout/Container";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import { RsvpAttendingToggle } from "./RsvpAttendingToggle";
import { RsvpSubmitButton } from "./RsvpSubmitButton";
import { RsvpSuccessState } from "./RsvpSuccessState";
import type { PremiumRsvpFormProps, RsvpFormStatus } from "./types";

export function PremiumRsvpForm({
  invitationSlug,
  className,
  variant = "dark",
  title = "RSVP",
  description = "Kindly respond at your earliest convenience",
}: PremiumRsvpFormProps) {
  const { form, onSubmit } = usePremiumRsvpForm(invitationSlug);
  const [status, setStatus] = useState<RsvpFormStatus>("idle");
  const [reference, setReference] = useState<string>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;

  const attending = watch("attending");
  const isAttending = attending === "yes";
  const isLight = variant === "light";

  const submit = handleSubmit(async (values) => {
    setStatus("submitting");
    try {
      const result = await onSubmit(values);
      if (result.ok) {
        setReference(result.reference);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  });

  const handleReset = () => {
    reset();
    setStatus("idle");
    setReference(undefined);
  };

  if (status === "success") {
    return (
      <Container narrow className={className}>
        <RsvpSuccessState
          reference={reference}
          variant={variant}
          onReset={handleReset}
        />
      </Container>
    );
  }

  return (
    <Container narrow className={cn(className, isLight && "text-charcoal")}>
      <m.div
        id="rsvp"
        className="scroll-mt-24 py-8 sm:py-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="text-center">
          <p
            className={cn(
              "text-xs uppercase tracking-[0.35em]",
              isLight ? "text-gold-muted" : "text-gold",
            )}
          >
            Respond
          </p>
          <h2
            className={cn(
              "mt-3 font-display text-3xl font-light sm:text-4xl",
              isLight ? "text-charcoal" : "text-ivory",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mx-auto mt-2 max-w-sm text-sm leading-relaxed",
              isLight ? "text-charcoal/60" : "text-ivory/60",
            )}
          >
            {description}
          </p>
        </m.div>

        <m.form
          variants={fadeUp}
          onSubmit={submit}
          className={cn(
            "mt-10 space-y-6 rounded-2xl border p-6 sm:p-8",
            isLight
              ? "border-gold/15 bg-white/60 shadow-sm"
              : "border-ivory/10 bg-ivory/[0.02]",
          )}
          noValidate
        >
          <FormField
            label="Full name"
            htmlFor="fullName"
            error={errors.fullName?.message}
            className="mb-0"
          >
            <Input
              id="fullName"
              placeholder="Your name as on the invitation"
              autoComplete="name"
              className={isLight ? "border-charcoal/15 bg-white text-charcoal" : undefined}
              {...register("fullName")}
            />
          </FormField>

          <FormField label="Will you attend?" className="mb-0">
            <RsvpAttendingToggle
              name="attending"
              value={attending}
              onChange={(v) => setValue("attending", v, { shouldValidate: true })}
              variant={variant}
              error={errors.attending?.message}
            />
          </FormField>

          <AnimatePresence mode="wait">
            {isAttending && (
              <m.div
                key="attending-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6 overflow-hidden"
              >
                <FormField
                  label="Number of guests"
                  htmlFor="guestCount"
                  error={errors.guestCount?.message}
                  className="mb-0"
                >
                  <Input
                    id="guestCount"
                    type="number"
                    min={1}
                    max={10}
                    inputMode="numeric"
                    className={isLight ? "border-charcoal/15 bg-white text-charcoal" : undefined}
                    {...register("guestCount", { valueAsNumber: true })}
                  />
                </FormField>

                <FormField
                  label="Dietary requirements"
                  htmlFor="dietaryRequirements"
                  error={errors.dietaryRequirements?.message}
                  className="mb-0"
                >
                  <Textarea
                    id="dietaryRequirements"
                    rows={3}
                    placeholder="Allergies, vegetarian, halaal, etc."
                    className={isLight ? "border-charcoal/15 bg-white text-charcoal" : undefined}
                    {...register("dietaryRequirements")}
                  />
                </FormField>
              </m.div>
            )}
          </AnimatePresence>

          <FormField
            label="Personal message"
            htmlFor="personalMessage"
            error={errors.personalMessage?.message}
            className="mb-0"
          >
            <Textarea
              id="personalMessage"
              rows={3}
              placeholder="A note for the couple (optional)"
              className={isLight ? "border-charcoal/15 bg-white text-charcoal" : undefined}
              {...register("personalMessage")}
            />
          </FormField>

          <AnimatePresence>
            {status === "error" && (
              <m.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-red-400"
                role="alert"
              >
                Something went wrong. Please try again.
              </m.p>
            )}
          </AnimatePresence>

          <RsvpSubmitButton isLoading={status === "submitting"} variant={variant} />
        </m.form>
      </m.div>
    </Container>
  );
}
