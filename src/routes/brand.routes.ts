import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/brand.controller";
import { multerUploder } from "../validators/multer.middleware";

const router = express.Router();
const upload = multerUploder();

//* get all
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", upload.single("logo"), create);
router.patch("/:id", upload.single("logo"), update);
router.delete("/:id", remove);

export default router;
