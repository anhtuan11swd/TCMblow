import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import BlogList from "../components/admin/BlogList";

/**
 * EditBlogs - Trang quản lý bài viết cho admin
 * Lấy dữ liệu blog từ API và hiển thị danh sách
 * Cho phép chỉnh sửa và xóa bài viết
 */
const EditBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lấy danh sách blog từ API
  const fetchBlogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:1000/api/v1/blogs/fetchAllBlogs",
        { withCredentials: true },
      );

      if (response.data.success) {
        // Chuyển đổi dữ liệu từ API sang định dạng phù hợp cho BlogList
        const formattedBlogs = response.data.blogs.map((blog) => ({
          createdAt: blog.createdAt,
          description: blog.description,
          id: blog._id,
          image: blog.image,
          title: blog.title,
        }));
        setBlogs(formattedBlogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Lỗi khi tải danh sách bài viết");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Gọi API khi component mount
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Auto-refresh khi blogs thay đổi (xóa, cập nhật, thêm mới)
  useEffect(() => {
    if (blogs.length > 0) {
      // Danh sách đã được cập nhật, có thể thêm logic refresh nếu cần
    }
  }, [blogs]);

  // Hàm xử lý xóa bài viết
  const handleDelete = async (blogId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v1/blogs/deleteBlog/${blogId}`,
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success("Bài viết đã được xóa thành công");
        // Cập nhật danh sách blog sau khi xóa
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      if (error.response?.status === 401) {
        toast.error("Bạn cần đăng nhập với tài khoản Admin để xóa bài viết");
      } else if (error.response?.status === 403) {
        toast.error("Bạn không có quyền xóa bài viết");
      } else {
        toast.error("Lỗi khi xóa bài viết");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4 min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="border-4 border-blue-600 border-t-transparent rounded-full w-10 h-10 animate-spin" />
          <p className="text-zinc-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bold text-zinc-800 text-3xl">Quản lý bài viết</h1>
        <p className="mt-2 text-zinc-500">
          Chỉnh sửa và xóa các bài viết hiện có
        </p>
      </div>

      {/* Danh sách bài viết với padding-8 */}
      <div className="flex-1 bg-zinc-50 p-8 rounded-xl overflow-y-auto">
        {/* Tiêu đề danh sách */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-zinc-800 text-xl">
            Danh sách bài viết ({blogs.length})
          </h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors duration-200"
            onClick={fetchBlogs}
            type="button"
          >
            Làm mới
          </button>
        </div>

        {/* Container danh sách bài viết - Sử dụng BlogList component */}
        <BlogList blogs={blogs} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default EditBlogs;
