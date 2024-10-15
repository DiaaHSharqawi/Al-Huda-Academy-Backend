import logger from "../../../../../config/logger.js";
import uploadFilesServices from "../../services/uploadFilesServices/uploadFilesServices.js";

const uploadFilesControllers = {
  uploadImageController: async (req, res) => {
    logger.info("im in uploadImageController ");
    try {
      const fileDetails = await uploadFilesServices.uploadImageService(
        req,
        res
      );

      res.json({
        secure_url: fileDetails.secure_url,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
export default uploadFilesControllers;
