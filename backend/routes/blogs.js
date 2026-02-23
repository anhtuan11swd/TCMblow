import express from "express";
import {
  addBlogsToFavorite,
  addToFavorites,
  fetchAllBlogs,
  fetchRecentBlogs,
  getAllCategories,
  getBlogByCategory,
  getDSCByAddress,
  getFavoriteBlogsOfAUser,
  getLikedBlogsOfAUser,
  removeBlogFromFavorites,
  removeFromFavorites,
} from "../controllers/blogsController.js";

const router = express.Router();

/**
 * GET /api/v1/blogs/fetchAllBlogs
 * Lấy tất cả bài viết blog, sắp xếp theo thời gian tạo mới nhất
 */
router.get("/fetchAllBlogs", fetchAllBlogs);

/**
 * GET /api/v1/blogs/fetchRecentBlogs
 * Lấy 4 bài viết mới nhất
 */
router.get("/fetchRecentBlogs", fetchRecentBlogs);

/**
 * GET /api/v1/blogs/getDSCByAddress/:id
 * Lấy chi tiết bài viết theo ID
 */
router.get("/getDSCByAddress/:id", getDSCByAddress);

/**
 * POST /api/v1/blogs/addToFavorites/:id
 * Thêm bài viết vào danh sách yêu thích
 */
router.post("/addToFavorites/:id", addToFavorites);

/**
 * DELETE /api/v1/blogs/removeFromFavorites/:id
 * Xóa bài viết khỏi danh sách yêu thích (hệ thống like)
 */
router.delete("/removeFromFavorites/:id", removeFromFavorites);

/**
 * POST /api/v1/blogs/addBlogsToFavorite/:id
 * Thêm bài viết vào danh sách yêu thích (hệ thống favorite riêng)
 */
router.post("/addBlogsToFavorite/:id", addBlogsToFavorite);

/**
 * DELETE /api/v1/blogs/removeBlogFromFavorites/:id
 * Xóa bài viết khỏi danh sách yêu thích (hệ thống favorite riêng)
 */
router.delete("/removeBlogFromFavorites/:id", removeBlogFromFavorites);

/**
 * GET /api/v1/blogs/getFavoriteBlogsOfAUser
 * Lấy danh sách bài viết yêu thích của user hiện tại
 */
router.get("/getFavoriteBlogsOfAUser", getFavoriteBlogsOfAUser);

/**
 * GET /api/v1/blogs/getLikedBlogsOfAUser
 * Lấy danh sách bài viết đã thích của user hiện tại
 */
router.get("/getLikedBlogsOfAUser", getLikedBlogsOfAUser);

/**
 * GET /api/v1/blogs/getBlogByCategory/:id
 * Lấy tất cả bài viết thuộc một danh mục
 */
router.get("/getBlogByCategory/:id", getBlogByCategory);

/**
 * GET /api/v1/blogs/getAllCategories
 * Lấy tất cả danh mục
 */
router.get("/getAllCategories", getAllCategories);

export default router;
