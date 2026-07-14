import express from "express";
import { login, register } from "../controllers/auth.controller";
import { registerSchema } from "../validators/auth.validator";
import { validator } from "../validators/middleware.validator";
import { loginSchema } from "../validators/auth.validator";

const router = express.Router();
router.post("/register",validator(registerSchema), register);
router.post("/login",validator(loginSchema), login);
export default router;
