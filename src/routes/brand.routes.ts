import express from "express";
import { getAll } from "../controllers/brand.controller";

const router = express.Router();

//* get all
router.get("/", getAll);

export default router;