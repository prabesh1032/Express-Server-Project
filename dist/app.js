"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorhandlermiddleware_1 = __importDefault(require("./middleware/errorhandlermiddleware"));
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
//health check routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running !!!!!!!!!!",
        sucess: true,
        status: "sucess",
        data: null,
    });
});
//using routes
//using path not found route
app.use((req, res) => {
    const message = "can not ${req.method} on ${req.path}";
    res.status(404).json({
        message,
        status: "fail",
        success: false,
        data: null,
    });
});
//error handler middleware
app.use(errorhandlermiddleware_1.default);
exports.default = app;
