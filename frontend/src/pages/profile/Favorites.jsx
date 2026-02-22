import BlogCard from "../../components/BlogCard";

// Dữ liệu mẫu cho bài viết đã lưu
const savedBlogs = [
  {
    date: "20/02/2026",
    description:
      "React Hooks là một tính năng mạnh mẽ cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class. Trong bài viết này, chúng ta sẽ tìm hiểu về useState, useEffect, và các hooks khác.",
    IMG: "/temp.jpg",
    id: "1",
    title: "Hướng dẫn React Hooks cho người mới bắt đầu",
  },
  {
    date: "18/02/2026",
    description:
      "Hiệu suất là yếu tố quan trọng trong phát triển ứng dụng web. Bài viết này sẽ hướng dẫn bạn các kỹ thuật tối ưu hiệu suất như memo, useMemo, useCallback và lazy loading.",
    IMG: "/temp.jpg",
    id: "2",
    title: "Tối ưu hiệu suất ứng dụng React",
  },
  {
    date: "15/02/2026",
    description:
      "Tailwind CSS là một utility-first CSS framework giúp bạn nhanh chóng xây dựng giao diện đẹp mắt. Tìm hiểu cách sử dụng Tailwind để tạo các component hiện đại.",
    IMG: "/temp.jpg",
    id: "3",
    title: "Giới thiệu về Tailwind CSS",
  },
];

const Favorites = () => {
  return (
    <div className="p-6">
      <h1 className="mb-6 font-bold text-zinc-900 dark:text-white text-3xl">
        Bài viết đã lưu
      </h1>

      {savedBlogs.length > 0 ? (
        <div className="space-y-4">
          {savedBlogs.map((item) => (
            <BlogCard item={item} key={item.id} slice={170} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <svg
            aria-hidden="true"
            className="mx-auto mb-4 w-16 h-16 text-zinc-300 dark:text-zinc-600"
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
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            Chưa có bài viết đã lưu nào
          </p>
          <p className="mt-2 text-zinc-400 dark:text-zinc-500">
            Hãy lưu các bài viết bạn quan tâm
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
