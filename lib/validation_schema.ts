import { z } from "zod";

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Name contains invalid characters"),

  email: z.email("Please enter a valid email address"),

  comment: z
    .string()
    .min(1, "Comment is required")
    .max(500, "Comment is too long"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;