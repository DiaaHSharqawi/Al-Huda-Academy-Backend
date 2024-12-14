const getUserByEmail = require("../../../utils/getUserByEmail");
const getRoleByRoleId = require("../../../utils/getRoleByRoleId");

const bcrypt = require("bcrypt");
const getSupervisorByUserId = require("../../../utils/getSupervisorByUserId");

const loginService = async (userLoginData) => {
  console.log(`\n ---------- Login Service ---------- \n`);

  const { email, password } = userLoginData;

  const getUserByEmailResponse = await getUserByEmail(email);

  if (getUserByEmailResponse.status !== 200) {
    console.log(`error : ${getUserByEmailResponse?.response?.data?.message}`);
    const error = new Error(
      ` ${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = 422;
    throw error;
  }

  const userAccountDetails = getUserByEmailResponse.data.user;
  const userAccountPassword = getUserByEmailResponse.data.user.password;

  console.log(`userAccountPassword : ${userAccountPassword}`);

  const isPasswordMatch = await bcrypt.compare(password, userAccountPassword);

  if (!isPasswordMatch) {
    const error = new Error(
      "Invalid Credentials, Please make sure you have entered the correct email and password."
    );
    error.statusCode = 422;
    throw error;
  }

  const { password: _, ...userDetailsWithoutPassword } = userAccountDetails;

  console.log(`userDetailsWithoutPassword : }`);
  console.dir(userDetailsWithoutPassword, { depth: null });

  console.log(`roleId : ${userDetailsWithoutPassword.roleId}`);

  const roleId = userDetailsWithoutPassword.roleId.toString();
  const getRoleByRoleIdResponse = await getRoleByRoleId(roleId);

  console.log(`getRoleByRoleIdResponse : }`);
  console.dir(getRoleByRoleIdResponse, { depth: null });

  if (getRoleByRoleIdResponse.status !== 200) {
    console.log(`error : ${getRoleByRoleIdResponse?.response?.data?.message}`);
    const error = new Error(
      ` ${getRoleByRoleIdResponse?.response?.data?.message}`
    );
    error.statusCode = getRoleByRoleIdResponse.status;
    throw error;
  }

  userDetailsWithoutPassword.role = {
    roleId: userDetailsWithoutPassword.roleId,
    roleName: getRoleByRoleIdResponse.data.roleDetails.roleName,
  };

  if (userDetailsWithoutPassword.role.roleName === "supervisor") {
    const getSupervisorByUserIdResponse = await getSupervisorByUserId(
      userDetailsWithoutPassword.id
    );
    console.log(`getSupervisorByUserIdResponse : }`);
    console.dir(getSupervisorByUserIdResponse, { depth: null });

    if (getSupervisorByUserIdResponse.status !== 200) {
      console.log(
        `error : ${getSupervisorByUserIdResponse?.response?.data?.message}`
      );
      const error = new Error(
        ` ${getSupervisorByUserIdResponse?.response?.data?.message}`
      );
      error.statusCode = getSupervisorByUserIdResponse.status;
      throw error;
    }

    userDetailsWithoutPassword.fullName =
      getSupervisorByUserIdResponse.data.supervisorDetails.fullName;

    userDetailsWithoutPassword.memberId =
      getSupervisorByUserIdResponse.data.supervisorDetails.id;
  }

  delete userDetailsWithoutPassword.roleId;

  return userDetailsWithoutPassword;
};
module.exports = loginService;
