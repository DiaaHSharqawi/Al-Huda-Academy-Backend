const asyncHandler = require("express-async-handler");
const addChildToFamilyLinkService = require("./../../services/familyLinkServices/addChildToFamilyLinkService");

const addChildToFamilyLinkController = asyncHandler(async (req, res) => {
  const addChildToFamilyLinkData = req.body;

  console.log("addChildToFamilyLinkController");
  console.log("addChildToFamilyLinkData");
  console.dir(addChildToFamilyLinkData, { depth: null });

  await addChildToFamilyLinkService(addChildToFamilyLinkData);

  res.status(200).json({
    success: true,
    message: req.t("تم اضافة الطفل بنجاح"),
  });
});

module.exports = addChildToFamilyLinkController;
