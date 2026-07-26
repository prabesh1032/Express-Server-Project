import { v2 as cloudinary } from "cloudinary";
import { ENV_CONFIG } from "./env.config";

cloudinary.config({
  cloud_name: ENV_CONFIG.Cloudinary_Cloud_Name,
  api_key: ENV_CONFIG.Cloudinary_API_Key,
  api_secret: ENV_CONFIG.Cloudinary_API_Secret,
});
export default cloudinary;
