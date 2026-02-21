/**
 * BlogCard - Component tái sử dụng để hiển thị từng bài viết blog
 * Sử dụng trong cả RecentBlogs (trang chủ) và AllBlogs (trang danh sách blog)
 *
 * @param {Object} item - Dữ liệu bài viết blog
 * @param {string} item.id - Định danh duy nhất
 * @param {string} item.title - Tiêu đề blog
 * @param {string} item.description - Mô tả blog
 * @param {string} item.IMG - URL hình ảnh
 * @param {string} item.date - Ngày xuất bản
 */
const BlogCard = ({ item }) => {
  return (
    <>
      {/* Thẻ Blog Container */}
      <div className="flex lg:flex-row flex-col gap-4 mb-6 last:mb-0">
        {/* Phần hình ảnh - 2/6 chiều rộng trên desktop */}
        <div className="w-full lg:w-2/6">
          <img
            alt={item.title}
            className="rounded-lg w-full h-48 lg:h-full object-cover"
            src={item.IMG}
          />
        </div>

        {/* Phần nội dung - 4/6 chiều rộng trên desktop */}
        <div className="flex flex-col justify-between w-full lg:w-4/6">
          {/* Tiêu đề */}
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-xl">
            {item.title}
          </h3>

          {/* Mô tả với cắt ngắn 300 ký tự */}
          <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.description.slice(0, 300)}
            {item.description.length > 300 && "..."}
          </p>

          {/* Nút Đọc bài viết */}
          <a
            className="inline-block bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded w-fit font-medium text-white transition-all duration-800 cursor-pointer"
            href={`/blog/${item.id}`}
          >
            Đọc bài viết
          </a>
        </div>
      </div>

      {/* Đường phân cách giữa các thẻ */}
      <div className="mb-6 border-zinc-500 border-b-2 last:border-b-0" />
    </>
  );
};

export default BlogCard;
