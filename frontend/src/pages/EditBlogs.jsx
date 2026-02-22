import BlogList from "../components/admin/BlogList";

/**
 * EditBlogs - Trang quản lý bài viết cho admin
 * Tái sử dụng component AllBlogs để hiển thị danh sách bài viết
 * Chuẩn bị nền tảng cho các tác vụ Update và Delete
 */
const EditBlogs = () => {
  // Dữ liệu mẫu (sẽ được thay thế bằng API call)
  const blogData = [
    {
      date: "2024-01-15",
      description:
        "Để có mái tóc khỏe mạnh, bạn cần kết hợp giữa chăm sóc đúng cách, dinh dưỡng và lối sống lành mạnh.",
      IMG: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      id: "1",
      title: "Top 10 Mẹo Chăm Sóc Tóc Để Có Mái Tóc Khỏe Mạnh",
    },
    {
      date: "2024-01-10",
      description:
        "Để thực sự chăm sóc tóc, điều quan trọng là phải hiểu cấu trúc sinh học và chu kỳ phát triển của tóc.",
      IMG: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      id: "2",
      title: "Hiểu Cấu Trúc Tóc Và Chu Kỳ Phát Triển Của Tóc",
    },
    {
      date: "2024-01-05",
      description:
        "Bạn không cần phải đến salon mỗi khi muốn tạo kiểu tóc chuyên nghiệp. Với các công cụ và kỹ thuật đúng.",
      IMG: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&h=600&fit=crop",
      id: "3",
      title: "Kỹ Thuật Tạo Kiểu Chuyên Nghiệp Tại Nhà",
    },
    {
      date: "2024-01-01",
      description:
        "Nhiều vấn đề tóc phổ biến có thể được giải quyết bằng các thành phần tự nhiên có sẵn trong bếp của bạn.",
      IMG: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&h=600&fit=crop",
      id: "4",
      title: "Các Liệu Pháp Tự Nhiên Cho Các Vấn Đề Tóc Thường Gặp",
    },
  ];

  // Hàm xử lý khi nhấn nút xóa
  const handleDelete = (blogId) => {
    // TODO: Kết nối với API để xóa bài viết
    console.log("Xóa bài viết với ID:", blogId);
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      // Xử lý xóa ở đây
      alert(`Đã xóa bài viết ID: ${blogId}`);
    }
  };

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
            Danh sách bài viết ({blogData.length})
          </h2>
        </div>

        {/* Container danh sách bài viết - Sử dụng BlogList component */}
        <BlogList blogs={blogData} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default EditBlogs;
