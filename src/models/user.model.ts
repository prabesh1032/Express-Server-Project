import mongoose, { Document } from "mongoose";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

//user interface
interface IUser extends Document {
  user_name: string;
  full_name: string;
  email: string;
  password: string;
  profile_image?: string;
  role: Role;
}

//scehema
const UserSchema = new mongoose.Schema<IUser>(
  {
    user_name: {
      type: String,
      required: [true, "full name is required"],
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
      defualt: Role.USER,
    },
    profile_image: {
      type: String,
      defaults: null,
    },
  },
  { timestamps: true },
);

//model
const User = mongoose.model<IUser>("user", UserSchema);
export default User;
