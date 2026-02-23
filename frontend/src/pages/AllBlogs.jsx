import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

/**
 * AllBlogs - Trang hiển thị tất cả các bài viết blog
 * Gọi API fetchAllBlogs để lấy dữ liệu từ backend
 */
const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/blogs/fetchAllBlogs",
        );
        console.log("API Response:", response.data);

        if (response.data.success) {
          setBlogs(response.data.blogs);
        } else {
          setError(response.data.message || "Lỗi khi lấy dữ liệu");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message || "Lỗi kết nối server");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <section className="py-4">
          <h2 className="mb-6 font-bold text-gray-900 text-2xl">
            Tất cả bài viết
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500">Đang tải...</div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <section className="py-4">
          <h2 className="mb-6 font-bold text-gray-900 text-2xl">
            Tất cả bài viết
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-red-500">Lỗi: {error}</div>
          </div>
        </section>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <section className="py-4">
          <h2 className="mb-6 font-bold text-gray-900 text-2xl">
            Tất cả bài viết
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500">Chưa có bài viết nào</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <section className="py-4">
        {/* Tiêu đề phần - All Blogs */}
        <h2 className="mb-6 font-bold text-gray-900 text-2xl">
          Tất cả bài viết
        </h2>

        {/* Hiển thị danh sách blog với khoảng cách gap */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {blogs.map((item) => (
            <BlogCard item={item} key={item._id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllBlogs;
