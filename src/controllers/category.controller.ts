import { Request, Response } from "express";
import Category from "../models/category.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/apperror.utils";
import { deleteFileFromCloudinary, uploadFileToCloudinary } from "../utils/cloudinary.utils";

export const getAll = catchAsync(async (_req: Request, res: Response) => {
  const categories = await Category.find({}).sort({ createdAt: -1 });
  sendResponse(res, { data: categories, message: "categories fetched", statusCode: 200 });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new AppError("category not found", 404);
  sendResponse(res, { data: category, message: "category fetched", statusCode: 200 });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const uploadedImage = req.file ? await uploadFileToCloudinary(req.file) : undefined;
  const category = await Category.create({
    name,
    description: description || undefined,
    image: uploadedImage?.url,
    image_public_id: uploadedImage?.public_id,
  });
  sendResponse(res, { data: category, message: "category created", statusCode: 201 });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const existingCategory = await Category.findById(req.params.id);
  if (!existingCategory) throw new AppError("category not found", 404);
  const uploadedImage = req.file ? await uploadFileToCloudinary(req.file) : undefined;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, description: description || undefined, ...(uploadedImage && { image: uploadedImage.url, image_public_id: uploadedImage.public_id }) },
    { new: true, runValidators: true },
  );
  if (uploadedImage && existingCategory.image_public_id) await deleteFileFromCloudinary(existingCategory.image_public_id);
  sendResponse(res, { data: category, message: "category updated", statusCode: 200 });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new AppError("category not found", 404);
  await deleteFileFromCloudinary(category.image_public_id);
  sendResponse(res, { data: category, message: "category deleted", statusCode: 200 });
});
