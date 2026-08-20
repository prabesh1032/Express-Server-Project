"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorhandlermiddleware_1 = __importDefault(require("./middleware/errorhandlermiddleware"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const env_config_1 = require("./config/env.config");
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: env_config_1.ENV_CONFIG.CLIENT_URL,
    credentials: true,
}));
//health check routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running !!!!!!!!!!",
        success: true,
        status: "success",
        data: null,
    });
});
//using routes
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/brands", brand_routes_1.default);
app.use("/api/v1/categories", category_routes_1.default);
app.use("/api/v1/products", product_routes_1.default);
//using path not found route
app.use((req, res) => {
    const message = `cannot ${req.method} on ${req.path}`;
    const error = new Error(message);
    error.statusCode = 404;
    error.status = "fail";
    throw error;
});
//error handler middleware
app.use(errorhandlermiddleware_1.default);
exports.default = app;
