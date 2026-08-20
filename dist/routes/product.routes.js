"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const multer_middleware_1 = require("../validators/multer.middleware");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUploder)();
router.get("/", product_controller_1.getAll);
router.get("/:id", product_controller_1.getById);
router.post("/", upload.single("image"), product_controller_1.create);
router.patch("/:id", upload.single("image"), product_controller_1.update);
router.delete("/:id", product_controller_1.remove);
exports.default = router;
