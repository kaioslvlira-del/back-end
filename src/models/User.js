import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    discordId: String,
    username: String,
    avatar: String,
    discriminator: String,

    fullName: String,
    birthDate: String,
    email: String,
    cpf: String,

    isPrivate: {
      type: Boolean,
      default: false,
    },

    useDiscordAvatar: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }, // 🔥 IMPORTANTE (createdAt)
);

export default mongoose.model("User", userSchema);
