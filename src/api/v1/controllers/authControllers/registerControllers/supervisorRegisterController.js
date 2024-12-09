// Middlewares imports :
const asyncHandler = require("express-async-handler");

// Services imports :
const supervisorRegisterService = require("../../../services/authServices/registerServices/supervisorRegisterService");

const supervisorRegisterController = asyncHandler(async (req, res) => {
  console.log("supervisorRegisterController");
  //console.dir(req.body, { depth: null });
  const supervisorToRegister = req.body;
  // console.dir(req.files, { depth: null });

  const profileImage = req.files["profileImage"];
  console.log(`profileImage : ${profileImage}`);

  if (profileImage.length !== 1) {
    res.status(400).json({
      success: false,
      message: "Please upload a profile image",
    });
  }

  supervisorToRegister.profileImage = profileImage;

  const certificatesImages = req.files["certificatesImages"];
  supervisorToRegister.certificatesImages = certificatesImages;

  const data = await supervisorRegisterService(supervisorToRegister);

  const { accessToken, refreshToken } = data;

  res.status(200).json({
    success: true,
    message: "Supervisor Registered",
    data: { accessToken, refreshToken },
  });
});
module.exports = supervisorRegisterController;
