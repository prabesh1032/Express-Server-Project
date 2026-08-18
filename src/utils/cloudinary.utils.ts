import cloudinary from "../config/cloudinary.config";
import fs from "fs";
import path from "path";
import AppError from "./apperror.utils";

export const uploadFileToCloudinary = async (
  file: Express.Multer.File
) => {
  try {
    const uploadFolder = "mern_project";

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      path.resolve(file.path),
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
  } catch (error: any) {
    console.error(
      "Cloudinary upload failed:",
      error?.error?.message ?? error?.message ?? error,
    );

    // Delete local file if it exists
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    throw new AppError("Failed to upload file to Cloudinary", 500);
  }
};

export const deleteFileFromCloudinary = async (publicId?: string | null) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete Cloudinary file", error);
  }
};
