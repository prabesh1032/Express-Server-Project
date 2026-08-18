"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../controllers/brand.controller");
const multer_middleware_1 = require("../validators/multer.middleware");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUploder)();
//* get all
router.get("/", brand_controller_1.getAll);
router.get("/:id", brand_controller_1.getById);
router.post("/", upload.single("logo"), brand_controller_1.create);
router.patch("/:id", upload.single("logo"), brand_controller_1.update);
router.delete("/:id", brand_controller_1.remove);
exports.default = router;
