import { z } from "zod";
import { ROLE } from "../utils/common";

export const registerUser = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name should be greater than 1 characters" }),

    email: z
      .string()
      .email()
      .min(1, { message: "Email should be greater than 1 characters" }),

    password: z
      .string()
      .min(5, { message: "Name should be greater than 1 characters" }),

    role: z.enum(Object.values(ROLE) as any),

    gender: z.string(),
    age: z.number(),
  }),
});

export const loginUser = z.object({
  body: z.object({
    email: z
      .string()
      .email()
      .min(1, { message: "Email should be greater than 1 characters" }),

    password: z
      .string()
      .min(5, { message: "Name should be greater than 1 characters" }),
  }),
});
