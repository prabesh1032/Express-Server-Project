"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const middleware_validator_1 = require("../validators/middleware.validator");
const auth_validator_2 = require("../validators/auth.validator");
const multer_middleware_1 = require("../validators/multer.middleware");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUploder)();
router.post("/register", upload.single("profile_image"), //multer uploading
(0, middleware_validator_1.validator)(auth_validator_1.registerSchema), auth_controller_1.register);
router.post("/login", (0, middleware_validator_1.validator)(auth_validator_2.loginSchema), auth_controller_1.login);
exports.default = router;
