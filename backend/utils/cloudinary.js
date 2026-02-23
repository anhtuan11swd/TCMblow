import dotenv from "dotenv";

dotenv.config();

import path from "node:path";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cấu hình Cloudinary
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

// Cấu hình storage với Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    folder: "TCMblow",
    public_id: (_req, file) => {
      const uniqueSuffix = Date.now();
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      return `${baseName}-${uniqueSuffix}`;
    },
    transformation: [
      { crop: "limit", height: 1200, quality: "auto", width: 1200 },
    ],
  },
});

// Middleware upload với bộ lọc file ảnh
const fileFilter = (_req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file ảnh (jpg, jpeg, png, gif, webp)"), false);
  }
};

export const upload = multer({
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  },
  storage: storage,
});

export const cloudinaryConfig = cloudinary;

export default cloudinary;
