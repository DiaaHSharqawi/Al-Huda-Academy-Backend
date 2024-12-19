const db = require("./../../../../../../models/index.js");

const getUserByEmail = require("./../../../utils/user/getUserByEmail.js");
const getHashedCredential = require("./../../../utils/auth/getHashedCredential.js");
const getRoleByRoleName = require("./../../../utils/role/getRoleByRoleName.js");

const userRegisterService = async (userData) => {
  const { email, password, roleName } = userData;

  console.log(`userRegisterService`);
  console.log(`email : ${email}, password : ${password}`);

  const hashedPassword = await getHashedCredential(password);

  console.log(`hashedPassword : ${hashedPassword}`);

  const getUserByEmailResponse = await getUserByEmail(email);

  if (getUserByEmailResponse.status === 200) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const getRoleByNameResponse = await getRoleByRoleName(roleName);

  if (getRoleByNameResponse.status === 404) {
    const error = new Error("Role does not exist");
    error.statusCode = 404;
    throw error;
  }
  const roleId = getRoleByNameResponse.data.role.id;

  const user = await db.User.create({
    email: email,
    password: hashedPassword,
    roleId: roleId,
  });

  return user;
};
module.exports = userRegisterService;
