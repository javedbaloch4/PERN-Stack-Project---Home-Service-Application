import { z } from "zod";

export const createService = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Rating should be greater than 1 character!" }),
    description: z.string(),
    location: z.string(),
    price: z.number(),
    categoryId: z.number(),
  }),
});

export const updateService = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Rating should be greater than 1 character!" })
      .optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    price: z.number().optional(),
    status: z.boolean().optional(),
    categoryId: z.number().optional(),
  }),
});
