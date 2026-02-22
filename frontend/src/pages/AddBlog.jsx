import { useState } from "react";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    content: "",
    image: null,
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    setBlog({ ...blog, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog data:", blog);
    // Logic to add blog would go here
  };

  return (
    <div className="p-4 min-h-screen">
      {/* Page Title */}
      <h1 className="mb-8 font-semibold text-2xl">Thêm bài viết</h1>

      <form className="space-y-8" onSubmit={handleSubmit}>
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
          name="content"
          onChange={handleChange}
          placeholder="Nhập nội dung chi tiết bài viết..."
          required
          rows={10}
          value={blog.content}
        />

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
            className="bg-blue-600 hover:bg-blue-700 shadow-xl hover:shadow-2xl px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300"
            type="submit"
          >
            Thêm bài viết
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
