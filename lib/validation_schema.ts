import { z } from "zod";

export const bookingSchema = z.object({
 name: z
  .string()
    .trim()
  .min(2, "Please enter your name.")
  .regex(/^[\p{L}\s'-]+$/u, "Please enter your name."),

  email: z.email("Please enter a valid email address"),

  comment: z
    .string()
    .min(1, "Comment is required")
    .max(500, "Comment is too long"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;