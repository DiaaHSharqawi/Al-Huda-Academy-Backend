const db = require("../../../../../models/index.js");

const getSurahsService = async (searchParams) => {
  console.log("searchParams:");
  console.dir(searchParams, { depth: null });

  const whereClause = {};
  if (searchParams.id) {
    whereClause.number = searchParams.id;
  }
  if (searchParams.surah_name) {
    whereClause.surah_name = {
      [db.Sequelize.Op.like]: `%${searchParams.surah_name}%`,
    };
  }

  console.log("whereClause:");
  console.dir(whereClause, { depth: null });

  const page = parseInt(searchParams.page) || 1; // Default to 1 if not provided
  const limit = parseInt(searchParams.limit) || 114; // Default to 10 if not provided
  const offset = (page - 1) * limit;
  const surahs = await db.Surah.findAll({
    where: whereClause,
    offset,
    limit,
  });
  if (!surahs || surahs.length === 0) {
    const error = new Error("No surahs found");
    error.status = 404;
    throw error;
  }
  return surahs;
};
module.exports = getSurahsService;
