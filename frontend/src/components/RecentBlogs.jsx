import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

/**
 * RecentBlogs - Component hiển thị 4 bài viết mới nhất
 * Gọi API fetchRecentBlogs để lấy dữ liệu từ backend
 */
const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/blogs/fetchRecentBlogs",
        );
        console.log("Recent Blogs API Response:", response.data);

        if (response.data.success) {
          setBlogs(response.data.blogs);
        } else {
          setError(response.data.message || "Lỗi khi lấy dữ liệu");
        }
      } catch (err) {
        console.error("Error fetching recent blogs:", err);
        setError(err.message || "Lỗi kết nối server");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-4">
        <h2 className="mb-6 font-bold text-gray-900 text-2xl">
          Bài viết mới nhất
        </h2>
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-500">Đang tải...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-4">
        <h2 className="mb-6 font-bold text-gray-900 text-2xl">
          Bài viết mới nhất
        </h2>
        <div className="flex justify-center items-center py-20">
          <div className="text-red-500">Lỗi: {error}</div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="py-4">
        <h2 className="mb-6 font-bold text-gray-900 text-2xl">
          Bài viết mới nhất
        </h2>
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-500">Chưa có bài viết nào</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      {/* Tiêu đề phần */}
      <h2 className="mb-6 font-bold text-gray-900 text-2xl">
        Bài viết mới nhất
      </h2>

      {/* Hiển thị danh sách blog với khoảng cách gap */}
      <div className="flex flex-col gap-8 lg:gap-12">
        {blogs.map((item) => (
          <BlogCard item={item} key={item._id} />
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
