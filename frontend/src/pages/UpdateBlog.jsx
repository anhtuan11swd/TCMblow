import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * UpdateBlog - Trang cập nhật bài viết
 * Lấy dữ liệu blog hiện có từ API và cho phép chỉnh sửa
 * Sử dụng design system từ UI/UX Pro Max
 */
const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blog, setBlog] = useState({
    description: "",
    image: "",
    title: "",
  });

  // Lấy dữ liệu blog hiện có từ API
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:1000/api/v1/blogs/getDSCByAddress/${id}`,
          { withCredentials: true },
        );

        if (response.data.success && response.data.blog) {
          const blogData = response.data.blog;
          setBlog({
            description: blogData.description || "",
            image: blogData.image || "",
            title: blogData.title || "",
          });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Lỗi khi tải thông tin bài viết");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  // Xử lý cập nhật blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.put(
        `http://localhost:1000/api/v1/blogs/editBlog/${id}`,
        {
          description: blog.description,
          title: blog.title,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success("Bài viết đã được cập nhật thành công");
        navigate("/admin-dashboard/edit-blogs");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      if (error.response?.status === 401) {
        toast.error("Bạn cần đăng nhập với tài khoản Admin để cập nhật");
      } else if (error.response?.status === 403) {
        toast.error("Bạn không có quyền cập nhật bài viết");
      } else {
        toast.error("Lỗi khi cập nhật bài viết");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
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

  if (!blog.title && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-4 min-h-screen">
        <div className="text-center">
          <h2 className="mb-4 font-bold text-zinc-800 text-2xl">
            Không tìm thấy bài viết
          </h2>
          <p className="mb-6 text-zinc-500">
            Bài viết với ID "{id}" không tồn tại.
          </p>
          <Link
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200"
            to="/admin-dashboard/edit-blogs"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          aria-label="Quay lại"
          className="flex justify-center items-center bg-zinc-100 hover:bg-zinc-200 rounded-lg w-10 h-10 transition-colors duration-200 cursor-pointer"
          onClick={handleBack}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
        <div>
          <h1 className="font-semibold text-zinc-800 text-2xl">
            Cập nhật bài viết
          </h1>
          <p className="mt-1 text-zinc-500 text-sm">
            Chỉnh sửa nội dung bài viết "{blog.title}"
          </p>
        </div>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Title Input - Modern design with bottom border only */}
        <input
          className="bg-transparent pb-2 border-zinc-400 focus:border-blue-600 border-b border-none outline-none w-full font-semibold text-zinc-800 placeholder:text-zinc-400 text-3xl transition-colors duration-300"
          name="title"
          onChange={handleChange}
          placeholder="Nhập tiêu đề bài viết..."
          required
          type="text"
          value={blog.title}
        />

        {/* Description Textarea */}
        <textarea
          className="bg-transparent p-4 border border-zinc-300 focus:border-blue-600 rounded-lg outline-none w-full text-zinc-700 text-xl leading-relaxed transition-colors duration-300 resize-none"
          name="description"
          onChange={handleChange}
          placeholder="Nhập mô tả chi tiết bài viết..."
          required
          rows={10}
          value={blog.description}
        />

        {/* Image Display - Read only */}
        {blog.image && (
          <div className="space-y-4">
            <label
              className="block font-semibold text-zinc-700 text-sm"
              htmlFor="blog-image"
            >
              Ảnh bìa hiện tại
            </label>
            <div className="mb-4">
              <img
                alt={blog.title}
                className="rounded-lg w-full max-w-md h-48 object-cover"
                src={blog.image}
              />
            </div>
            <p className="mt-1 text-zinc-500 text-sm">
              Lưu ý: Để thay đổi ảnh bìa, vui lòng tạo bài viết mới
            </p>
          </div>
        )}

        {/* Submit & Cancel Buttons */}
        <div className="flex justify-start gap-4 pt-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 shadow-xl hover:shadow-2xl px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Đang cập nhật..." : "Cập nhật bài viết"}
          </button>
          <button
            className="bg-zinc-200 hover:bg-zinc-300 px-8 py-3 rounded-lg font-semibold text-zinc-700 transition-colors duration-200 cursor-pointer"
            onClick={handleBack}
            type="button"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
