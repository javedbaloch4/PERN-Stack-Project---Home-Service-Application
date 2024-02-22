import { z } from "zod";

export const createNotesSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must be greater than 1 characters!" }),
    description: z
      .string()
      .min(1, { message: "Description must be greater than 4 characters" }),
  }),
});

export const updateNotesSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
      description: z
        .string()
        .min(1, { message: "Description must be greater than 4 characters" }),
    })
    .partial(),
});
