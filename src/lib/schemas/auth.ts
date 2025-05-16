import { z } from "zod";

export const signupSchema = z.object({
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
  password: z.string().min(8, "Password must have atleast 8 characters"),
  confirm_password: z
    .string()
    .min(8, "Password must have atleast 8 characters"),
});

export const loginSchema = z.object({
  username: z
    .string()
    .email("Invalid Email address")
    .nonempty("Email is required!"),
  password: z.string().min(8, "Password should have minimun of 8 characters"),
});
