import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ description: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { link } = useSelector((state) => state.production);

  // Lấy danh sách categories
  const fetchCategories = useCallback(async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("blogAppTCM="))
        ?.split("=")[1];

      const response = await axios.get(`${link}/api/v1/admin/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.categories) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Lỗi khi lấy danh sách danh mục");
    }
  }, [link]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Thêm danh mục mới
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategory.name) {
      toast.error("Tên danh mục là bắt buộc");
      return;
    }

    setLoading(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("blogAppTCM="))
        ?.split("=")[1];

      const response = await axios.post(
        `${link}/api/v1/admin/category`,
        newCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        toast.success("Danh mục đã được tạo thành công");
        setNewCategory({ description: "", name: "" });
        setIsModalOpen(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Lỗi khi tạo danh mục");
    } finally {
      setLoading(false);
    }
  };

  // Xóa danh mục
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      return;
    }

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("blogAppTCM="))
        ?.split("=")[1];

      await axios.delete(`${link}/api/v1/admin/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("Danh mục đã được xóa thành công");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.response?.data?.message || "Lỗi khi xóa danh mục");
    }
  };

  return (
    <div className="p-4">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-semibold text-2xl">Quản lý Danh mục</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-300"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          Thêm danh mục
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white shadow-lg border border-zinc-100 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 font-medium text-zinc-500 text-xs text-left uppercase tracking-wider">
                Tên danh mục
              </th>
              <th className="px-6 py-3 font-medium text-zinc-500 text-xs text-left uppercase tracking-wider">
                Mô tả
              </th>
              <th className="px-6 py-3 font-medium text-zinc-500 text-xs text-left uppercase tracking-wider">
                Số bài viết
              </th>
              <th className="px-6 py-3 font-medium text-zinc-500 text-xs text-right uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {categories.length === 0 ? (
              <tr>
                <td className="px-6 py-8 text-zinc-500 text-center" colSpan={4}>
                  Chưa có danh mục nào
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr className="hover:bg-zinc-50" key={category._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-zinc-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-zinc-500 text-sm">
                      {category.description || "Không có mô tả"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-blue-100 px-2 py-1 rounded-full font-medium text-blue-800 text-xs">
                      {category.blogs?.length || 0} bài viết
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      className="font-medium text-red-600 hover:text-red-800 text-sm"
                      onClick={() => handleDeleteCategory(category._id)}
                      type="button"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm danh mục */}
      {isModalOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white shadow-xl p-6 rounded-xl w-full max-w-md">
            <h2 className="mb-4 font-bold text-xl">Thêm Danh mục Mới</h2>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label
                  className="block mb-2 font-semibold text-zinc-700 text-sm"
                  htmlFor="category-name"
                >
                  Tên danh mục *
                </label>
                <input
                  className="p-3 border border-zinc-300 focus:border-blue-600 rounded-lg outline-none w-full text-zinc-700 transition-colors duration-300"
                  id="category-name"
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Nhập tên danh mục..."
                  required
                  type="text"
                  value={newCategory.name}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 font-semibold text-zinc-700 text-sm"
                  htmlFor="category-description"
                >
                  Mô tả
                </label>
                <textarea
                  className="p-3 border border-zinc-300 focus:border-blue-600 rounded-lg outline-none w-full text-zinc-700 transition-colors duration-300"
                  id="category-description"
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="Nhập mô tả danh mục..."
                  rows={3}
                  value={newCategory.description}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="bg-zinc-200 hover:bg-zinc-300 px-4 py-2 rounded-lg font-medium text-zinc-700 transition-colors duration-300"
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                >
                  Hủy
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-300 disabled:cursor-not-allowed"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Đang thêm..." : "Thêm danh mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
