"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
})(Role || (Role = {}));
//scehema
const UserSchema = new mongoose_1.default.Schema({
    user_name: {
        type: String,
        required: [true, "user name is required"],
        minlength: [3, "name must be 3 character long."],
        trim: true,
    },
    full_name: {
        type: String,
        required: [true, "full name is required"],
        minlength: [3, "name must be 3 character long."],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: [true, "user with email already exists."],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false, //
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    },
    profile_image: {
        type: String,
        default: null,
    },
}, { timestamps: true });
//model
const User = mongoose_1.default.model("user", UserSchema);
exports.default = User;
