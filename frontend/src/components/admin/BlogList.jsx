/**
 * BlogList - Component hiển thị danh sách blog trong trang Admin
 * Sử dụng Grid Layout với 3 cột, tập trung vào việc quản trị và chỉnh sửa
 *
 * @param {Array} blogs - Mảng các bài viết blog
 * @param {Function} onDelete - Hàm xóa blog
 */
import { Link } from "react-router-dom";

const BlogList = ({ blogs = [], onDelete }) => {
  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="p-4 h-screen">
      {/* Grid Layout với 3 cột */}
      <div className="gap-6 grid grid-cols-3">
        {blogs.map((item) => (
          <div
            className="flex flex-col justify-center items-center bg-white shadow-sm hover:shadow-md my-4 p-4 rounded-xl transition-shadow duration-300"
            key={item.id}
          >
            {/* Hình ảnh blog */}
            <div className="mb-4 w-full">
              <img
                alt={item.title}
                className="rounded-lg w-full h-48 object-cover"
                src={item.IMG}
              />
            </div>

            {/* Tiêu đề blog - căn giữa */}
            <h3 className="px-2 font-semibold text-gray-900 text-lg text-center">
              {item.title}
            </h3>

            {/* Button Container - Edit & Delete */}
            <div className="flex justify-between items-center gap-4 mt-4 w-full">
              {/* Nút Edit - Link đến trang chỉnh sửa */}
              <Link
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white text-center transition-colors duration-200"
                to={`/update-blog/${item.id}`}
              >
                Chỉnh sửa
              </Link>

              {/* Nút Delete - Gọi API xóa */}
              <button
                className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white text-center transition-colors duration-200"
                onClick={() => handleDelete(item.id)}
                type="button"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
