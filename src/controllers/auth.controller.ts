import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils/bcrypt.utils";
//import AppError from "../utils/apperror.utils";

//register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log(req.body);
    const { full_name, email, password, user_name } = req.body;

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

//very basic login function with out jwt token
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "fail",
      });
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        status: "fail",
      });
    }
    const { password: user_pass, ...rest } = user.toObject();
    res.status(200).json({
      message: "login successful",
      status: "success",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};
