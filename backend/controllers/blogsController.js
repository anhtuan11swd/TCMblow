import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

// Middleware helper để lấy user từ token (optional)
const getUserFromCookie = async (req) => {
  const token = req.cookies.blogAppTCM;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      return user;
    } catch (_error) {
      return null;
    }
  }
  return null;
};

/**
 * getDSCByAddress - Lấy chi tiết bài viết theo ID
 * Bao gồm thông tin về việc user hiện tại đã like bài viết hay chưa
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getDSCByAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserFromCookie(req);
    const userId = user?._id;

    const blog = await Blog.findById(id)
      .populate("author", "name email")
      .populate("category", "name");

    if (!blog) {
      return res.status(400).json({
        message: "no blog found",
        success: false,
      });
    }

    // Kiểm tra user hiện tại đã like bài viết chưa
    const isFavorited = userId && blog.likes_users.includes(userId);

    // Kiểm tra user hiện tại đã favorite bài viết chưa
    const isFavorite =
      userId &&
      blog.favoriteBlogsByUser &&
      blog.favoriteBlogsByUser.includes(userId);

    res.status(200).json({
      blog: {
        ...blog.toObject(),
        favorite: isFavorite,
        liked: isFavorited,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * addToFavorites - Thêm bài viết vào danh sách yêu thích
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const addToFavorites = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const user = await getUserFromCookie(req);

    if (!user) {
      return res.status(401).json({
        message: "Vui lòng đăng nhập để thích bài viết",
        success: false,
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({
        message: "Không tìm thấy bài viết",
        success: false,
      });
    }

    // Kiểm tra đã like chưa
    if (blog.likes_users.includes(user._id)) {
      return res.status(400).json({
        message: "Bài viết đã được thích trước đó",
        success: false,
      });
    }

    // Khởi tạo mảng nếu chưa có
    if (!user.likedBlogs) {
      user.likedBlogs = [];
    }

    // Thêm user vào likes_users của blog và thêm blog vào likedBlogs của user
    blog.likes_users.push(user._id);
    blog.likes += 1;
    user.likedBlogs.push(blogId);

    await blog.save();
    await user.save();

    res.status(200).json({
      liked: true,
      message: "Đã thích bài viết",
      success: true,
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * removeFromFavorites - Xóa bài viết khỏi danh sách yêu thích
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const removeFromFavorites = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const user = await getUserFromCookie(req);

    if (!user) {
      return res.status(401).json({
        message: "Vui lòng đăng nhập để bỏ thích",
        success: false,
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({
        message: "Không tìm thấy bài viết",
        success: false,
      });
    }

    // Kiểm tra đã like chưa
    if (!blog.likes_users.includes(user._id)) {
      return res.status(400).json({
        message: "Bài viết chưa được thích",
        success: false,
      });
    }

    // Khởi tạo mảng nếu chưa có
    if (!user.likedBlogs) {
      user.likedBlogs = [];
    }

    // Xóa user khỏi likes_users của blog và giảm likes
    blog.likes_users = blog.likes_users.filter(
      (id) => id.toString() !== user._id.toString(),
    );
    blog.likes = Math.max(0, blog.likes - 1);

    // Xóa blog khỏi likedBlogs của user
    user.likedBlogs = user.likedBlogs.filter(
      (id) => id.toString() !== blogId.toString(),
    );

    await blog.save();
    await user.save();

    res.status(200).json({
      liked: false,
      message: "Đã bỏ thích bài viết",
      success: true,
    });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};
const fetchAllBlogs = async (_req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      blogs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * fetchRecentBlogs - Lấy 4 bài viết mới nhất
 * Sắp xếp theo thời gian tạo mới nhất và giới hạn 4 bài viết
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const fetchRecentBlogs = async (_req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(4);

    res.status(200).json({
      blogs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * addBlogsToFavorite - Thêm bài viết vào danh sách yêu thích (hệ thống riêng)
 * Sử dụng push để thêm ID người dùng vào bài viết và ngược lại
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const addBlogsToFavorite = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const user = await getUserFromCookie(req);

    if (!user) {
      return res.status(401).json({
        message: "Vui lòng đăng nhập để thêm yêu thích",
        success: false,
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({
        message: "Không tìm thấy bài viết",
        success: false,
      });
    }

    // Khởi tạo mảng nếu chưa có
    if (!blog.favoriteBlogsByUser) {
      blog.favoriteBlogsByUser = [];
    }
    if (!user.favoriteBlogs) {
      user.favoriteBlogs = [];
    }

    // Kiểm tra đã favorite chưa
    if (blog.favoriteBlogsByUser.includes(user._id)) {
      return res.status(400).json({
        message: "Bài viết đã được yêu thích trước đó",
        success: false,
      });
    }

    // Thêm userId vào blog và blogId vào user bằng push
    blog.favoriteBlogsByUser.push(user._id);
    user.favoriteBlogs.push(blogId);

    await blog.save();
    await user.save();

    res.status(200).json({
      favorite: true,
      message: "Đã thêm vào yêu thích",
      success: true,
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * removeBlogFromFavorites - Xóa bài viết khỏi danh sách yêu thích
 * Sử dụng indexOf và splice để loại bỏ ID khỏi mảng
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const removeBlogFromFavorites = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const user = await getUserFromCookie(req);

    if (!user) {
      return res.status(401).json({
        message: "Vui lòng đăng nhập để bỏ yêu thích",
        success: false,
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({
        message: "Không tìm thấy bài viết",
        success: false,
      });
    }

    // Khởi tạo mảng nếu chưa có
    if (!blog.favoriteBlogsByUser) {
      blog.favoriteBlogsByUser = [];
    }
    if (!user.favoriteBlogs) {
      user.favoriteBlogs = [];
    }

    // Tìm vị trí và xóa khỏi blog
    const blogIndex = blog.favoriteBlogsByUser.indexOf(user._id);
    if (blogIndex > -1) {
      blog.favoriteBlogsByUser.splice(blogIndex, 1);
    }

    // Tìm vị trí và xóa khỏi user
    const userIndex = user.favoriteBlogs.indexOf(blogId);
    if (userIndex > -1) {
      user.favoriteBlogs.splice(userIndex, 1);
    }

    await blog.save();
    await user.save();

    res.status(200).json({
      favorite: false,
      message: "Đã bỏ khỏi yêu thích",
      success: true,
    });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * getFavoriteBlogsOfAUser - Lấy danh sách bài viết yêu thích của user
 * Sử dụng populate để chuyển đổi ID thành dữ liệu chi tiết
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getFavoriteBlogsOfAUser = async (req, res) => {
  try {
    const user = await getUserFromCookie(req);

    if (!user) {
      return res.status(401).json({
        message: "Vui lòng đăng nhập",
        success: false,
      });
    }

    // Populate favoriteBlogs để lấy chi tiết bài viết
    const userWithFavorites = await User.findById(user._id).populate({
      path: "favoriteBlogs",
      populate: [
        { path: "author", select: "name email" },
        { path: "category", select: "name" },
      ],
    });

    res.status(200).json({
      blogs: userWithFavorites.favoriteBlogs || [],
      success: true,
    });
  } catch (error) {
    console.error("Error fetching favorite blogs:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * getLikedBlogsOfAUser - Lấy danh sách bài viết đã thích của user
 * Sử dụng populate để chuyển đổi ID thành dữ liệu chi tiết
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getLikedBlogsOfAUser = async (req, res) => {
  try {
    const user = await getUserFromCookie(req);

    if (!user) {
      return res.status(401).json({
        message: "Vui lòng đăng nhập",
        success: false,
      });
    }

    // Populate likedBlogs để lấy chi tiết bài viết
    const userWithLiked = await User.findById(user._id).populate({
      path: "likedBlogs",
      populate: [
        { path: "author", select: "name email" },
        { path: "category", select: "name" },
      ],
    });

    res.status(200).json({
      blogs: userWithLiked.likedBlogs || [],
      success: true,
    });
  } catch (error) {
    console.error("Error fetching liked blogs:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * getBlogByCategory - Lấy tất cả bài viết thuộc một danh mục
 * Sử dụng findById(id).populate('blogs') để lấy dữ liệu bài viết đầy đủ
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBlogByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm danh mục và populate blogs để lấy đầy đủ thông tin bài viết
    const category = await Category.findById(id).populate({
      options: { sort: { createdAt: -1 } },
      path: "blogs",
      populate: [
        { path: "author", select: "name email" },
        { path: "category", select: "name" },
      ],
    });

    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
        success: false,
      });
    }

    res.status(200).json({
      blogs: category.blogs || [],
      category,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * getAllCategories - Lấy tất cả danh mục
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      categories,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * editBlog - Cập nhật bài viết theo ID
 * Sử dụng findByIdAndUpdate để cập nhật tiêu đề và mô tả
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!title && !description) {
      return res.status(400).json({
        message: "Cần cập nhật ít nhất một trường (title hoặc description)",
        success: false,
      });
    }

    // Tìm và cập nhật blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { description, title },
      { returnDocument: "after", runValidators: true },
    )
      .populate("author", "name email")
      .populate("category", "name");

    if (!updatedBlog) {
      return res.status(404).json({
        message: "Không tìm thấy bài viết",
        success: false,
      });
    }

    res.status(200).json({
      blog: updatedBlog,
      message: "Bài viết đã được cập nhật thành công",
      success: true,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

/**
 * deleteBlog - Xóa bài viết theo ID
 * Sử dụng findByIdAndDelete để xóa blog
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        message: "Không tìm thấy bài viết",
        success: false,
      });
    }

    res.status(200).json({
      message: "Bài viết đã được xóa thành công",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server nội bộ",
      success: false,
    });
  }
};

export {
  fetchAllBlogs,
  fetchRecentBlogs,
  getDSCByAddress,
  addToFavorites,
  removeFromFavorites,
  addBlogsToFavorite,
  removeBlogFromFavorites,
  getFavoriteBlogsOfAUser,
  getLikedBlogsOfAUser,
  getBlogByCategory,
  getAllCategories,
  editBlog,
  deleteBlog,
};
