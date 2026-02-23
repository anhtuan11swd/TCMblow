import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    email: {
      lowercase: true,
      required: [true, "email là bắt buộc"],
      trim: true,
      type: String,
      unique: true,
    },
    password: {
      minlength: 6,
      required: [true, "mật khẩu là bắt buộc"],
      type: String,
    },
    role: {
      default: "user",
      enum: ["admin", "user"],
      type: String,
    },
    username: {
      minlength: 3,
      required: [true, "tên người dùng là bắt buộc"],
      trim: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
