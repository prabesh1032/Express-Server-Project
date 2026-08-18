"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const apperror_utils_1 = __importDefault(require("../utils/apperror.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
//* get all
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const brands = await brand_model_1.default.find({});
    //* send success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: brands,
        message: "brands fetched",
        statusCode: 200,
    });
});
//* get by id
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findOne({ _id: id });
    if (!brand)
        throw new apperror_utils_1.default("brand not found", 404);
    //* send success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: brand,
        message: "brand fetched",
        statusCode: 200,
    });
});
//* create
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description } = req.body;
    const uploadedLogo = req.file
        ? await (0, cloudinary_utils_1.uploadFileToCloudinary)(req.file)
        : undefined;
    const brand = await brand_model_1.default.create({
        name,
        description: description || undefined,
        logo: uploadedLogo?.url,
        logo_public_id: uploadedLogo?.public_id,
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: brand,
        message: "brand created",
        statusCode: 201,
    });
});
//* update
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const existingBrand = await brand_model_1.default.findById(id);
    if (!existingBrand)
        throw new apperror_utils_1.default("brand not found", 404);
    const uploadedLogo = req.file
        ? await (0, cloudinary_utils_1.uploadFileToCloudinary)(req.file)
        : undefined;
    const brand = await brand_model_1.default.findByIdAndUpdate(id, {
        name,
        description: description || undefined,
        ...(uploadedLogo && {
            logo: uploadedLogo.url,
            logo_public_id: uploadedLogo.public_id,
        }),
    }, { new: true, runValidators: true });
    if (uploadedLogo && existingBrand.logo_public_id) {
        await (0, cloudinary_utils_1.deleteFileFromCloudinary)(existingBrand.logo_public_id);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: brand,
        message: "brand updated",
        statusCode: 200,
    });
});
//* delete
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findByIdAndDelete(id);
    if (!brand)
        throw new apperror_utils_1.default("brand not found", 404);
    await (0, cloudinary_utils_1.deleteFileFromCloudinary)(brand.logo_public_id);
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: brand,
        message: "brand deleted",
        statusCode: 200,
    });
});
