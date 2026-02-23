import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";

const BASE_URL = "http://localhost:1000/api/v1/blogs";

const LikedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API lấy danh sách bài viết đã thích
  useEffect(() => {
    const fetchLikedBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getLikedBlogsOfAUser`, {
          credentials: "include",
        });
        const result = await response.json();

        if (result.success) {
          setBlogs(result.blogs || []);
        }
      } catch (err) {
        console.error("Error fetching liked blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedBlogs();
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
            Bài viết đã thích
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
          Bài viết đã thích
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
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <p className="text-gray-500 text-lg">
                Chưa có bài viết đã thích nào
              </p>
              <p className="mt-2 text-gray-400">
                Hãy like các bài viết bạn quan tâm
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default LikedBlogs;
