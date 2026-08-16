"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_config_1 = require("./env.config");
cloudinary_1.v2.config({
    cloud_name: env_config_1.ENV_CONFIG.Cloudinary_Cloud_Name,
    api_key: env_config_1.ENV_CONFIG.Cloudinary_API_Key,
    api_secret: env_config_1.ENV_CONFIG.Cloudinary_API_Secret,
});
exports.default = cloudinary_1.v2;
