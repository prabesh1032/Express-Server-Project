import express, { Request } from "express";
import { login, register } from "../controllers/auth.controller";
import { registerSchema } from "../validators/auth.validator";
import { validator } from "../validators/middleware.validator";
import { loginSchema } from "../validators/auth.validator";
import multer from "multer";

const router = express.Router();

const myStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    const folder = "uploads/";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: myStorage });

router.post(
  "/register",
  upload.single("profile_image"),
  validator(registerSchema),
  register,
);
router.post("/login", validator(loginSchema), login);
export default router;
