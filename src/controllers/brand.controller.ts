import { NextFunction, Request, Response } from "express";
import Brand from "../models/brand.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/apperror.utils";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils";

//* get all
export const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const brands = await Brand.find({});

    //* send success response
    sendResponse(res, {
      data: brands,
      message: "brands fetched",
      statusCode: 200,
    });
  },
);

//* get by id
export const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const brand = await Brand.findOne({ _id: id });

  if (!brand) throw new AppError("brand not found", 404);
  //* send success response
  sendResponse(res, {
    data: brand,
    message: "brand fetched",
    statusCode: 200,
  });
});

//* create
export const create = catchAsync(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const uploadedLogo = req.file
    ? await uploadFileToCloudinary(req.file)
    : undefined;
  const brand = await Brand.create({
    name,
    description: description || undefined,
    logo: uploadedLogo?.url,
    logo_public_id: uploadedLogo?.public_id,
  });

  sendResponse(res, {
    data: brand,
    message: "brand created",
    statusCode: 201,
  });
});

//* update
export const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const existingBrand = await Brand.findById(id);
  if (!existingBrand) throw new AppError("brand not found", 404);

  const uploadedLogo = req.file
    ? await uploadFileToCloudinary(req.file)
    : undefined;
  const brand = await Brand.findByIdAndUpdate(
    id,
    {
      name,
      description: description || undefined,
      ...(uploadedLogo && {
        logo: uploadedLogo.url,
        logo_public_id: uploadedLogo.public_id,
      }),
    },
    { new: true, runValidators: true },
  );

  if (uploadedLogo && existingBrand.logo_public_id) {
    await deleteFileFromCloudinary(existingBrand.logo_public_id);
  }

  sendResponse(res, {
    data: brand,
    message: "brand updated",
    statusCode: 200,
  });
});

//* delete
export const remove = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) throw new AppError("brand not found", 404);

  await deleteFileFromCloudinary(brand.logo_public_id);

  sendResponse(res, {
    data: brand,
    message: "brand deleted",
    statusCode: 200,
  });
});
