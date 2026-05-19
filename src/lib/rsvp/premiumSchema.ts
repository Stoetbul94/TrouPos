import { z } from "zod";

export const premiumRsvpSchema = z
  .object({
    invitationSlug: z.string().min(1),
    fullName: z
      .string()
      .min(2, "Please enter your full name")
      .max(80, "Name is too long"),
    attending: z.enum(["yes", "no"], {
      message: "Please let us know if you can attend",
    }),
    guestCount: z.number().int().min(1, "At least 1 guest").max(10).optional(),
    dietaryRequirements: z.string().max(300, "Maximum 300 characters").optional(),
    personalMessage: z.string().max(500, "Maximum 500 characters").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.attending === "yes") {
      if (!data.guestCount || data.guestCount < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter number of guests",
          path: ["guestCount"],
        });
      }
    }
  });

export type PremiumRsvpFormValues = z.infer<typeof premiumRsvpSchema>;
