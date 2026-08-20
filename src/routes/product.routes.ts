import express from "express";
import { create, getAll, getById, remove, update } from "../controllers/product.controller";
import { multerUploder } from "../validators/multer.middleware";

const router = express.Router();
const upload = multerUploder();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", upload.single("image"), create);
router.patch("/:id", upload.single("image"), update);
router.delete("/:id", remove);

export default router;
