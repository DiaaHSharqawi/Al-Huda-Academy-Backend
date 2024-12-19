const dotenv = require("dotenv");
dotenv.config();

const asyncHandler = require("express-async-handler");

const db = require("../../../../../../models/index");

const getUserByEmail = require("../../../utils/user/getUserByEmail");
const registerUser = require("../../../utils/user/registerUser");
const getSecureImagesURL = require("./../../../utils/images/getSecureImagesURL");
const tokenUtils = require("../../../utils/token/tokenUtils");

//const uploadImages = require("../../../utils/getSecureImagesURL");

const participantRegisterService = async (participantToRegister) => {
  console.log(`\n ---------- participant Register Service ---------- \n`);
  const { email, password, profileImage, ...participantData } =
    participantToRegister;

  console.log(`email : ${email}, password : ${password}`);

  const getUserByEmailResponse = await getUserByEmail(email);

  console.log(`getUserByEmailResponse`);
  console.dir(getUserByEmailResponse, { depth: null });

  if (getUserByEmailResponse.status === 200) {
    console.log(`User already exists`);
    const error = new Error(
      `Failed to register participant, user already exists`
    );
    error.statusCode = 409;
    throw error;
  } else if (getUserByEmailResponse.status == 422) {
    console.log(`${getUserByEmailResponse?.response?.data?.message}`);
    const error = new Error(
      `Failed to register participant, ${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = 422;
    throw error;
  }

  // user does not exist so we can register the user
  console.log(`complete the registration process`);
  console.dir(participantData, { depth: null });

  const profileImageUploadResponse = await getSecureImagesURL(profileImage);

  console.log(`profileImageUploadResponse`);
  console.dir(profileImageUploadResponse, { depth: 4 });

  if (profileImageUploadResponse.secure_urls.length < 1) {
    const error = new Error(
      "Failed to register participant, profile image upload failed"
    );
    error.statusCode = 404;
    throw error;
  }

  const userToRegister = {
    email: email,
    password: password,
    roleName: "participant",
  };
  const registerUserResponse = await registerUser(userToRegister);
  console.log(`registerUserResponse`);

  console.dir(registerUserResponse, { depth: 1 });

  if (registerUserResponse.status === 404) {
    console.log(`role not found`);
    console.log("status 404");

    const error = new Error(
      `Failed to register participant, ${registerUserResponse?.response?.data?.message}`
    );
    error.statusCode = 404;
    throw error;
  } else if (registerUserResponse.status === 409) {
    const error = new Error(
      `Failed to register participant, ${registerUserResponse?.response?.data?.message}`
    );
    error.statusCode = 409;
    throw error;
  } else if (registerUserResponse.status === 422) {
    console.log(registerUserResponse?.response?.data?.message);
    const error = new Error(
      `Failed to register participant, ${registerUserResponse?.response?.data?.message}`
    );
    error.statusCode = 422;
    throw error;
  }

  const participantUserId = registerUserResponse.data.userRegisterResult.id;
  console.dir(participantData, { depth: null });
  const participant = await db.Participant.create({
    userId: participantUserId,
    ...participantData,
    profileImage: profileImageUploadResponse.secure_urls[0],
  });
  console.log(`participant`);
  console.dir(participant, { depth: null });

  const participantId = participant.dataValues.id;
  console.log(`participantId`);
  console.log(participantId);

  const dataToEncrypt = {
    userId: participantUserId,
    participantId: participantId,
    email: email,
    fullName: participantData.fullName,
    role: "participant",
  };
  const accessToken = tokenUtils.generateAccessToken(dataToEncrypt);
  const refreshToken = tokenUtils.generateRefreshToken(dataToEncrypt);

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
module.exports = participantRegisterService;
