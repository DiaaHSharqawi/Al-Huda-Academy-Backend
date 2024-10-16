import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import logger from "../../../../../config/logger.js";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads",
    allowed_formats: ["jpeg", "jpg", "png", "gif"],
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadFilesServices = {
  uploadImageService: async (req, res) => {
    logger.info("im in uploadImageService ");
    console.log(req.file);

    if (!req.file) {
      throw new Error("No file uploaded");
    }

    return {
      message: "File uploaded successfully",
      secure_url: req.file.path,
    };
  },
};

export default uploadFilesServices;
