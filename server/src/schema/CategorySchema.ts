import { z } from "zod";

export const createCategory = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name should be greater than 1 character!" }),
  }),
});

export const updateCategory = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name should be greater than 1 character!" }),
  }),
});
