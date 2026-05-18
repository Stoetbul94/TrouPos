import { z } from "zod";
import { isValidSaPhone } from "@/lib/utils/phone";

const mealPreference = z.enum([
  "standard",
  "vegetarian",
  "vegan",
  "halaal",
  "kosher",
]);

const guestSchema = z.object({
  name: z.string().min(1, "Guest name is required").max(80),
  mealPreference: mealPreference.optional(),
});

export const rsvpSchema = z
  .object({
    invitationSlug: z.string().min(1),
    attendance: z.enum(["attending", "declined", "maybe"]),
    guestCount: z.number().int().min(1).max(10),
    guests: z.array(guestSchema),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length === 0 || isValidSaPhone(val),
        "Enter a valid SA mobile number (+27 or 0)",
      ),
    message: z.string().max(500).optional(),
    dietaryNotes: z.string().max(300).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.attendance === "attending") {
      if (data.guests.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Add at least one guest name",
          path: ["guests"],
        });
      }
      if (data.guests.length !== data.guestCount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Guest names must match guest count",
          path: ["guests"],
        });
      }
    }
  });

export type RsvpFormValues = z.infer<typeof rsvpSchema>;
