const asynbHandler = require("express-async-handler");
const getJuzaService = require("./../../services/quranServices/getJuzaService");

const getJuzaController = asynbHandler(async (req, res) => {
  console.info("get Juza Controller");

  const getJuzaData = req.query;

  const Juzas = await getJuzaService(getJuzaData);

  res.json({
    success: true,
    message: "Juzas fetched successfully",
    juzas: Juzas,
  });
});

module.exports = getJuzaController;
