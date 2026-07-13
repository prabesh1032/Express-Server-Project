import { z } from "zod";
export const registerSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(50, { message: "Full name must be less than 50 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string("password must be string")
    .min(6, { message: "Password must be at least 6 characters long" }),
});
