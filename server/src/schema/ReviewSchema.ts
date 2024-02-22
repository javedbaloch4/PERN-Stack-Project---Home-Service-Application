import { z } from "zod";

export const createReview = z.object({
  body: z.object({
    rating: z.number(),
    comment: z.string().min(1, { message: "Should at at least 1 char" }),
    serviceId: z.number(),
    userId: z.number(),
  }),
});

export const updateReview = z.object({
  body: z.object({
    rating: z
      .number()
      .min(1, { message: "Rating should be greater than 1 character!" })
      .max(5, { message: "Rating should be max 5" })
      .optional(),

    comment: z
      .string()
      .min(1, { message: "Should at at least 1 char" })
      .optional(),
  }),
});
