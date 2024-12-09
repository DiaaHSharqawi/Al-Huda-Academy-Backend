// Middlewares imports :
const asyncHandler = require("express-async-handler");

// Services imports :
const participantRegisterService = require("../../../services/authServices/registerServices/participantRegisterService");

const participantRegisterController = asyncHandler(async (req, res) => {
  console.log("participantRegisterController");
  const participantToRegister = req.body;
  console.dir(participantToRegister, { depth: null });

  const profileImage = req.files["profileImage"];
  console.log(`profileImage : ${profileImage}`);

  if (profileImage.length !== 1) {
    res.status(400).json({
      success: false,
      message: "Please upload a profile image",
    });
  }

  participantToRegister.profileImage = profileImage;

  const data = await participantRegisterService(participantToRegister);
  const { accessToken, refreshToken } = data;

  res.status(200).json({
    success: true,
    message: "participant Registered",
    data: { accessToken, refreshToken },
  });
});
module.exports = participantRegisterController;
