import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:1000/api/v1/blogs/getBlogByCategory/${categoryId}`,
        );
        const data = await response.json();

        if (data.success) {
          setCategory(data.category);
          setBlogs(data.blogs);
        } else {
          setError(data.message || "Không tìm thấy danh mục");
        }
      } catch (err) {
        console.error("Error fetching blogs by category:", err);
        setError("Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchBlogsByCategory();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <section className="py-8">
          <div className="flex justify-center items-center py-16">
            <div className="border-blue-600 border-b-2 rounded-full w-12 h-12 animate-spin" />
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <section className="py-8">
          <div className="py-12 text-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </section>
      </div>
    );
  }

  const categoryName = category?.name || "Danh mục";
  const categoryDescription =
    category?.description || `Các bài viết về ${categoryName}`;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Header của danh mục */}
      <section className="py-8">
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-gray-900 text-3xl">
            {categoryName}
          </h1>
          <p className="text-gray-600 text-lg">{categoryDescription}</p>
        </div>

        {/* Đường phân cách */}
        <div className="mb-8 border-zinc-500 border-b-2" />
      </section>

      {/* Danh sách bài viết */}
      <section className="py-4">
        {/* Tiêu đề phần */}
        <h2 className="mb-6 font-semibold text-gray-800 text-xl">
          Bài viết trong {categoryName}
        </h2>

        {/* Danh sách BlogCard */}
        {blogs.length > 0 ? (
          blogs.map((item) => (
            <BlogCard
              item={{
                ...item,
                image: item.image || item.IMG,
              }}
              key={item._id}
            />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-lg">
              Chưa có bài viết nào trong danh mục này.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
