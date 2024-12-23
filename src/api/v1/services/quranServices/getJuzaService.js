const db = require("./../../../../../models/index.js");

const getJuzaService = async (getJuzaData) => {
  console.info("getJuzaService");

  const whereClause = {};
  if (getJuzaData.id) {
    whereClause.id = getJuzaData.id;
  }
  if (getJuzaData.id) {
    whereClause.id = getJuzaData.id;
  }
  if (getJuzaData.arabic_part) {
    whereClause.arabic_part = {
      [db.Sequelize.Op.like]: `%${getJuzaData.arabic_part}%`,
    };
  }
  if (getJuzaData.english_part) {
    whereClause.english_part = {
      [db.Sequelize.Op.like]: `%${getJuzaData.english_part}%`,
    };
  }

  console.log("whereClause:");
  console.dir(whereClause, { depth: null });

  const page = parseInt(getJuzaData.page) || 1;
  const limit = parseInt(getJuzaData.limit) || 30;
  const offset = (page - 1) * limit;

  const juzas = await db.Juza.findAll({
    where: whereClause,
    offset,
    limit,
  });

  if (!juzas || juzas.length === 0) {
    const error = new Error("No juzas found");
    error.status = 404;
    throw error;
  }

  return juzas;
};

module.exports = getJuzaService;
