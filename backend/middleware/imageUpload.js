import multer from "multer";
import { upload } from "../utils/cloudinary.js";

// Middleware upload ảnh đơn
export const uploadImage = upload.single("image");

// Middleware upload nhiều ảnh (tối đa 10)
export const uploadImages = upload.array("images", 10);

// Middleware upload ảnh profile
export const uploadAvatar = upload.single("avatar");

// Middleware xử lý lỗi upload
export const handleUploadError = (err, _req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File quá lớn. Kích thước tối đa là 5MB",
        success: false,
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "Quá nhiều file. Tối đa 10 file",
        success: false,
      });
    }
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }

  if (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }

  next();
};
