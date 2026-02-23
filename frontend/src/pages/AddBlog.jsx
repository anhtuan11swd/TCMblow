import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    categoryId: "",
    description: "",
    image: null,
    title: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { link } = useSelector((state) => state.production);

  // Lấy danh sách categories
  useEffect(() => {
    const fetchCategories = async () => {
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
      }
    };

    fetchCategories();
  }, [link]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    setBlog({ ...blog, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.description || !blog.image) {
      toast.error("Tất cả các trường đều bắt buộc");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("image", blog.image);
      if (blog.categoryId) {
        formData.append("categoryId", blog.categoryId);
      }

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("blogAppTCM="))
        ?.split("=")[1];

      const response = await axios.post(
        `${link}/api/v1/admin/add-blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        toast.success("Bài viết đã được thêm thành công");
        // Reset form
        setBlog({
          categoryId: "",
          description: "",
          image: null,
          title: "",
        });
        // Reset file input
        document.getElementById("blog-image").value = "";
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error(error.response?.data?.message || "Lỗi khi thêm bài viết");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-200 p-8 min-h-screen">
      {/* Page Title */}
      <div className="bg-white shadow-lg mb-8 p-8 rounded-xl">
        <h1 className="font-semibold text-2xl">Thêm bài viết</h1>
      </div>

      <form
        className="space-y-8 bg-white shadow-lg p-8 rounded-xl"
        onSubmit={handleSubmit}
      >
        {/* Title Input - Modern design with bottom border only */}
        <input
          className="bg-transparent pb-2 border-zinc-400 border-b border-none outline-none w-full font-semibold text-zinc-800 placeholder:text-zinc-400 text-3xl transition-colors duration-300"
          name="title"
          onChange={handleChange}
          placeholder="Nhập tiêu đề bài viết..."
          required
          type="text"
          value={blog.title}
        />

        {/* Description Textarea */}
        <textarea
          className="bg-transparent p-4 border border-zinc-300 focus:border-blue-600 rounded-lg outline-none w-full text-zinc-700 text-xl leading-relaxed transition-colors duration-300 resize-none"
          name="description"
          onChange={handleChange}
          placeholder="Nhập mô tả chi tiết bài viết..."
          required
          rows={10}
          value={blog.description}
        />

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label
            className="block font-semibold text-zinc-700 text-sm"
            htmlFor="blog-category"
          >
            Danh mục
          </label>
          <select
            className="bg-transparent p-4 border border-zinc-300 focus:border-blue-600 rounded-lg outline-none w-full text-zinc-700 transition-colors duration-300"
            id="blog-category"
            name="categoryId"
            onChange={handleChange}
            value={blog.categoryId}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload - File input with accept formats */}
        <div className="space-y-2">
          <label
            className="block font-semibold text-zinc-700 text-sm"
            htmlFor="blog-image"
          >
            Ảnh bìa
          </label>
          <input
            accept=".jpeg,.jpg,.png"
            className="block hover:file:bg-zinc-800 file:bg-zinc-900 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-lg w-full file:font-semibold text-zinc-500 file:text-white text-sm file:text-sm transition-colors duration-300"
            id="blog-image"
            onChange={handleImageChange}
            type="file"
          />
          <p className="mt-1 text-zinc-500 text-sm">
            Định dạng: .jpeg, .png, .jpg
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-start pt-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 shadow-xl hover:shadow-2xl px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed"
            disabled={loading}
            type="submit"
          >
            {loading ? "Đang thêm bài viết..." : "Thêm bài viết"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
