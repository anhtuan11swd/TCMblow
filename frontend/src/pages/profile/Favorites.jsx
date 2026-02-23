import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";

const BASE_URL = "http://localhost:1000/api/v1/blogs";

const Favorites = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API lấy danh sách bài viết yêu thích
  useEffect(() => {
    const fetchFavoriteBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getFavoriteBlogsOfAUser`, {
          credentials: "include",
        });
        const result = await response.json();

        if (result.success) {
          setBlogs(result.blogs || []);
        }
      } catch (err) {
        console.error("Error fetching favorite blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteBlogs();
  }, []);

  // Format dữ liệu blog từ API để hiển thị trong BlogCard
  const formatBlogForCard = (blog) => ({
    _id: blog._id,
    author: blog.author,
    category: blog.category,
    date: blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString("vi-VN")
      : "",
    description: blog.description,
    IMG: blog.image,
    id: blog._id,
    title: blog.title,
  });

  if (loading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <section className="py-4">
          <h2 className="mb-6 font-bold text-gray-900 text-2xl">
            Bài viết đã lưu
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500">Đang tải...</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <section className="py-4">
        <h2 className="mb-6 font-bold text-gray-900 text-2xl">
          Bài viết đã lưu
        </h2>

        {blogs.length > 0 ? (
          <div className="flex flex-col gap-8 lg:gap-12">
            {blogs.map((blog) => (
              <BlogCard item={formatBlogForCard(blog)} key={blog._id} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 w-16 h-16 text-zinc-300"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <p className="text-gray-500 text-lg">
                Chưa có bài viết đã lưu nào
              </p>
              <p className="mt-2 text-gray-400">
                Hãy lưu các bài viết bạn quan tâm
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorites;
