import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";

//register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password,user_name } = req.body;
    if (!full_name) {
      // const error: any = new Error("full_name is required");
      // error.ststus = "fail";
      // error.statusCode = 400;
      // throw error;
       throw new AppError("full_name is required", 400);
    }
    if (!email) {
      throw new AppError("email is required", 400);
    }
    if (!password) {
      throw new AppError("password is required", 400);
    }
    const user = new User({ full_name, email,user_name });
    const hash = await hashPassword(password);
    user.password = hash;

    await user.save();
    const { password: user_pass, ...rest } = user.toObject();
    res.status(201).json({
      message: "account created",
      status: "success",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};
