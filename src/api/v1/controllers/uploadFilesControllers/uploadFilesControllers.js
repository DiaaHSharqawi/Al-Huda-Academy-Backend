import logger from "../../../../../config/logger.js";
import uploadFilesServices from "../../services/uploadFilesServices/uploadFilesServices.js";
import asyncHandler from "express-async-handler";

const uploadFilesControllers = {
  uploadImageController: asyncHandler(async (req, res) => {
    logger.info("im in uploadImageController ");

    const fileDetails = await uploadFilesServices.uploadImageService(req, res);

    res.json({
      secure_url: fileDetails.secure_url,
    });
  }),
};

export default uploadFilesControllers;
