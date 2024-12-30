const db = require("./../../../../../models/index.js");

const getAllLanguagesService = () => {
  const languages = db.Language.findAll();

  if (!languages) {
    const error = new Error("No languages found.");
    error.statusCode = 404;
    throw error;
  }

  return languages;
};

module.exports = getAllLanguagesService;
