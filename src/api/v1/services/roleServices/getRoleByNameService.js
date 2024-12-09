const db = require("../../../../../models/index.js");

const getRoleByRoleNameService = async (roleName) => {
  const role = await db.Role.findOne({
    where: { roleName: roleName },
  });

  if (!role) {
    const error = new Error("role not found");
    error.statusCode = 404;
    throw error;
  }

  return role;
};

module.exports = getRoleByRoleNameService;
