const db = require("../../../../../models/index.js");

const getAllQuranMemorizingAmountService = async () => {
  const allQuranMemorizingAmount = await db.QuranMemorizingAmount.findAll({});

  if (!allQuranMemorizingAmount) {
    const error = new Error("No quran memorizing amount found");
    error.statusCode = 404;
    throw error;
  }

  return allQuranMemorizingAmount;
};

module.exports = getAllQuranMemorizingAmountService;
