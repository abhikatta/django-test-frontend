import { z } from "zod";

export const createCrewSchema = z.object({
  first_name: z
    .string()
    .min(5, "First name is required.")
    .max(15, "Max characters exceeded."),
  last_name: z
    .string()
    .min(5, "Last name is required.")
    .max(15, "Max characters exceeded."),
  email: z
    .string()
    .email()
    .min(5, "Email must be atleast 5 characters.")
    .email("Invalid email address"),
  is_active: z.coerce.boolean().default(true),
  is_tasked: z.coerce.boolean().default(false),
  hourly_wage: z.string().default("0"),
});

export type CreateCrewSchema = z.infer<typeof createCrewSchema>;
