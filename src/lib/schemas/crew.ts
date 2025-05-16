import { z } from "zod";
export const createCrewSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name is required.")
    .max(15, "Max characters exceeded."),
  last_name: z
    .string()
    .min(3, "Last name is required.")
    .max(15, "Max characters exceeded."),
  email: z
    .string()
    .email()
    .min(5, "Email must be atleast 5 characters.")
    .email("Invalid email address"),
  is_active: z.boolean(),
  is_tasked: z.boolean(),
  hourly_wage: z.coerce.number().min(0),
  role: z.string(),
});

export type CreateCrewSchemaType = z.infer<typeof createCrewSchema>;
