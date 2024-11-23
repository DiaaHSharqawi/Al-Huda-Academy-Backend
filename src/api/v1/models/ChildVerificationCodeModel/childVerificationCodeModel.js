import mongoose from "mongoose";

const ChildVerificationCodeSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: "10m" },
    },
  },
  { timestamps: true }
);

const ChildVerificationCode = mongoose.model(
  "ChildVerificationCode",
  ChildVerificationCodeSchema
);

export default ChildVerificationCode;
