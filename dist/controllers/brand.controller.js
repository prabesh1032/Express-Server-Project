"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAll = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const apperror_utils_1 = __importDefault(require("../utils/apperror.utils"));
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
//* update
//* delete
