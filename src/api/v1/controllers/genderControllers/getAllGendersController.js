const asyncHandler = require("express-async-handler");
const getAllGendersService = require("../../services/genderServices/getAllGendersService");

const getAllGendersController = asyncHandler(async (req, res) => {
  const genders = await getAllGendersService();
  res.status(200).json({
    success: true,
    message: "Genders fetched successfully",
    genders: genders,
  });
});

module.exports = getAllGendersController;
