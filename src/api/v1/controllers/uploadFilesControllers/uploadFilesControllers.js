const {
  uploadFilesServices,
} = require("../../services/uploadFilesServices/uploadFilesServices.js");
const asyncHandler = require("express-async-handler");

const uploadFilesControllers = {
  uploadImagesController: asyncHandler(async (req, res) => {
    console.info("im in uploadImageController ");

    const fileDetails = await uploadFilesServices.uploadImagesService(req, res);

    res.status(201).json({
      message: "Files uploaded successfully",
      secure_urls: fileDetails,
    });
  }),
};

module.exports = uploadFilesControllers;
