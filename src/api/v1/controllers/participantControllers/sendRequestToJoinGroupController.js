const asyncHandler = require("express-async-handler");
const sendRequestToJoinGroupService = require("./../../services/participantServices/sendRequestToJoinGroupService");

const tokenUtils = require("./../../utils/token/tokenUtils.js");

const sendRequestToJoinGroupController = asyncHandler(async (req, res) => {
  console.log("sendRequestToJoinGroupController");

  const decodedToken = tokenUtils.decodeToken(
    req.headers.authorization.split(" ")[1],
    process.env.ACCESS_TOKEN_SECRET
  );

  console.log("decodedToken", decodedToken);

  const { groupId } = req.params;

  const participantId = decodedToken.UserInfo.memberId;

  await sendRequestToJoinGroupService(groupId, participantId);

  res.status(200).json({
    success: true,
    message: "Request sent successfully",
  });
});

module.exports = sendRequestToJoinGroupController;
