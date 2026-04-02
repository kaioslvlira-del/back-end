import mongoose from "mongoose";

const KeySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    type: {
      type: String,
      enum: ["monthly", "quarterly", "lifetime"],
      required: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    used: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Key", KeySchema);
