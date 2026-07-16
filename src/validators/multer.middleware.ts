import { Request } from "express";
import multer from "multer";


export const multerUploder = () => {
  const myStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      const folder = "uploads/";
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + "-" + file.originalname; //for make unique filename.
      cb(null, filename);
    },
  });
  const upload = multer({ storage: myStorage });
  return upload;
};
