import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Mảng màu để áp dụng cho các danh mục
const colorClasses = [
  { bg: "bg-green-200", hover: "hover:bg-green-300" },
  { bg: "bg-blue-300", hover: "hover:bg-blue-400" },
  { bg: "bg-red-200", hover: "hover:bg-red-300" },
  { bg: "bg-orange-200", hover: "hover:bg-orange-300" },
  { bg: "bg-pink-200", hover: "hover:bg-pink-300" },
  { bg: "bg-blue-200", hover: "hover:bg-blue-300" },
  { bg: "bg-purple-200", hover: "hover:bg-purple-300" },
  { bg: "bg-yellow-200", hover: "hover:bg-yellow-300" },
  { bg: "bg-cyan-200", hover: "hover:bg-cyan-300" },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:1000/api/v1/blogs/getAllCategories",
        );
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Lấy màu theo index
  const getColorClass = (index) => {
    return colorClasses[index % colorClasses.length];
  };

  if (loading) {
    return (
      <section className="py-8">
        <h2 className="mb-6 font-semibold text-gray-800 text-xl">Danh mục</h2>
        <div className="flex justify-center items-center py-8">
          <div className="border-blue-600 border-b-2 rounded-full w-8 h-8 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <h2 className="mb-6 font-semibold text-gray-800 text-xl">Danh mục</h2>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((category, index) => {
          const colors = getColorClass(index);
          return (
            <Link
              className={`${colors.bg} ${colors.hover} rounded-lg px-4 py-3 text-center font-semibold text-gray-700 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md`}
              key={category._id}
              to={`/cat/${category._id}`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
