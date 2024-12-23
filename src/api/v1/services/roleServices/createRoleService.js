const db = require("./../../../../../models/index.js");
const getRoleByRoleName = require("./../../utils/role/getRoleByRoleName.js");
const createRoleService = async (roleData) => {
  const { roleName } = roleData;

  const getRoleByNameServiceResponse = await getRoleByRoleName(roleName);
  console.log("getRoleByNameServiceResponse: ");
  console.dir(getRoleByNameServiceResponse, { depth: null });

  if (getRoleByNameServiceResponse.status === 200) {
    const error = new Error("role_already_exists");
    error.statusCode = 409;
    throw error;
  } else if (getRoleByNameServiceResponse.status === 422) {
    const error = new Error("role_name_invalid");
    error.statusCode = 422;
    throw error;
  }

  const role = await db.Role.create({
    roleName: roleName,
  });

  return role;
};

module.exports = createRoleService;
