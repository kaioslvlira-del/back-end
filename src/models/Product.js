import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    prices: {
      monthly: Number,
      quarterly: Number,
      lifetime: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", ProductSchema);
