import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkCookie = async (req, res) => {
  try {
    const token = req.cookies.blogsAppTCM;
    if (token) {
      return res.status(200).json({ valid: true });
    }
    return res.status(200).json({ valid: false });
  } catch (_error) {
    return res.status(200).json({ valid: false });
  }
};

export const logoutUser = async (_req, res) => {
  try {
    res.clearCookie("blogsAppTCM", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (_error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const signupUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Tất cả các trường đều bắt buộc",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      });
    }

    // Validate username length
    if (username.length < 3) {
      return res.status(400).json({
        message: "Tên người dùng phải có ít nhất 3 ký tự",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email đã tồn tại",
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
    console.error("Signup error:", error);
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

    res.cookie("blogsAppTCM", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "strict",
      secure: true,
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
