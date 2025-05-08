import { z } from "zod";

export const createAccountSchema = z.object({
  first_name: z
    .string()
    .min(5, "First name is required.")
    .max(15, "Max characters exceeded."),
  last_name: z
    .string()
    .min(5, "First name is required.")
    .max(15, "Max characters exceeded."),
  email: z
    .string()
    .email()
    .min(5, "Email must be atleast 5 characters.")
    .email("Invalid email address"),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
