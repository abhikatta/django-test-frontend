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
  role: z.string(),
});

export type CreateCrewSchemaType = z.infer<typeof createCrewSchema>;

export const signupSchema = z
  .object({
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
    password: z.string().min(8, "Password must have atleast 8 characters"),
    confirm_password: z
      .string()
      .min(8, "Password must have atleast 8 characters"),
  })
  .refine(({ password, confirm_password }) => password !== confirm_password, {
    message: "Passwords do not match",
  })
  .refine(
    ({ password, confirm_password }) =>
      password === confirm_password && password.trim() === "",
    {
      message: "Passwords should not have any spaces.",
    }
  );
export type SignupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: z
    .string()
    .email("Invalid Email address")
    .nonempty("Email is required!"),
  password: z.string().min(8, "Password should have minimun of 8 characters"),
});
export type LoginSchemaType = z.infer<typeof createCrewSchema>;
