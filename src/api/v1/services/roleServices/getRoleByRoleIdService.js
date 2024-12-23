const db = require("./../../../../../models/index.js");

const getRoleByRoleIdService = async (getRoleByRoleIdData) => {
  const { roleId } = getRoleByRoleIdData;

  const roleDetails = await db.Role.findOne({
    where: {
      id: roleId,
    },
  });

  if (!roleDetails) {
    const error = new Error("Role not found");
    error.statusCode = 404;
    throw error;
  }

  return roleDetails;
};

module.exports = getRoleByRoleIdService;
