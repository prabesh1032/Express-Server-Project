import { Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils/bcrypt.utils";

//register
export const register = async (req: Request, res: Response) => {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name) {
      const error: any = new Error("full_name is required");
      error.ststus = "fail";
      error.statusCode = 400;
      throw error;
    }
    if (!email) {
      const error: any = new Error("email is required");
      error.ststus = "fail";
      error.statusCode = 400;
      throw error;
    }
    if (!password) {
      const error: any = new Error("password is required");
      error.ststus = "fail";
      error.statusCode = 400;
      throw error;
    }
    const user = new User({ full_name, email });
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
