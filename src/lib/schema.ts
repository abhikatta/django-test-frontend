import { z } from "zod";
export const createCrewSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name is required.")
    .max(15, "Max characters exceeded.")
    .default("First name"),
  last_name: z
    .string()
    .min(3, "Last name is required.")
    .max(15, "Max characters exceeded.")
    .default(""),
  email: z
    .string()
    .email()
    .min(5, "Email must be atleast 5 characters.")
    .email("Invalid email address")
    .default(""),
  is_active: z.boolean().default(true),
  is_tasked: z.boolean().default(false),
  hourly_wage: z.coerce.number().min(0).default(0),
});

export type CreateCrewSchema = z.infer<typeof createCrewSchema>;
