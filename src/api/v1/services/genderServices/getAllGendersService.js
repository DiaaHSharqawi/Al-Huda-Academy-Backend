const db = require("./../../../../../models/index.js");

const getAllGendersService = async () => {
  const genders = await db.Gender.findAll();
  return genders;
};
module.exports = getAllGendersService;
