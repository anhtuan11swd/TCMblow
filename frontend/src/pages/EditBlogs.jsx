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

  // Hàm xử lý khi nhấn nút chỉnh sửa
  const handleEdit = (blog) => {
    // TODO: Kết nối với API để chỉnh sửa bài viết
    console.log("Chỉnh sửa bài viết:", blog);
  };

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

        {/* Container danh sách bài viết */}
        <div className="space-y-4">
          {blogData.map((item) => (
            <div
              className="bg-white shadow-sm hover:shadow-md p-4 border border-zinc-200 rounded-lg transition-shadow duration-300"
              key={item.id}
            >
              <div className="flex lg:flex-row flex-col gap-4">
                {/* Hình ảnh */}
                <div className="w-full lg:w-1/6">
                  <img
                    alt={item.title}
                    className="rounded-lg w-full h-32 object-cover"
                    src={item.IMG}
                  />
                </div>

                {/* Nội dung */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="mb-2 font-semibold text-zinc-800 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <p className="mt-2 text-zinc-400 text-xs">
                      Ngày đăng: {item.date}
                    </p>
                  </div>

                  {/* Nút hành động */}
                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors duration-200"
                      onClick={() => handleEdit(item)}
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Chỉnh sửa</title>
                        <path
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      Chỉnh sửa
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors duration-200"
                      onClick={() => handleDelete(item.id)}
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Xóa</title>
                        <path
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditBlogs;
