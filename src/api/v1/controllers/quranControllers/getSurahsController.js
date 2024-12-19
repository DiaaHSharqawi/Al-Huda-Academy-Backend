const asynbHandler = require("express-async-handler");
const getSurahsService = require("./../../services/quranServices/getSurahsService");

const getSurahsController = asynbHandler(async (req, res) => {
  console.info("Get Surahs Controller");

  const getSurahsServiceData = req.query;

  const surahs = await getSurahsService(getSurahsServiceData);

  res.json({ success: true, message: "Surahs fetched successfully", surahs });
});

module.exports = getSurahsController;
