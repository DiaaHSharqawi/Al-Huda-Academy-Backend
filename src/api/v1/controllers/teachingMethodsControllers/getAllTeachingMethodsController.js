const asyncHandler = require("express-async-handler");

const getAllTeachingMethodsService = require("./../../services/teachingMethodsServices/getAllTeachingMethodsService");

const getAllTeachingMethodsController = asyncHandler(async (req, res) => {
  const teachingMethods = await getAllTeachingMethodsService();

  res.status(200).json({
    success: true,
    message: "Teaching methods fetched successfully",
    teachingMethods: teachingMethods,
  });
});

module.exports = getAllTeachingMethodsController;
