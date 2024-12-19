const axios = require("axios");

const getRoleByRoleId = async (roleId) => {
  console.log(`getRoleByRoleId utils `);
  console.log(`roleId : ${roleId}`);

  try {
    const getRoleByRoleIdResponse = await axios.post(
      `${process.env.BASE_URL}/roles/get-role-by-role-id`,
      {
        roleId: roleId,
      }
    );

    console.dir(getRoleByRoleIdResponse, { depth: null });
    return getRoleByRoleIdResponse;
  } catch (error) {
    return error;
  }
};

module.exports = getRoleByRoleId;
