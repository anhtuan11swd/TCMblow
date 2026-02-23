import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkCookie = async (req, res) => {
  try {
    const token = req.cookies.blogAppTCM;
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
    res.clearCookie("blogAppTCM", {
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

    res.cookie("blogAppTCM", token, {
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

export const getProfileData = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const { password, ...safeUserData } = user.toObject();

    return res.status(200).json({ user: safeUserData });
  } catch (_error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { password, newPass, confirmNewPass } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!password || !newPass || !confirmNewPass) {
      return res
        .status(400)
        .json({ message: "Tất cả các trường đều bắt buộc" });
    }

    // Lấy thông tin người dùng từ middleware
    const user = req.user;

    // So sánh mật khẩu hiện tại với mật khẩu trong DB
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp nhau không
    if (newPass !== confirmNewPass) {
      return res.status(400).json({ message: "Mật khẩu mới không khớp" });
    }

    // Validate độ dài mật khẩu mới
    if (newPass.length < 6) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
    }

    // Mã hóa mật khẩu mới với 10 vòng lặp
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPass, salt);

    // Cập nhật mật khẩu trong DB
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const changeAvatar = async (req, res) => {
  try {
    // Kiểm tra xem có file được tải lên không
    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng tải lên một hình ảnh" });
    }

    // Lấy URL từ file đã được xử lý bởi middleware
    const imageUrl = req.file.path;

    // Lấy thông tin người dùng từ middleware
    const user = req.user;

    // Cập nhật avatar trong DB
    user.avatar = imageUrl;
    await user.save();

    return res.status(200).json({
      avatar: imageUrl,
      message: "Cập nhật ảnh đại diện thành công",
    });
  } catch (error) {
    console.error("Change avatar error:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
