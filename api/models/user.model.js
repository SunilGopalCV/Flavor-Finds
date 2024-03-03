import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default:
        "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png",
    },
    phone: { type: String, required: false },
    nickname: { type: String, default: "Chef", required: false },
    bio: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
