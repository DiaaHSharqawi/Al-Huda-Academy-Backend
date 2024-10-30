import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    age: { type: Number, required: true },
    phone: { type: String },
    city: { type: String },
    country: { type: String },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    role: { type: String, default: "student" },
    profileImage: {
      secure_url: { type: String, required: false },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
