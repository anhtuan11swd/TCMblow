/**
 * BlogCard - Component tái sử dụng để hiển thị từng bài viết blog
 * Sử dụng trong cả RecentBlogs (trang chủ), AllBlogs và trang Profile
 *
 * @param {Object} item - Dữ liệu bài viết blog
 * @param {string} item._id - Định danh duy nhất từ MongoDB
 * @param {string} item.title - Tiêu đề blog
 * @param {string} item.description - Mô tả blog
 * @param {string} item.image - URL hình ảnh từ database
 * @param {string} item.IMG - URL hình ảnh từ mock data
 * @param {Date|string} item.createdAt - Ngày tạo từ MongoDB
 * @param {string} item.date - Ngày từ mock data
 * @param {number} slice - Số ký tự tối đa hiển thị (mặc định 300)
 * @param {boolean} isProfilePage - Ẩn nút "Đọc bài viết" khi hiển thị trong profile
 */
const BlogCard = ({ item, slice = 150, isProfilePage = false }) => {
  // Xử lý ID - ưu tiên _id từ MongoDB, fallback về id hoặc title
  const blogId =
    item._id ||
    item.id ||
    item.title?.toLowerCase().replace(/\s+/g, "-") ||
    "default-id";

  // Xử lý hình ảnh - ưu tiên image từ DB, fallback về IMG từ mock data
  const imageUrl = item.image || item.IMG;

  return (
    <>
      {/* Thẻ Blog Container */}
      <div
        className={`flex lg:flex-row flex-col gap-4 mb-6 last:mb-0 ${isProfilePage ? "lg:mb-2" : ""}`}
      >
        {/* Phần hình ảnh - 2/6 chiều rộng trên desktop */}
        <div className="w-full lg:w-2/6">
          {imageUrl ? (
            <img
              alt={item.title}
              className="rounded-lg w-full h-48 lg:h-full object-cover"
              src={imageUrl}
            />
          ) : (
            <div className="flex justify-center items-center bg-gray-200 rounded-lg w-full h-48 lg:h-full">
              <span className="text-gray-400">Không có hình ảnh</span>
            </div>
          )}
        </div>

        {/* Phần nội dung - 4/6 chiều rộng trên desktop */}
        <div className="flex flex-col justify-between w-full lg:w-4/6">
          {/* Tiêu đề */}
          <h3 className="mb-2 font-semibold text-gray-900 text-xl">
            {item.title}
          </h3>

          {/* Mô tả với cắt ngắn theo slice prop */}
          <p className="mb-4 text-gray-600 leading-relaxed">
            {item.description.slice(0, slice)}
            {item.description.length > slice && "..."}
          </p>

          {/* Nút Đọc bài viết - ẩn khi ở profile page */}
          {!isProfilePage && (
            <a
              className="inline-block bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded w-fit font-medium text-white transition-all duration-800 cursor-pointer"
              href={`/description/${blogId}`}
            >
              Đọc bài viết
            </a>
          )}
        </div>
      </div>

      {/* Đường phân cách giữa các thẻ */}
      <div className="mb-6 border-zinc-500 border-b-2 last:border-b-0" />
    </>
  );
};

export default BlogCard;
