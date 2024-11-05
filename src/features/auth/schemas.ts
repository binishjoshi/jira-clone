import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(4, "Minimum 4 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .max(256, "Maximum 256 characters"),
});
