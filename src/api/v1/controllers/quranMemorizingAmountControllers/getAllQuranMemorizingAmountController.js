const asyncHandler = require("express-async-handler");
const getAllQuranMemorizingAmountService = require("../../services/quranMemorizingAmountServices/getAllQuranMemorizingAmountService.js");

const getAllQuranMemorizingAmountController = asyncHandler(async (req, res) => {
  const getAllQuranMemorizingAmount =
    await getAllQuranMemorizingAmountService();

  res.status(200).json({
    success: true,
    message: "Successfully retrieved all quran memorizing amount",
    quranMemorizingAmount: getAllQuranMemorizingAmount,
  });
});

module.exports = getAllQuranMemorizingAmountController;
