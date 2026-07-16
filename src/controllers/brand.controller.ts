import { NextFunction, Request, Response } from "express";
import Brand from "../models/brand.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/apperror.utils";

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

//* update

//* delete
