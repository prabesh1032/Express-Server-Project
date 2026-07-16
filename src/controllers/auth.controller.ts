import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/apperror.utils";
import { comparePassword } from "../utils/bcrypt.utils";
import { sendResponse } from "../utils/sendResponse.utils";

//register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log(req.body);
    const { full_name, email, password, user_name } = req.body;
    const file = req.file;
    console.log(file);

    //we can do similar validation using zod in validator folder and use it as middleware
    // to  validate the request body before reaching this controller function
    // if (!full_name) {
    //   // const error: any = new Error("full_name is required");
    //   // error.status = "fail";
    //   // error.statusCode = 400;
    //   // throw error;
    //   throw new AppError("full_name is required", 400);
    // }
    // if (!email) {
    //   throw new AppError("email is required", 400);
    // }
    // if (!password) {
    //   throw new AppError("password is required", 400);
    // }
    const user = new User({ full_name, email, user_name });
    const hash = await hashPassword(password);
    user.password = hash;
    //upload profile-picture
    if (file) {
      user.profile_image = file.path;
    }

    await user.save();
    const { password: _, ...rest } = user.toObject();

    sendResponse(res, {
      message: "account created",
      data: rest,
      statusCode: 201,
    });
    // res.status(201).json({
    //   message: "account created",
    //   status: "success",
    //   data: rest,
    // });
  } catch (error) {
    next(error);
  }
};

//very basic login function with out jwt token
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("Invalid Credential", 400);
    }

    const isPassMatched = await comparePassword(password, user.password);
    if (!isPassMatched) {
      throw new AppError("Invalid Credentials", 400);
    }
    //conver user doc to object
    const { password: _, ...rest } = user.toObject();
    sendResponse(res, {
      message: "Login Sucessful",
      data: rest,
      statusCode: 201,
    });
    // res.status(200).json({
    //   message: "login successful",
    //   status: "success",
    //   data: rest,
    // });
  } catch (error) {
    next(error);
  }
};
