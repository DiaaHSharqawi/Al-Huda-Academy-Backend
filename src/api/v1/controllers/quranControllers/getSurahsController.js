const asynbHandler = require("express-async-handler");
const getSurahsService = require("./../../services/quranServices/getSurahsService");

const getSurahsController = asynbHandler(async (req, res) => {
  console.info("Get Surahs Controller");

  const getSurahsData = req.query;

  const surahs = await getSurahsService(getSurahsData);

  res.json({ success: true, message: "Surahs fetched successfully", surahs });
});

module.exports = getSurahsController;
