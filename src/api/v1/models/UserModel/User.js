import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    birthdate: { type: Date },
    phone: { type: String },
    city: { type: String },
    country: { type: String },
    role: { type: String, default: "student" },
    profileImage: {
      secure_url: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
