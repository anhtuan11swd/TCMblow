import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.blogAppTCM;

  if (!token) {
    return res.status(401).json({ message: "Truy cập bị từ chối" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    req.user = user;
    next();
  } catch (_error) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Truy cập bị từ chối" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Truy cập bị từ chối" });
    }
    next();
  };
};

const authMiddleware = {
  authorizeRole,
  verifyToken,
};

export default authMiddleware;
