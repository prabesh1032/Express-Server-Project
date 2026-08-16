import { Request } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import AppError from "../utils/apperror.utils";

export const multerUploder = () => {
  const folder = "uploads"; // folder name where you want to store your files
  const fileSize = 1024 * 1024 * 5; // 5MB file size limit
  const allowedextensions = [".jpg", ".jpeg", ".png", ".gif"]; // allowed file extensions
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ]; // allowed file types
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true }); // create folder if it doesn't exist and recursive: true to create parent directories if needed
  }

  const myStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + "-" + file.originalname; //for make unique filename.
      cb(null, filename);
    },
  });
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    // check file extension
    if (
      !allowedextensions.includes(path.extname(file.originalname).toLowerCase()) ||
      !allowedFileTypes.includes(file.mimetype)
    ) {
      return cb(new AppError("File type not allowed", 400));
    }
    cb(null, true);
  };
  //check file mime type
  const upload = multer({
    storage: myStorage,
    fileFilter: fileFilter,
    limits: { fileSize: fileSize },
  });
  return upload;
};
