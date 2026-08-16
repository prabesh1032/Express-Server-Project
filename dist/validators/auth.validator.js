"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z
            .string({
            error: (issue) => issue.input === undefined
                ? "Full_name is requird"
                : "full name must be string",
        })
            .min(1, { error: "Full name is required" })
            .max(50, { error: "Full name must be less than 50 characters" }),
        email: zod_1.z
            .email({ error: "Invalid email address" })
            .min(1, { error: "Email is required" }),
        password: zod_1.z
            .string("password must be a string")
            .min(6, { error: "Password must be at least 6 characters long" }),
        user_name: zod_1.z
            .string("user_name must be a string")
            .min(1, { error: "User name is required" })
            .max(30, { error: "User name must be less than 30 characters" }),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .email({ error: "Invalid email address" })
            .min(1, { error: "Email is required" }),
        password: zod_1.z.string({
            error: (issue) => issue.input === undefined
                ? "password is required"
                : "password must be string",
        }),
    }),
});
