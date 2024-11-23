import User from "../../models/UserModel/User.js";
import ChildVerificationCode from "../../models/ChildVerificationCodeModel/childVerificationCodeModel.js";
import FamilyLink from "../../models/FamilyLinkModel/FamilyLinkModel.js";

import { customAlphabet } from "nanoid";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

import sendChildVerificationCodeMessageTemplate from "./../../views/sendChildVerificationCodeMessageTemplate.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HASH_PASSWORD_SALT = parseInt(process.env.BCRYPT_SALT);
const VERIFICATION_CODE_LENGTH = parseInt(process.env.VERIFICATION_CODE_LENGTH);
const CHAR_SET_NANOID = process.env.NANOID_CHAR_SET;

const familyLinkServices = {
  sendChildVerificationCode: async (
    senderUserIdentifier,
    reciverUserIdentifier
  ) => {
    console.log(`senderUserIdentifier : ${senderUserIdentifier}`);
    console.log(`reciverUserIdentifier : ${reciverUserIdentifier}`);

    const senderUserAccountDetails = await User.findOne(
      { _id: senderUserIdentifier },
      { _id: 1, email: 1, fullName: 1 }
    );
    console.log(`senderUserAccountDetails : ${senderUserAccountDetails}`);

    if (!senderUserAccountDetails) {
      const error = new Error("sendResetPasswordCode.invalid_credentials");
      error.statusCode = 401;
      throw error;
    }

    const reciverUserAccountDetails = await User.findOne(
      { email: reciverUserIdentifier },
      { _id: 1, email: 1, fullName: 1 }
    );

    if (!reciverUserAccountDetails) {
      const error = new Error("sendResetPasswordCode.invalid_credentials");
      error.statusCode = 401;
      throw error;
    }
    console.log(`reciverUserAccountDetails : ${reciverUserAccountDetails}`);
    if (
      senderUserAccountDetails._id.toString() ===
      reciverUserAccountDetails._id.toString()
    ) {
      const error = new Error("sendResetPasswordCode.invalid_credentials");
      error.statusCode = 401;
      throw error;
    }

    const isCodeAlreadySent = await ChildVerificationCode.findOne({
      senderId: senderUserAccountDetails._id,
      recipientId: reciverUserAccountDetails._id,
    });
    if (isCodeAlreadySent) {
      const error = new Error("لقد تم ارسال الرمز مسبقا");
      error.statusCode = 409;
      throw error;
    }
    console.log("isCodeAlreadySent");
    console.log(isCodeAlreadySent);

    const generateSecureVerificationCode = customAlphabet(
      CHAR_SET_NANOID,
      VERIFICATION_CODE_LENGTH
    );

    const verificationCode = generateSecureVerificationCode();
    console.log(verificationCode);

    const hashedVerificationCode = await bcrypt.hash(
      verificationCode,
      HASH_PASSWORD_SALT
    );
    console.log(hashedVerificationCode);

    await ChildVerificationCode.create({
      senderId: senderUserAccountDetails._id,
      recipientId: reciverUserAccountDetails._id,
      code: hashedVerificationCode,
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const template = handlebars.compile(
      sendChildVerificationCodeMessageTemplate
    );
    const emailHTML = template({
      senderEmail: senderUserAccountDetails.email,
      receiverEmail: reciverUserAccountDetails.email,
      verificationCode: verificationCode,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: reciverUserAccountDetails.email,
      subject: "Family Link Request",
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);
    return;
  },

  vertifyChildVerificationCode: async (
    senderUserIdentifier,
    reciverUserIdentifier,
    verificationCode
  ) => {
    console.log(
      `senderUserIdentifier: ${senderUserIdentifier}, reciverUserIdentifier: ${reciverUserIdentifier}, verificationCode: ${verificationCode}`
    );

    const senderUserAccountDetails = await User.findOne(
      { _id: senderUserIdentifier },
      { _id: 1, email: 1, fullName: 1 }
    );

    const reciverUserAccountDetails = await User.findOne(
      { email: reciverUserIdentifier },
      { _id: 1, email: 1 }
    );

    console.log({ senderUserAccountDetails, reciverUserAccountDetails });

    if (!senderUserAccountDetails || !reciverUserAccountDetails) {
      console.log("Invalid Credentials sender, reciver details");
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }

    const childVerificationCodeData = await ChildVerificationCode.findOne({
      senderId: senderUserAccountDetails._id,
      recipientId: reciverUserAccountDetails._id,
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

    try {
      const response = await axios.post(
        "http://localhost:3000" + "/api/family-link/add-child-to-family-link",
        {
          parentId: senderUserAccountDetails._id.toString(),
          childId: reciverUserAccountDetails._id.toString(),
        }
      );
    } catch (error) {
      console.log("error");
      console.log(error);
    }
    console.log("-------------------");
  },

  addChildToFamilyLink: async (parentId, childId) => {
    console.log(`parentId : ${parentId}`);
    console.log(`childId : ${childId}`);

    const isParentExist = await User.findOne({ _id: parentId });
    console.log("isParentExist", isParentExist);

    if (!isParentExist) {
      const error = new Error("Parent does not exist.");
      error.statusCode = 404;
      throw error;
    }

    const isChildExist = await User.findOne({ _id: childId });
    console.log("isChildExist", isChildExist);

    if (!isChildExist) {
      const error = new Error("Child does not exist.");
      error.statusCode = 404;
      throw error;
    }

    let familyLink = await FamilyLink.findOne({
      parentId: parentId,
    });

    console.log(`familyLink : ${familyLink}`);

    if (!familyLink) {
      familyLink = new FamilyLink({
        parentId: parentId,
        children: [{ childId }],
      });
    } else {
      const isChildLinked = familyLink.children.some(
        (child) => child.childId.toString() === childId
      );

      if (isChildLinked) {
        const error = new Error("Child is already linked to this participant.");
        error.statusCode = 409;
        throw error;
      }
      familyLink.children.push({ childId });
    }

    await familyLink.save();
    return;
  },

  getChildsByParentId: async (parentId) => {
    const userData = await User.findOne({ _id: parentId });

    if (!userData) {
      const error = new Error("User does not exist.");
      error.statusCode = 404;
      throw error;
    }

    const childs = await FamilyLink.findOne({ parentId: parentId })
      .populate({
        path: "children.childId",
        select: { email: 1, fullName: 1 },
      })
      .select(" parentId children");

    console.log(childs);
    if (!childs || childs.length === 0) {
      const error = new Error("User does not have any child linked.");
      error.statusCode = 404;
      throw error;
    }

    return childs;
  },
};
export default familyLinkServices;
