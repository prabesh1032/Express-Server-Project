"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, "name is required"], minLength: 3, trim: true },
    description: { type: String, required: [true, "description is required"], minLength: 10, trim: true },
    price: { type: Number, required: [true, "price is required"], min: 0 },
    stock: { type: Number, required: [true, "stock is required"], min: 0, default: 0 },
    image: { type: String, required: false },
    image_public_id: { type: String, required: false },
    brand: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "brand", required: [true, "brand is required"] },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "category", required: [true, "category is required"] },
}, { timestamps: true });
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
