import mongoose from "mongoose";

const FamilyLinkSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    children: [
      {
        childId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        linkedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const FamilyLink = mongoose.model("FamilyLink", FamilyLinkSchema);

export default FamilyLink;
