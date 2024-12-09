const axios = require("axios");

const getRoleByRoleName = async (roleName) => {
  console.log("\n ---------- Get Role By Role Name ---------- \n");
  console.log(`roleName: ${roleName}`);

  try {
    const response = await axios.post(
      `http://localhost:3000/api/roles/get-role-by-name`,
      {
        roleName: roleName,
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching role by role name:", error);
    return error;
  }
};

module.exports = getRoleByRoleName;
