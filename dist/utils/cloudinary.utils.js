"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToCloudinary = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const fs_1 = __importDefault(require("fs"));
const apperror_utils_1 = __importDefault(require("./apperror.utils"));
const uploadFileToCloudinary = async (file) => {
    try {
        const uploadFolder = "mern_project";
        const { secure_url, public_id } = await cloudinary_config_1.default.uploader.upload(file.path, {
            folder: uploadFolder,
            unique_filename: true,
        });
        // Delete local file after successful upload
        if (fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        return {
            url: secure_url,
            public_id,
        };
    }
    catch (error) {
        console.error(error);
        // Delete local file if it exists
        if (file && fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        throw new apperror_utils_1.default("Failed to upload file to Cloudinary", 500);
    }
};
exports.uploadFileToCloudinary = uploadFileToCloudinary;
