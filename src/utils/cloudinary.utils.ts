import cloudinary from "../config/cloudinary.config";
import fs from "fs";
import AppError from "./apperror.utils";

export const uploadFileToCloudinary = async (
  file: Express.Multer.File
) => {
  try {
    const uploadFolder = "mern_project";

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: uploadFolder,
        unique_filename: true,
      }
    );

    // Delete local file after successful upload
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      url: secure_url,
      public_id,
    };
  } catch (error) {
    console.error(error);

    // Delete local file if it exists
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    throw new AppError("Failed to upload file to Cloudinary", 500);
  }
};