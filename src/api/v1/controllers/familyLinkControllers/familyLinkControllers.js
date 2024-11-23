import asyncHandler from "express-async-handler";
import familyLinkServices from "./../../services/familyLinkServices/familyLinkServices.js";
import FamilyLink from "../../models/FamilyLinkModel/FamilyLinkModel.js";

const familyLinkControllers = {
  sendChildVerificationCode: asyncHandler(async (req, res) => {
    const { senderIdentifier, reciverIdentifier } = req.body;
    console.log(
      `senderIdentifer : ${senderIdentifier} , reciverIdentifer : ${reciverIdentifier}`
    );
    await familyLinkServices.sendChildVerificationCode(
      senderIdentifier,
      reciverIdentifier
    );
    res.status(200).json({
      success: true,
      message: req.t("تم ارسال الرمز بنجاح"),
    });
  }),

  vertifyChildVerificationCode: asyncHandler(async (req, res) => {
    console.log("vertifyChildVerificationCode");
    const { senderIdentifier, reciverIdentifier, verificationCode } = req.body;
    console.log(
      `senderIdentifer : ${senderIdentifier} , reciverIdentifer : ${reciverIdentifier} , verificationCode : ${verificationCode}`
    );
    await familyLinkServices.vertifyChildVerificationCode(
      senderIdentifier,
      reciverIdentifier,
      verificationCode
    );
    res.status(200).json({
      success: true,
      message: req.t("تم التحقق من الرمز بنجاح"),
    });
  }),

  addChildToFamilyLink: asyncHandler(async (req, res) => {
    const { parentId, childId } = req.body;

    console.log(`parentId : ${parentId} , childId : ${childId}`);
    await familyLinkServices.addChildToFamilyLink(parentId, childId);

    res.status(200).json({
      success: true,
      message: req.t("تم اضافة الطفل بنجاح"),
    });
  }),

  getChildsByUserId: asyncHandler(async (req, res) => {
    const { parentId } = req.query;
    console.log(`parentId : ${parentId}`);

    const childs = await familyLinkServices.getChildsByParentId(parentId);
    res.status(200).json({
      success: true,
      message: "data fetched successfully",
      FamilyLink: childs,
    });
  }),
};

export default familyLinkControllers;
