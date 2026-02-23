import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Activity from "../models/Activity.js";
import User from "../models/User.js";
import {
  logBlogCreated,
  logBlogDeleted,
  logCategoryCreated,
  logCategoryDeleted,
} from "../utils/activityLogger.js";

export const adminLogin = async (req, res) => {
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

    // Kiểm tra vai trò có phải là admin không
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập admin",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Thông tin đăng nhập không hợp lệ",
      });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );

    res.cookie("blogAppTCM", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Đăng nhập admin thành công",
      user: {
        email: user.email,
        id: user._id,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập admin:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
    });
  }
};

export const addBlog = async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;
    const image = req.file?.path;

    if (!title || !description || !image) {
      return res.status(400).json({
        message: "Tất cả các trường đều bắt buộc",
      });
    }

    // Xác minh danh mục trước khi tạo bài viết
    let category = null;
    if (categoryId) {
      const Category = (await import("../models/Category.js")).default;
      category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({
          message: "Không tìm thấy danh mục",
        });
      }
    }

    // Tạo và lưu bài viết mới
    const Blog = (await import("../models/Blog.js")).default;
    const newBlog = new Blog({
      author: req.user._id,
      description,
      image,
      title,
      ...(categoryId && { category: categoryId }),
    });

    await newBlog.save();

    // Sau khi bài viết đã lưu thành công, thêm ID vào mảng blogs của danh mục
    if (category) {
      category.blogs.push(newBlog._id);
      await category.save();
    }

    // Lưu hoạt động
    await logBlogCreated(req.user._id, newBlog._id, newBlog.title);

    res.status(201).json({
      blog: newBlog,
      message: "Bài viết đã được thêm thành công",
    });
  } catch (error) {
    console.error("Lỗi thêm bài viết:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
    });
  }
};

export const getAllBlogs = async (_req, res) => {
  try {
    const Blog = (await import("../models/Blog.js")).default;
    const blogs = await Blog.find()
      .populate("author", "username email")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      blogs,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách bài viết:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const Blog = (await import("../models/Blog.js")).default;
    const Category = (await import("../models/Category.js")).default;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Không tìm thấy bài viết",
      });
    }

    // Lưu thông tin bài viết trước khi xóa
    const blogTitle = blog.title;

    // Xóa bài viết khỏi danh mục nếu có
    if (blog.category) {
      await Category.updateOne(
        { _id: blog.category },
        { $pull: { blogs: blog._id } },
      );
    }

    await Blog.findByIdAndDelete(req.params.id);

    // Lưu hoạt động
    await logBlogDeleted(req.user._id, blogTitle);

    res.status(200).json({
      message: "Bài viết đã được xóa thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa bài viết:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Tên danh mục là bắt buộc",
      });
    }

    const Category = (await import("../models/Category.js")).default;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        message: "Danh mục đã tồn tại",
      });
    }

    const newCategory = new Category({
      description,
      name,
    });

    await newCategory.save();

    // Lưu hoạt động
    await logCategoryCreated(req.user._id, newCategory._id, newCategory.name);

    res.status(201).json({
      category: newCategory,
      message: "Danh mục đã được tạo thành công",
    });
  } catch (error) {
    console.error("Lỗi tạo danh mục:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
    });
  }
};

export const getPublicCategories = async (_req, res) => {
  try {
    const Category = (await import("../models/Category.js")).default;
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách danh mục:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
    });
  }
};

export const getCategories = async (_req, res) => {
  try {
    const Category = (await import("../models/Category.js")).default;
    const categories = await Category.find()
      .populate("blogs")
      .sort({ createdAt: -1 });

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách danh mục:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const Category = (await import("../models/Category.js")).default;
    const Blog = (await import("../models/Blog.js")).default;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    // Lưu thông tin danh mục trước khi xóa
    const categoryName = category.name;

    // Xóa danh mục khỏi các bài viết thuộc danh mục này
    await Blog.updateMany(
      { category: req.params.id },
      { $unset: { category: 1 } },
    );

    await Category.findByIdAndDelete(req.params.id);

    // Lưu hoạt động
    await logCategoryDeleted(req.user._id, categoryName);

    res.status(200).json({
      message: "Danh mục đã được xóa thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa danh mục:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
    });
  }
};

export const getAdminStats = async (_req, res) => {
  try {
    const Blog = (await import("../models/Blog.js")).default;
    const Category = (await import("../models/Category.js")).default;

    // Tổng số bài viết
    const totalBlogs = await Blog.countDocuments();

    // Bài viết mới trong tuần (7 ngày gần nhất)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyBlogs = await Blog.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });

    // Tổng số danh mục
    const totalCategories = await Category.countDocuments();

    // Tổng lượt xem trong tuần (tính từ likes)
    const weeklyViewsResult = await Blog.aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo },
        },
      },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: "$likes" },
        },
      },
    ]);

    const weeklyViews = weeklyViewsResult[0]?.totalLikes || 0;

    res.status(200).json({
      stats: {
        totalBlogs,
        totalCategories,
        weeklyBlogs,
        weeklyViews,
      },
      success: true,
    });
  } catch (error) {
    console.error("Lỗi lấy thống kê admin:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
      success: false,
    });
  }
};

export const getRecentActivities = async (_req, res) => {
  try {
    // Lấy 10 hoạt động gần nhất
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("admin", "username email")
      .lean();

    // Format thời gian
    const formattedActivities = activities.map((activity) => {
      const now = new Date();
      const activityDate = new Date(activity.createdAt);
      const diffMs = now - activityDate;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let timeAgo;
      if (diffMins < 60) {
        timeAgo = `${diffMins} phút trước`;
      } else if (diffHours < 24) {
        timeAgo = `${diffHours} giờ trước`;
      } else if (diffDays === 1) {
        timeAgo = "1 ngày trước";
      } else {
        timeAgo = `${diffDays} ngày trước`;
      }

      return {
        action: activity.actionText,
        id: activity._id,
        time: timeAgo,
        title: activity.details?.title || "Không có tiêu đề",
      };
    });

    res.status(200).json({
      activities: formattedActivities,
      success: true,
    });
  } catch (error) {
    console.error("Lỗi lấy hoạt động gần đây:", error);
    res.status(500).json({
      error: error.message,
      message: "Lỗi server",
      success: false,
    });
  }
};
