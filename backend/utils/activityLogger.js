import Activity from "../models/Activity.js";

/**
 * Helper function để log hoạt động của admin
 * @param {Object} params - Tham số cho activity log
 * @param {string} params.action - Loại hành động (create_blog, update_blog, delete_blog, etc.)
 * @param {string} params.actionText - Mô tả hành động bằng tiếng Việt
 * @param {string} params.adminId - ID của admin thực hiện hành động
 * @param {Object} params.details - Chi tiết bổ sung
 * @param {string} params.details.title - Tiêu đề của blog/category
 * @param {string} params.details.blogId - ID của blog (nếu có)
 * @param {string} params.details.categoryId - ID của category (nếu có)
 */
export const logActivity = async ({
  action,
  actionText,
  adminId,
  details = {},
}) => {
  try {
    await Activity.create({
      action,
      actionText,
      admin: adminId,
      details,
    });
  } catch (error) {
    console.error("Lỗi khi log hoạt động:", error);
    // Không throw error để không ảnh hưởng đến flow chính
  }
};

/**
 * Helper functions cho các loại hoạt động cụ thể
 */
export const logBlogCreated = (adminId, blogId, title) => {
  return logActivity({
    action: "create_blog",
    actionText: "Thêm bài viết mới",
    adminId,
    details: { blogId, title },
  });
};

export const logBlogUpdated = (adminId, blogId, title) => {
  return logActivity({
    action: "update_blog",
    actionText: "Cập nhật bài viết",
    adminId,
    details: { blogId, title },
  });
};

export const logBlogDeleted = (adminId, title) => {
  return logActivity({
    action: "delete_blog",
    actionText: "Xóa bài viết",
    adminId,
    details: { title },
  });
};

export const logCategoryCreated = (adminId, categoryId, title) => {
  return logActivity({
    action: "create_category",
    actionText: "Thêm danh mục mới",
    adminId,
    details: { categoryId, title },
  });
};

export const logCategoryUpdated = (adminId, categoryId, title) => {
  return logActivity({
    action: "update_category",
    actionText: "Cập nhật danh mục",
    adminId,
    details: { categoryId, title },
  });
};

export const logCategoryDeleted = (adminId, title) => {
  return logActivity({
    action: "delete_category",
    actionText: "Xóa danh mục",
    adminId,
    details: { title },
  });
};
