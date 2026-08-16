"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const apperror_utils_1 = __importDefault(require("../utils/apperror.utils"));
const bcrypt_utils_2 = require("../utils/bcrypt.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
//register
const register = async (req, res, next) => {
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
        const user = new user_model_1.default({ full_name, email, user_name });
        const hash = await (0, bcrypt_utils_1.hashPassword)(password);
        user.password = hash;
        //upload profile-picture
        if (file) {
            user.profile_image = file.path;
        }
        await user.save();
        const { password: _, ...rest } = user.toObject();
        (0, sendResponse_utils_1.sendResponse)(res, {
            message: "account created",
            data: rest,
            statusCode: 201,
        });
        // res.status(201).json({
        //   message: "account created",
        //   status: "success",
        //   data: rest,
        // });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
//very basic login function with out jwt token
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            throw new apperror_utils_1.default("Invalid Credential", 400);
        }
        const isPassMatched = await (0, bcrypt_utils_2.comparePassword)(password, user.password);
        if (!isPassMatched) {
            throw new apperror_utils_1.default("Invalid Credentials", 400);
        }
        //conver user doc to object
        const { password: _, ...rest } = user.toObject();
        (0, sendResponse_utils_1.sendResponse)(res, {
            message: "Login Sucessful",
            data: rest,
            statusCode: 201,
        });
        // res.status(200).json({
        //   message: "login successful",
        //   status: "success",
        //   data: rest,
        // });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
