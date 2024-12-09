const express = require("express");

const uploadFilesControllers = require("./../../controllers/uploadFilesControllers/uploadFilesControllers.js");

const {
  upload,
} = require("../../services/uploadFilesServices/uploadFilesServices.js");

const router = express.Router();

router.post(
  "/",
  upload.array("images"), // you can specify the number of files to be uploaded
  uploadFilesControllers.uploadImagesController
);
module.exports = router;
