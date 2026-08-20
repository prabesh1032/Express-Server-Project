"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const apperror_utils_1 = __importDefault(require("../utils/apperror.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (_req, res) => {
    const categories = await category_model_1.default.find({}).sort({ createdAt: -1 });
    (0, sendResponse_utils_1.sendResponse)(res, { data: categories, message: "categories fetched", statusCode: 200 });
});
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const category = await category_model_1.default.findById(req.params.id);
    if (!category)
        throw new apperror_utils_1.default("category not found", 404);
    (0, sendResponse_utils_1.sendResponse)(res, { data: category, message: "category fetched", statusCode: 200 });
});
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description } = req.body;
    const uploadedImage = req.file ? await (0, cloudinary_utils_1.uploadFileToCloudinary)(req.file) : undefined;
    const category = await category_model_1.default.create({
        name,
        description: description || undefined,
        image: uploadedImage?.url,
        image_public_id: uploadedImage?.public_id,
    });
    (0, sendResponse_utils_1.sendResponse)(res, { data: category, message: "category created", statusCode: 201 });
});
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description } = req.body;
    const existingCategory = await category_model_1.default.findById(req.params.id);
    if (!existingCategory)
        throw new apperror_utils_1.default("category not found", 404);
    const uploadedImage = req.file ? await (0, cloudinary_utils_1.uploadFileToCloudinary)(req.file) : undefined;
    const category = await category_model_1.default.findByIdAndUpdate(req.params.id, { name, description: description || undefined, ...(uploadedImage && { image: uploadedImage.url, image_public_id: uploadedImage.public_id }) }, { new: true, runValidators: true });
    if (uploadedImage && existingCategory.image_public_id)
        await (0, cloudinary_utils_1.deleteFileFromCloudinary)(existingCategory.image_public_id);
    (0, sendResponse_utils_1.sendResponse)(res, { data: category, message: "category updated", statusCode: 200 });
});
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const category = await category_model_1.default.findByIdAndDelete(req.params.id);
    if (!category)
        throw new apperror_utils_1.default("category not found", 404);
    await (0, cloudinary_utils_1.deleteFileFromCloudinary)(category.image_public_id);
    (0, sendResponse_utils_1.sendResponse)(res, { data: category, message: "category deleted", statusCode: 200 });
});
