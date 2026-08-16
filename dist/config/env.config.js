"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_CONFIG = void 0;
require("dotenv/config");
exports.ENV_CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:3000",
    DB_URL: process.env.DB_URL,
    Cloudinary_Cloud_Name: process.env.Cloudinary_Cloud_Name,
    Cloudinary_API_Key: process.env.Cloudinary_API_Key,
    Cloudinary_API_Secret: process.env.Cloudinary_API_Secret,
};
