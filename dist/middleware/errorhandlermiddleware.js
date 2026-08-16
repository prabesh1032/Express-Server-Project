"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    let statusCode = error?.statusCode ?? 500;
    const message = error?.message ?? "Internal Server Error";
    const status = error?.status ?? "error";
    const success = false;
    console.log(error);
    if (error.code === 11000) {
        statusCode = 409;
    }
    res.status(statusCode).json({
        message,
        status,
        success,
        data: null,
        stack: error?.stack ?? null,
        errors: error?.errors ?? null,
    });
};
exports.default = errorHandler;
