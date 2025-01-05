const db = require("./../../../../../models/index");

const getAllRolesService = async () => {
  const roles = await db.Role.findAll({});

  if (!roles) {
    const error = new Error("No roles found");
    error.statusCode = 404;
    throw error;
  }

  return roles;
};

module.exports = getAllRolesService;
