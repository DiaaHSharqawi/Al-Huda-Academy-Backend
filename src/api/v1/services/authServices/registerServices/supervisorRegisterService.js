const dotenv = require("dotenv");
dotenv.config();

const asyncHandler = require("express-async-handler");

const db = require("../../../../../../models/index");

const getUserByEmail = require("../../../utils/user/getUserByEmail");
const registerUser = require("../../../utils/user/registerUser");
const getSecureImagesURL = require("./../../../utils/images/getSecureImagesURL");
const tokenUtils = require("../../../utils/token/tokenUtils");

//const uploadImages = require("../../../utils/getSecureImagesURL");

const supervisorRegisterService = async (supervisorToRegister) => {
  console.log(`\n ---------- Supervisor Register Service ---------- \n`);
  const {
    email,
    password,
    profileImage,
    certificatesImages,
    selectedMemorizingOption,
    ...supervisorData
  } = supervisorToRegister;

  console.log(`email : ${email}, password : ${password}`);

  const getUserByEmailResponse = await getUserByEmail(email);

  if (getUserByEmailResponse.status === 200) {
    console.log(`User already exists`);
    const error = new Error(
      `Failed to register supervisor, user already exists`
    );
    error.statusCode = 409;
    throw error;
  } else if (getUserByEmailResponse.status == 422) {
    console.log(`${getUserByEmailResponse?.response?.data?.message}`);
    const error = new Error(
      `Failed to register supervisor, ${getUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = 422;
    throw error;
  }

  // user does not exist so we can register the user
  console.log(`complete the registration process`);
  console.dir(supervisorData, { depth: null });

  const profileImageUploadResponse = await getSecureImagesURL(profileImage);

  console.log(`profileImageUploadResponse`);
  console.dir(profileImageUploadResponse, { depth: 4 });

  if (profileImageUploadResponse.secure_urls.length < 1) {
    const error = new Error(
      "Failed to register supervisor, profile image upload failed"
    );
    error.statusCode = 404;
    throw error;
  }

  const pendingAccountStatus = await db.AccountStatus.findOne({
    where: { englishName: "pending" },
  });

  if (!pendingAccountStatus) {
    const error = new Error("Account Status does not exist");
    error.statusCode = 404;
    throw error;
  }

  console.log(`pendingAccountStatus`);
  console.dir(pendingAccountStatus, { depth: null });

  const userToRegister = {
    email: email,
    password: password,
    role_id: 2,
    accountStatusId: pendingAccountStatus.id,
  };
  const registerUserResponse = await registerUser(userToRegister);

  console.dir(registerUserResponse, { depth: 4 });

  if (registerUserResponse.status === 404) {
    console.log(`role not found`);
    console.log("status 404");

    const error = new Error(
      `Failed to register supervisor, ${registerUserResponse?.response?.data?.message}`
    );
    error.statusCode = 404;
    throw error;
  }
  if (registerUserResponse.status === 409) {
    console.log("user already exisit ");

    const error = new Error(
      `Failed to register supervisor, ${registerUserResponse?.response?.data?.message}`
    );
    error.statusCode = 409;
    throw error;
  } else if (registerUserResponse.status === 422) {
    console.log(registerUserResponse?.response?.data?.message);

    const error = new Error(
      `Failed to register supervisor, ${registerUserResponse?.response?.data?.message}`
    );
    error.statusCode = 422;
  }

  let supervisorUserId = registerUserResponse.data.userRegisterResult.id;
  let supervisorId;

  const transaction = await db.sequelize.transaction();

  try {
    const supervisor = await db.Supervisor.create(
      {
        userId: supervisorUserId,
        ...supervisorData,
        profileImage: profileImageUploadResponse.secure_urls[0],
      },
      { transaction }
    );
    console.log(`supervisor`);
    console.dir(supervisor, { depth: null });

    let registeredJuzaIds = [];

    if (selectedMemorizingOption !== "none") {
      if (selectedMemorizingOption === "all") {
        registeredJuzaIds = [...Array(30).keys()].map((juzaId) => juzaId + 1);
      } else if (supervisorData.juza_ids) {
        registeredJuzaIds = supervisorData.juza_ids;
      }
    }
    console.log(`registeredJuzaIds`);
    console.dir(registeredJuzaIds, { depth: null });

    const supervisorJuzaaIds = registeredJuzaIds.map((juzaaId) => {
      return {
        supervisor_id: supervisor.dataValues.id,
        juza_id: juzaaId,
      };
    });

    await db.SupervisorAjzaa.bulkCreate(supervisorJuzaaIds, { transaction });

    supervisorId = supervisor.dataValues.id;

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  console.log(`supervisorId`);
  console.log(supervisorId);
  console.log(`certificatesImages`);
  console.dir(certificatesImages, { depth: 4 });
  if (certificatesImages.length > 0) {
    const uploadcertificatesResponse = await getSecureImagesURL(
      certificatesImages
    );
    console.log(`uploadcertificatesResponse`);
    console.dir(uploadcertificatesResponse, { depth: 4 });
    if (uploadcertificatesResponse.secure_urls.length < 1) {
      const error = new Error(
        "Failed to register supervisor, certificates images upload failed"
      );
      error.statusCode = 404;
      throw error;
    }
    const supervisorCertificate = await db.SupervisorCertificate.bulkCreate(
      uploadcertificatesResponse.secure_urls.map((url) => ({
        supervisorId: supervisorId,
        certificateImage: url,
      }))
    );

    console.log(`supervisorCertificate`);
    console.dir(supervisorCertificate, { depth: null });

    const dataToEncrypt = {
      userId: supervisorUserId,
      supervisorId: supervisorId,
      email: email,
      fullName: supervisorData.fullName,
      role: "supervisor",
    };
    const accessToken = tokenUtils.generateAccessToken(dataToEncrypt);
    const refreshToken = tokenUtils.generateRefreshToken(dataToEncrypt);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
};
module.exports = supervisorRegisterService;
