import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], minLength: 3, trim: true },
    description: { type: String, required: [true, "description is required"], minLength: 10, trim: true },
    price: { type: Number, required: [true, "price is required"], min: 0 },
    stock: { type: Number, required: [true, "stock is required"], min: 0, default: 0 },
    image: { type: String, required: false },
    image_public_id: { type: String, required: false },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "brand", required: [true, "brand is required"] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: [true, "category is required"] },
  },
  { timestamps: true },
);

const Product = mongoose.model("product", productSchema);
export default Product;
