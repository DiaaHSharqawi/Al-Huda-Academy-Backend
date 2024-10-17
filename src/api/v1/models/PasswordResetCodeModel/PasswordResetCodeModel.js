import mongoose from "mongoose";

const PasswordResetCodeSchema = new mongoose.Schema({
  userId: {
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
    expires: "5m",
  },
});

const PasswordResetCode = mongoose.model(
  "PasswordResetCode",
  PasswordResetCodeSchema
);

export default PasswordResetCode;
