import express from "express";
import uploadFilesControllers from "./../../controllers/uploadFilesControllers/uploadFilesControllers.js";

import { upload } from "../../services/uploadFilesServices/uploadFilesServices.js";

const router = express.Router();

router.post(
  "/",
  upload.single("profileImage"),
  uploadFilesControllers.uploadImageController
);
export default router;
