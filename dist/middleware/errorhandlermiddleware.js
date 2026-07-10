"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorhaldler = (error, req, res, next) => {
    const statusCode = error?.ststusCode ?? 500;
    const message = error?.message ?? "Internal Server Error";
    const status = error?.ststus ?? "error";
    const success = false;
    res.status(statusCode).json({
        message,
        status,
        success,
        data: null,
        stack: error?.stack ?? null,
    });
};
exports.default = errorhaldler;
