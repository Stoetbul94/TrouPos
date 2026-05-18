"use client";

import type { UseFormReturn } from "react-hook-form";
import type { RsvpFormValues } from "@/lib/rsvp/schema";
import { FormField } from "./FormField";
import { Input } from "@/components/ui/Input";

const mealOptions = [
  { value: "standard", label: "Standard" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "halaal", label: "Halaal" },
  { value: "kosher", label: "Kosher" },
] as const;

export function GuestFields({
  form,
  index,
}: {
  form: UseFormReturn<RsvpFormValues>;
  index: number;
}) {
  const {
    register,
    formState: { errors },
  } = form;
  const guestErrors = errors.guests?.[index];

  return (
    <fieldset className="rounded-lg border border-ivory/10 p-4">
      <legend className="px-2 text-xs uppercase tracking-widest text-gold">
        Guest {index + 1}
      </legend>
      <FormField
        label="Full name"
        htmlFor={`guest-${index}-name`}
        error={guestErrors?.name?.message}
      >
        <Input
          id={`guest-${index}-name`}
          {...register(`guests.${index}.name`)}
          placeholder="Name as on invitation"
          autoComplete="name"
        />
      </FormField>
      <FormField label="Meal preference" htmlFor={`guest-${index}-meal`}>
        <select
          id={`guest-${index}-meal`}
          className="min-h-11 w-full rounded-lg border border-ivory/15 bg-charcoal/40 px-4 text-sm text-ivory"
          {...register(`guests.${index}.mealPreference`)}
        >
          {mealOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FormField>
    </fieldset>
  );
}
