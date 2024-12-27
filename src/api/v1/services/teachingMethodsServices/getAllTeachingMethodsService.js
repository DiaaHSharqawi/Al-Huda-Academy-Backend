const db = require("./../../../../../models/index");

const getAllTeachingMethodsService = async () => {
  const teachingMethods = await db.TeachingMethods.findAll();

  if (!teachingMethods) {
    const error = new Error("No teaching methods found");
    error.status = 404;
    throw error;
  }

  return teachingMethods;
};

module.exports = getAllTeachingMethodsService;
