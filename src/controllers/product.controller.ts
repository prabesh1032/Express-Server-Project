import { Request, Response } from "express";
import Product from "../models/product.model";
import Brand from "../models/brand.model";
import Category from "../models/category.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/apperror.utils";
import { deleteFileFromCloudinary, uploadFileToCloudinary } from "../utils/cloudinary.utils";

const populateProduct = (query: any) => query.populate("brand", "name logo").populate("category", "name image");

const validateReferences = async (brandId: string, categoryId: string) => {
  const [brand, category] = await Promise.all([Brand.findById(brandId), Category.findById(categoryId)]);
  if (!brand) throw new AppError("brand not found", 404);
  if (!category) throw new AppError("category not found", 404);
};

export const getAll = catchAsync(async (_req: Request, res: Response) => {
  const products = await populateProduct(Product.find({}).sort({ createdAt: -1 }));
  sendResponse(res, { data: products, message: "products fetched", statusCode: 200 });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const product = await populateProduct(Product.findById(req.params.id));
  if (!product) throw new AppError("product not found", 404);
  sendResponse(res, { data: product, message: "product fetched", statusCode: 200 });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const { name, description, price, stock, brand, category } = req.body;
  await validateReferences(brand, category);
  const uploadedImage = req.file ? await uploadFileToCloudinary(req.file) : undefined;
  const product = await Product.create({ name, description, price, stock, brand, category, image: uploadedImage?.url, image_public_id: uploadedImage?.public_id });
  const populatedProduct = await populateProduct(Product.findById(product._id));
  sendResponse(res, { data: populatedProduct, message: "product created", statusCode: 201 });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const { name, description, price, stock, brand, category } = req.body;
  const existingProduct = await Product.findById(req.params.id);
  if (!existingProduct) throw new AppError("product not found", 404);
  await validateReferences(brand, category);
  const uploadedImage = req.file ? await uploadFileToCloudinary(req.file) : undefined;
  const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, stock, brand, category, ...(uploadedImage && { image: uploadedImage.url, image_public_id: uploadedImage.public_id }) }, { new: true, runValidators: true });
  if (uploadedImage && existingProduct.image_public_id) await deleteFileFromCloudinary(existingProduct.image_public_id);
  const populatedProduct = await populateProduct(Product.findById(product?._id));
  sendResponse(res, { data: populatedProduct, message: "product updated", statusCode: 200 });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new AppError("product not found", 404);
  await deleteFileFromCloudinary(product.image_public_id);
  sendResponse(res, { data: product, message: "product deleted", statusCode: 200 });
});
