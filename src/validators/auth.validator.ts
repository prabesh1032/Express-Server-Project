import { z } from "zod";
export const registerSchema = z.object({
  body: z.object({
    full_name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Full_name is requird"
            : "full name must be string",
      })
      .min(1, { error: "Full name is required" })
      .max(50, { error: "Full name must be less than 50 characters" }),
    email: z
      .email({ error: "Invalid email address" })
      .min(1, { error: "Email is required" }),
    password: z
      .string("password must be a string")
      .min(6, { error: "Password must be at least 6 characters long" }),
    user_name: z
      .string("user_name must be a string")
      .min(1, { error: "User name is required" })
      .max(30, { error: "User name must be less than 30 characters" }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .email({ error: "Invalid email address" })
      .min(1, { error: "Email is required" }),
    password: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "password is required"
          : "password must be string",
    }),
  }),
});
