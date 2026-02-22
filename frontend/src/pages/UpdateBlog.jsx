import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

/**
 * UpdateBlog - Trang cập nhật bài viết
 * Sao chép cấu trúc từ AddBlog và đổi tiêu đề thành "Cập nhật bài viết"
 * Sử dụng design system từ UI/UX Pro Max
 */

// Mock data - sẽ được thay thế bằng API call
const blogData = {
  1: {
    content:
      "Để có mái tóc khỏe mạnh, bạn cần kết hợp giữa chăm sóc đúng cách, dinh dưỡng và lối sống lành mạnh. Dưới đây là top 10 mẹo chăm sóc tóc hiệu quả...",
    existingImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
    title: "Top 10 Mẹo Chăm Sóc Tóc Để Có Mái Tóc Khỏe Mạnh",
  },
  2: {
    content:
      "Để thực sự chăm sóc tóc, điều quan trọng là phải hiểu cấu trúc sinh học và chu kỳ phát triển của tóc. Tóc được cấu tạo từ keratin...",
    existingImage:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
    title: "Hiểu Cấu Trúc Tóc Và Chu Kỳ Phát Triển Của Tóc",
  },
  3: {
    content:
      "Bạn không cần phải đến salon mỗi khi muốn tạo kiểu tóc chuyên nghiệp. Với các công cụ và kỹ thuật đúng, bạn có thể tự tạo kiểu tại nhà...",
    existingImage:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&h=600&fit=crop",
    title: "Kỹ Thuật Tạo Kiểu Chuyên Nghiệp Tại Nhà",
  },
  4: {
    content:
      "Nhiều vấn đề tóc phổ biến có thể được giải quyết bằng các thành phần tự nhiên có sẵn trong bếp của bạn. Các liệu pháp tự nhiên...",
    existingImage:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&h=600&fit=crop",
    title: "Các Liệu Pháp Tự Nhiên Cho Các Vấn Đề Tóc Thường Gặp",
  },
};

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState({
    content: "",
    existingImage: "",
    image: null,
    title: "",
  });

  useEffect(() => {
    // Simulate API call to fetch blog data
    const fetchBlog = () => {
      setIsLoading(true);
      setTimeout(() => {
        const blogInfo = blogData[id];
        if (blogInfo) {
          setBlog({
            ...blogInfo,
            image: null,
          });
        }
        setIsLoading(false);
      }, 300);
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    setBlog({ ...blog, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated blog data:", blog);
    // Logic to update blog would go here
    alert(`Đã cập nhật bài viết ID: ${id}`);
    navigate("/admin-dashboard/edit-blogs");
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
          name="content"
          onChange={handleChange}
          placeholder="Nhập nội dung chi tiết bài viết..."
          required
          rows={10}
          value={blog.content}
        />

        {/* Image Upload - File input with accept formats */}
        <div className="space-y-4">
          <label
            className="block font-semibold text-zinc-700 text-sm"
            htmlFor="blog-image"
          >
            Ảnh bìa
          </label>

          {/* Preview existing image */}
          {blog.existingImage && !blog.image && (
            <div className="mb-4">
              <p className="mb-2 text-zinc-500 text-sm">Ảnh hiện tại:</p>
              <img
                alt={blog.title}
                className="rounded-lg w-full max-w-md h-48 object-cover"
                src={blog.existingImage}
              />
            </div>
          )}

          {/* Preview new image */}
          {blog.image && (
            <div className="mb-4">
              <p className="mb-2 text-zinc-500 text-sm">Ảnh mới:</p>
              <img
                alt="Preview"
                className="rounded-lg w-full max-w-md h-48 object-cover"
                src={URL.createObjectURL(blog.image)}
              />
            </div>
          )}

          <input
            accept=".jpeg,.jpg,.png"
            className="block hover:file:bg-zinc-800 file:bg-zinc-900 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-lg w-full file:font-semibold text-zinc-500 file:text-white text-sm file:text-sm transition-colors duration-300 cursor-pointer"
            id="blog-image"
            onChange={handleImageChange}
            type="file"
          />
          <p className="mt-1 text-zinc-500 text-sm">
            Định dạng: .jpeg, .png, .jpg (để trống nếu giữ nguyên ảnh cũ)
          </p>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex justify-start gap-4 pt-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 shadow-xl hover:shadow-2xl px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 cursor-pointer"
            type="submit"
          >
            Cập nhật bài viết
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
