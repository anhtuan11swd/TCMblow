import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signupUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Tất cả các trường đều bắt buộc",
      });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: "Tên người dùng hoặc email đã tồn tại",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    res.status(200).json({
      message: "Tài khoản đã được tạo",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "lỗi server",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Tất cả các trường đều bắt buộc",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Thông tin đăng nhập không hợp lệ",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Thông tin đăng nhập không hợp lệ",
      });
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        email: user.email,
        id: user._id,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "lỗi server",
    });
  }
};
