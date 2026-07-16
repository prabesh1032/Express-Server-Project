import express from "express";
import { login, register } from "../controllers/auth.controller";
import { registerSchema } from "../validators/auth.validator";
import { validator } from "../validators/middleware.validator";
import { loginSchema } from "../validators/auth.validator";
import { multerUploder } from "../validators/multer.middleware";

const router = express.Router();
const upload = multerUploder();

router.post(
  "/register",
  upload.single("profile_image"), //multer uploading
  validator(registerSchema),
  register,
);
router.post("/login", validator(loginSchema), login);
export default router;
