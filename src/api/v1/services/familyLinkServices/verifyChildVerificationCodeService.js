const addChildToFamilyLink = require("./../../utils/addChildToFamilyLink");
const getUserByEmail = require("./../../utils/getUserByEmail");

const db = require("./../../../../../models/index");
const bcrypt = require("bcrypt");

const verifyChildVerificationCodeService = async (
  verifyChildVerificationCodeData
) => {
  const { senderUserEmail, receiverUserEmail, verificationCode } =
    verifyChildVerificationCodeData;

  console.log(
    `senderUserEmail: ${senderUserEmail},\n
    receiverUserEmail: ${receiverUserEmail},\n
    verificationCode: ${verificationCode}\n`
  );

  const getSenderUserByEmailResponse = await getUserByEmail(senderUserEmail);

  if (getSenderUserByEmailResponse.status !== 200) {
    const error = new Error(
      `Failed to get Sender User by email, ${getSenderUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = getSenderUserByEmailResponse.status;
    throw error;
  }
  const senderUserAccountDetails = getSenderUserByEmailResponse.data.user;

  const getReceiverUserByEmailResponse = await getUserByEmail(
    receiverUserEmail
  );

  if (getReceiverUserByEmailResponse.status !== 200) {
    const error = new Error(
      `Failed to get Receiver User by email, ${getReceiverUserByEmailResponse?.response?.data?.message}`
    );
    error.statusCode = getReceiverUserByEmailResponse.status;
    throw error;
  }
  const receiverUserAccountDetails = getReceiverUserByEmailResponse.data.user;

  if (senderUserAccountDetails.id === receiverUserAccountDetails.id) {
    const error = new Error("sendResetPasswordCode.invalid_credentials");
    error.statusCode = 401;
    throw error;
  }

  const childVerificationCodeData =
    await db.ChildFamilyLinkVerificationCode.findOne({
      senderId: senderUserAccountDetails.id,
      recipientId: receiverUserAccountDetails.id,
    });

  console.log("childFamilyLinks", childVerificationCodeData);

  const isCodeExpired = !childVerificationCodeData;
  if (isCodeExpired) {
    const error = new Error("الرمز غير صحيح او منتهي الصلاحية");
    error.statusCode = 401;
    throw error;
  }

  const isValidCode = await bcrypt.compare(
    verificationCode,
    childVerificationCodeData.code
  );

  console.log("isValidCode result :", isValidCode);

  if (!isValidCode) {
    const error = new Error("الرمز غير صحيح او منتهي الصلاحية");
    error.statusCode = 401;
    throw error;
  }

  const addChildToFamilyLinkResponse = await addChildToFamilyLink(
    senderUserAccountDetails.email,
    receiverUserAccountDetails.email,
    "child"
  );
  console.log("addChildToFamilyLinkResponse", addChildToFamilyLinkResponse);
  console.dir(addChildToFamilyLinkResponse, { depth: null });
  if (addChildToFamilyLinkResponse.status !== 200) {
    const error = new Error(
      `Failed to add child to family link, ${addChildToFamilyLinkResponse?.response?.data?.message}`
    );
    error.statusCode = addChildToFamilyLinkResponse.status;
    throw error;
  }

  console.log("---------end----------");
};

module.exports = verifyChildVerificationCodeService;
