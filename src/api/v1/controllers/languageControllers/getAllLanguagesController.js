const asyncHandler = require("express-async-handler");

const getAllLanguagesService = require("./../../services/languageServices/getAllLanguagesService");

const getAllLanguagesController = asyncHandler(async (req, res) => {
  const languages = await getAllLanguagesService();

  res.status(200).json({
    success: true,
    message: "Languages fetched successfully",
    languages: languages,
  });
});
module.exports = getAllLanguagesController;
