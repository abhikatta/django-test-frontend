import { z } from "zod";
export const createClientSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name is required.")
    .max(15, "Max characters exceeded."),
  last_name: z
    .string()
    .min(3, "Last name is required.")
    .max(15, "Max characters exceeded."),
  phone_number: z.coerce.number().min(10, "Pleae enter valid phone number."),
  address: z.string().min(5, "Please enter detailed address."),
  ongoing_work: z.coerce.boolean(),
});

export type CreateClientSchemaType = z.infer<typeof createClientSchema>;
