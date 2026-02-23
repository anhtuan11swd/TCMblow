import express from "express";
import {
  addBlog,
  adminLogin,
  createCategory,
  deleteBlog,
  deleteCategory,
  getAllBlogs,
  getCategories,
  getPublicCategories,
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { handleUploadError, uploadImage } from "../middleware/imageUpload.js";

const router = express.Router();

// Route đăng nhập admin
router.post("/admin-login", adminLogin);

// Route thêm bài viết (yêu cầu đăng nhập và role admin)
router.post(
  "/add-blog",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  uploadImage,
  handleUploadError,
  addBlog,
);

// Route lấy danh sách tất cả bài viết (admin)
router.get(
  "/blogs",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  getAllBlogs,
);

// Route xóa bài viết (admin)
router.delete(
  "/blog/:id",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  deleteBlog,
);

// Route tạo danh mục (admin)
router.post(
  "/category",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  createCategory,
);

// Route lấy danh sách danh mục (công khai - cho trang chủ)
router.get("/get-categories", getPublicCategories);

// Route lấy danh sách danh mục (admin)
router.get(
  "/categories",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  getCategories,
);

// Route xóa danh mục (admin)
router.delete(
  "/category/:id",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  deleteCategory,
);

export default router;
