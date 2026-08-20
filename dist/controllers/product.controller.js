"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const brand_model_1 = __importDefault(require("../models/brand.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const apperror_utils_1 = __importDefault(require("../utils/apperror.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const populateProduct = (query) => query.populate("brand", "name logo").populate("category", "name image");
const validateReferences = async (brandId, categoryId) => {
    const [brand, category] = await Promise.all([brand_model_1.default.findById(brandId), category_model_1.default.findById(categoryId)]);
    if (!brand)
        throw new apperror_utils_1.default("brand not found", 404);
    if (!category)
        throw new apperror_utils_1.default("category not found", 404);
};
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (_req, res) => {
    const products = await populateProduct(product_model_1.default.find({}).sort({ createdAt: -1 }));
    (0, sendResponse_utils_1.sendResponse)(res, { data: products, message: "products fetched", statusCode: 200 });
});
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const product = await populateProduct(product_model_1.default.findById(req.params.id));
    if (!product)
        throw new apperror_utils_1.default("product not found", 404);
    (0, sendResponse_utils_1.sendResponse)(res, { data: product, message: "product fetched", statusCode: 200 });
});
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description, price, stock, brand, category } = req.body;
    await validateReferences(brand, category);
    const uploadedImage = req.file ? await (0, cloudinary_utils_1.uploadFileToCloudinary)(req.file) : undefined;
    const product = await product_model_1.default.create({ name, description, price, stock, brand, category, image: uploadedImage?.url, image_public_id: uploadedImage?.public_id });
    const populatedProduct = await populateProduct(product_model_1.default.findById(product._id));
    (0, sendResponse_utils_1.sendResponse)(res, { data: populatedProduct, message: "product created", statusCode: 201 });
});
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description, price, stock, brand, category } = req.body;
    const existingProduct = await product_model_1.default.findById(req.params.id);
    if (!existingProduct)
        throw new apperror_utils_1.default("product not found", 404);
    await validateReferences(brand, category);
    const uploadedImage = req.file ? await (0, cloudinary_utils_1.uploadFileToCloudinary)(req.file) : undefined;
    const product = await product_model_1.default.findByIdAndUpdate(req.params.id, { name, description, price, stock, brand, category, ...(uploadedImage && { image: uploadedImage.url, image_public_id: uploadedImage.public_id }) }, { new: true, runValidators: true });
    if (uploadedImage && existingProduct.image_public_id)
        await (0, cloudinary_utils_1.deleteFileFromCloudinary)(existingProduct.image_public_id);
    const populatedProduct = await populateProduct(product_model_1.default.findById(product?._id));
    (0, sendResponse_utils_1.sendResponse)(res, { data: populatedProduct, message: "product updated", statusCode: 200 });
});
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const product = await product_model_1.default.findByIdAndDelete(req.params.id);
    if (!product)
        throw new apperror_utils_1.default("product not found", 404);
    await (0, cloudinary_utils_1.deleteFileFromCloudinary)(product.image_public_id);
    (0, sendResponse_utils_1.sendResponse)(res, { data: product, message: "product deleted", statusCode: 200 });
});
